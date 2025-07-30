import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";

export default function AzureVisionApp() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [textOutput, setTextOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/extract-text", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setTextOutput(data.text);
    setPreviewUrl(data.outputImage);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <motion.h1 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-indigo-700 mb-6"
      >
        Azure AI Vision Text Reader
      </motion.h1>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <motion.div 
          className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-400 p-6 rounded-xl bg-white"
          whileHover={{ scale: 1.03 }}
        >
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="hidden" 
            id="upload"
          />
          <label htmlFor="upload" className="cursor-pointer text-indigo-600 hover:text-indigo-800 flex items-center gap-2">
            <Upload className="w-5 h-5" /> Choose Image
          </label>

          {previewUrl && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 border rounded-lg overflow-hidden shadow-lg"
            >
              <img src={previewUrl} alt="Uploaded preview" className="max-h-80 object-contain" />
            </motion.div>
          )}

          <Button 
            onClick={handleSubmit} 
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Extract Text"}
          </Button>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg overflow-auto h-[450px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Extracted Text</h2>
          <pre className="whitespace-pre-wrap break-words text-gray-800">{textOutput || "Upload an image and click 'Extract Text' to begin."}</pre>
        </motion.div>
      </div>

      <motion.div
        animate={{ x: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute bottom-8 left-8"
      >
        <img src="/mascot.png" alt="Mascot" className="w-24 h-24" />
      </motion.div>
    </div>
  );
}