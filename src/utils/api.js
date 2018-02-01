
const APICalls = {
    getCountryList: function(){
        //  url to external API to get full list of country names,
        //  latitude and longitude (used for placing marker on map)
        const getCountryListUrl = "https://restcountries.eu/rest/v2/all?fields=name;latlng";

        return fetch(getCountryListUrl)
        .then(validateResponse)
        .catch(error => {
            console.log("Failed to get country list: ", error);
        });
    },


    getGitHubUsersInCountry: function (countryName, conditionObj=null) {
        //  remove space in between words of country names
        countryName = countryName.replace(/\s/g, '');

        //  default conditions:
        //  sort by most number of followers (descending by default set by GitHub)
        //  number of records per page = 10 to prevent loading extra data
        if(!conditionObj){
            conditionObj = {
                sort: "followers",
                per_page: 10
            };
        }

        let getGitHubUserInCountryUrl = "https://api.github.com/search/users?q=location:" + countryName;
        getGitHubUserInCountryUrl = appendConditionsToUrl(getGitHubUserInCountryUrl, conditionObj);

        console.log("API url to get github user list", getGitHubUserInCountryUrl);
        return fetch(getGitHubUserInCountryUrl)
        .then(validateResponse)
        .catch(error => {
            console.log("Failed to get GitHub users in {countryName}", error);
        });
    }
};


function appendConditionsToUrl(url, conditionObj){
    let conditionStr = "";
    for(let key in conditionObj){
        if(conditionObj.hasOwnProperty(key)){
            conditionStr += "&" + key + "=" + conditionObj[key];
        }
    }
    return url + conditionStr;
}

function validateResponse(response){
    if(response && response.status >= 200 && response.status < 300){
        return response.json();
    }
    else{
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}


export default APICalls;