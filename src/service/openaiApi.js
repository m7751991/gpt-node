const {getOpenAI, getConfiguration, generatorParams} = require('../utils');


const textDavinci =  async (ctx,{config,options})=>{
    try {
        const configuration = getConfiguration(config)
        const openai = getOpenAI(configuration);
        const response =  await openai.createCompletion(options)
        return response.data;
    } catch (error) {
        console.log(error);
        return error
    }
}
const model3 =  async (ctx,{config,options})=>{
    try {
        const configuration = getConfiguration(config)
        const openai = getOpenAI(configuration);
        const params = generatorParams(options)
        console.log(params,'????');
        const response =  await openai.createChatCompletion(params)
        return response.data;
    } catch (error) {
        console.log(error);
        return error
    }
}


const getModelsList = async (ctx,{config})=>{
    try {
      const configuration = getConfiguration(config)
      const openai = getOpenAI(configuration);
      const response = await openai.listModels(config)
      return response
    } catch (error) {
      console.log(error,'出错了');
      return error
    }
  }


module.exports = {
   model3,
   textDavinci,
   getModelsList
  };
  