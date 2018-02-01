/**
 * Created by thephuc on 31/1/18.
 */
import APICalls from "../utils/api.js";
import React from "react";
import UserList from "../components/UserList.js";


class UserListContainer extends React.Component{

    componentDidMount(){
        APICalls.getGitHubUsersInCountry(this.props.selectedCountry).then((data) => {
            this.props.userListFetched(data);
        });
    }

    //  if a different country has been selected, call GitHub API
    //  to get the data for that country
    //  and update the state for userList and totalCount in App
    componentDidUpdate(prevProps){
        if(this.props.selectedCountry !== prevProps.selectedCountry){
            APICalls.getGitHubUsersInCountry(this.props.selectedCountry).then((data) => {
                console.log("data for github users ", data);
                this.props.userListFetched(data);
            });
        }
    }

    render(){
        return (
            <UserList
                userList={this.props.userList}
                totalCount={this.props.totalCount}
                selectedCountry={this.props.selectedCountry}
            />
        );
    }
}

export default UserListContainer;

