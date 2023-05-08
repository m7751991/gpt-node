const service = require("../service/openaiApi")

const createCompletion = async (ctx) => {
  const {config,options} = ctx.request.body
  const {model} = options;
  let response
  switch (model) {
    case 'text-davinci-003':
       response = await service.textDavinci(ctx,{config,options})
      break;
    case 'gpt-3.5-turbo':
       response =  await service.model3(ctx,{config,options})
      break;
    default:
      response = {
        msg:'没有匹配到相关模型，请检查model参数！',
        status:400,
      }
      break;
  }
     ctx.body = {
      data: response
    };
};



const getModelsList = async (ctx)=>{
  const {config} = ctx.request.body
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

const setApiKey = async (ctx) =>{
  const {key} = ctx.request.body

}

module.exports = {
  createCompletion,
  getModelsList,
  setApiKey
};
