"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Enc() {
  const [encryptedImage, setEncryptedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/encrypt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setEncryptedImage(imageUrl);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageUploaded(true);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Secure Encryption</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Encrypt your text and images with our advanced encryption tool.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="text">
                Text to Encrypt
              </label>
              <textarea
                className="p-5 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                id="text"
                name="text"
                placeholder="Enter your text here..."
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="image">
                Image to Encrypt
              </label>
              <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-md p-6">
                <input
                  accept="image/*"
                  className="sr-only"
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
                <label
                  className="cursor-pointer text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                  htmlFor="image"
                >
                  <svg className="h-12 w-12 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <span>Upload Image</span>
                </label>
              </div>
              {imageUploaded && (
                <p className="text-green-600 dark:text-green-400 mt-2">Image uploaded successfully!</p>
              )}
            </div>
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
              type="submit"
            >
              {loading ? 'Encrypting...' : 'Encrypt'}
            </Button>
          </form>
        </div>
        
        {encryptedImage && (
          <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Encrypted Output</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  alt="Encrypted Image"
                  className="w-full h-auto rounded-md"
                  height={300}
                  src={encryptedImage}
                  style={{
                    aspectRatio: "400/300",
                    objectFit: "cover",
                  }}
                  width={400}
                />
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Encrypted Image</p>
              </div>
              <a href={encryptedImage} download="encrypted_image.jpg">
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
                >
                  Download Image
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}