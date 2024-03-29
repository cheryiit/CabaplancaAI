require('dotenv').config();
console.log(process.env.GPT_API_KEY);
import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';  
import fetch from 'node-fetch'; // Include node-fetch module for API requests
const app = express();
const PORT = 3000;
app.use(cors());
app.use(json());

// General endpoint for dynamic AI model routing
app.post('/api/message/:aiType', async (req, res) => {
    const { aiType, message } = req.body;
    let apiUrl, apiKey;

    // Set API URL and key based on AI type
    switch (aiType) {
        case 'GPT':
            apiUrl = 'https://api.openai.com/v1/chat/completions';
            apiKey = process.env.GPT_API_KEY;
            break;
        case 'Claude': // For the second AI model
            apiUrl = 'http://example.ai2.api/endpoint';
            apiKey = process.env.CLAUDE_API_KEY;
            break;
        // Add more case blocks to include additional AI models
        default:
            return res.status(400).json({ error: 'Unknown AI type' });
    }

    // Make the request to the API
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: message,
                // Additional required parameters
            }),
        });
        if (!response.ok) throw new Error('Failed to fetch API');
        const data = await response.json();
        
        // For simplicity, directly return the response from the API
        res.json({ reply: data.choices[0].text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching the AI API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
