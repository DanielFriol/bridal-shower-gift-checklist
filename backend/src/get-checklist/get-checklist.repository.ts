import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { parseDynamoDBToGift } from '../shared/gift.model';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export class GetChecklistRepository {
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

    async getAllGifts() {
        const params = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
        };
        const { Items } = await this.dynamoDb.send(new ScanCommand(params));

        return Items?.map((item) => parseDynamoDBToGift(unmarshall(item)));
    }
}
