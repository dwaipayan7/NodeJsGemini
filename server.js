import express from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
config()

const app = express();

const port = 3000;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

app.post("/generate", async (req, res) =>{

    try {
        const {prompt} = req.body;

        if (!prompt) {
             return res.status(400).json({error: "Prompt is required"});
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;

        return res.json({response: response.text()})

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
        
    }

});


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})