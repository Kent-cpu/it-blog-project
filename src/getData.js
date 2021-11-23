import firebase from "firebase/compat";

export const getData = async (nameCollection) => {
    let data = null;
    await firebase.firestore()
        .collection(nameCollection)
        .get()
        .then((snippetsSnapshot) => {
            data = snippetsSnapshot.docs.map(doc => doc.data());
            return data;
        });
    return data;
}