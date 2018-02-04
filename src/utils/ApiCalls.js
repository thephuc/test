import Utility from "./Utility.js";

const APICalls = {
    getCountryList: function(){
        //  refer to https://restcountries.eu/#filter-response
        //  for external API to get full list of country names,
        //  latitude and longitude (used for placing marker on map)
        const getCountryListUrl = "https://restcountries.eu/rest/v2/all?fields=name;latlng";

        return fetch(getCountryListUrl)
            .then(Utility.validateResponse)
            .catch(error => {
                console.log("Failed to get country list: ", error);
                throw error;
            });
    },


    getGitHubUsersInCountry: function (countryName, conditionObj=null) {
        //  remove space in country names
        countryName = countryName.replace(/\s/g, '');

        //  refer to https://developer.github.com/v3/search/#search-users
        //  for GitHub API to search for users using different criteria
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
        getGitHubUserInCountryUrl = Utility.appendConditionsToUrl(getGitHubUserInCountryUrl, conditionObj);

        //console.log("API url to get github user list", getGitHubUserInCountryUrl);
        return fetch(getGitHubUserInCountryUrl)
            .then(Utility.validateResponse)
            .catch(error => {
                console.log("Failed to get GitHub users in " + countryName + " ", error);
                throw error;
            });
    }
};

export default APICalls;