"use client"
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// export default function Enc() {
//   const [encryptedImage, setEncryptedImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [imageUploaded, setImageUploaded] = useState(false);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     setLoading(true);
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     try {
//       const response = await fetch("http://localhost:5000/checkImage", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const encryptedText = await response.text(); // Expecting encrypted text as response
//       setEncryptedImage(encryptedText);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       setImageUploaded(true);
//       const reader = new FileReader();
//       reader.onload = async () => {
//         // You can perform validation here if needed
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center px-4 py-12 md:px-6 lg:px-8">
//       <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
//         <div className="p-6 md:p-8 lg:p-10">
//           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Secure Encryption</h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-8">
//             Encrypt your text and images with our advanced encryption tool.
//           </p>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="image">
//                 Image to Encrypt
//               </label>
//               <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-md p-6">
//                 <input
//                   accept="image/*"
//                   className="sr-only"
//                   id="image"
//                   name="image"
//                   type="file"
//                   onChange={handleImageChange}
//                 />
//                 <label
//                   className="cursor-pointer text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
//                   htmlFor="image"
//                 >
//                   <svg className="h-12 w-12 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                     />
//                   </svg>
//                   <span>Upload Image</span>
//                 </label>
//               </div>
//               {imageUploaded && (
//                 <p className="text-green-600 dark:text-green-400 mt-2">Image uploaded successfully!</p>
//               )}
//             </div>
//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
//               type="submit"
//             >
//               {loading ? 'Encrypting...' : 'Encrypt'}
//             </Button>
//           </form>
//         </div>
        
//         {encryptedImage && (
//           <div className="bg-gray-100 dark:bg-gray-800 p-6 md:p-8 lg:p-10">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Encrypted Output</h2>
//             <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{encryptedImage}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CheckImage() {
  const [checkResult, setCheckResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("http://localhost:5000/checkImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const text = await response.text();
      setCheckResult(text);
    } catch (error) {
      console.error("Error:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setUploadStatus('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl">
          Check Image Content
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Upload an image to check its content. Our tool will analyze the image and provide relevant details.
        </p>
      </div>
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="image">
                Upload Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview && (
                    <img src={imagePreview} className="mx-auto h-48 w-auto" alt="Image Preview" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label
                      className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      htmlFor="image"
                    >
                      <span>{imagePreview ? 'Change image' : 'Upload image'}</span>
                      <input
                        className="sr-only"
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {uploadStatus && (
                <p className="text-green-600 dark:text-green-400">{uploadStatus}</p>
              )}
            </div>
            <Button className="w-full" type="submit">
              {loading ? 'Checking Image...' : 'Check Image'}
            </Button>
          </form>
        </div>
        {checkResult && (
          <div className="px-6 py-8 sm:px-10 sm:py-10 bg-gray-100 dark:bg-gray-900">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Check Result</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {checkResult}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
