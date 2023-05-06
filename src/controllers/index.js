const ai = require("openai");
const { Configuration, OpenAIApi }  = ai

const getIndex = async (ctx) => {
  try {
    
    const configuration = new Configuration({
      organization: "org-3f09XtCUjvIwyefCFdXqUoTg",
      apiKey: process.env.OPENAI_API_KEY||'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',
    });
    const openai = new OpenAIApi(configuration);
     const prompt =`input:工厂现货PVC充气青蛙夜市地摊热卖充气玩具发光蛙儿童水上玩具
        1. Compose human readable product title used on Amazon in english within 20 words.
        2. Write 5 selling points for the products in Amazon.
        3. Evaluate a price range for this product in U.S.Output the result in json format with three properties called title,selling_pointsand price_range
        请用中文回答我谢谢`
    // const response = await openai.listEngines();
    const response =  await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
        temperature: 0,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["input:"],
    })
     console.log(response,'response')
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
  getIndex
};




