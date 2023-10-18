import styles from "../../styles/home.module.css";

export default function FilterBar(props) {
  const { price, setPrice, setCategory } = props;

  return (
    // Main Container
    <div className={styles.filterBar}>
      {/* Heading */}
      <h1>Filter</h1>

      {/* Price Slider and Range */}
      <div className={styles.priceRange}>

        {/* Sub Heading */}
        <span>Price</span>
        {` => ${price}`}
        <br />

        {/* Slider  */}
        <input
          type="range"
          min="100"
          max="150000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>


      {/* Sort Item by Category */}
      <div className={styles.categoryBox}>
        <span>Category:</span>

        {/* Different Categories */}
        <div>
          {/* Mens category */}
          <input
            type="radio"
            id="men"
            value="men"
            name="category"
            onClick={() => setCategory("men")}
          />
          <label for="men">Men's Fashion</label>

          {/* Womens category */}
          <input
            type="radio"
            id="women"
            value="women"
            name="category"
            onClick={() => setCategory("women")}
          />
          <label for="women">Women's Fashion</label>

          {/* Electronics */}
          <input
            type="radio"
            id="electric"
            value="electric"
            name="category"
            onClick={() => setCategory("electric")}
          />
          <label for="electric">Electronics</label>

          {/* jewellery */}
          <input
            type="radio"
            id="book"
            value="book"
            name="category"
            onClick={() => setCategory("book")}
          />
          <label for="book">Books</label>

          {/* none  */}
          <input
            type="radio"
            id="none"
            value="none"
            name="category"
            onClick={() => setCategory("none")}
          />
          <label for="book">None</label>
        </div>
      </div>
    </div>
  );
}
