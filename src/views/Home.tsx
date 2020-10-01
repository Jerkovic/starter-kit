import {Progress, Spin} from "antd/es";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../components/AuthProvider";
import Breakpoints from "../components/Breakpoints";
import firebaseWrapper from "../services/firebaseWrapper";
import {DynamicFieldSet} from "./DynamicFieldSet";

export const Home = () => {
    const history = useHistory();
    const auth = useAuth();
    const [value, loading, error] = useCollection(
        firebaseWrapper.db.collection("rankings"),
        {
            snapshotListenOptions: {includeMetadataChanges: true}
        }
    );

    return (
        <div>
            <Breakpoints />
            <Progress type="circle" percent={30} width={80} />
            <DynamicFieldSet />
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <Spin />}
            {value && (
                <span>
                    {auth.currentUser && <span>{auth.currentUser.email}</span>}
                    {value.docs.map((doc) => (
                        <React.Fragment key={doc.id}>
                            {JSON.stringify(doc.data())},{" "}
                        </React.Fragment>
                    ))}
                </span>
            )}
        </div>
    );
};
