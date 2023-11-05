import {clientSNS, clientSTS} from './clients';

export async function publishMessage(
    topic: string,
    message: Record<string, unknown>,
): Promise<string> {
  const accId = await clientSTS.getAccountId();
  const TopicArn = `arn:aws:sns:${process.env.AWS_REGION}:${accId}:${topic}`;

  const {MessageId} = await clientSNS.publish({TopicArn, Message: JSON.stringify(message)});

  return MessageId as string;
}
