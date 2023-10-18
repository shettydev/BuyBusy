import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { MyOrder } from "./Pages/MyOrder";
import { Cart } from "./Pages/Cart";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Error } from "./Pages/Error";

// ********* Main App component *********
function App() {

  const redirectToSignIn = () => {
    window.location.href = "/signin";
  }

  // ********* Defining the routes and page components *********
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "/myorder", element: <MyOrder /> },
        { 
          path: "/cart", 
          element:  <Cart />
        },
        { 
          path: "/signin", 
          element: <SignIn />
        },
        { 
          path: "/signup", 
          element: <SignUp /> 
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContext>

        <ProductContext redirectToSignIn={redirectToSignIn}>

          <RouterProvider router={router} />
          
        </ProductContext>

      </AuthContext>
    </>
  );
}

export default App;
