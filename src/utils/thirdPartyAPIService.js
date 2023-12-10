exports.getPreferenceNewsAPIData = async (query) => {
    const response = {
        status: false,
        data: []
    }
    try {
        const result = await fetch(`https://newsapi.org/v2/top-headlines/sources?category=${query}&apiKey=${process.env.API_KEY}`)
        const data = await result.json();
        response.status = true;
        response.data = data;
        return response;
        
    } catch (error) {
        console.log(error);
        response.status = false;
        response.message = "Error from thirdPartyAPI" + error;         
        return response;
    }
}

exports.getNewsAPIData = async (query) => {
    const response = {
        status: false,
        data: []
    }
    try {
        const result = await fetch(`https://newsapi.org/v2/everything?sources=${query}&apiKey=${process.env.API_KEY}`)
        const data = await result.json();
        response.status = true;
        response.data = data;
        return response;
    } catch (error) {
        console.log(error);
        response.status = false;
        response.message = "Error from thirdPartyAPI" + error;         
        return response;
    }
}