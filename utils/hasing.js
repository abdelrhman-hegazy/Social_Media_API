const {hash,compare} = require("bcrypt");


const doHash = (value,saltValue)=>{
    const result = hash(value,saltValue)
    return result
}

const doCompare = (value,hashedValue) =>{
    const result = compare(value,hashedValue);
    return result
}
module.exports = {
    doHash,
    doCompare
}