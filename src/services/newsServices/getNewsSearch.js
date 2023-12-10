const { Validator } = require('../../utils/validator');
const { state } = require('../../utils/cached');

exports.getNewsSearchService = async (userData, message, keyword) => {
    const response = {
        status: false,
        data: [],
    }

    try {
      if(!Validator.isEmpty(userData)){
       response.message = message
       return response;
      }
      const lowerCaseKeyword = String(keyword).toLowerCase();
      
      let searchResults = [];
      if(state.cachedArticles?.length > 0){
          searchResults = keywordSearch(state.cachedArticles, lowerCaseKeyword);
      }

      if(searchResults?.length > 0){
        response.status = true;
        response.data = searchResults;    
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

function keywordSearch(articles, keyword) {
    const results = [];
    
    articles.forEach((article) => {
        const { title, description, content } = article;
        const titleValues = toConvertArrayAndLowerCase(title);
        const descriptionValues = toConvertArrayAndLowerCase(description);
        const contentValues = toConvertArrayAndLowerCase(content)
        if (titleValues.includes(keyword) || descriptionValues.includes(keyword) || contentValues.includes(keyword)) {
            results.push(article);
        }
    });

    return results;
}

function toConvertArrayAndLowerCase(data){
    const splitData = [...data.split(' ')];
    const desiredData = splitData.map((item) => item.toLowerCase());
    return desiredData;
}