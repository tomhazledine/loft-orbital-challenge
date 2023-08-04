import React from "react";
import { useRouteError } from "react-router-dom";

import Header from "../components/Header";

const Error = ({ msg = false }) => {
    const error = useRouteError();
    if (error) console.error(error);
    return (
        <div className="wrapper">
            <Header />
            <div className="main__container">
                <h1>There was a problem loading this page</h1>
                <pre>
                    <code>
                        Error:{" "}
                        {msg
                            ? msg
                            : error
                            ? error.statusText || error.message
                            : `It's a mystery`}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default Error;
