export default interface PairData {
    orderType: string,
    type: string,
    price: number,
    amount: number,
    userId: number,
    active: boolean,
    baseCurrency: string,
    quoteCurrency: string,
}