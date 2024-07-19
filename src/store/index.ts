import { create } from "zustand";

interface IMainStore {
  quality: number;
  effort: number;
  lossless: boolean;
  keepMetadata: boolean;
  chromaSubsampling: string;

  setQuality: (quality: number) => void;
  setEffort: (effort: number) => void;
  setLossless: (lossless: boolean) => void;
  setKeepMetadata: (keepMetadata: boolean) => void;
  setChromaSubsampling: (chromaSubsampling: string) => void;
}

const useStore = create<IMainStore>()((set) => ({
  quality: 50,
  effort: 4,
  lossless: false,
  keepMetadata: false,
  chromaSubsampling: "4:4:4",

  setQuality: (quality) => set((state) => ({ quality: quality })),
  setEffort: (effort) => set((state) => ({ effort: effort })),
  setLossless: (lossless) => set((state) => ({ lossless: lossless })),
  setKeepMetadata: (keepMetadata) => set((state) => ({ keepMetadata: keepMetadata })),
  setChromaSubsampling: (chromaSubsampling) => set((state) => ({ chromaSubsampling: chromaSubsampling })),
}));

export default useStore;
