import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where, getDoc,deleteDoc } from "firebase/firestore";
import { app } from "./firebase-config";

const db = getFirestore(app);


export const User = {
    getStateUser: async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            let result = null;
            querySnapshot.forEach((doc) => {
                result = {
                    state: doc.data().state,
                    role: doc.data().role
                }

            });
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    addUser: async (data) => {
        try {
            const docRef = await addDoc(collection(db, "users"), data)

            return docRef
        } catch (error) {
            console.log(error);
        }
    },
    updateName: async (email, name) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            let id = null;
            querySnapshot.forEach((doc) => {
                id = doc.id
            });
            const nameDoc = doc(db, "users", id)
            await updateDoc(nameDoc, {
                name: name
            })

        } catch (error) {
            console.log(error)
        }
    },
    getUser: async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            let result = null;
            querySnapshot.forEach((doc) => {
                result = doc.id
                return result;
            });
            return result;
        } catch (error) {
            console.log(error)
        }
    },
    getListUser: async () => {
        try {
            let list = []
            let user = null
            let result = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach(async (doc) => {
                if (doc.data().role !== true) {
                    user = {
                        id: doc.id,
                        name: doc.data().name,
                        email: doc.data().email,
                        state: doc.data().state
                    }
                    list.push(user)
                }
            });
            for (let i = 0; i < list.length; i++) {
                result.push(list[i])
            }
            return result

        } catch (error) {
            console.log(error)
            return null
        }
    },
    blockUser: async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            let id = null;
            querySnapshot.forEach((doc) => {
                id = doc.id
            });
            const nameDoc = doc(db, "users", id)
            await updateDoc(nameDoc, {
                state: false
            })
        } catch (error) {
            console.log(error)
        }
    },
    unblockUser: async (email) => {
        try {
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            let id = null;
            querySnapshot.forEach((doc) => {
                id = doc.id
            });
            const nameDoc = doc(db, "users", id)
            await updateDoc(nameDoc, {
                state: true
            })
        } catch (error) {
            console.log(error)
        }
    },
    getUserById: async (documentId) => {
        try {
            const user = await (getDoc(doc(db, "users", documentId)))
            return user.data()
        } catch (error) {
            console.log(error)
        }
    }
}
export const Favourite = {
    createFavorite: async (email) => {
        const id = await User.getUser(email)
        const favorite = {
            idNguoiDung: id,
            movies: []
        }
        await addDoc(collection(db, "favourite"), favorite)
    },
    getFavourite: async (email) => {
        try {
            const userID = await User.getUser(email)
            console.log("123 " + userID)
            const q = query(collection(db, "favourite"), where("idNguoiDung", "==", userID))
            const querySnapshot = await getDocs(q)
            let result = []
            querySnapshot.forEach(doc => {
                result = doc.data().movies
            })
            return result

        } catch (error) {
            console.log(error)
        }

    },
    postFavourite: async (email, id, category) => {
        try {

            const userID = await User.getUser(email)
            console.log(userID)
            const q = query(collection(db, "favourite"), where("idNguoiDung", "==", userID))
            const querySnapshot = await getDocs(q)
            let result = null;
            let listID = null
            querySnapshot.forEach((doc) => {
                result = doc.data().movies
                listID = doc.id
            });
            const phim = {
                id: id,
                category: category
            }
            let check = -1
            for (let i = 0; i < result.length; i++) {
                if (result[i].id === phim.id) {
                    check = i
                }
            }


            if (check !== -1) {
                result.splice(check, 1)
                console.log(result)
                const favouriteDoc = doc(db, "favourite", listID)
                await updateDoc(favouriteDoc, {
                    "movies": result
                })
                return true
            }
            else {
                result.push(phim)
                console.log(listID)
                const favouriteDoc = doc(db, "favourite", listID)
                console.log(result)
                await updateDoc(favouriteDoc, {
                    movies: result
                })
                return false
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const Comments = {
    getOneComment: async (commentID) => {
        const docRef = doc(db, "comments", commentID);
        const docSnap = await getDoc(docRef);
        const tmp = await User.getUserById(docSnap.data().idNguoiDung)
        const result = {
            id: commentID,
            email: tmp.email,
            name: tmp.name,
            content: docSnap.data().content
        }
        return result
    },
    getAllComments: async (id) => {
        const q = query(collection(db, "comments"), where("idPhim", "==", id))
        const querySnapshot = await getDocs(q)
        const result = []

        try {
            querySnapshot.forEach((doc) => {
                let comment = {
                    id: doc.id,
                    userID: doc.data().idNguoiDung,
                    content: doc.data().content,
                    email: "",
                    name: "",
                    replies: doc.data().Reply,
                    date: doc.data().date
                }
                result.push(comment)
            })
            for (let i = 0; i < result.length; i++) {
                const user = await User.getUserById(result[i].userID)
                result[i].email = user.email;
                result[i].name = user.name;
                for (let j = 0; j < result[i].replies.length; j++) {
                    const reply = await Comments.getOneComment(result[i].replies[j])
                    result[i].replies[j] = reply
                }
            }
            for (let i = 0; i < result.length-1; i++) {
                for(let k =i+1;k<result.length;k++){
                    if(result[i].date<result[k].date){
                        let tmp = result[i]
                        result[i] = result[k]
                        result[k]=tmp
                    }
                }
            }
            console.log(result)
            return result
        } catch (error) {
            console.log(error)
        }


        return result.reverse()

    },
    postComment: async (email, content, idPhim) => {
        try {
            const user = await User.getUser(email)
            if (!user)
                return
            const comment = {
                idNguoiDung: user,
                idPhim:idPhim,
                content:content,
                Reply:[],
                date: new Date()
            }
            const docRef = await addDoc(collection(db, "comments"), comment)
            return docRef

        } catch (error) {
            console.log(error)
            return null
        }
    },
    postReply: async (email, content, idRoot) => {
        try {
            const user = await User.getUser(email)
            if (!user)
                return
            const comment = {
                idNguoiDung: user,
                idPhim: null,
                content: content,
                Reply: []
            }
            const docRef = await addDoc(collection(db, "comments"), comment)
            const rootComment = await (getDoc(doc(db, "comments", idRoot)))
            let result = []
            result = rootComment.data().Reply
            result.push(docRef.id)
            const commentDoc = doc(db, "comments", idRoot)
            await updateDoc(commentDoc, {
                Reply: result
            })
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    },
    Delete:async (id,idRoot)=>{
        try{
            const Comment = await (getDoc(doc(db, "comments", id)))
            let result = Comment.data()
            console.log(result)
            if(result.idPhim===null)
            {
                await deleteDoc(doc(db, "comments", id));
                console.log(idRoot)
                const rootComment = await (getDoc(doc(db, "comments", idRoot)))
                let newReply = []
                let tmp = rootComment.data().Reply
                console.log(tmp)
                for(let i = 0;i < tmp.length;i++){
                    if(tmp[i]!==id){
                        newReply.push(tmp[i])
                    }
                }
                console.log(newReply)
                const commentDoc = doc(db, "comments", idRoot)
                await updateDoc(commentDoc, {
                    Reply: newReply
                })
                return 
            }
            else{
                for(let i = 0;i < result.Reply.length;i++){
                    await deleteDoc(doc(db, "comments", result.Reply[i]));
                }
                await deleteDoc(doc(db, "comments", id));
            }
        }catch(error){
            console.log(error)
            return null
        }
    }
}
export default db