import {Spin} from "antd/es";
import Title from "antd/es/typography/Title";
import * as React from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../services/firestore";

export const Home = () => {
    const [value, loading, error] = useCollection(db.collection("qualifiers"), {
        snapshotListenOptions: {includeMetadataChanges: true}
    });
    return (
        <div>
            <Title level={3}>UI</Title>
            <div>
                {error && <strong>Error: {JSON.stringify(error)}</strong>}
                {loading && <Spin />}
                {value && (
                    <span>
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
