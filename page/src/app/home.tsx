import { Button } from "@/components/ui/button"

export function Component() {
  return (
    <div className="pt-16 pb-10 flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#f0e6d2] to-[#d6c8b3] px-4 md:px-6">
      <div className="max-w-2xl w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#4a3d2e] sm:text-4xl">Secure Encryption/Decryption</h1>
          <p className="mt-3 text-lg text-[#6b5b46]">
            Protect your sensitive data with our powerful encryption tool. Encrypt text or images and securely share
            them with others.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#4a3d2e]" htmlFor="text">
                Text
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  className="text-black p-5 block w-full rounded-md border-[#d6c8b3] focus:ring-[#8c7a62] focus:border-[#8c7a62] sm:text-sm"
                  id="text"
                  placeholder="Enter your text here"
                  rows={3}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4a3d2e]" htmlFor="image">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[#d6c8b3] border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadIcon className="mx-auto h-12 w-12 text-[#8c7a62]" />
                  <div className="flex text-sm text-[#6b5b46]">
                    <label
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#8c7a62] hover:text-[#4a3d2e] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#8c7a62]"
                      htmlFor="image"
                    >
                      <span>Upload an image</span>
                      <input className="sr-only" id="image" name="image" type="file" />
                    </label>
                  </div>
                  <p className="text-xs text-[#6b5b46]">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              className="inline-flex items-center px-4 py-2 border border-gray-200 border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#8c7a62] hover:bg-[#6b5b46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3d2e] dark:border-gray-800"
              type="button"
            >
              Encrypt
            </Button>
            <Button
              className="inline-flex items-center px-4 py-2 border border-gray-200 border-[#8c7a62] text-sm font-medium rounded-md text-[#8c7a62] bg-white hover:bg-[#f0e6d2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3d2e] dark:border-gray-800"
              type="button"
            >
              Decrypt
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-medium text-[#4a3d2e]">Encrypted/Decrypted Text</h2>
              <p className="mt-2 text-[#6b5b46]">The encrypted or decrypted text will be displayed here.</p>
              <div className="mt-4 bg-[#f0e6d2] rounded-md p-4 text-[#4a3d2e]">
                <pre className="whitespace-pre-wrap break-words">Your encrypted/decrypted text will appear here.</pre>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium text-[#4a3d2e]">Encrypted/Decrypted Image</h2>
              <p className="mt-2 text-[#6b5b46]">The encrypted or decrypted image will be displayed here.</p>
              <div className="mt-4 bg-[#f0e6d2] rounded-md p-4 flex justify-center items-center">
                <img
                  alt="Encrypted/Decrypted Image"
                  className="max-w-full h-auto"
                  height={300}
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
