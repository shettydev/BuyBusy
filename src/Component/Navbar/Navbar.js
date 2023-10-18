import { useAuthValue } from "../../authContext";
import styles from "../../styles/navbar.module.css";
import { Outlet, NavLink } from "react-router-dom";
import LogoImage from "../../Assets/ecommerce.png"

// Navbar component
export default function Navbar() {

  // Access the authentication context
  const { isLoggedIn, signOut, userLoggedIn } = useAuthValue();

  return (
    <>
      {/* Navbar Container */}
      <div className={styles.navbarContainer}>

      {/* Welcome Message */}
      <div className={styles.welcomeMsg}>
        {isLoggedIn && (
              <span>
                {/* <i class="fa-regular fa-hand"></i> */}
                <span class="material-symbols-outlined">waving_hand</span> &nbsp;
                Welcome, {userLoggedIn.name} 
              </span>
          )}
        </div>

        {/* Logo and Title */}
        <div className={styles.appName}>
          <NavLink to="/">
            <img src={LogoImage} alt="logo" />
            <div>Buy Busy</div>
          </NavLink>
        </div>

        {/* Navbar controls */}
        <div className={styles.navLinks}>

          <NavLink to="/">
            <span>
            Home &nbsp;
            <i class="fa-solid fa-house-user"></i> 
              
            </span>
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/myorder">
              <span>
                My Order &nbsp;
                <i className="fa-solid fa-bag-shopping"></i> 
                
              </span>
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink to="/cart">
              <span>
                Cart &nbsp;
                <i className="fa-sharp fa-solid fa-cart-shopping"></i> 
                
              </span>
            </NavLink>
          )}


          <NavLink to={!isLoggedIn ? "/signin" : "/"}>
            <span>
              {!isLoggedIn ? (
                <>
                  SignIn &nbsp;
                  <i className="fa-solid fa-right-to-bracket"></i> 
                </>
              ) : (
                <>
                  <span onClick={signOut}>LogOut</span> &nbsp;
                  <i className="fa-solid fa-right-from-bracket"></i> 
                </>
              )}
            </span>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </>
  );
}
