/**
 * Created by thephuc on 31/1/18.
 */
import APICalls from "../utils/api.js";
import React from "react";
import UserList from "../components/UserList.js";


class UserListContainer extends React.Component{
    constructor(props){
        super(props);


    }

    render(){
        console.log("userListContainer rendering user list", this.props.userList);

        return (
            <UserList
                userList={this.props.userList}
                totalCount={this.props.totalCount}
                selectedCountry={this.props.selectedCountry}
            />
        );
    }

    componentDidMount(){
        APICalls.getGitHubUsersInCountry(this.props.selectedCountry).then((data) => {
            console.log("data for github users ", data);
            this.props.userListFetched(data);
        });
    }

    componentDidUpdate(prevProps, prevStates){
        console.log("componentDidUpdate here");
        if(this.props.selectedCountry !== prevProps.selectedCountry){
            APICalls.getGitHubUsersInCountry(this.props.selectedCountry).then((data) => {
                console.log("data for github users ", data);
                this.props.userListFetched(data);
            });
        }
        console.log("current selected country: ", this.props.selectedCountry);
        console.log("prev selected country: ", prevProps.selectedCountry);
    }

}

export default UserListContainer;

