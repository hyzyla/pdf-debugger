export async function loadPdfExample(): Promise<Uint8Array> {
  const response = await fetch("/test.pdf");
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
