export interface Gift {
    id: string;
    title: string;
    reserved: boolean;
    reservedBy?: string;
    reservedAt?: string;
    createdAt: string;
    updatedAt?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDynamoDBToGift(item: any): Gift {
    return {
        id: item.id,
        title: item.title,
        reserved: item.reserved,
        reservedBy: item.reservedBy,
        reservedAt: item.reservedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    };
}
