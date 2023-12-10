const { Validator } = require('../../utils/validator');
const { state } = require('../../utils/cached');

exports.postNewsFavoriteService = async (userData, message, ids) => {
    const response = {
        status: false,
        message: "",
    }

    try {
      if(!Validator.isEmpty(userData)){
       response.message = message
       return response;
      }
      const id = Number(ids); 
      const result = state.cachedArticles?.some((item) => item.id == id)
      if(result){
          state.favoriteArticles.add(id)
          response.status = true;
          response.message = "Successfully added in read articles!!"
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