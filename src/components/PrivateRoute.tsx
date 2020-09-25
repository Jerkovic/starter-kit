import * as React from "react";
import {Redirect, Route, RouteComponentProps} from "react-router-dom";
import {useAuth} from "./AuthProvider";

interface PrivateRouteProps {
    component?:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    exact: boolean;
    path: string;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
    const currentUser = useAuth();

    return currentUser !== null ? (
        <Route
            path={props.path}
            exact={props.exact}
            component={props.component}
        />
    ) : (
        <Redirect to="/login" />
    );
};
