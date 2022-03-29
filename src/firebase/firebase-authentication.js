import {app} from './firebase-config'
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateEmail,updatePassword,signOut   } from "firebase/auth";
import { Link, useLocation } from 'react-router-dom'

const auth = getAuth(app)

export const Login = async (email, password)=>{
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return (
            <Link to ="/"></Link>
        )
    }catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
    
}

export const Signin = async (email, password)=>{
    try{
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
    }catch (error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
    
}
export const UpdateEmail = async (oldEmail)=>{
    try{
        await updateEmail(auth.currentUser,oldEmail)
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    } 
}
export const ChangePassword = async (newPass)=>{
    try{
        await updatePassword(auth.currentUser,newPass)
    }catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
    }
}
export const SignOut = async()=>{
    await signOut(auth)
}
export const UpdateProfile = async()=>{
    
}