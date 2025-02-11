import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/upload/uploadToCloudinary"; // Path ke fungsi upload & delete
import { LoaderCircle, Trash } from "lucide-react";

interface Props {
  tokenImage: string;
  setTokenImage: Dispatch<SetStateAction<string>>;
}

const Dropzone = ({ tokenImage, setTokenImage }: Props) => {
  const [loading, setLoading] = useState(false); // Status loading
  const [loadingDelete, setLoadingDelete] = useState(false); // Status loading
  const [error, setError] = useState<string | null>(null); // Pesan error

  // Fungsi validasi file
  const validateFile = async (file: File): Promise<boolean> => {
    const validFormats = ["image/png", "image/jpeg", "image/webp"];
    const maxSize = 4.5 * 1024 * 1024; // 4.5MB

    if (!validFormats.includes(file.type)) {
      setError("Only PNG, JPG, and WEBP formats are supported.");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 4.5MB.");
      return false;
    }

    // Validasi rasio 1:1
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== img.height || img.width < 100) {
          setError("Image must have a 1:1 aspect ratio and minimum width of 100px.");
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        setError("Invalid image file.");
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  // Fungsi yang dijalankan saat file di-drop
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null); // Reset error
      const file = acceptedFiles[0];

      const isValid = await validateFile(file);
      if (!isValid) return; // Jika file tidak valid, hentikan proses

      setLoading(true);
      try {
        // Unggah file ke Cloudinary
        const result = await uploadToCloudinary(acceptedFiles);
        setTokenImage(result.secure_url); // Simpan URL gambar yang diunggah
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload the image. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [setTokenImage]
  );

  // Fungsi untuk menghapus gambar dari Cloudinary
  const handleDeleteImage = async () => {
    if (!tokenImage) return;
    setLoadingDelete(true);
    try {
      await deleteFromCloudinary(tokenImage)
      setTokenImage("")
    } catch (error) {
      console.error("Error deleting file:", error)
      setError("Failed to delete the image. Please try again.")
    } finally {
      setLoadingDelete(false);
    }
  };

  // Konfigurasi Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false, // Hanya satu file yang boleh diunggah
  });

  return (
    <div>
      {/* Render Dropzone hanya jika tidak ada gambar yang diunggah dan tidak dalam proses loading */}
      {!tokenImage && !loading && (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center text-sm w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-all 
          ${isDragActive
              ? "bg-secondary border-foreground/70"
              : "bg-background hover:bg-secondary/50 hover:border-muted-foreground/70"
            }`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            {isDragActive ? (
              <p className="text-foreground font-medium">Drop files here...</p>
            ) : (
              <>
                <p className="text-muted-foreground font-medium">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-sm text-muted-foreground/50">
                  Only images are allowed (e.g. .jpg, .png, .webp)
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tampilkan pesan Loading jika sedang mengunggah */}
      {loading && (
        <div className="mt-4 text-center text-sm font-medium text-foreground h-40 flex justify-center items-center bg-muted-foreground/5 animate-pulse rounded-md">
          Uploading...
        </div>
      )}


      {/* Render pesan error */}
      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

      {/* Render Gambar yang sudah diunggah */}
      {tokenImage && (
        <div className={`mt-4 relative w-fit`}>
          {/* Gambar */}
          <img src={tokenImage} alt="Uploaded" className={`w-40 h-40 object-cover rounded-lg shadow ${loadingDelete ? 'opacity-50' : ''}`} loading="lazy" />

          <button onClick={handleDeleteImage} disabled={loadingDelete} className="absolute top-1 right-1 disabled:opacity-50 bg-red-600 text-white rounded-full p-1 hover:bg-red-700">
            <Trash size={20} />
          </button>
          {loadingDelete && (
            <div className="absolute w-40 h-40 inset-0 flex items-center justify-center">
              <LoaderCircle className="animate-spin" size={36} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
