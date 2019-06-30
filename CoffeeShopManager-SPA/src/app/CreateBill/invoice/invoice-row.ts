export class InvoiceRow {
    public get total(): number {
    return this.unitPrice * this.qty;
    }

    constructor(
        public stt: number,
        public productName: string,
        public unitPrice: number,
        public qty: number
    ) {}
}
