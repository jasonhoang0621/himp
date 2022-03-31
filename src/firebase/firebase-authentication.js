import {app} from './firebase-config'
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateEmail,updatePassword,signOut 
,updateProfile   } from "firebase/auth";



export const auth = getAuth(app)

export const Login = async (email, password)=>{
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return user
    }catch (error){
        console.log(error)
        return null
    }
    
}

export const SignUp = async (email, password)=>{
    try{
        console.log("DANG SIGN UP")
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        return user
    }catch (error){
        console.log("FAILED")
        console.log(error)
        return null
    }
    
}
export const UpdateEmail = async (oldEmail)=>{
    try{
        await updateEmail(auth.currentUser,oldEmail)
    }catch(error){
        console.log(error)
    } 
}
export const ChangePassword = async (newPass)=>{
    try{
        await updatePassword(auth.currentUser,newPass)
    }catch(error){
        console.log(error)
    }
}
export const SignOut = async()=>{
    await signOut(auth)
}
export const UpdateProfile = async(name,phone)=>{
    try{
        await updateProfile(auth.currentUser,{            
            displayName: name,
            
        })
        return auth.currentUser
    }catch(error){
        console.log("FAILED UPDATE")
        return null
    }
}

export default auth