import React from "react";

class CountryList extends React.Component{

    render(){
        const countryList = this.props.countryList;
        return (
            <select onChange={this.props.onChange} defaultValue="defaultOption">
                <option disabled value="defaultOption">---Select a country---</option>
                {countryList.map(function(country, i){
                    return (
                        <option key={i}>
                            {country.name}
                        </option>
                    );
                })}
            </select>
        );
    }

}

export default CountryList;