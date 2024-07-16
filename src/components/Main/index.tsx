import { Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useStore from "../../store";

export default function Main() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const quality = useStore((state) => state.quality);
  const effort = useStore((state) => state.effort);
  const lossless = useStore((state) => state.lossless);
  const keepMetadata = useStore((state) => state.keepMetadata);
  const chromaSubsampling = useStore((state) => state.chromaSubsampling);

  const setQuality = useStore((state) => state.setQuality);
  const setEffort = useStore((state) => state.setEffort);
  const setLossless = useStore((state) => state.setLossless);
  const setKeepMetadata = useStore((state) => state.setKeepMetadata);
  const setChromaSubsampling = useStore((state) => state.setChromaSubsampling);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    setDownloadUrl(null); // Clear previous download URL
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!files || files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    // Добавляем флаги в formData
    formData.append("quality", quality.toString());
    formData.append("effort", effort.toString());
    formData.append("lossless", lossless.toString());
    formData.append("chromaSubsampling", chromaSubsampling);
    formData.append("keepMetadata", keepMetadata.toString());

    try {
      const response = await axios.post("http://localhost:8000/compress", formData, {
        // https://snap-avif-service.onrender.com
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flexGrow={1} p={1}>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <div>
          <label>Quality:</label>
          <input type="number" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Effort:</label>
          <input type="number" value={effort} onChange={(e) => setEffort(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Lossless:</label>
          <input type="checkbox" checked={lossless} onChange={(e) => setLossless(e.target.checked)} />
        </div>
        <div>
          <label>Chroma Subsampling:</label>
          <select value={chromaSubsampling} onChange={(e) => setChromaSubsampling(e.target.value as "4:4:4" | "4:2:0")}>
            <option value="4:4:4">4:4:4</option>
            <option value="4:2:0">4:2:0</option>
          </select>
        </div>
        <div>
          <label>Keep Metadata:</label>
          <input type="checkbox" checked={keepMetadata} onChange={(e) => setKeepMetadata(e.target.checked)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Compressing..." : "Upload and Compress"}
        </button>
      </form>
      {downloadUrl && (
        <div>
          <a href={downloadUrl} download="compressed_images.zip">
            Download Compressed Images
          </a>
        </div>
      )}
    </Box>
  );
}
