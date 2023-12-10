const Users = require('../../models/usersModel.json');
const { Validator } = require('../../utils/validator');
const { getPreferenceNewsAPIData } = require('../../utils/thirdPartyAPIService');

exports.getPreferencesService = async (userData, message) => {
    const response = {
        status: false,
        data: [],
    }

    try {
      
      if(!Validator.isEmpty(userData)){
       response.message = message
       return response;
      }
       
      const usersData = [...Users];
      const findUserData = usersData.find((user) => user.userName == userData)
      if(Object.keys(findUserData).length > 0){

      const getData = await getPreferenceNewsAPIData(findUserData.newsPreferences.categories);
       if(getData.status){
          response.status = true;
          response.data = getData.data.sources;     
       }else{
          response.message = "Internal Server Error!!"
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