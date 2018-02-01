import APICalls from "../utils/api.js";
import React from "react";
import CountryList from "../components/CountryList.js";

class CountryListContainer extends React.Component{
    constructor(props){
        super(props);
        this.handleSelectedCountry = this.handleSelectedCountry.bind(this);
    }

    //  calling API to get the list of countries when the component first mounts
    componentDidMount(){
        APICalls.getCountryList().then((countryList) => {
            this.props.onCountryListFetched(countryList);
        });
    }

    //  prevent country list dropdown from re-rendering every time an option is selected
    shouldComponentUpdate(nextProps){
        return this.props.countryList.length !== nextProps.countryList.length;
    }

    //  callback to pass values for selected country back to update the states in App
    handleSelectedCountry(e){
        //  minus 1 from the selectedIndex since index 0 belongs to the "---Select a country---" option
        const selectedIdx       = e.target.selectedIndex-1;
        const selectedCountry   = this.props.countryList[selectedIdx];
        const selectedLatLng    = selectedCountry.latlng;
        this.props.onCountrySelected(e.target.value, selectedLatLng);
    }

    //  render CountryList component only if the list of country is not empty
    render(){
        if(this.props.countryList && this.props.countryList.length > 0){
            console.log("countryList container rendering ");
            return (
                <CountryList
                    //key={this.props.countryList.length}
                    onChange={this.handleSelectedCountry}
                    countryList={this.props.countryList}
                />
            );
        }
        return null;
    }
}

export default CountryListContainer;