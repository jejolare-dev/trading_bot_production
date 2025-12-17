export default interface PairRow {
    id: string;
    orderType: string;
    type: string;
    price: number;
    amount: number;
    userId: number;
    active: boolean;
    baseCurrency: string;
    quoteCurrency: string;
}
