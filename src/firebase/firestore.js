import {app} from "./firebase-config"
import { getFirestore,collection, addDoc,
    query, where, getDocs ,
    doc, updateDoc  } from "firebase/firestore";
import { async } from "@firebase/util";

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
    },
    getUser:async (email)=>{
        try{
            const q = query(collection(db, "users"), where("email","==",email))
            const querySnapshot = await getDocs(q)
            let result=null;
            querySnapshot.forEach((doc) => {        
                result= doc.id
                return result;
              });
              return result;
        }catch(error){
            console.log(error)
        }
    },
    getListUser:async ()=>{
        try{
            let list=[]
            let user=null
            let result = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(async (doc) => {
                if(doc.data().role!==true){
                    user = {
                        id:doc.id,
                        name: doc.data().name,
                        email:doc.data().email,
                        state:doc.data().state
                    }
                    list.push(user)
                }       
            });
            for (let i =0;i< list.length;i++){
                result.push(list[i])
            }
            return result

        }catch(error){
            console.log(error)
            return null
        }
    },
    blockUser:async(email)=>{
        try{
            const q = query(collection(db, "users"), where("email","==",email))
            const querySnapshot = await getDocs(q)
            let id=null;
            querySnapshot.forEach((doc) => {        
                id=doc.id
            });
            const nameDoc = doc(db,"users",id)
            await updateDoc(nameDoc,{
                state:false
            })
        }catch(error){
            console.log(error)
        }
    },
    unblockUser:async(email)=>{
        try{
            const q = query(collection(db, "users"), where("email","==",email))
            const querySnapshot = await getDocs(q)
            let id=null;
            querySnapshot.forEach((doc) => {        
                id=doc.id
            });
            const nameDoc = doc(db,"users",id)
            await updateDoc(nameDoc,{
                state:true
            })
        }catch(error){
            console.log(error)
        }
    }
}
export const Favourite = {
    postFavourite:async (email,id)=>{
        try{
            const userID = await User.getUser(email)
            const q = query(collection(db, "favourite"), where("idNguoiDung","==",userID))
            const querySnapshot = await getDocs(q)
            let result=null;
            let listID = null
            querySnapshot.forEach((doc) => {        
                result= doc.data().movies
                listID = doc.id  
              });
            console.log(id)
            if(result.includes(id)){
                return 
            }
            else{
                result.push(id)
                const favouriteDoc = doc(db,"favourite",listID)
                await updateDoc(favouriteDoc,{
                    movies:result
                })
            }
            
        }catch(error){
            console.log(error)
        }
    }
}
export default db