import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import useStore from "../../store";
import DropArea from "../DropArea";
import UploadImagesView from "../UploadImagesView";

export default function Main() {
  const [images, setImages] = useState<Array<File>>([]);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    images.forEach((file) => {
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

  const handleDeletImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1, display: "flex", flexDirection: "column" }}>
      <DropArea setImages={setImages} setDownloadUrl={setDownloadUrl} />

      <UploadImagesView images={images} onDelete={(i) => handleDeletImage(i)} />

      <Box component={"form"} onSubmit={handleSubmit} sx={{ flexGrow: 2 }}>
        <TextField label="Quality" type="number" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} fullWidth margin="normal" />
        <TextField label="Effort" type="number" value={effort} onChange={(e) => setEffort(parseInt(e.target.value))} fullWidth margin="normal" />
        <FormControlLabel control={<Checkbox checked={lossless} onChange={(e) => setLossless(e.target.checked)} />} label="Lossless" />
        <FormControlLabel control={<Checkbox checked={keepMetadata} onChange={(e) => setKeepMetadata(e.target.checked)} />} label="Keep Metadata" />
        <Select value={chromaSubsampling} onChange={(e: SelectChangeEvent) => setChromaSubsampling(e.target.value as "4:4:4" | "4:2:0")} fullWidth>
          <MenuItem value="4:4:4">4:4:4</MenuItem>
          <MenuItem value="4:2:0">4:2:0</MenuItem>
        </Select>

        <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 2 }}>
          {loading ? "Compressing..." : "Upload and Compress"}
        </Button>

        {downloadUrl && (
          <Box mt={2} textAlign="center">
            <a href={downloadUrl} download="compressed_images.zip">
              Download Compressed Images
            </a>
          </Box>
        )}
      </Box>
    </Box>
  );
}
