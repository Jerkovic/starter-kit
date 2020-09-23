import {Button, message, Spin} from "antd/es";
import Title from "antd/es/typography/Title";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {Link, useHistory} from "react-router-dom";
import firebase from "../services/firebase";

export const Home = () => {
    const history = useHistory();
    const [value, loading, error] = useCollection(
        firebase.db.collection("qualifiers"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

    if (!firebase.getCurrentUsername()) {
        message.info("Login first");
        history.replace("/login");
        return null;
    }

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
