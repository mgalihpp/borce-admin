"use client";

import React from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (results: CloudinaryUploadWidgetResults) => {
    const res = results.info as CloudinaryUploadWidgetInfo;
    onChange(res.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px]">
            <div className="absolute right-0 top-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="size-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collections"
              className="rounded-lg object-contain"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="clx3hjjb" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-grey-1 text-white"
            >
              <Plus className="mr-2 size-4" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
