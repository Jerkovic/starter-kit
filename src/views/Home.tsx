import {Button, message, Spin} from "antd/es";
import Title from "antd/es/typography/Title";
import {useContext} from "react";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../components/AuthProvider";
import firebase from "../services/firebase";

export const Home = () => {
    const history = useHistory();
    const currentUser = useContext(AuthContext);
    const [value, loading, error] = useCollection(
        firebase.db.collection("qualifiers"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );
    async function logout() {
        await firebase.logout();
        history.push("/");
    }

    return (
        <div>
            <Title level={3}>Home</Title>
            <Link to={`/upload`}>
                <Button type="primary" key="console">
                    Upload
                </Button>
            </Link>
            <div>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <Spin />}
                {value && (
                    <span>
                        {currentUser && <span>{currentUser.email}</span>}
                        <Button type="primary" onClick={logout}>
                            Logout
                        </Button>
                        {value.docs.map((doc) => (
                            <React.Fragment key={doc.id}>
                                {JSON.stringify(doc.data())},{" "}
                            </React.Fragment>
                        ))}
                    </span>
                )}
            </div>
        </div>
    );
};
