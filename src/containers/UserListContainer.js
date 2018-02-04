/**
 * Created by thephuc on 31/1/18.
 */
import APICalls from "../utils/Api.js";
import React from "react";
import UserList from "../components/UserList.js";


class UserListContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isUserListLoaded : true
        };

        this.getUserList = this.getUserList.bind(this);
    }

    componentDidMount(){
        this.getUserList(this.props.selectedCountry);
    }

    //  if a different country has been selected, call GitHub API
    //  to get the data for that country
    //  and update the state for userList and totalCount in App
    componentDidUpdate(prevProps){
        if(this.props.selectedCountry !== prevProps.selectedCountry){
            this.getUserList(this.props.selectedCountry);
        }
    }

    getUserList(countryName){
        let _this = this;
        APICalls.getGitHubUsersInCountry(countryName).then(function(data){
            _this.setState({isUserListLoaded : true});
            _this.props.userListFetched(data);
        }).catch(function(error){
            console.log("Failed to load user list from github for " + countryName);
            _this.setState({isUserListLoaded : false});
        });
    }

    //  handling error when API call fails
    componentDidCatch(error, info){
        this.setState({isUserListLoaded:  false});
    }

    render(){
        const userList          = this.props.userList;
        const totalCount        = this.props.totalCount;
        const selectedCountry   = this.props.selectedCountry;
        if(this.state.isUserListLoaded){
            return (
                <UserList
                    userList={userList}
                    totalCount={totalCount}
                    selectedCountry={selectedCountry}
                    />
            );
        }
        return <div className="error-message">Unable to get data from GitHub. Please try again.</div>
    }
}


export default UserListContainer;

