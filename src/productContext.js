import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseInit";
import {
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";
import { data } from "./Assets/data";
import { useAuthValue } from "./authContext";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// ********* Create a product context *********
export const productContext = createContext();


// ********* Custom hook to access the product context *********
export function useProductContext() {
  const value = useContext(productContext);
  return value;
}


// ********* Product context component *********
export function ProductContext({ children, redirectToSignIn }) {

  const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } = useAuthValue();
  const [itemInCart, setItemInCart] = useState(0);
  const [cart, setCart] = useState([]);
  const [myorders, setMyOrders] = useState([]);
  const [total, setTotal] = useState(0);


  // ********* Function to get the current date *********
  function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if(day<10) {
      return `${year}-${month}-${0}${day}`;
    }
    if(month<10) {
      return `${year}-${0}${month}-${day}`;
    }
    return `${year}-${month}-${day}`;
  }


  // ********* Check if a user is already logged in  *********
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      setLoggedIn(token);
      setUserLoggedIn(user);
    }
  }, []);


  // ********* Load user's cart and orders when logged in *********
  useEffect(() => {
    if (isLoggedIn) {
      onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
        setCart(doc.data().cart);
        setMyOrders(doc.data().orders);
      });
  
      let sum = 0;
      cart.map((item) => Number((sum += item.price)));
      setTotal(sum);
      setItemInCart(cart.length);
    }
  }, [userLoggedIn]);


  // ********* Function to increase the quantity of a product in the cart *********
  async function increaseQuant(product) {
    const index = cart.findIndex((item) => item.name === product.name);
    cart[index].quantity++;
    setCart(cart);

    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });

    setItemInCart(itemInCart + 1);
    setTotal(Number(total + cart[index].price));
  }


  // ********* Function to decrease the quantity of a product in the cart *********
  async function decreaseQuant(product) {

    const index = cart.findIndex((item) => item.name === product.name);
    setTotal(Number(total - cart[index].price));

    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    setCart(cart);
    setItemInCart(itemInCart - 1);

    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: cart,
    });
  }


  // ********* Function to add a product to the cart *********
  async function addToCart(product) {

    if (!isLoggedIn) {
      redirectToSignIn();
      return;
    }

    const index = cart.findIndex((item) => item.name === product.name);
    
    if (index !== -1) {
      increaseQuant(cart[index]);
      toast.success("Quantity increased!");
      return;
    }

    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayUnion({ quantity: 1, ...product }),
    });

    setTotal(Number(total + product.price));
    setItemInCart(itemInCart + 1);
    toast.success("Item added to Cart!");
  }


  // ********* Function to remove a product from the cart *********
  async function removeFromCart(product) {
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: arrayRemove(product),
    });

    setTotal(Number(total - product.quantity * product.price));
    setItemInCart(itemInCart - product.quantity);
    toast.success("Item removed from Cart!");
  }


  // ********* Function to clear the entire cart *********
  async function clearCart() {
    if (itemInCart === 0) {
      toast.error("Cart is already empty!");
      return;
    }

    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      cart: [],
    });

    setTotal(0);
    setItemInCart(0);
    toast.success("Cart is empty");
  }


  // ********* Function to purchase all items in the cart *********
  async function purchaseAll() {
    const currentDate = getDate();
    const userRef = doc(db, "buybusy", userLoggedIn.id);
    await updateDoc(userRef, {
      orders: arrayUnion({ date: currentDate, list: cart, amount: total }),
    });

    clearCart();
  }

  return (
    <productContext.Provider
      value={{
        data,
        addToCart,
        cart,
        total,
        setTotal,
        removeFromCart,
        clearCart,
        purchaseAll,
        myorders,
        increaseQuant,
        decreaseQuant,
        itemInCart,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
