import * as React from "react";
import {v4 as uuidv4} from "uuid";
import {AuthContext} from "../components/AuthProvider";
import firebase from "../services/firebase";

export const Upload = () => {
    const [fileUrl, setFileUrl] = React.useState(null);
    const user = React.useContext(AuthContext);

    const onFileChange = async (e: any) => {
        const file: File = e.target.files[0];
        const storageRef = firebase.storage.ref();
        const id = uuidv4();
        const fileRef = storageRef.child(id);
        await fileRef.put(file);
        console.log(file.type);
        setFileUrl(await fileRef.getDownloadURL());
    };
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(fileUrl);
    };
    return (
        <div>
            User:
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button>Submit</button>
            </form>
        </div>
    );
};
