import {message} from "antd";
import * as firebase from "firebase/app";
import * as React from "react";
import {v4 as uuidv4} from "uuid";
import {useAuth} from "../components/AuthProvider";
import firebaseWrapper from "../services/firebaseWrapper";
import {Progress} from "antd/es";

export const UploadView = () => {
    const [fileUrl, setFileUrl] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const auth = useAuth();

    const onFileChange = async (e: any) => {
        const file: File = e.target.files[0];
        const size = file.size;
        const storageRef = firebaseWrapper.storage.ref();
        const id = uuidv4();
        const fileRef = storageRef.child(id);
        const task = fileRef.put(file);

        const bearerToken = await firebaseWrapper.getBearerToken();
        console.log("Bearer :" + bearerToken);

        task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: firebase.storage.UploadTaskSnapshot) => {
                console.log(snapshot.bytesTransferred);
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        setProgress(
                            Math.round((snapshot.bytesTransferred / size) * 100)
                        );
                        break;
                }
            },
            (error: any) => {
                console.log(error);
            },
            () => {
                message.info("done");
                task.snapshot.ref
                    .getDownloadURL()
                    .then((downloadURL) => setFileUrl(downloadURL));
            }
        );
        // setFileUrl(await fileRef.getDownloadURL());
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(fileUrl);
    };
    return (
        <div>
            {auth.currentUser && <span>{auth.currentUser.email}</span>}
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <Progress type="circle" percent={progress} />
                <button>Submit</button>
            </form>
        </div>
    );
};
