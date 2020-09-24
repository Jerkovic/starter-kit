import * as React from "react";
import {Redirect, Route, RouteComponentProps} from "react-router-dom";

interface PrivateRouteProps {
    component?:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    isAuthenticated: boolean;
    exact: boolean;
    path: string;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    return props.isAuthenticated ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect to="/login" />
    );
};
