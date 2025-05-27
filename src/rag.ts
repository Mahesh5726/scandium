import { Pinecone } from "@pinecone-database/pinecone";
import { mistralApiKey, pineconeApiKey } from "./utils/environment/index.js";
import { Mistral } from "@mistralai/mistralai";

const query = "Tell me about the top technologist of all time";

const pc = new Pinecone({
  apiKey: pineconeApiKey,
});

const namespace = pc.index("scandium").namespace("messages");

const pineconeResponse = await namespace.searchRecords({
  query: {
    topK: 10,
    inputs: {
      text: query,
    },
  },
  rerank: {
    model: "bge-reranker-v2-m3",
    topN: 5,
    rankFields: ["text"],
  },
});

const technologist = pineconeResponse.result.hits.map((hit) => {
  const fields = hit.fields as {
    text: string;
    name: string;
  }
  return `Name: ${fields.name} | Bio: ${fields.text}`;
})


console.log();



const mistral = new Mistral({
  apiKey: mistralApiKey,
});

const updatedQuery = ` 
## QUERY
${query}
---
## CONTEXT
${technologist.join("\n")}
`;

const mistralResponse = await mistral.chat.complete({
  model: "mistral-large-latest",
  messages: [{ role: "user", content: updatedQuery }],
});

if (mistralResponse.choices && mistralResponse.choices.length > 0) {
  const choice = mistralResponse.choices[0];
  console.log(choice.message.content);
} else {
  console.log("No content");
}