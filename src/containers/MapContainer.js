import React from 'react';
import MapComponent from "../components/MapComponent.js";

class MapContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps, nextStates){
        if(this.props.latLng[0] !== nextProps.latLng[0] || this.props.latLng[0] !== nextProps.latLng[1]){

        }
        console.log("current selected country's lat and lng: ", this.props.latLng[0] + " " + this.props.latLng[1]);
        console.log("next selected country's lat and lng: ", nextProps.latLng[0] + " " +  nextProps.latLng[1]);
    }

    render(){
        return (
            <MapComponent
                latLng={this.props.latLng}
                zoom={this.props.zoom}
                selectedCountry={this.props.selectedCountry}
                onUserListFetched={this.props.onUserListFetched}
                userList={this.props.userList}
                totalCount={this.props.totalCount}
            />
        );

    }

}

export default MapContainer;