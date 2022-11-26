import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

import "./contact_info.css";

const ContactInfo = () => {
    return (
        <div className="contact_icons_container">
            <a className="contact_icons" href="mailto:JMOllada@gmail.com">
                    <MdOutlineEmail />
                </a>
                <a
                    className="contact_icons" href="https://www.instagram.com/jasono380"
                >
                    <FaInstagram />
                </a>
        </div>
    )
}

export default ContactInfo;