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

const generatorParams = (value)=>{
    const {messages} = value
    let prevContent = '';
    const transformedArr = messages.map((obj) => {
    const content = prevContent +`Q: ${obj.question} A: ${obj.answer}`;
       prevContent = content;
       return { role: 'user', content };
    });
    value.messages =transformedArr
    // console.log(transformedArr,'transformedArr');
    return value;
}

module.exports= {
    getConfiguration,
    getOpenAI,
    generatorParams
}