const fs = require('fs')



//get the user data from json file
const getUserDataRandom = () => {
    const jsonData = fs.readFileSync('DataApi.json')
    return JSON.parse(jsonData)    
}

module.exports.getAllDataRandom = (req, res) => {
    const users = getUserDataRandom()
    var user= users[Math.floor(Math.random() * users.length)];
     res.send(user)
  
}

