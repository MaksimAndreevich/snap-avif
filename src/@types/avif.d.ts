declare module "avif" {
  export interface AvifEncodeOptions {
    cqLevel: number;
    cqAlphaLevel?: number;
    tileRowsLog2?: number;
    tileColsLog2?: number;
    speed?: number;
    subsample?: number;
    chromaDeltaQ?: boolean;
    sharpness?: number;
  }

  export interface AvifImage {
    width: number;
    height: number;
    data: Uint8Array;
  }

  export function encode(imageData: ImageData, options: AvifEncodeOptions): Promise<Uint8Array>;

  export function decode(buffer: Uint8Array): Promise<ImageData>;
}
