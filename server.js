const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

app.get('/', async (req, res) => {
    const message = req.query.msg;

    if (!message) {
        return res.send('<h1>No message provided.</h1>');
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = await response.text();

        res.send(`<h1>${text}</h1>`);
    } catch (error) {
        res.send(`<h1>Error: ${error.message}</h1>`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
