import {Spin} from "antd";
import "antd/dist/antd.css";
import {Provider} from "mobx-react";
import * as React from "react";
import {useEffect, useState} from "react";
import {hot} from "react-hot-loader/root";
import {Route, Router, Switch} from "react-router-dom";
import "./App.scss";
import {AppLayout} from "./components/AppLayout";
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
            <Provider rootStore={props.rootStore}>
                <AppLayout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/upload" component={Upload} />
                    </Switch>
                </AppLayout>
            </Provider>
        </Router>
    ) : (
        <Spin />
    );
};

export default hot(App);
