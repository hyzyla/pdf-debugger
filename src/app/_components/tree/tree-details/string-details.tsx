import { DetailProps } from "@/app/_components/tree/tree-details/_types";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { fromStringToBase64, fromStringToHexString } from "@/lib/utils";

export function StringDetails({ node }: DetailProps<string>) {
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
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Value:</h3>
      <Tabs defaultValue="unicode">
        <TabsList>
          <TabsTrigger value="unicode">Unicode</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="hex">Hex</TabsTrigger>
        </TabsList>
        <TabsContent value="unicode">
          <CodeBlock code={str} />
        </TabsContent>
        <TabsContent value="base64">
          <CodeBlock code={fromStringToBase64(str)} />
        </TabsContent>
        <TabsContent value="hex">
          <CodeBlock code={fromStringToHexString(str)} />
        </TabsContent>
      </Tabs>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
