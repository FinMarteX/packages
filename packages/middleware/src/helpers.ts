import createError from 'http-errors';

export type ErrorDefinition = {
  statusCode: number;
  message: string;
};

export function throwHTTPError(error: ErrorDefinition): void {
  const {statusCode, message} = error;

  throw createError(statusCode, message);
}
