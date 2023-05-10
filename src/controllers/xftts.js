const fs = require('fs');

const getAudio = (ctx) => {
  const name = ctx.request.query.name;  
  const filePath = '../public/audio/'+name // replace with the actual file path
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    ctx.body = {
      url:filePath,
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