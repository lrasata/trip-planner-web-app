import React, { useRef } from "react";
import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface ImagePickerProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ImagePicker = ({ handleFileChange }: ImagePickerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        hidden
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        startIcon={<ImageIcon />}
      >
        Select Image
      </Button>
    </>
  );
};

export default ImagePicker;
