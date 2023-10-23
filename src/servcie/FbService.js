import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export class FbService {

    /**
     * ドキュメントからデータ取得する
     * @param {*} collectionName コレクション名
     * @param {*} docName ドキュメント名
     * @returns データ結果、false
     */
    getDataByDocName = async (collectionName, docName) => {
        const docResult = await getDoc(doc(db, collectionName, docName))
        let dataResult
        if (docResult.exists())
            dataResult = docResult.data()
        else
            dataResult = false;

        return dataResult;
    }

    /**
     * データ更新
     * @param {*} collectionName コレクション名
     * @param {*} docName ドキュメント名
     * @param {*} input 更新したい入力値
     */
    updateDataByDocName = async (collectionName, docName, input) => {
        await updateDoc(doc(db, collectionName, docName), { name: input })
    }
}
