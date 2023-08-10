import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <h3>GraphHopper</h3>
            </Link>
            <p>Hop 'til you drop, one node at a time.</p>
        </header>
    );
};

export default Header;
