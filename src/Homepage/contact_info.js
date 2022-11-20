import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

import "./contact_info.css";

const ContactInfo = () => {
    return (
        <div class="contact_icons_container">
            <a class="contact_icons" href="mailto:JMOllada@gmail.com">
                    <MdOutlineEmail />
                </a>
                <a
                    class="contact_icons" href="https://www.instagram.com/jasono380"
                >
                    <FaInstagram />
                </a>
        </div>
    )
}

export default ContactInfo;