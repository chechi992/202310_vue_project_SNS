import { setDoc, doc } from "firebase/firestore"
import { db, auth } from "../firebaseConfig"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"
import { loginErrStrings } from "../globalStrings"

export class AuthService {
  /**
   * ユーザー登録
   * @param userInfo 対象名前，メール，パスワード
   * @returns 登録結果 ユーザ情報，false
   */
  registerAccount = async (userInfo) => {
    console.log("AuthService Register start", userInfo)
    let isRegisterSucessfull = false
    const registerResult = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.pwd)
    console.log("AuthService Register successfull", registerResult.user)
    if (registerResult.user) {
      //增加userID進去firestore
      const userRef = doc(db, "users", registerResult.user.uid)
      const userDoc = {
        name: userInfo.name,
        email: userInfo.email,
        photoUrl: "",
        followUsersUid: [],
        friendsUid:[],
      }
      await setDoc(userRef, userDoc)
      isRegisterSucessfull = { email: userInfo.email, pwd: userInfo.pwd }
    }
    console.log("AuthService Register end", isRegisterSucessfull)
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
    console.log("AuthService SignIn start email:", loginInfo.email,"pwd : ", loginInfo.pwd)
    let result
    await signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.pwd)
      .then(() => {
        console.log("AuthService SignIn successfully ", auth.currentUser)
        result = auth.currentUser
      })
      .catch((error) => {
        console.error("AuthService SignIn Fail: ", error.code)
        result = this.#errMsgResult(error.code)
      })
    console.log("AuthService SignIn end", result.uid)
    return result
  }

  /**
   * ユーザーログアウト
   * @returns true ,false
   */
  signOutAccount = async () => {
    console.log("AuthService signOut start")
    let isSignOut = false
    await signOut(auth).then(() => {
      isSignOut = true
    })
    console.log("AuthService signOut end", isSignOut)
    return isSignOut
  }

  /**
   * アカウント認証メール送る
   * @param currentUser ユーザログインした情報（auth.currentUser）
   */
  sendVerificationMail = async (currentUser) => {
    sendEmailVerification(currentUser).then(() => {
      // 驗證電子郵件已成功發送
      console.log("Verification email sent!")
    })
  }
}
