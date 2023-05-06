const ai = require("openai");
const { Configuration, OpenAIApi }  = ai
const keyMap = new Map();
const OpenAIApiMap = new WeakMap()


const getConfiguration = (config)=>{
    if (keyMap.get(config.apiKey)) {
      console.log(11321);
      return  keyMap.get(config.apiKey)
    }else {
      const configuration = new Configuration(config);
      keyMap.set(config.apiKey,configuration)
      return configuration
    }
}

const getOpenAI = (configuration)=>{
    if (OpenAIApiMap.get(configuration)) {
      return  OpenAIApiMap.get(configuration)
    }else {
    const openai = new OpenAIApi(configuration);
      OpenAIApiMap.set(configuration,openai)
      return openai
    }
}

const createCompletion = async (ctx) => {
  const {config,options} = ctx.request.body
  try {
    const configuration = getConfiguration(config)
    const openai = getOpenAI(configuration);
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


const getModelsList = async (ctx)=>{
  const {config} = ctx.request.body
  console.log();
  try {
    const configuration = getConfiguration(config)
    const openai = getOpenAI(configuration);
    const response = await openai.listModels(config)
    console.log(response);
    ctx.body = {
      data: response
    };
  } catch (error) {
    console.log(error,'出错了');
  }
}

module.exports = {
  createCompletion,
  getModelsList,
};
