import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Image, ImageContainer, ScrollContainer } from "./styles";

interface IUploadImagesViewProps {
  images: Array<File>;
  onDelete: (index: number) => void;
}

export default function UploadImagesView({ images, onDelete }: IUploadImagesViewProps) {
  return (
    <ScrollContainer>
      {images.map((file, index) => (
        <ImageContainer key={index}>
          <IconButton aria-label="delete" sx={{ position: "absolute", top: 4, right: 4 }} onClick={() => onDelete(index)}>
            <DeleteIcon fontSize="inherit" color="error" />
          </IconButton>
          <Image src={URL.createObjectURL(file)} alt={`upload-${index}`} />
        </ImageContainer>
      ))}
    </ScrollContainer>
  );
}
