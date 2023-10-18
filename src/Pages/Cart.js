import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../productContext";
import { useAuthValue } from "../authContext";
import CartItem from "../Component/Cart/CartItem";
import Loader from "../Component/Loader/Loader";
import firstStyles from "../styles/home.module.css";
import secondStyles from "../styles/cart.module.css";
import { toast } from "react-toastify";


// Cart component
export function Cart() {

  // State for loading indicator
  const [isLoading, setLoading] = useState(true);

  // Access relevant data and functions from contexts
  const { cart, total, clearCart, purchaseAll, itemInCart } = useProductContext();
  const { userLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  // Simulate loading for 300ms
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);


  // Handle the purchase of all items in the cart
  function handlePurchase() {
    if (itemInCart === 0) {
      toast.error("Nothing to purchase in Cart!!");
      return;
    }

    purchaseAll();
    toast.success("Your order has been Placed!!!");
    navigate("/myorder");
  }

  return (
    <>
      {/* Loading Condition */}
      {isLoading ? (
        <Loader />
      ) : (
        // Cart Container
        <div className={secondStyles.mainContainer}>

          {/* Heading */}
          <div className={secondStyles.header}>

            <div className={secondStyles.userInfo}>
              <h1>
                Hey {userLoggedIn.name}. <small>Make sure to check you cart before purchasing! </small>
              </h1>
            </div>

            {/* Purchase Button and Cart Details */}
            <div className={secondStyles.cartDetail}>
              <div>
                {/* Cart Items */}
                Item: {itemInCart}
                <br />
                {/* Empty Cart Button */}
                <button className={secondStyles.removeAll} onClick={clearCart}>
                 Remove All
                </button>
              </div>

              <div>

                {/* Total Amount */}
                Total Amount: ₹{total}

                <br />

                {/* Purchase Button */}
                <button
                  className={secondStyles.purchaseAll}
                  onClick={handlePurchase}
                >
                  Purchase All
                </button>
              </div>
            </div>
          </div>

          {/* All Cart Items */}
          <div className={firstStyles.itemContainer}>
            
            {/* If Cart is Empty  */}
            {cart.length === 0 ? (
              <h1>OMG! The cart is empty 😱</h1>
            ) : (
              // If Cart is not Empty
              cart.map((product, i) => <CartItem key={i} product={product} />)
            )}
          </div>
        </div>
      )}
    </>
  );
}
