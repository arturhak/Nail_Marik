import React from "react";
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "./allRoutes";

const IndexRoute = () => {
    return (
        <>
            <Routes>
                {publicRoutes.map((route,idx)=>(
                    <Route
                        path={route.path}
                        element={<route.component/>}
                        key={idx}
                    />
                ))}
            </Routes>
        </>
    )
}

export default IndexRoute
