import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { FileWithPath, useDropzone } from "react-dropzone";
import { FileUploaderProps } from "@/types";

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>(); //to upload multiple files
  const [isFileURL, setisFileURL] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setisFileURL(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {isFileURL ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img
              src={isFileURL}
              alt="uploaded-file"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">
            Drag or drop to replace the file
          </p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="file-upload-icon"
            width={96}
            height={77}
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG,PNG or JPG</p>
          <Button className="shad-button_dark_4">Upload from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
