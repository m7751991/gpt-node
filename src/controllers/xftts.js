const fs = require('fs');
const path = require("path")

const getAudio = (ctx) => {
  // const name = ctx.request.query.name;  
  const filePath = path.join(__dirname, '../public/audio/test.mp3') // replace with the actual file path
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    ctx.body = {
      url:'http://156.236.73.178:3005/audio/test.mp3',
      status:200
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
        ctx.body = {
            message:'文件还未生成',
            status:200
          }
    } else {
      ctx.body = {
        message:'error',
        status:500
      }
    }
  }
};

module.exports = {
  getAudio,
};