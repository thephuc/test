import React from 'react';
import MapComponent from "../components/MapComponent.js";

class MapContainer extends React.Component{

    render(){
        const selectedCountry   = this.props.selectedCountry;
        const userList          = this.props.userList;
        const totalCount        = this.props.totalCount;
        const latLng            = this.props.latLng;
        const zoomLevel         = this.props.zoomLevel;

        return (
            <MapComponent
                latLng={latLng}
                zoomLevel={zoomLevel}
                selectedCountry={selectedCountry}
                onUserListFetched={this.props.onUserListFetched}
                userList={userList}
                totalCount={totalCount}
            />
        );
    }

}

export default MapContainer;