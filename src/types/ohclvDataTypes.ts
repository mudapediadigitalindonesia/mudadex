export namespace OhclvDataType {
  export interface Main {
    success: boolean;
    data: Data;
  }

  export interface Data {
    baseAddress: string;
    quoteAddress: string;
    type: string;
    items: Item[];
  }

  export interface Item {
    o: number;
    c: number;
    h: number;
    l: number;
    vBase: number;
    vQuote: number;
    unixTime: number;
  }

}