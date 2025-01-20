import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { parseDynamoDBToGift } from '../add-gift/gift.model';
import { Gift } from './gift.model';

export class PatchChecklistRepository {
    dynamoDb: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient();
        this.dynamoDb = DynamoDBDocumentClient.from(client);
    }
    async handle(giftId: string, person: string): Promise<Gift> {
        // Patch checklist in DynamoDB
        const input: UpdateCommandInput = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: {
                PK: `GIFT#${giftId}`,
            },
            UpdateExpression: 'SET #reserved = :reserved, #reservedAt = :reservedAt',
            ExpressionAttributeNames: {
                '#reserved': 'reserved',
                '#reservedAt': 'reservedAt',
            },
            ExpressionAttributeValues: {
                ':reserved': true,
                ':reservedAt': person,
            },
        };
        const response = await this.dynamoDb.send(new UpdateCommand(input));

        return parseDynamoDBToGift(response?.Attributes);
    }
}
