import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../productContext";
import OrderDetail from "../Component/MyOrder/OrderDetail";
import Loader from "../Component/Loader/Loader";
import styles from "../styles/myorder.module.css";


export function MyOrder() {

  const { myorders } = useProductContext();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return (

    <>
      {/* Loading Condition */}
      {isLoading ? (
        <Loader />
      ) : (
        // Page Container
        <div className={styles.mainContainer}>
          {/* Heading */}
          <h1 className={styles.orderHeading}>My Orders</h1>

          {/* Message if orders is Empty */}
          {myorders.length === 0 ? (
            <>
              <h1>Uh oh! Looks like you haven't placed an order with us. Yet...</h1>
              
              {/* Link to Redirect */}
              <Link to="/"> Click on this link to start! </Link>
            </>
          ) : (
            // if contains order then render them one by one
            // order list container
            <div className={styles.orderListContainer}>
              {myorders.map((order, i) => (
                <OrderDetail key={i} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
