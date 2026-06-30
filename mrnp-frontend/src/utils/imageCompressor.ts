/**
 * Utility to compress images client-side using the HTML5 Canvas API.
 * This compresses images into KBs while retaining high visual quality.
 *
 * @param file The original File object uploaded by the user.
 * @param maxWidth The maximum width of the output image. Default is 1920px.
 * @param maxHeight The maximum height of the output image. Default is 1920px.
 * @param quality The compression quality (0.0 to 1.0). Default is 0.8.
 * @returns A promise that resolves to the compressed File object.
 */
export async function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.8
): Promise<File> {
  // If the file is SVG, do not compress (vector graphics)
  if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
    return file;
  }

  // If the file is already small (e.g., under 200KB), bypass compression
  if (file.size <= 200 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions preserving the aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file); // Fallback to original if 2D context is not available
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type.
        // We use 'image/webp' for PNG and WebP to preserve transparency with high compression.
        // We fall back to 'image/jpeg' for JPG/JPEG and others.
        let outputType = 'image/jpeg';
        let extension = '.jpg';

        if (file.type === 'image/png') {
          outputType = 'image/webp';
          extension = '.webp';
        } else if (file.type === 'image/webp') {
          outputType = 'image/webp';
          extension = '.webp';
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            // Generate a filename with the correct extension
            const originalNameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
            const compressedName = `${originalNameWithoutExt}${extension}`;
            
            const compressedFile = new File([blob], compressedName, {
              type: blob.type,
              lastModified: Date.now(),
            });

            // Only return the compressed file if it actually reduces size
            if (compressedFile.size < file.size) {
              console.log(
                `Compressed "${file.name}" from ${(file.size / 1024).toFixed(1)} KB to ${(compressedFile.size / 1024).toFixed(1)} KB (type: ${blob.type})`
              );
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          outputType,
          quality
        );
      };

      img.onerror = () => resolve(file);
    };

    reader.onerror = () => resolve(file);
  });
}
