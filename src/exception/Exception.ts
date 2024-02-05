export class Exception extends Error {
    public code?: number;
    public message: string;
    public data?: any;

    constructor(code: number = 0, message: string = '', data = '') {
        super(message)
        this.code = code;
        this.data = data
    }
}