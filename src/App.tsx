import "antd/dist/antd.css";
import {Provider} from "mobx-react";
import * as React from "react";
import {hot} from "react-hot-loader/root";
import {Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import {AppLayout} from "./components/AppLayout";
import {RootStore} from "./stores/RootStore";
import {Account, Home, Login} from "./views";
import {useEffect, useState} from "react";
import {Spin} from "antd";
import firebase from "./services/firebase";
import history from "./helpers/history";

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
        <Router history={history}>
            <Provider rootStore={props.rootStore}>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/account" component={Account} />
                    </Switch>
                </AppLayout>
            </Provider>
        </Router>
    ) : (
        <Spin />
    );
};

export default hot(App);
