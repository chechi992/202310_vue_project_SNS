import { setDoc, doc } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { loginErrStrings } from "../globalStrings"

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
    return isRegisterSucessfull
  }

  /**
 *ログイン際に取ったエラーメッセージを加工する
 * @param errCode エラーメッセージ
 */
  #errMsgResult = (errMsg) => {
    const errObject = new Map([
      ["auth/invalid-email", loginErrStrings.INVALIDEMAIL],
      ["auth/user-not-found", loginErrStrings.NOTFOUNDUSER],
      ["auth/wrong-password", loginErrStrings.WRONGPWD],
      ["auth/too-many-requests", loginErrStrings.MANYREQUESTS],
      ["auth/invalid-login-credentials", loginErrStrings.INVALIDLOGIN]
    ])
    return errObject.get(errMsg)
  }

  /**
   * ユーザログインする
   * @param loginInfo インプット：email、Password
   * @returns ログイン結果：ユーザー情報、エラーメッセージ
   */
  singnInAccount = async (loginInfo) => {
    let result;
    await signInWithEmailAndPassword(auth, loginInfo.value.email, loginInfo.value.pwd)
      .then(() => {
        console.log("FbService successfully Signin", auth.currentUser)
        result = auth.currentUser;
      })
      .catch((error) => {
        console.error("Login Fail: ", error.code)
        result = this.#errMsgResult(error.code);
      })
    return result
  }

  //ユーザーログアウト
  signOutAccount = async () => {
    let isSignOut = false
    await signOut(auth).then(() => {
      isSignOut = true
    })
    return isSignOut
  }
}