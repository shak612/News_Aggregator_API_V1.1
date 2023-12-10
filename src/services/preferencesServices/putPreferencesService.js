const Users = require('../../models/usersModel.json');
const fs = require('node:fs');
const path = require('path');
const { Validator } = require('../../utils/validator');
const { getPreferenceNewsAPIData } = require('../../utils/thirdPartyAPIService');

exports.putPreferencesService = async (user, message, data) => {
    let response = {
        status: false,
        message: "",
    }

    try {
      
      if(!Validator.isEmpty(user)){
       response.message = message
       return response;
      }
       
      const usersData = [...Users];
      const userDataIndex = usersData.findIndex((userdata) => userdata.userName == user)

      if(userDataIndex >= 0){
        usersData[userDataIndex].newsPreferences.categories = data.categories ?? usersData[userDataIndex].newsPreferences.categories;
        usersData[userDataIndex].newsPreferences.sources = data.sources ?? usersData[userDataIndex].newsPreferences.sources;
        
        const userToCreate = JSON.stringify(usersData);

        const filePath = path.join(__dirname, '../../models/usersModel.json')

        const writeFilePromise = async() => {
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, userToCreate, 'utf8', (err) => {
                  if(!err){
                      response.status = true;
                      response.message = "Successfully updated!!"
                      resolve(response);
                  }else{
                      response.message = err
                      reject(response);  
                  }
                })      
            })
          }
          response = await writeFilePromise();
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