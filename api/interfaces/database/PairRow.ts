export default interface PairRow {
    id: number,
    orderType: string,
    type: string,
    price: number,
    amount: number,
    userId: number,
    active: boolean,
    baseCurrency: string,
    quoteCurrency: string,
}