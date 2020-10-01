const firestoreService = require("firestore-export-import");
const serviceAccount = require("./config/serviceAccount.json");

const jsonToFirestore = async () => {
    try {
        const databaseUrl = "https://fixi-backend.firebaseio.com";
        await firestoreService.initializeApp(serviceAccount, databaseUrl);
        await firestoreService.restore("./users.json");
    } catch (error) {
        console.log(error);
    }
};

jsonToFirestore().then(() => "done");
