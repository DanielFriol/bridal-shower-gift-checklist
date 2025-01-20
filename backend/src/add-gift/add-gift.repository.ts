import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Gift, parseDynamoDBToGift, parseGiftToDynamoDB } from './gift.model';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';

export class AddGiftRepository {
    dynamoDb: DynamoDBDocumentClient;

    constructor() {
        const client = new DynamoDBClient();
        this.dynamoDb = DynamoDBDocumentClient.from(client);
    }

    async addGift(gift: Gift): Promise<Gift> {
        // Add gift to DynamoDB
        const input: PutCommandInput = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: parseGiftToDynamoDB(gift), // Using standard JavaScript object
        };
        const response = await this.dynamoDb.send(new PutCommand(input));

        return parseDynamoDBToGift(response?.Attributes?.Item[0]);
    }
}
