'use client';

import React, { useState } from 'react';

import ImageCropper from './ImageCropper';

interface propsType {
  OnUserPpChange: (croppedImage: string) => void;
}

export default function EditUserPp(props: propsType) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>(String);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImg: string) => {
    setCroppedImage(croppedImg);
    props.OnUserPpChange(croppedImage);
  };

  return (
    <div>
      {!selectedImage ? (
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      ) : (
        <div>
          <ImageCropper
            imageSrc={selectedImage}
            onCropComplete={handleCropComplete}
          />
        </div>
      )}
    </div>
  );
}
