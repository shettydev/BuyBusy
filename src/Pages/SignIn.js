import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/signIn&Up.module.css";
import { useAuthValue } from "../authContext";

// SignIn component
export function SignIn(){
    
    // Access the signIn function from the auth context
    const {signIn}=useAuthValue();

    // Access the navigation function
    const navigate=useNavigate();
    
    // Refs for email and password input fields
    const emailRef=useRef();
    const passwordRef=useRef();

    // Handle the form submission
    async function handleSubmit(e){
        e.preventDefault();

        const data={
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

        const status=await signIn(data);
        
        // Navigate based on the sign-in status
        {status?navigate("/"):navigate("/signin")};        
    }   


    return(
        // Sign In Container
        <div className={styles.container}>
            
            <div className={styles.inputForm}>

                {/* Heading */}
                <h1>Sign In Page</h1>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <input type="email" 
                        placeholder="Enter Email" 
                        required
                        ref={emailRef} />

                    <br />

                    {/* Password */}
                    <input type="password" 
                        placeholder="Enter Password"
                        required
                        ref={passwordRef} />
                    <br />

                    {/* Submit Button */}
                    <button className={styles.theButton} role="button">Sign In</button>
                </form>
                <br /> 
                <span>Or &nbsp;</span>

                {/* Sign Up Link */}
                <NavLink to="/signup">
                   Sign Up Instead
                </NavLink>
            </div>
            
        </div>
    );
}