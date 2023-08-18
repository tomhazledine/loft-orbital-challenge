import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const Layout = () => {
    return (
        <div className="wrapper stack--small">
            <Header />
            <div className="main__container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
