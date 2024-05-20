import Image from "next/image";
import { useCallback } from "react";

const ImageUpload = ({ droppedImages, setDroppedImages }) => {
  const handleDragEvent = (event) => event.preventDefault();

  const processFiles = (files) => {
    const uniqueFiles = files.filter((file) => !droppedImages.includes(URL.createObjectURL(file)));

    uniqueFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        if (!droppedImages.includes(imageUrl)) setDroppedImages((prevImages) => [...prevImages, imageUrl]);
      };
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleRemoveImage = (imageUrl) => setDroppedImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
  const preventImageDrag = useCallback((e) => e.preventDefault(), []);

  return (
    <div className="flex flex-col items-center gap-3">
      <input type="file" accept="image/*" multiple onChange={handleChange} className="overflow-hidden w-[121px]" />
      <h6>------OR------</h6>
      <div onDragOver={handleDragEvent} onDragLeave={handleDragEvent} onDrop={handleDrop} className="border border-red-500 border-dashed p-4 rounded h-60 flex flex-wrap justify-center items-center overflow-auto">
        {!!droppedImages.length ? (
          droppedImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <Image width={100} height={100} src={imageUrl} draggable={false} onDragStart={preventImageDrag} alt="Image" className="mr-2 overflow-y-scroll select-none rounded-md" />
              <button onClick={() => handleRemoveImage(imageUrl)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                &times;
              </button>
            </div>
          ))
        ) : (
          <p>Drag and drop images here</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
