import {compareSync} from 'bcryptjs';
import {decode} from 'jsonwebtoken';
import middy from '@middy/core';
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {getUserByEmail} from '@fintex/users-ddb';
import {Users} from '@fintex/types-ddb';
import {ErrorDefinition, throwHTTPError} from './helpers';
import {omit} from 'lodash';

type Params = {
  password: string;
  user?: Users.User;
}

type JwtTokenPayload = {
  userId: string;
  email: string;
  affiliateId: string;
};

const UNAUTHORIZED: ErrorDefinition ={
  statusCode: 401,
  message: 'Invalid login or password',
};

function validate(params: Params): void {
  const {user, password} = params;

  if (!user) {
    throwHTTPError(UNAUTHORIZED);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!checkPassword(password, user!.password)) {
    throwHTTPError(UNAUTHORIZED);
  }
}

function checkPassword(inputPassword: string, userPassword: string): boolean {
  return compareSync(inputPassword, userPassword);
}

export default function(): middy.MiddlewareObj<any, any, any, Context> {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
      req: Record<string, any>,
  ) => {
    if (req.event.headers['x-api-key'] || req.event.headers['X-API-KEY']) {
      req.event.body = omit(req.event.body, ['login', 'password']);
      req.event.requestContext.authorizer = {userId: 'fintex-manualy', affiliateId: 'FinTex'};
      // todo: remove this line
      req.event.body['userId'] = 'fintex-manualy';

      return;
    }

    const authorization =
      req.event.headers['authorization'] ||
      req.event.headers['Authorization'] ||
      req.event.headers['AUTHORIZATION'];
    if (
      authorization
    ) {
      req.event.body = omit(req.event.body, ['login', 'password']);
      const {userId, affiliateId = ''} = decode(authorization) as JwtTokenPayload;
      req.event.requestContext.authorizer = {userId, affiliateId};
      // todo: remove this line
      req.event.body['userId'] = userId;

      return;
    }

    const {login: email, password} = req.event.body;
    const user = await getUserByEmail(email);

    validate({user, password});
    req.event.body = omit(req.event.body, ['login', 'password']);
    req.event.requestContext.authorizer = {userId: user!.id, affiliateId: user!.affiliateId};
    // todo: remove this line
    req.event.body['userId'] = user!.id;

    return;
  };

  return {before};
}
