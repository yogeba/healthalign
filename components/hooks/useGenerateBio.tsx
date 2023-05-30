import { useState, useEffect } from "react";

interface UseGenerateBioProps {
  prompt: string;
  updateText: (text: any) => void;
}

const useGenerateBio = ({ prompt, updateText }: UseGenerateBioProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const generateBio = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseBody = await response.json();

      if (!responseBody.data) {
        return;
      }

      const reader = responseBody.data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateText((prev: any) => prev + chunkValue);
      }
    } catch (error) {
      console.error("Error generating bio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateText(""); // Reset generated text when the prompt changes
  }, [prompt, updateText]);

  return { loading, generateBio };
};

export default useGenerateBio;
