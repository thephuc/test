import APICalls from "../utils/Api.js";
import LocalLoad from "../utils/LocalLoad.js";
import React from "react";
import CountryList from "../components/CountryList.js";

class CountryListContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isCountryListLoaded : false
        };
        this.handleSelectedCountry = this.handleSelectedCountry.bind(this);
    }

    //  calling external API to get the list of countries when the component first mounts
    componentDidMount(){
        let _this = this;
        APICalls.getCountryList().then(function(countryList){
            _this.setState({isCountryListLoaded: true});
            _this.props.onCountryListFetched(countryList);
        }).catch(function(error){
            console.log("Failed to fetch country list from external API", error);
            console.log("fetching country list from local file");

            let countryListLocal = null;
            try{
                countryListLocal = LocalLoad.getCountryListLocal();
            }
            catch(error){
                console.log("Failed to fetch country list from local file");
                _this.setState({isCountryListLoaded: false});
                return;
            }
            console.log("Fetched country list from local file");
            _this.setState({isCountryListLoaded: true});
            _this.props.onCountryListFetched(countryListLocal);
        });
    }

    //  handling error when API call fails
    componentDidCatch(error, info){
        //this.props.onCountryListFetched(LocalLoad.getCountryListLocal());
        console.log("componentDidCatch in countryListContainer: ", error);
        this.setState({isCountryListLoaded: false});
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
        if(this.state.isCountryListLoaded && this.props.countryList && this.props.countryList.length > 0){
            console.log("countryList.json container rendering ");
            return (
                <CountryList
                    //key={this.props.countryList.length}
                    onChange={this.handleSelectedCountry}
                    countryList={this.props.countryList}
                />
            );
        }
        else if(!this.state.isCountryListLoaded){
            return <div className="error-message">Unable to get country list from the server. Try refreshing the page.</div>;
        }
        else{
            return null;
        }
    }
}

export default CountryListContainer;