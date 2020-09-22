import "antd/dist/antd.css";
import {Provider} from "mobx-react";
import * as React from "react";
import {hot} from "react-hot-loader/root";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.scss";
import {AppLayout} from "./components/AppLayout";
import {RootStore} from "./stores/RootStore";
import {Account, Home, Settings, Signup} from "./views";

interface AppProps {
    rootStore: RootStore;
}

const App = (props: AppProps) => {
    return (
        <Router>
            <Provider rootStore={props.rootStore}>
                <AppLayout>
                    <Route path="/" exact component={Home} />
                    <Route path="/account" exact component={Account} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/settings" exact component={Settings} />
                </AppLayout>
            </Provider>
        </Router>
    );
};

export default hot(App);
