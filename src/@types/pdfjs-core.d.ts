declare module "@hyzyla/pdfjs-core" {
  class LocalPdfManager {
    pdfDocument: PDFDocument;
    constructor(args: any);
  }

  class PDFDocument {
    xref: any;
    trailer: any;
    numPages: number;
    parseStartXRef(): void;
    parse(): void;
  }

  class Ref {
    num: number;
    gen: number;

    static fromString(str: string): Ref | null;
    static get(num: number, gen: number): Ref;

    constructor(num: number, gen: number);
    toString(): string;
  }

  class BaseStream {
    dict: Dict;
    getBytes(): Uint8Array;
    reset(): void;
  }

  class Stream extends BaseStream {}
  class DecodeStream extends BaseStream {}

  class FlateStream extends DecodeStream {
    constructor(str: DecodeStream, maybeLength: number);

    str: BaseStream;
    dict: Record<string, unknown>;
    codeSize: number;
    codeBuf: number;

    getBits(bits: number): number;
    getCode(table: Array<{ [key: string]: unknown }>): number;
    generateHuffmanTable(lengths: Array<number>): [Int32Array, number];
    readBlock(): void;
  }

  class Dict {
    getRaw(key: string): any;
    getKeys(): string[];
  }

  class Name {
    name: string;
  }

  function isDict(obj: any): boolean;
  function isArray(obj: any): boolean;
  function isName(obj: any): boolean;
}
