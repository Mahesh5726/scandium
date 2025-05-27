import { Mistral } from "@mistralai/mistralai";
import { mistralApiKey } from "./utils/environment/index.js";

const mistral = new Mistral({
  apiKey: mistralApiKey,
});

const response = await mistral.chat.complete({
  model: "mistral-large-latest",
  messages: [
    {
      role: "user",
      content: "Tell me a little bit about the PM of India",
    },
  ],
});

if (response.choices && response.choices.length > 0) {
  console.log(response.choices[0].message.content);
}
