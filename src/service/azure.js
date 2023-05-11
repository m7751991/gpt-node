const path = require('path');
const readline = require('readline');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
require('dotenv').config();


const subscriptionKey = process.env.AZURE_KEY;
const serviceRegion = process.env.AZURE_REGION; // e.g., "westus"

const synthesizer = (text) => {
  console.log(text,'texttexttexttext');
    return new Promise((resolve,reject)=>{
       const filteName = new Date().getTime()+'.mp3'
       const filePath= path.join(__dirname, '../public/audio/'+filteName);
       const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filePath);
       const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
              speechConfig.speechSynthesisVoiceName = "zh-CN-XiaoxiaoNeural"; 
       let  synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakTextAsync(text,
         (result) => {
           if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
                const url ='http://156.236.73.178:3005/audio/'+filteName
                resolve(url)
            } else {
              console.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you update the subscription info?");
            }
              synthesizer.close();
              synthesizer = undefined;
              reject(result.errorDetails)
            },
            (err) => {
              console.trace("err - " + err);
              synthesizer.close();
              synthesizer = undefined;
         });
        console.log("Now synthesizing to: " + filteName);
      });
};

module.exports = {
  synthesizer,
};

