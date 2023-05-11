// const  xfwss  = require('../utils/xfwss')
const service = require('./azure')


const tts = async (value)=>{
     await service.synthesizer(value)
}


module.exports = {
    tts
  };
  