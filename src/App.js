import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+';

    if (charset === '') {
      alert('please select at least one character type.!')
      return;
    }
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }


  return (
    <div className="app">
      <div className="card">
        <h1>🔐 Password Generator</h1>
        <p className="subtitle">Create strong, secure passwords instantly.</p>

        <div className="password-box">
          <input type="text" value={password} readOnly />
          <button onClick={copyToClipboard}>
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>
        </div>

        <div className="options">
          <div>
            <label>Password Length: {length}</label>
            <input
              type="range"
              min="4"
              max="30"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
              />
              Uppercase (A-Z)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
              />
              Lowercase (a-z)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
              />
              Numbers (0-9)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
              />
              Symbols (!@#$%)
            </label>
          </div>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          🔄 Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
