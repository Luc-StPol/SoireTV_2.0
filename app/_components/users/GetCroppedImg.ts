import { Area } from 'react-easy-crop';

export default function getCroppedImg(
  imageSrc: string,
  crop: Area,
  asCanvas = false,
  p0: string,
): Promise<HTMLCanvasElement | string | null> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context is not available'));
        return;
      }

      canvas.width = crop.width;
      canvas.height = crop.height;

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
      );

      if (asCanvas) {
        resolve(canvas);
      } else {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(URL.createObjectURL(blob));
        }, 'image/jpeg');
      }
    };

    image.onerror = (error) => reject(error);
  });
}
