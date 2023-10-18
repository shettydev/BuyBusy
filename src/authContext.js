import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseInit";
import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ********* Create an authentication context *********
export const authContext = createContext();

// Custom hook to access the authentication context
export function useAuthValue() {
  const value = useContext(authContext);
  return value;
}

// ********* Authentication context component *********
export function AuthContext({ children }) {
 
  const [userList, setUserList] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(null);


  
  // ********* Fetch user data from Firebase Firestore when the 'isLoggedIn' state changes *********
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "buybusy"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUserList(users);
    });
  }, [isLoggedIn]);



  // ********* Function to create a new user *********
  async function createUser(data) {

    const index = userList.findIndex((user) => user.email === data.email);

    if (index !== -1) {
      toast.error(
        "Email already exists. Try again with different email or Sign-in!"
      );
      return;
    }

    const docRef = await addDoc(collection(db, "buybusy"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("User created successfully!");
  }


  // ********* Function to sign in a user *********
  async function signIn(data) {

    const index = userList.findIndex((user) => user.email === data.email);

    if (index === -1) {
      toast.error("Email does not exist. Try again or Sign-up!");
      return false;
    }

    if (userList[index].password === data.password) {
      toast.success(`Welcome!`);
      setLoggedIn(true);
      setUserLoggedIn(userList[index]);

      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {

      toast.error("Incorrect Username or Password!");
      return false;
    }
  }


  // ********* Function to sign out a user *********
  function signOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("index");

    setLoggedIn(false);
    setUserLoggedIn(null);
    toast.error("Signed Out!");
  }

  return (
    <>
      <authContext.Provider
        value={{
          createUser,
          isLoggedIn,
          setLoggedIn,
          signIn,
          userLoggedIn,
          setUserLoggedIn,
          signOut,
        }}
      >
        <ToastContainer />
        {children}
      </authContext.Provider>
    </>
  );
}
