import { useProductContext } from "../../productContext";
import styles from "../../styles/home.module.css";

export default function ItemCard(props) {

  const { name, image, price, category } = props.item;
  const { addToCart } = useProductContext();

  return (
    <>
      {/* Card Container */}
      <div className={styles.cardContainer}>

        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img src={image} alt={category} />
        </div>

        {/* Product Description */}
        <div className={styles.itemInfo}>
          <div className={styles.namePrice}>
            {/* Product Name */}
            <div className={styles.name}>{name}</div>

            {/* Product Price */}
            <div className={styles.price}>₹{price}</div>
          </div>

          {/* Add to Cart Button */}
          <div className={styles.btnContainer}>
            <button
              className={styles.addBtn}
              role="button"
              onClick={() => addToCart(props.item)}
            >
              <span className="text">
                Add to Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
