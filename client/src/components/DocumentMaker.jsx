import React, { useState } from 'react';
import axios from 'axios';

const DocumentMaker = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleGenerate = async () => {
    const res = await axios.post('/api/pdf/generate', { title, content });
    alert(res.data.message);
  };

  return (
    <div>
      <h1>Legal Documentation Maker</h1>
      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Document Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleGenerate}>Generate Document</button>
    </div>
  );
};

export default DocumentMaker;
