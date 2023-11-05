import type {SQSEvent} from 'aws-lambda';
import {parseJSONSafe} from './helpers';

function getParsedBody({Records: records}: SQSEvent): {Message: string}[] {
  return records.map(({body}) => parseJSONSafe(body)).filter(Boolean);
}

function getParsedMessages<T>(bodies: {Message: string}[]): T[] {
  return bodies.map(({Message: msg}) => parseJSONSafe(msg)).filter(Boolean);
}

export function getParsedSNSMessages<T extends Record<string, unknown> = Record<string, unknown>>(
    event: SQSEvent,
): T[] {
  const bodies = getParsedBody(event);
  const messages = getParsedMessages<T>(bodies);

  return messages.filter(Boolean);
}

