import * as core from "@hyzyla/pdfjs-core";

type ObjType =
  | core.Ref
  | core.BaseStream
  | core.Dict
  | core.Name
  | ObjType[]
  | StreamContent
  | string
  | number
  | boolean
  | null
  | unknown;

export function isDict(obj: ObjType): obj is core.Dict {
  return core.isDict(obj);
}

export function isRef(obj: ObjType): obj is core.Ref {
  return obj instanceof core.Ref;
}

export function isStream(obj: ObjType): obj is core.BaseStream {
  return obj instanceof core.BaseStream;
}

export function isStreamContent(obj: ObjType): obj is StreamContent {
  return obj instanceof StreamContent;
}

export function isArray(obj: ObjType): obj is ObjType[] {
  return Array.isArray(obj);
}

export function isNumber(obj: ObjType): obj is number {
  return typeof obj === "number";
}

export function isString(obj: ObjType): obj is string {
  return typeof obj === "string";
}

export function isName(obj: ObjType): obj is core.Name {
  return core.isName(obj);
}

export function isBoolean(obj: ObjType): obj is boolean {
  return typeof obj === "boolean";
}

export class StreamContent {
  stream: core.BaseStream;

  constructor(stream: core.BaseStream) {
    this.stream = stream;
  }
}

export class TreeNode {
  obj: ObjType;
  name?: string;
  depth: number;
  ref?: core.Ref;

  visited: boolean = false;
  parent?: TreeNode;
  walker: PDFWalker;
  private _children: TreeNode[] | null = null;

  constructor(options: {
    obj: ObjType;
    name?: string;
    depth: number;
    ref?: any;
    parent?: TreeNode;
    walker: PDFWalker;
  }) {
    this.obj = options.obj;
    this.name = options.name;
    this.depth = options.depth;
    this.ref = options.ref;
    this.parent = options.parent;
    this._children = null;
    this.walker = options.walker;
  }

  resolve(xref: any) {
    const fetched = xref.fetch(this.obj);
    this.ref = this.obj as core.Ref;
    this.obj = fetched;
  }

  get children(): TreeNode[] {
    // If the children have already been computed, return them.
    if (this._children !== null) {
      return this._children;
    }

    console.log("Getting children of:", this.name, this.depth, this.obj);

    const depth = this.depth + 1;
    const { obj } = this;
    const children: TreeNode[] = [];

    if (isDict(obj)) {
      const keys = obj.getKeys();
      for (const key of keys) {
        const value = obj.getRaw(key);
        children.push(
          new TreeNode({
            obj: value,
            name: key,
            depth,
            parent: this,
            walker: this.walker,
          })
        );
      }
    } else if (isArray(obj)) {
      for (const [index, value] of obj.entries()) {
        children.push(
          new ArrayItemTreeNode({
            obj: value,
            depth,
            parent: this,
            index: index,
            walker: this.walker,
          })
        );
      }
    } else if (isStream(obj)) {
      // Stream objects have a dictionary and a stream contents.
      const keys = obj.dict.getKeys();
      for (const key of keys) {
        const value = obj.dict.getRaw(key);
        children.push(
          new TreeNode({
            obj: value,
            name: key,
            depth,
            parent: this,
            walker: this.walker,
          })
        );
      }
      children.push(
        new TreeNode({
          obj: new StreamContent(obj),
          depth,
          parent: this,
          walker: this.walker,
        })
      );
    }

    this._children = children;
    for (const child of children) {
      this.walker.resolve(child);
    }
    return children;
  }
}

export class ArrayItemTreeNode extends TreeNode {
  index: number;

  constructor(options: {
    obj: ObjType;
    depth: number;
    parent?: TreeNode;
    index: number;
    walker: PDFWalker;
  }) {
    super({
      obj: options.obj,
      depth: options.depth,
      parent: options.parent,
      walker: options.walker,
    });
    this.index = options.index;
  }
}

/**
 * The PDFWalker class encapsulates the functionality to traverse
 * a PDF's internal structure.
 */
export class PDFWalker {
  pdf: core.PDFDocument;

  xref: any;

  refSet: Set<any> = new Set();

  constructor(options: { pdf: core.PDFDocument }) {
    this.pdf = options.pdf;
    this.xref = this.pdf.xref;
  }

  resolve(node: TreeNode) {
    // If the node is a reference, resolve it.
    if (isRef(node.obj)) {
      const refKey = `${node.obj.num}, ${node.obj.gen}`;
      if (this.refSet.has(refKey)) {
        return;
      }
      node.resolve(this.xref);
      this.refSet.add(refKey);
    }
  }

  /**
   * The 'start' method kicks off the traversal of the PDF structure.
   */
  public start(): TreeNode {
    this.pdf.parseStartXRef();
    this.pdf.parse();

    // Start traversal from the root node, which is the Trailer in the cross-reference table.
    console.log("Trailer:", this.xref, this.xref.trailer);
    const root = new TreeNode({
      obj: this.xref.trailer,
      name: "Trailer Dictionary",
      depth: 0,
      walker: this,
    });

    // Begin the walk.
    this.resolve(root);

    return root;
  }
}
