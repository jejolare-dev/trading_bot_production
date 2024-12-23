export default interface Pair {
    id: string,
    orderType: string,
    type: string,
    price: string,
    amount: string,
    userId: number,
    active: boolean,
    baseCurrency: string,
    quoteCurrency: string,
}

export type AddPairData = Omit<Pair, "id" | "orderType" | "userId">;

export type EditPairData = Partial<Pair>;

