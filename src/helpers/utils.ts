import {useEffect, useState} from "react";

export const useBeforeUnload = (isDirty: boolean) => {
    const [isAssigned, setAssigned] = useState<boolean>(false);

    const handleBeforeUnload = (evt: BeforeUnloadEvent) => {
        evt.returnValue =
            "You have unsaved changes, are you sure you want to leave?";
    };
    useEffect(() => {
        if (isDirty && !isAssigned) {
            window.onbeforeunload = handleBeforeUnload;
            setAssigned(true);
        }
        console.log("dirty  " + isDirty);
    }, [isDirty, isAssigned]);

    useEffect(() => {
        return () => {
            window.onbeforeunload = null;
        };
    }, []);
};
