import React from "react";
import UserListContainer from "../containers/UserListContainer.js";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";

class MapComponent extends React.Component{

    render(){
        const center            = [1.35, 103.81];
        const zoomLevel         = 1;
        const position          = this.props.latLng;
        const stamenTonerTiles  = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const stamenTonerAttr    = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

        //  render marker only when the latitude and longitude states are not null
        let marker    = null;
        if(position && position.length > 0){
            marker = (<Marker position={position}>
                <Popup>
                    <UserListContainer
                        selectedCountry={this.props.selectedCountry}
                        userList={this.props.userList}
                        totalCount={this.props.totalCount}
                        userListFetched={this.props.onUserListFetched}
                        />
                </Popup>
            </Marker>);
        }

        console.log("rendering map");
        return (
            <Map
                //width={window.innerWidth}
                height={720}
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


