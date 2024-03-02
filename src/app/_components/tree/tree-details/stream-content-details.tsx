import { MdFileDownload } from "react-icons/md";

import { DetailProps } from "@/app/_components/tree/tree-details/_types";
import { Button } from "@/components/button";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { StreamContent } from "@/lib/pdf-walker";
import { frmoByteArrayToUnicode, fromByteArrayToBase64, fromByteArrayToHexString } from "@/lib/utils";

function TrueTypeContext({ node }: DetailProps<StreamContent>) {
  const onDownloadClick = () => {
    const stream = node.obj.stream;
    stream.reset();
    const bytes = stream.getBytes();
    const blob = new Blob([bytes], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "font.ttf";
    link.click();
  };

  return (
    <>
      <h3>Context</h3>
      <p>
        It&apos;s a TrueType font file. Currently, we don&apos;t support rendering content of TrueType font files. You
        can download it and open it in your favorite font editor.
      </p>
      <Button onClick={onDownloadClick} className="flex flex-row gap-2">
        <MdFileDownload />
        Download
      </Button>
    </>
  );
}

function Context({ node }: DetailProps<StreamContent>) {
  const path = node.path;
  if (path.endsWith(".FontFile2.")) {
    return <TrueTypeContext node={node} />;
  }
  return null;
}

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
          <h3>Index</h3>
          <pre>{node.index}</pre>
        </>
      )}
      <Context node={node} />
      <h3>Content</h3>
      <Tabs defaultValue="unicode">
        <TabsList>
          <TabsTrigger value="unicode">Unicode</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="hex">Hex</TabsTrigger>
        </TabsList>
        <TabsContent value="unicode">
          <CodeBlock code={frmoByteArrayToUnicode(bytes)} />
        </TabsContent>
        <TabsContent value="base64">
          <CodeBlock code={fromByteArrayToBase64(bytes)} />
        </TabsContent>
        <TabsContent value="hex">
          <CodeBlock code={fromByteArrayToHexString(bytes)} />
        </TabsContent>
      </Tabs>
      <h3>Path</h3>
      <pre>{node.path}</pre>
    </>
  );
}
