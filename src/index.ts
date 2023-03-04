#!/usr/bin/env node

import dotenv from 'dotenv-safe';
import express from 'express';

import { ChatGPTAPI, SendMessageOptions } from 'chatgpt';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt;
  console.error('this is the request: ', req.body);
  const parentMessageId = req.body.parentMessageId;
  const conversationId = req.body.conversationId;

  var headers = { parentMessageId, conversationId };
  console.log("headers: ", headers);

  try {
    const response = await api.sendMessage(prompt, headers);
    console.error('CHECKING API:', api, response, prompt, headers);
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'An error occurred while processing the request' });
  }
});

app.listen(port, () => {
  console.log(`ChatGPT API server is listening on port ${port}`);
});
