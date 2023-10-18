import { useState, useEffect } from "react";
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";
import styles from "../styles/home.module.css";
import Loader from "../Component/Loader/Loader";


export function Home() {
  const [isLoading, setLoading] = useState(true);
  const [applyFilter, setApplyFilter] = useState(false);

  const [price, setPrice] = useState(30000);
  const [category, setCategory] = useState("none");

  const [search, setSearch] = useState("");


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);


  return (
    <>
      {/* Loading Screen Condition */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Page Header */}
          <div className={styles.header}>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Bar & Main Content Container */}
          <div className={styles.mainContainer}>

            {/* Filter Button */}
            <span className={styles.header}><button onClick={() => setApplyFilter(!applyFilter)} role="button">
              {applyFilter ? "Cancel" : "Apply Filter"}
            </button> </span>
            
            {/* Filter Section  */}
            {applyFilter && (
              <FilterBar
                price={price}
                setPrice={setPrice}
                setCategory={setCategory}
              />
            )}

            {/* Products Section */}
            <MainContent
              search={search}
              price={price}
              category={category}
              applyFilter={applyFilter}
            />
          </div>
        </>
      )}
    </>
  );
}
