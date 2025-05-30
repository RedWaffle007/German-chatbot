import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hallo! Wie kann ich dir helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Text-to-speech function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak all bot responses
  const speakAllBotMessages = () => {
    const botTexts = messages.filter(m => m.sender === 'bot').map(m => m.text).join(' ');
    if (botTexts) speak(botTexts);
  };

  // Send message handler
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input })
      });
      const data = await response.json();
      setMessages((msgs) => [...msgs, { sender: 'bot', text: data.text }]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'Fehler beim Verbinden mit dem Server.' }
      ]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div style={styles.bgWrapper}>
      <div style={styles.container}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          German Chatbot
          <button
            title="Alle Bot-Antworten vorlesen"
            onClick={speakAllBotMessages}
            style={styles.audioButton}
          >
            🔊
          </button>
        </h2>
        <div style={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? '#daf1da' : '#e0e0e0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <b>{msg.sender === 'user' ? 'Du' : 'Bot'}:</b> {msg.text}
              {msg.sender === 'bot' && (
                <button
                  onClick={() => speak(msg.text)}
                  title="Vorlesen"
                  style={{ ...styles.audioButton, marginLeft: 6 }}
                >
                  🔊
                </button>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ ...styles.message, fontStyle: 'italic' }}>Bot schreibt...</div>
          )}
        </div>
        <form onSubmit={sendMessage} style={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Schreibe deine Nachricht..."
            style={styles.input}
            disabled={loading}
          />
          <button type="submit" style={styles.button} disabled={loading || !input.trim()}>
            Senden
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  bgWrapper: {
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    background: `url("/images/BMW.jpg") center center/cover no-repeat fixed`
    // Make sure BMW.jpg is in public/images/
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 400,
    margin: '40px auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    fontFamily: 'Arial, sans-serif',
    background: 'rgba(250,250,250,0.92)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    backdropFilter: 'blur(2px)'
  },
  chatBox: {
    minHeight: 300,
    maxHeight: 400,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 16,
    padding: 8,
    background: '#fff',
    borderRadius: 6,
    border: '1px solid #eee'
  },
  message: {
    padding: '8px 12px',
    borderRadius: 8,
    maxWidth: '80%',
    marginBottom: 2
  },
  form: {
    display: 'flex',
    gap: 8
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: '1px solid #ccc'
  },
  button: {
    padding: '8px 16px',
    borderRadius: 6,
    border: 'none',
    background: '#4caf50',
    color: '#fff',
    cursor: 'pointer'
  },
  audioButton: {
    background: 'none',
    border: 'none',
    fontSize: 22,
    cursor: 'pointer',
    marginLeft: 8
  }
};

export default ChatBot;
