const fs = require('fs')


//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('DataApi.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('DataApi.json')
    return JSON.parse(jsonData)    
}


module.exports.postData = (req, res) => {
    const existUsers = getUserData()   
    const userData = req.body;
    
    console.log(userData)
    
   //check if the userData fields are missing
    if (userData.id == null || userData.gender == null || userData.name == null || userData.contact == null || userData.address == null || userData.photoUrl == null) {
        return res.send({error: true, msg: 'Properties not present in the body'})
    }

     //check if the username exist already
    const findExist = existUsers.find( user => user.id === userData.id )
    if (findExist) {
        return res.send({error: true, msg: 'user already exist'})
    }
  
    existUsers.push(userData)
    saveUserData(existUsers);
    
    // res.send(userData);
    res.send(userData);
    
}

module.exports.getAllData = (req, res) => {
    const id = req.params.id;  
     const users = getUserData()
     res.send(users)
  
}

module.exports.deleteData = (req, res) => {
    const id = req.params.id;
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.id != id )
    if ( existUsers.length === filterUser.length ) {
        return res.send({error:"Please Enter a valide number in query parameter" , msg: typeof( id)})
    }
   
    //save the filtered data
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
  
}

module.exports.updateData = (req, res) => {
    const id = req.params.id;
    //get the update data
    const userData = req.body
    // get the existing user data
    const existUsers = getUserData()
    // //check if the id exist or not       
    const findExist = existUsers.find( user => user.id == id )
    if (!findExist) {
        return res.send({error:  "Please Enter a valide number in query parameter", msg: typeof( id )})
    }
    // filter the userdata
    const updateUser = existUsers.filter( user => user.id != id )
    //push the updated data
    updateUser.push(userData)
    // finally save it
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'}) 
    res.send(id)
  
}

