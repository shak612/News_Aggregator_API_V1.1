const Users = require('../../models/usersModel.json');
const UsersTesting = require('../../models/usersModelTesting.json');
const bcrypt = require('bcrypt');
const { Validator } = require('../../utils/validator');
const jwt = require('jsonwebtoken');

exports.loginService = async (userData) => {
    const response = {
        status: false,
        message: "",
    }

    try {
      
      if(!Validator.isEmpty(userData.userName)){
       response.message = "User Name should not be empty!!"
       return response;
      }

      if(!Validator.isEmpty(userData.password)){
        response.message = "Password should not be empty!!"
        return response;
      }
       
      const usersData = process.env.NODE_ENV == "testing" ? [...UsersTesting] : [...Users];
      const findUserData = usersData.find((user) => user.userName == userData.userName)

      if(Object.keys(findUserData).length > 0){
        const result = bcrypt.compareSync(userData.password, findUserData.password)
        if(result){
         const token = jwt.sign(
            {userName: findUserData.userName}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: 86400}
            )
            response.status = true; 
            response["accessToken"] = token;
            response.message = "Successfully Login!!"
        }else{
          response["message"] = "Invalid Password!!"
        }
      }
      
     return response;

    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}