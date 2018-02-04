const Utility = {

//  helper function to convert condition list object to a string and
//  append to url for API request
    appendConditionsToUrl: function(url, conditionObj){
        let conditionStr = "";
        for(let key in conditionObj){
            if(conditionObj.hasOwnProperty(key)){
                conditionStr += "&" + key + "=" + conditionObj[key];
            }
        }
        return url + conditionStr;
    },

//  helper function to validate response from API call and call errorHandler if necessary
    validateResponse: function (response) {
        if(response && response.status >= 200 && response.status < 300){
            //console.log(response);

            return response.json()
                .then(function (data) {
                    //console.log("converted response to json");
                    return data;
            })
                .catch(function(error){
                    console.log("Failed to convert response to json");
                    throw error;
                });
        }
        else{
            this.errorHandler(response);
        }
    },


    //helper function to handle basic error from http response
    errorHandler: function(response){
        const responseStatusText = response.statusText ? response.statusText : "";
        let errorMessage = "Error: external API call failed. " + responseStatusText;
        switch (response.status){
            case 400:
                errorMessage = "Bad API request: Check your URL or request parameters.";
                break;
            case 403:
                errorMessage = "Forbidden.";
                break;
            case 404:
                errorMessage = "API service not found.";
                break;
            case 408:
                errorMessage = "Request Timeout: Check your network or try again.";
                break;
            case 500:
                errorMessage = "Internal Server Error: " + responseStatusText;
                break;
            case 502:
                errorMessage = "Bad Gateway: Check your network router.";
                break;
            default:
                break;
        }
        const error = new Error(errorMessage);
        error.response = response;
        throw error;
    },

    //helper function to check if json data is valid
    isJsonValid: function(jsonData) {
        return jsonData && typeof jsonData === "object";
    }
};

export default Utility;
