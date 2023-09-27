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

  class Stream {}

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
