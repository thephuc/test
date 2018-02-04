//service to load data from local files instead of from external APIs
import Utility from "./Utility.js";

const LocalLoad = {
    getCountryListLocal: function () {
        let data = require("../data/countryList.json");

        if(Utility.isJsonValid(data)){
            return data;
        }
        throw new Error("Invalid json format for local country list file");

        //const url = "../data/countryList.json";
        //return fetch(url)
        //.then(Utility.validateResponse)
        //.catch(error => {
        //       console.log("Failed to get country list from local json: ", error);
        //        throw error;
        //    });
   }
};


export default LocalLoad;