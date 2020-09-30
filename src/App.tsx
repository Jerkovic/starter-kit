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
import firebaseWrapper from "./services/firebaseWrapper";
import {RootStore} from "./stores/RootStore";
import {Home, Login, SignUpView} from "./views";
import {UploadView} from "./views/UploadView";

interface AppProps {
    rootStore: RootStore;
}

const App = (props: AppProps) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        firebaseWrapper.isInitialized().then(() => {
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
                        <Route exact path="/register" component={SignUpView} />
                        <PrivateRoute
                            exact
                            path="/upload"
                            component={UploadView}
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
