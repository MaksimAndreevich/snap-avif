import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <div>
      <h1>Image Compressor</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
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
    </div>
  );
};

export default App;
