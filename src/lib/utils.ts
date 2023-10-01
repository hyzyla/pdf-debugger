import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as base64 from "base64-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromStringToByteArray(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

export function fromByteArrayToBase64(bytes: Uint8Array): string {
  return base64.fromByteArray(bytes);
}

export function fromByteArrayToHexString(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function frmoByteArrayToUnicode(bytes: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}

export function fromStringToBase64(str: string): string {
  const bytes = fromStringToByteArray(str);
  return fromByteArrayToBase64(bytes);
}

export function fromStringToHexString(str: string): string {
  const bytes = fromStringToByteArray(str);
  return fromByteArrayToHexString(bytes);
}
