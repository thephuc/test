import React, { Component } from 'react';
import './../style/App.css';
import CountryListContainer from  './CountryListContainer.js';
import MapContainer from './MapContainer.js';

class App extends Component {

    //  initialize the states and bind the callbacks
    constructor(props){
        super(props);
        this.state = {
            _selectedCountry : "",
            _userList        : [],
            _countryList     : [],
            _totalUserCount  : 0,
            _latLng          : [],
            _zoomLevel       : 1
        };

        this.handleSelectedCountry  = this.handleSelectedCountry.bind(this);
        this.updateCountryList      = this.updateCountryList.bind(this);
        this.updateUserList         = this.updateUserList.bind(this);
    }

    //  update state for selected country's name, latitude and longitude
    handleSelectedCountry(countryName, latLng){
        this.setState({
            _selectedCountry: countryName,
            _latLng: latLng
        });
    }

    //  update state for the user list and total user count for a country
    updateUserList(data){
        const userList      = data && data.items ? data.items : [];
        const totalCount    = data && data.total_count ? data.total_count : 0;
        this.setState({
            _userList: userList,
            _totalUserCount: totalCount
        });
    }

    updateCountryList(countryList){
        this.setState({
            _countryList : countryList
        });
    }

    render() {

        let errorDiv = null;
        if(this.state._selectedCountry && this.state._latLng.length <= 0){
            errorDiv = <div className="error-message">The country you selected does not have a specific location. Please select another one.</div>;
        }

        return (
            <div className="App">
                <div className="country-list-select">
                    <CountryListContainer
                        countryList={this.state._countryList}
                        onCountrySelected={this.handleSelectedCountry}
                        onCountryListFetched={this.updateCountryList}
                        />
                </div>

                {errorDiv}

                <div className="map-component" id="mapComponent">
                    <MapContainer
                        latLng={this.state._latLng}
                        zoomLevel={this.state._zoomLevel}
                        selectedCountry={this.state._selectedCountry}
                        userList={this.state._userList}
                        totalCount={this.state._totalUserCount}
                        onUserListFetched={this.updateUserList}
                        />
                </div>
            </div>
        );
    }
}


export default App;



