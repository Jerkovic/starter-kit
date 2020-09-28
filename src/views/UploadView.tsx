import {message} from "antd";
import * as firebase from "firebase/app";
import * as React from "react";
import {v4 as uuidv4} from "uuid";
import {useAuth} from "../components/AuthProvider";
import firebaseWrapper from "../services/firebaseWrapper";

export const UploadView = () => {
    const [fileUrl, setFileUrl] = React.useState(null);
    const currentUser = useAuth();

    const onFileChange = async (e: any) => {
        const file: File = e.target.files[0];
        const storageRef = firebaseWrapper.storage.ref();
        const id = uuidv4();
        const fileRef = storageRef.child(id);
        const task = fileRef.put(file);
        task.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: firebase.storage.UploadTaskSnapshot) => {
                console.log(snapshot.bytesTransferred);
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log("Upload is paused");
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log("Upload is running");
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
            {currentUser && <span>{currentUser.email}</span>}
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button>Submit</button>
            </form>
        </div>
    );
};
