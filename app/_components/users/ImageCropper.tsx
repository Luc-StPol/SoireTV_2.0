'use client';

import { useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import getCroppedImg from './GetCroppedImg';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void;
}

export default function ImageCropper({
  imageSrc,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [prevCroppedArea, setPrevCroppedArea] = useState<Area | null>(null);

  const handleCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  useEffect(() => {
    if (
      croppedAreaPixels &&
      JSON.stringify(croppedAreaPixels) !== JSON.stringify(prevCroppedArea)
    ) {
      const updateCrop = async () => {
        try {
          const croppedFile = await getCroppedImg(
            imageSrc,
            croppedAreaPixels,
            false,
            'cropped-image.jpg',
          );
          onCropComplete(croppedFile as string); // Appelle la fonction parent avec l'image rognée
          setPrevCroppedArea(croppedAreaPixels); // Mémorise la nouvelle zone
        } catch (error) {
          console.error("Erreur lors du recadrage de l'image :", error);
        }
      };
      updateCrop();
    }
  }, [croppedAreaPixels, prevCroppedArea, imageSrc, onCropComplete]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
    </div>
  );
}
