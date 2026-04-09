import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  

  const sendMessage = async () => {
    // Prevent empty or whitespace messages
    if (!message.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: message,
      });

      // Use functional update to avoid stale state bugs
      setChat((prevChat) => [
        ...prevChat,
        {
          user: message,
          bot: res.data.reply, // make sure backend sends { reply: "..." }
        },
      ]);

      setMessage(""); // clear input
    } catch (err) {
      console.error(err);
      alert("Server not responding");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Chatbot</h1>

      {/* Chat Messages */}
      {chat.map((c, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <p><b>You:</b> {c.user}</p>
          <p><b>Bot:</b> {c.bot}</p>
        </div>
      ))}

      {/* Input + Button */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        style={{ padding: "8px", width: "250px" }}
      />

      <button
        onClick={sendMessage}
        style={{ padding: "8px 12px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;