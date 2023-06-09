const {getOpenAI, getConfiguration} = require('../utils');
const service = require('../service/azure.js')


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
        console.log('请求参数：',options);
        const response =  await openai.createChatCompletion(options)
        const content = response.data?.choices[0]?.message.content
        const url = await service.synthesizer(content)
        return  {content,audioUrl: url}
    } catch (error) {
        console.log('报错了:'+ error);
        return error
    }
}

const test = async ()=>{
    service.tts('你好啊')

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
   test,
   getModelsList
  };
  