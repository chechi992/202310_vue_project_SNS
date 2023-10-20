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
    console.log("FbService Register start", userInfo);
    let isRegisterSucessfull = false
    await createUserWithEmailAndPassword(auth, userInfo.value.email, userInfo.value.pwd)
      .then(async (data) => {
        console.log("FbService Register successfull", data);
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
          })
      })
      console.log("FbService Register end", isRegisterSucessfull);
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
    console.log("FbService SignIn start", loginInfo);
    let result;
    await signInWithEmailAndPassword(auth, loginInfo.value.email, loginInfo.value.pwd)
      .then(() => {
        console.log("FbService SignIn successfully ", auth.currentUser)
        result = auth.currentUser;
      })
      .catch((error) => {
        console.error("FbService SignIn Fail: ", error.code)
        result = this.#errMsgResult(error.code);
      })
    console.log("FbService SignIn end", result);
    return result
  }

  //ユーザーログアウト
  signOutAccount = async () => {
    console.log("FbService signOut start");
    let isSignOut = false
    await signOut(auth)
    .then(() => {
      isSignOut = true
    })
    console.log("FbService signOut end", isSignOut);
    return isSignOut
  }
}