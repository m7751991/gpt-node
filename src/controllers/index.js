const ai = require("openai");
const path = require("path");
const { Configuration, OpenAIApi }  = ai

const getIndex = async (ctx) => {
  
  try {
   console.log(path.join(__dirname, '../public/audio/test.mp3'))
     ctx.body = {
      data: 1321
    };
  } catch (error) {
    console.log("error:"+ error);
     ctx.body = {
      data: error
    };
  }
};

module.exports = {
  getIndex
};




