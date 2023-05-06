const ai = require("openai");
const { Configuration, OpenAIApi }  = ai

const createCompletion = async (ctx) => {
  const {config,options} = ctx.request.body
  try {
    const configuration = new Configuration(config);
    const openai = new OpenAIApi(configuration);
    const response =  await openai.createCompletion(options)
     ctx.body = {
      data: response.data
    };
  } catch (error) {
    console.log("error:"+ error);
     ctx.body = {
      data: error
    };
  }
};

module.exports = {
  createCompletion
};
