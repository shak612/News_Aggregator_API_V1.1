const Users = require('../../models/usersModel.json');
const UsersTesting = require('../../models/usersModelTesting.json');
const fs = require('node:fs');
const bcrypt= require('bcrypt');
const path = require('path');
const { Validator } = require('../../utils/validator');

exports.registerService = async (userData) => {
    const response = {
        status: false,
        message: "",
    }
    
    try {
      const allUsersData = process.env.NODE_ENV == "testing" ? [...UsersTesting] : [...Users];
      const validate = Validator.validateRegisterForm(userData);

      if(!validate.status){
         response.message = validate.message;
        return response; 
      }
      
      const isUserNameUnique = allUsersData.some((user) => user.userName === userData.userName);
      const isEmailIdUnique = allUsersData.some((user) => user.emailId === userData.emailId);
      
      if(isUserNameUnique){
        response.message = "User Name is already existed!!"
        return response;
      }else if(isEmailIdUnique){
        response.message = "EmailId is already existed!!"
        return response;
      }

      userData['id'] = allUsersData[allUsersData.length - 1]?.id + 1;
      userData['password'] = bcrypt.hashSync(userData.password, 8)
      allUsersData.push(userData);
      
      const userToCreate = JSON.stringify(allUsersData);
      const src = process.env.NODE_ENV == "testing" ? '../../models/usersModelTesting.json' : '../../models/usersModel.json' 
      const filePath = path.join(__dirname, src)
      
      const writeFilePromise = async() => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, userToCreate, 'utf8', (err) => {
              if(!err){
                  response.status = true;
                  response.message = "Successfully registered!!"
                  resolve(response);
              }else{
                  response.message = err
                  reject(response);  
              }
            })      
        })
      }

     const result = await writeFilePromise();
     return result;

    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}