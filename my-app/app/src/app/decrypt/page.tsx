"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Fe() {
  const [decryptedText, setDecryptedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/decrypt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      setDecryptedText(text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
          Secure Image Decryption
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Unlock the hidden messages within your images with our powerful decryption tool. Simply upload your encrypted
          image and we'll reveal the secret text.
        </p>
      </div>
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="image">
                Upload Encrypted Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <input
                    className="sr-only"
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  {selectedImage ? (
                    <img src={selectedImage} className="mx-auto h-48 w-auto" alt="Uploaded Image" />
                  ) : (
                    <label
                      className="cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      htmlFor="image"
                    >
                      <span>Upload a file</span>
                    </label>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit">
              {loading ? "Decrypting..." : "Decrypt"}
            </Button>
          </form>
        </div>
        {decryptedText && (
          <div className="px-6 py-8 sm:px-10 sm:py-10 bg-gray-100 dark:bg-gray-900">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Decrypted Text</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{decryptedText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
