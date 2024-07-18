import { CloudUpload } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Dispatch, DragEvent, useState } from "react";
import { StyledDropAreaBox, StyledInput } from "./styles";

interface IDropAreaProps {
  setImages: Dispatch<React.SetStateAction<File[]>>;
  setDownloadUrl: Dispatch<React.SetStateAction<string | null>>;
}

export default function DropArea({ setImages, setDownloadUrl }: IDropAreaProps) {
  const [highlight, setHighlight] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
    setHighlight(false);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    const fiteredByImages = fileArray.filter((file) => file.type.startsWith("image/"));
    setImages(fiteredByImages);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files as FileList);
    setDownloadUrl(null); // Clear previous download URL
  };

  return (
    <StyledDropAreaBox
      className={highlight ? "highlight" : ""}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Typography>Перетащите изображение сюда или</Typography>

      <label htmlFor="file-upload">
        <StyledInput id="file-upload" type="file" multiple accept="image/*" onChange={handleFileChange} />
        <Button variant="contained" component="span" startIcon={<CloudUpload />}>
          Выберите файлы
        </Button>
      </label>
    </StyledDropAreaBox>
  );
}
