import type {GetCallerIdentityCommandOutput} from '@aws-sdk/client-sts';
import {STS} from '@aws-sdk/client-sts';
import {once} from 'lodash';

const sts = new STS({
  logger: console,
});

export function getCallerIdentity(): Promise<GetCallerIdentityCommandOutput> {
  return sts.getCallerIdentity({});
}

export const getAccountId = once(
    (): Promise<string> =>
      getCallerIdentity().then((identity) => identity.Account) as Promise<string>,
);

