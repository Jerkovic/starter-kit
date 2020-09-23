import {ChangeEvent, FormEvent} from "react";
import * as React from "react";
import {uuidv4} from "../helpers/utils";
import firebase from "../services/firebase";

export const Upload = () => {
    const [fileUrl, setFileUrl] = React.useState(null);

    const onFileChange = async (e: any) => {
        const file: File = e.target.files[0];
        const storageRef = firebase.storage.ref();
        const id = uuidv4();
        const fileRef = storageRef.child(id);
        await fileRef.put(file);
        console.log(file.type);
        setFileUrl(await fileRef.getDownloadURL());
    };
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        alert(fileUrl);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <button>Submit</button>
            </form>
        </div>
    );
};
