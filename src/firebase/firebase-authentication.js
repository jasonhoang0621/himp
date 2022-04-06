import { app } from './firebase-config'
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateEmail, updatePassword, signOut
    , sendPasswordResetEmail
    , updateProfile,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
} from "firebase/auth";


export const auth = getAuth(app)

 onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      user? localStorage.setItem('authUser', JSON.stringify(user)): localStorage.removeItem('authUser')
    } else {
      localStorage.removeItem('authUser')
    }
});


export const Login = async (email, password) => {
    try {
        setPersistence(auth, browserSessionPersistence)
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return user
    } catch (error) {
        
        return null
    }

}

export const SignUp = async (email, password,name) => {
    try {

        await createUserWithEmailAndPassword(auth, email, password)
        const userCredential=await UpdateProfile(name);
        const user = userCredential.user

        return user
    } catch (error) {

        console.log(error)
        return null
    }

}
export const UpdateEmail = async (oldEmail) => {
    try {
        await updateEmail(auth.currentUser, oldEmail)
    } catch (error) {
        console.log(error)
    }
}
export const ChangePassword = async (newPass) => {
    try {
        await updatePassword(auth.currentUser, newPass)
    } catch (error) {
        console.log(error)
    }
}
export const SignOut = async () => {
    await signOut(auth)
}
export const UpdateProfile = async (name) => {
    console.log(auth.currentUser);
    try {
        await updateProfile(auth.currentUser, {
            displayName: name,

        })
        return auth.currentUser
    } catch (error) {
        console.log("FAILED UPDATE")
        return null
    }
}
export const Forgot = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        return 1;

    } catch (error) {
        return null
    }
}

export const UpdatePassword= async (newPassword)=>{
    try{
        const user = await updatePassword(auth.currentUser, newPassword)
        return user;
    }catch(error){
        console.log(error);
        return null
    }
    
}
export default auth