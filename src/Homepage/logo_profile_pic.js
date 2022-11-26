import React from "react";
import profile_pic from "../Images/profile_pic.jpeg";
import logo from "../Images/logo.jpeg";
import "./logo_profile_pic.css";

const LogoProfilePic = () => {
    return (
        <React.Fragment>
            <div className="logo_profile_container">
                <div className="profile_logo_container">
                    <img className="profile_img" src={profile_pic} />
                </div>
                <div className="profile_logo_container">
                    <img className="logo_img" src={logo} />
                </div>
            </div>
        </React.Fragment>
    );
};

export default LogoProfilePic;
