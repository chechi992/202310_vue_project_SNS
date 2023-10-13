import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../firebaseConfig"

export class FbService {
  /**
   * ユーザー登録
   * @param userInfo 対象UID，名前，メール，パスワード
   * @returns 登録結果：true，false
   */
  registerAccount = async (userInfo) => {
    let isRegisterSucessfull = false
    await createUserWithEmailAndPassword(auth, userInfo.value.email, userInfo.value.pwd)
      .then(async (data) => {
        console.log("successfully registered", data)
        //增加userID進去firestore
        const userRef = doc(db, "users", data.user.uid)
        const userDoc = {
          UID: data.user.uid,
          name: userInfo.value.name,
          email: userInfo.value.email
        }
        await setDoc(userRef, userDoc)
          .then(() => {
            isRegisterSucessfull = true
            console.log("User added to Firestore")
          })
          .catch((error) => {
            console.error("Error adding user to Firestore:", error)
          })
      })
      .catch((error) => {
        console.error("Register Fail: ", error.code)
      })
    return new Promise((resolve) => {
      resolve(isRegisterSucessfull)
    })
  }

  //ユーザーログアウト
  signOutAccount = async () => {
    let isSignOut = false
    await signOut(auth).then(() => {
      isSignOut = true
    })
    return new Promise((resolve) => {
      resolve(isSignOut)
    })
  }
}
