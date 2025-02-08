const {hash,compare} = require("bcrypt");


const doHash = (value,saltValue)=>{
    const result = hash(value,saltValue)
    return result
}

module.exports = {
    doHash
}