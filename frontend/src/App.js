import React, { useState } from 'react';
import axios from 'axios';
import { FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [includeAlphabets, setIncludeAlphabets] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const generatePassword = async () => {
        setLoading(true);
        setPassword('');
        try {
            const response = await axios.get(`http://localhost:5000/generate-password`, {
                params: {
                    length,
                    alphabets: includeAlphabets,
                    numbers: includeNumbers,
                    symbols: includeSymbols,
                },
            });
            setTimeout(() => {
                setPassword(response.data.password);
                setLoading(false);
                setCopied(false);
            }, 1200);
        } catch (error) {
            console.error('Error generating password:', error);
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div 
            className="container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }}
                className="title"
            >
                🔐 Password Generator
            </motion.h1>
            <motion.input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                min="4"
                max="32"
                className="input-box"
                whileFocus={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" }}
            />

            <div className="options">
                <motion.label className="checkbox" whileTap={{ scale: 0.9 }}>
                    <input type="checkbox" checked={includeAlphabets} onChange={() => setIncludeAlphabets(!includeAlphabets)} />
                    Include Alphabets
                </motion.label>
                <motion.label className="checkbox" whileTap={{ scale: 0.9 }}>
                    <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                    Include Numbers
                </motion.label>
                <motion.label className="checkbox" whileTap={{ scale: 0.9 }}>
                    <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                    Include Symbols
                </motion.label>
            </div>

            <motion.button
                onClick={generatePassword}
                className="generate-btn"
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.8)" }}
                whileTap={{ scale: 0.9 }}
            >
                ✨ Generate Password
            </motion.button>

            {loading && (
                <motion.p 
                    className="loading-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    🔄 Generating...
                </motion.p>
            )}

            {password && !loading && (
                <motion.div 
                    className="password-container"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.p className="password-text" animate={{ opacity: [0, 1], transition: { duration: 1 } }}>
                        {password}
                    </motion.p>
                    <motion.button 
                        className="copy-btn" 
                        onClick={copyToClipboard} 
                        whileHover={{ scale: 1.1, backgroundColor: "#00FFCC" }}
                    >
                        <FaCopy /> {copied ? 'Copied!' : 'Copy'}
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}

export default App;
