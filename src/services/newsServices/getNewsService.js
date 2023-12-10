const Users = require('../../models/usersModel.json');
const { Validator } = require('../../utils/validator');
const { getNewsAPIData } = require('../../utils/thirdPartyAPIService');
const { state } = require('../../utils/cached');

exports.getNewsService = async (userData, message) => {
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
        if(state?.cachedArticles?.length > 0){
            response.status = true; 
            response.data = state.cachedArticles;
            return response;
          }

      const getData = await getNewsAPIData(findUserData.newsPreferences.sources);

       if(getData.status){
          response.status = true;
          response.data = getData.data.articles;
          let ids = 0;
          getData.data.articles.forEach(element => {
              ids++
              state.cachedArticles.push({...element, id: ids})            
          });     
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