const dialogflow = require('dialogflow');
const uuid = require('uuid');
const credentials = require("C:\\Users\\79889\\Desktop\\server\\vasilisa-bnyu-4f8fbac1f325.json");
const express = require('express');

async function runSample(messageText,projectId = 'vasilisa-bnyu') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
  credentials: credentials
});
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: messageText,
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}
var app = express();
app.get("/get", function(req,res){
	runSample(req.query.message).then(function(err,mes){
		res.send(err);
	})
})
app.listen(3000);