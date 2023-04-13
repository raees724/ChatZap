export const getCroppedImg = async (imageSrc, crop, aspectRatio) => {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.src = imageSrc;
    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;
    const ctx = canvas.getContext('2d');
  
    return new Promise(resolve => {
      image.onload = () => {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelCrop = {
          x: crop.x * scaleX,
          y: crop.y * scaleY,
          width: crop.width * scaleX,
          height: crop.height * scaleY
        };
        const ratio = aspectRatio ? aspectRatio : crop.width / crop.height;
        canvas.width = crop.width || 0;
        canvas.height = crop.height || 0;
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        canvas.toBlob(blob => {
          resolve(new File([blob], 'image.png', { type: 'image/png', lastModified: Date.now() }));
        }, 'image/png');
      };
    });
  };