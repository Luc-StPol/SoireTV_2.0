import { Area } from 'react-easy-crop';

export default function getCroppedImg(
  imageSrc: string,
  crop: Area,
  asCanvas = false,
  _p0: string,
): Promise<Blob> {
  // Retourne toujours un Blob
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

      // Dessiner l'image recadrée sur le canvas
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
        // Si asCanvas est true, retourne le canvas mais converti en Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob); // Retourne un Blob
        }, 'image/jpeg');
      } else {
        // Si asCanvas est false, retourne directement un Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob); // Retourne un Blob
        }, 'image/jpeg');
      }
    };

    image.onerror = (error) => reject(error);
  });
}
