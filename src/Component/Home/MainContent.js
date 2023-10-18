import styles from "../../styles/home.module.css";
import ItemCard from "./ItemCard";
import { useProductContext } from "../../productContext";

export default function MainContent(props) {

  const { search, price, category, applyFilter } = props;

  const { data } = useProductContext();

  return (
    <div className={styles.itemContainer}>
      {/* Filter Button for the Search Bar */}
      {data
        .filter((item) => {
          return search.toLocaleLowerCase() === ""
            ? item
            : item.name.toLocaleLowerCase().includes(search);
        })

        // Price Range Based Filter
        .filter((item) => {
          return !applyFilter ? item : item.price <= price;
        })
        // Category Based Filter
        .filter((item) => {
          return !applyFilter || category === "none"
            ? item
            : item.category === category;
        })
        .map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
    </div>
  );
}
