import React, { useState } from "react";
const API = process.env.REACT_APP_API_URL || "";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const call = async () => {
    const r = await fetch(\`\${API}/chat\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const j = await r.json();
    setReply(j.reply);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>LangChain Studio</h1>
      <textarea
        rows={4}
        cols={50}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={call}>Send</button>
      {reply && <pre style={{ background: "#f4f4f4", padding: 10 }}>{reply}</pre>}
    </div>
  );
}
