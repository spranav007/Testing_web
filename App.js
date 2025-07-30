// src/App.js
import React, { useState } from 'react';
import './index.css';

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-6">AI OCR Image Reader</h1>
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
        className="mb-4 text-black"
      />
      
      {image && (
        <div className="w-[300px] h-[300px] overflow-hidden border-2 border-white rounded-xl shadow-lg">
          <img src={image} alt="Preview" className="object-contain w-full h-full" />
        </div>
      )}
    </div>
  );
}

export default App;
