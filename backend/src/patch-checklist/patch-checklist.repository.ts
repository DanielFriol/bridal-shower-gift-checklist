import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';
import { Gift, parseDynamoDBToGift } from '../shared/gift.model';

export class PatchChecklistRepository {
    dynamoDb: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient(
            process.env.ENVIRONMENT !== 'local'
                ? {}
                : {
                      endpoint: 'http://localhost:8000',
                  },
        );
        this.dynamoDb = DynamoDBDocumentClient.from(client);
    }
    async handle(giftId: string, person?: string): Promise<Gift> {
        // Patch checklist in DynamoDB
        let updateExpression = 'SET #reserved = :reserved, #reservedAt = :reservedAt';
        const expressionAttributeNames: { [key: string]: string } = {
            '#reserved': 'reserved',
            '#reservedAt': 'reservedAt',
        };
        const expressionAttributeValues: { [key: string]: any } = {
            ':reserved': true,
            ':reservedAt': new Date().toISOString(),
        };

        if (person) {
            updateExpression += ', #reservedBy = :reservedBy';
            expressionAttributeNames['#reservedBy'] = 'reservedBy';
            expressionAttributeValues[':reservedBy'] = person;
        }

        const input: UpdateCommandInput = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Key: {
                PK: `GIFT#${giftId}`,
                SK: `GIFT#METADATA`,
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_OLD',
        };

        const response = await this.dynamoDb.send(new UpdateCommand(input));

        return parseDynamoDBToGift(response?.Attributes);
    }
}
