import "antd/dist/antd.css";
import {Provider} from "mobx-react";
import * as React from "react";
import {hot} from "react-hot-loader/root";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.scss";
import {AppLayout} from "./components/AppLayout";
import {RootStore} from "./stores/RootStore";
import {Account, Home, Login, Settings, Signup} from "./views";
import {useEffect, useState} from "react";
import {Spin} from "antd";
import firebase from "./services/firebase";

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

    return initialized !== false ? (
        <Router>
            <Provider rootStore={props.rootStore}>
                <AppLayout>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/account" component={Account} />
                </AppLayout>
            </Provider>
        </Router>
    ) : (
        <Spin />
    );
};

export default hot(App);
