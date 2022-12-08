import React from "react";
import data from "./footer_data";
import footerStyle from "../CSS/variables/footer_style";

const FooterCard = ()=> {
    return(
        <div>
            {data.map(d=> {
                return(
                    <div style={footerStyle}>
                        <p>Site designed by {d.name}</p>
                        <p>copyright {d.copyright}</p>
                        <p>{d.tech}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default FooterCard;