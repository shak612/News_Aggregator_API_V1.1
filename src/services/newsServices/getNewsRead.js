const { Validator } = require('../../utils/validator');
const { state } = require('../../utils/cached');

exports.getNewsReadService = async (userData, message) => {
    const response = {
        status: false,
        data: [],
    }

    try {
      if(!Validator.isEmpty(userData)){
       response.message = message
       return response;
      }
      
      const result = state.cachedArticles.filter(article => state.readArticles.has(article.id));

      if(result.length > 0){
        response.status = true;
        response.data = result;    
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