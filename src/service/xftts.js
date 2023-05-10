const  xfwss  = require('../utils/xfwss')
const {send} = xfwss

const tts = (value)=>{
  send(value)
}


module.exports = {
    tts
  };
  