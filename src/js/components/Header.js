import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h3>Loft Orbital Challenge</h3>
            </Link>
        </header>
    );
};

export default Header;
