import { StreamContent, TreeNode } from "@/lib/pdf-walker";
import * as core from "@hyzyla/pdfjs-core";
import { Stream } from "stream";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type DetailProps<T> = {
  node: TreeNode<T>;
};

const STREAM_SYNTAX = `<<
  ...
>>
stream
  ... Stream Contents ...
endstream`;

function DictDetail({ node }: DetailProps<core.Dict>) {
  let syntax = "<< ... >>";
  if (node.name) {
    syntax = `/${node.name} << ... >>`;
  } else if (node.parent?.isArray()) {
    syntax = `[... << ... >> ...]`;
  }
  return (
    <>
      <h1>Dictionary</h1>
      <p>
        Collections of key-value pairs, enclosed in double angle brackets (e.g.,
        &lt;&lt; /Type /Example /Subtype /Type1 &gt;&gt;).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Keys:</h3>
      <ul>
        {node.obj.getKeys().map((key) => (
          <li key={key} className="font-mono">
            {key}
          </li>
        ))}
      </ul>
    </>
  );
}

function ArrayDetail({ node }: DetailProps<any[]>) {
  const syntax = node.name ? `/${node.name} [ ... ]` : `[ ... ]`;
  return (
    <>
      <h1>Array</h1>
      <p>
        Ordered collections of objects, enclosed in square brackets (e.g., [1 2
        3]).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Length:</h3>
      <pre>{node.obj.length}</pre>
    </>
  );
}

function RefDetail({ node }: DetailProps<core.Ref>) {
  const ref = `${node.obj.num} ${node.obj.gen} R`;
  const syntax = node.name ? `/${node.name} ${ref}` : `[... ${ref} ...]`;
  return (
    <>
      <h1>Reference</h1>
      <p>
        It&apos;s a reference to an indirect object in the PDF file (like a
        link)
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Value:</h3>
      <pre>{ref}</pre>
    </>
  );
}

function StreamDetail({ node }: DetailProps<core.BaseStream>) {
  const syntax = node.name ? `/${node.name}\n${STREAM_SYNTAX}` : STREAM_SYNTAX;
  return (
    <>
      <h1>Stream</h1>
      <p>
        A sequence of bytes, usually associated with a dictionary that describes
        its properties.
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Metadata</h3>
      <ul>
        {node.obj.dict.getKeys().map((key) => {
          const value = node.obj.dict.getRaw(key);
          let valueStr = value.toString(); // todo: better value of dict key

          return (
            <li key={key} className="font-mono">
              {key}: {valueStr}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function StreamContentDetail({ node }: DetailProps<StreamContent>) {
  return (
    <>
      <h1>Stream Content</h1>
      <p>It&apos;s a actual content of a stream</p>
    </>
  );
}

function NameDetail({ node }: DetailProps<core.Name>) {
  const syntax = node.name
    ? `/${node.name} /${node.obj.name}`
    : `[... /${node.obj.name} ...]`;
  return (
    <>
      <h1>Name</h1>
      <p>A identifier that begins with a / (e.g., /Name).</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Value:</h3>
      <pre>{node.obj.name.replace(/^\//, "")}</pre>
    </>
  );
}

function NumberDetail({ node }: DetailProps<number>) {
  const syntax = node.name
    ? `/${node.name} ${node.obj}`
    : `[... ${node.obj} ...]`;
  return (
    <>
      <h1>Number</h1>
      <p>
        Integer numbers (e.g., 123) or floating-point numbers (e.g., 3.141).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Value:</h3>
      <pre>{node.obj.toString()}</pre>
    </>
  );
}

function StringDetail({ node }: DetailProps<string>) {
  const str = node.obj;
  let strExample = str;
  if (strExample.length > 20) {
    strExample = strExample.slice(0, 25) + " ... ";
  }
  strExample = strExample.replace(/([()\\])/g, "\\$1");

  const syntax = node.name
    ? `/${node.name} (${strExample})`
    : `[... (${strExample}) ...]`;

  // TODO: escape string
  return (
    <>
      <h1>String</h1>
      <p>
        Sequences of characters, enclosed in parentheses (e.g., (Hello, World)).
      </p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Value:</h3>
      <Tabs defaultValue="unicode">
        <TabsList>
          <TabsTrigger value="unicode">Unicode</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="hex">Hex</TabsTrigger>
        </TabsList>
        <TabsContent value="unicode">
          <pre className="m-0">{str}</pre>
        </TabsContent>
        <TabsContent value="base64">
          <pre>{btoa(str)}</pre>
        </TabsContent>
        <TabsContent value="hex">
          <pre>{str.split("").map((c) => c.charCodeAt(0).toString(16))}</pre>
        </TabsContent>
      </Tabs>
    </>
  );
}

function BooleanDetail({ node }: DetailProps<boolean>) {
  const syntax = node.name
    ? `/${node.name} ${node.obj}`
    : `[... ${node.obj} ...]`;
  return (
    <>
      <h1>Boolean</h1>
      <p>True or false values (true or false).</p>
      <h3>PDF Syntax:</h3>
      <pre>{syntax}</pre>
      <h3>Value:</h3>
      <pre>{node.obj.toString()}</pre>
    </>
  );
}

export function PDFTreeRowDetails(props: { node: TreeNode }) {
  const node = props.node;
  const getDtails = () => {
    if (node.isDict()) {
      return <DictDetail node={node} />;
    } else if (node.isArray()) {
      return <ArrayDetail node={node} />;
    } else if (node.isRef()) {
      return <RefDetail node={node} />;
    } else if (node.isStream()) {
      return <StreamDetail node={node} />;
    } else if (node.isStreamContent()) {
      return <StreamContentDetail node={node} />;
    } else if (node.isName()) {
      return <NameDetail node={node} />;
    } else if (node.isNumber()) {
      return <NumberDetail node={node} />;
    } else if (node.isString()) {
      return <StringDetail node={node} />;
    } else if (node.isBoolean()) {
      return <BooleanDetail node={node} />;
    } else {
      return <div>Unknown type</div>;
    }
  };
  return (
    // break words in pre
    <div className="p-4 prose prose-pre:whitespace-pre-wrap prose-pre:break-words">
      {getDtails()}
    </div>
  );
}
