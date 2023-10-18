import { useProductContext } from "../../productContext";
import oldStyles from "../../styles/home.module.css";
import styles from "../../styles/cart.module.css";

export default function CartItem(props) {

  const { name, image, price, category, quantity } = props.product;

  const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();

  return (
    <>
      {/* Item Container */}
      <div className={oldStyles.cardContainer}>
        {/* Image container */}
        <div className={styles.imageContainer}>
          {/* Product Image */}
          <img src={image} alt={category} />
        </div>

        {/* Product Description */}
        <div className={styles.itemInfo}>
          {/* Product Name */}
          <div className={styles.namePrice}>{name}</div>

          <div className={styles.priceQuant}>

            {/* Product Quantity */}
            <div className={styles.quantity}>
              
              {/* Quantity Decrease */}
              <span className={styles.minus}>
                <i
                  class="fa-solid fa-circle-minus"
                  onClick={() => decreaseQuant(props.product)}
                ></i>
              </span>

              {/* Quantity */}
              &nbsp; {quantity} &nbsp;

              {/* Quantity Increase */}
              <span className={styles.plus}>
                <i
                  class="fa-solid fa-circle-plus"
                  onClick={() => increaseQuant(props.product)}
                ></i>
              </span>
            </div>

            {/* Product Price */}
            <div className={styles.price}>₹{price}</div>
          </div>

          {/* Cart Remove Button  */}
          <div className={styles.btnContainer}>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(props.product)}
              role="button"
            >
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
