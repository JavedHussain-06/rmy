import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";

const UploadPhotoCard = forwardRef(({ onFileSelect, error }, ref) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Expose method to open file dialog
  useImperativeHandle(ref, () => ({
    openFileDialog: () => {
      fileInputRef.current?.click();
    },
  }));

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onFileSelect?.(file);
    }
  };

  const handleCancelUpload = (e) => {
    e.stopPropagation();
    setPreviewUrl(null);
    onFileSelect?.(null);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-[23.125rem] h-[9.43rem] rounded-[0.7rem] border-2 flex items-center justify-center cursor-pointer transition ${
          error ? "border-red-700 bg-[#f8f6f6]" : "border-dashed border-[#00000026]"
        }`}
        onClick={handleUploadClick}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative w-full h-full">
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover rounded-[0.7rem]"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-gray-100 transition"
              onClick={handleCancelUpload}
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#0153AB]">
            <img
              src="/assets/frame.svg"
              alt="upload"
              className="w-4 h-4"
            />
            <span className="text-[0.9rem] font-medium">Upload Photo</span>
          </div>
        )}
      </div>
    </div>
  );
});

export default UploadPhotoCard;
