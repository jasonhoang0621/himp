import {app} from "./firebase-config"
import { getFirestore,collection, addDoc,
    query, where, getDocs ,
    doc, updateDoc  } from "firebase/firestore";

const db = getFirestore(app);


export const User = {
    getStateUser: async (email)=>{
        try{
            const q = query(collection(db, "users"), where("email","==",email))
            const querySnapshot = await getDocs(q)
            let result=null;
            querySnapshot.forEach((doc) => {        
                result= {
                    state:doc.data().state,
                    role: doc.data().role
                }

              });
              return result;
        }catch(error){
            console.log(error)
        }
    },
    addUser:async (data)=>{
        try{
            const docRef =await addDoc(collection(db,"users"),data)
    
            return docRef
        }catch(error){
            console.log(error);
        }
    },
    updateName:async (email,name)=>{
        try{
            const q = query(collection(db, "users"), where("email","==",email))
            const querySnapshot = await getDocs(q)
            let id=null;
            querySnapshot.forEach((doc) => {        
                id=doc.id
            });
            const nameDoc = doc(db,"users",id)
            await updateDoc(nameDoc,{
                name:name
            })
            
        }catch(error){
            console.log(error)
        }
    }
}
export default db