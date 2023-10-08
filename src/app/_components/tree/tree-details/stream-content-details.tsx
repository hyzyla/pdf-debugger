import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { StreamContent } from "@/lib/pdf-walker";
import { frmoByteArrayToUnicode, fromByteArrayToBase64, fromByteArrayToHexString } from "@/lib/utils";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";

export function StreamContentDetails({ node }: DetailProps<StreamContent>) {
  const stream = node.obj.stream;
  stream.reset();

  let bytes = stream.getBytes();
  if (stream.constructor.name === "JpegStream") {
    // @ts-ignore
    bytes = stream.bytes;
  }

  return (
    <>
      <h1>Stream Content</h1>
      <p>It&apos;s an actual content of a stream</p>
      {node.index !== undefined && (
        <>
          <h3>Index:</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <h3>Content:</h3>
      <Tabs defaultValue="base64">
        <TabsList>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="hex">Hex</TabsTrigger>
          <TabsTrigger value="unicode">Unicode</TabsTrigger>
        </TabsList>
        <TabsContent value="base64">
          <CodeBlock code={fromByteArrayToBase64(bytes)} />
        </TabsContent>
        <TabsContent value="hex">
          <CodeBlock code={fromByteArrayToHexString(bytes)} />
        </TabsContent>
        <TabsContent value="unicode">
          <CodeBlock code={frmoByteArrayToUnicode(bytes)} />
        </TabsContent>
      </Tabs>
      <h3>Path:</h3>
      <pre>{node.path}</pre>
    </>
  );
}
