import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header cluster">
            <Link to="/" className="header__title-link">
                <h3 className="header__title">GraphHopper</h3>
            </Link>
            <p>Hop 'til you drop, one node at a time.</p>
        </header>
    );
};

export default Header;
