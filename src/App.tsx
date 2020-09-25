import {Spin} from "antd";
import "antd/dist/antd.css";
import React, {useEffect, useState} from "react";
import {hot} from "react-hot-loader/root";
import {Route, Router, Switch} from "react-router-dom";
import "./App.scss";
import {AppLayout} from "./components/AppLayout";
import {AuthProvider} from "./components/AuthProvider";
import {PrivateRoute} from "./components/PrivateRoute";
import history from "./helpers/history";
import firebase from "./services/firebase";
import {RootStore} from "./stores/RootStore";
import {Home, Login} from "./views";
import {Upload} from "./views/Upload";

interface AppProps {
    rootStore: RootStore;
}

const App = (props: AppProps) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        firebase.isInitialized().then(() => {
            setInitialized(true);
        });
    });

    return initialized ? (
        <Router history={history}>
            <AuthProvider>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute
                            exact
                            path="/upload"
                            component={Upload}
                            isAuthenticated={true}
                        />
                    </Switch>
                </AppLayout>
            </AuthProvider>
        </Router>
    ) : (
        <Spin />
    );
};

export default hot(App);
