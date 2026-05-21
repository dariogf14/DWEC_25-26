const crypto=require('crypto');module.exports=t=>crypto.createHash('md5').update(t).digest('hex');
