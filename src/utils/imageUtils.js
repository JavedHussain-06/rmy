// utils/imageUtils.js
export const validateAndCompressImage = async (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!validTypes.includes(file.type)) {
    throw new Error("Only JPG and PNG images are allowed.");
  }

  // Optional: compress if needed
  if (file.size > 300 * 1024) {
    const compressed = await compressImage(file, 0.7);
    return compressed;
  }

  return file;
};

export const compressImage = (file, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Compression failed.");
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
  });
};
