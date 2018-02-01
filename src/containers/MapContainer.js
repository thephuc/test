import React from 'react';
import MapComponent from "../components/MapComponent.js";

class MapContainer extends React.Component{

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