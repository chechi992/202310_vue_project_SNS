import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export class FbService {

    /**
     * 
     * @param {*} docName 
     * @param {*} userUid 
     * @returns 
     */
    getDataByDocName = async (docName, userUid) => {
        const docResult = await getDoc(doc(db, docName, userUid))
        let dataResult
        if (docResult.exists())
            dataResult = docResult.data()
        else
            dataResult = false;

        return dataResult;
    }

    updateDataByDocName = async (docName, userUid, input) => {
        await updateDoc(doc(db, docName, userUid), { name: input })
    }
}
