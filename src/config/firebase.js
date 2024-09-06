
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4wNWqL-be0bBwmE9kAegxk-6z4dSNoOY",
  authDomain: "chat-app-gs-16ca6.firebaseapp.com",
  projectId: "chat-app-gs-16ca6",
  storageBucket: "chat-app-gs-16ca6.appspot.com",
  messagingSenderId: "514402674175",
  appId: "1:514402674175:web:3b534ebbe1ced7d91bf3ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
     try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()

        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
     } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const login = async (email,password) => {
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
 
}

export {signup,login,logout,auth,db}
