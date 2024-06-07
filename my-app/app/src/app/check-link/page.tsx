"use client"
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ApiResponse = {
  message: string;
};

export default function CheckLink() {
  const [website, setWebsite] = useState('');
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post<ApiResponse>('http://localhost:5000/checkLink', { text: website });
      setResult(response.data);
    } catch (error) {
      console.error('Error checking website:', error);
      setResult({ message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Website Legitimacy Checker
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter a website link to check if it's legitimate or fake.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="website">
              Website Link
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                className="block w-full pr-10 sm:text-sm rounded-md"
                id="website"
                name="website"
                placeholder="https://example.com"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check'}
          </Button>
        </form>
        {result && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:border-gray-800">
              {result.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
