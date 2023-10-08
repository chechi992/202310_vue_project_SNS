import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebaseConfig"

export class FbService {
  //ユーザー登録
  registerAccount = async (userInfo) => {
    let isRegisterSucessfull = false;
    await createUserWithEmailAndPassword(auth, userInfo.value.email, userInfo.value.pwd)
      .then(async (data) => {
        console.log("successfully registered", data);
        //增加userID進去firestore
        const userRef = collection(db, "users")
        const userDoc = {
          UID: data.user.uid,
          name: userInfo.value.name,
          email: userInfo.value.email
        }
        await addDoc(userRef, userDoc)
          .then(() => {
            isRegisterSucessfull = true;
            console.log("User added to Firestore");
          })
          .catch((error) => {
            console.error("Error adding user to Firestore:", error);
          })
      })
      .catch((error) => {
        console.error("Register Fail: ", error.code);
      })
    return new Promise((resolve) => {
      resolve(isRegisterSucessfull);
    });
  }
}
