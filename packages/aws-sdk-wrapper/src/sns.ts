import {clientSNS, clientSTS} from './clients';

type PublishMessageParams = {
  topicName: string;
  messageBody: Record<string, unknown>;
}

export async function publishMessage(
    {topicName, messageBody}:PublishMessageParams,
): Promise<string> {
  const accId = await clientSTS.getAccountId();
  const TopicArn = `arn:aws:sns:${process.env.AWS_REGION}:${accId}:${topicName}`;

  const {MessageId} = await clientSNS.publish({TopicArn, Message: JSON.stringify(messageBody)});

  return MessageId as string;
}
