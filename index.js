const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {Configuration, OpenAIApi} = require("openai");

const app =express();

app.use(cors({origin:'https://rudylea.github.io/GPTQuiz/'}));
app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});

const openai =new OpenAIApi(configuration);
app.post("/letschat", async(req,res) => {
    try{
        const { messages } = req.body;
         const response = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages:[
                ...messages
              ],
              max_tokens: 300,
              temperature: 0.4,
              top_p: 1,
              frequency_penalty: 0.75,
              presence_penalty: 0
         });
         return res.status(200).json({
            success: true,
            data: response.data
         });
    } catch(error){
        return res.status(400).json({
            success: false,
            error: error.response
            ? error.response.data
            : "Oups, il y a eu un problème avec le serveur."
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
