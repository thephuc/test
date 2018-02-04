import React from "react";
import UserListContainer from "../containers/UserListContainer.js";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

class MapComponent extends React.Component{

    render(){
        let center            = [0,0];
        const zoomLevel         = this.props.zoomLevel;
        const position          = this.props.latLng;
        const userList          = this.props.userList;
        const totalCount        = this.props.totalCount;
        const selectedCountry   = this.props.selectedCountry;
        const stamenTonerTiles  = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const stamenTonerAttr    = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

        //  render marker only when the latitude and longitude are not null
        //  re-center map to make the selected country the center
        let marker    = null;
        if(position && position.length > 0){
            center = position;
            marker = (<Marker position={position}>
                <Popup>
                    <UserListContainer
                        selectedCountry={selectedCountry}
                        userList={userList}
                        totalCount={totalCount}
                        userListFetched={this.props.onUserListFetched}
                        />
                </Popup>
            </Marker>);
        }

        //console.log("rendering map");
        return (
            <Map
                width={window.innerWidth}
                center={center}
                zoom={zoomLevel}
            >
                <TileLayer
                    attribution={stamenTonerAttr}
                    url={stamenTonerTiles}
                />
                {marker}
            </Map>
        );

    }

}

export default MapComponent;


