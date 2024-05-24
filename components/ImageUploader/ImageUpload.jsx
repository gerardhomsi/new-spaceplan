"use client";

import { useEffect } from "react";
import useImageUpload from "./useImageUpload";

const ImageUpload = ({ onImageFilesChange, imageFiles }) => {
  const { fileHandler, deleteFile } = useImageUpload(onImageFilesChange);
  console.log("INSIDE ImageUpload.JSX", imageFiles);

  useEffect(() => {
    console.log("ImageFiles before form submission:", imageFiles);
    return () => {
      console.log("ImageFiles after form submission:", imageFiles);
    };
  }, [imageFiles]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <input type="file" className="w-[12rem]" multiple onChange={fileHandler} />
        <p className="mr-auto text-sm">{imageFiles.length} file(s) selected</p>
      </div>
      <div className="pt-6 w-full">
        {imageFiles.length > 0 && (
          <ul className="flex flex-col gap-1 max-h-52 overflow-y-auto">
            {imageFiles.map((image, index) => (
              <li className="flex items-center justify-between border p-1 gap-1" key={image.name}>
                <span className="truncate max-w-xs overflow-hidden text-ellipsis">{image.name}</span>
                <button type="button" className="bg-red-500 w-4 h-4 text-white rounded-full flex items-center justify-center" onClick={() => deleteFile(index)}>
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
