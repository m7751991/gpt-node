const ai = require("openai");
const { Configuration, OpenAIApi }  = ai
const keyMap = new Map();
const OpenAIApiMap = new WeakMap()



const getConfiguration = (config)=>{
    if (keyMap.get(config.apiKey)) {
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

module.exports= {
    getConfiguration,
    getOpenAI,
}