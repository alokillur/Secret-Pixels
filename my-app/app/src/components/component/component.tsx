import Link from "next/link";
import { Button } from "@/components/ui/button";
import "./style.css";

function ChatbotIcon() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <img
        src="https://th.bing.com/th?id=OIP.eDmVlM1M4HwCRrBBPJX3vwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
        alt="Chatbot Icon"
        className="object-cover rounded-full w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity animate-jump"
      />
    </div>
  );
}

export function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <img
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-[-1]"
        src="/bg.jpeg"
      />
      <div className="flex flex-col items-center gap-6 px-4 sm:px-6 md:px-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-8">
        <Link href="/encrypt">
          <Button className="relative inline-flex h-12 w-48 items-center justify-center rounded-lg bg-gray-900 px-6 py-2 font-medium text-gray-50 shadow-lg shadow-gray-900/50 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950">
            Encrypt
          </Button>
        </Link>
        <Link href="/decrypt">
          <Button className="relative inline-flex h-12 w-48 items-center justify-center rounded-lg bg-gray-900 px-6 py-2 font-medium text-gray-50 shadow-lg shadow-gray-900/50 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950">
            Decrypt
          </Button>
        </Link>
        <Link href="/check-image">
          <Button className="relative inline-flex h-12 w-48 items-center justify-center rounded-lg bg-gray-900 px-6 py-2 font-medium text-gray-50 shadow-lg shadow-gray-900/50 transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950">
            Check Image
          </Button>
        </Link>
      </div>
      <Link href="/chat-bot">
        <ChatbotIcon />
      </Link>
    </div>
  );
}
