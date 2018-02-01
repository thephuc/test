import React from "react";

class UserList extends React.Component{

    render(){
        const userList          = this.props.userList;
        const selectedCountry   = this.props.selectedCountry;
        const totalCount        = this.props.totalCount;
        const topSize           = 10;
        const topUserList       = userList.slice(0, topSize);
        //console.log("top " + topSize + " users ", topUserList);


        return (
            <div className="github-info">
                {
                    selectedCountry && selectedCountry !== "" &&
                    <p># of GitHub users in {selectedCountry}: {totalCount}</p>
                }
                {
                    topUserList.length > 0 &&
                    <p>Top {topUserList.length} most followed user(s)</p>
                }
                <div className="user-list">
                    {topUserList.map(function (user, idx) {
                        return (
                            <div className="user-info" key={idx}>
                            <span key={user.id}>
                                <a href={user.html_url} target="_blank">
                                    <img className="user-avatar" src={user.avatar_url}/>
                                </a>
                            </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

}

export default UserList;