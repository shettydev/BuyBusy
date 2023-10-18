import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

// rendering error page
export function Error(){
    const navigate=useNavigate();

    //If any error then redirect to homepage after 3 second
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        },3000);
    },[navigate])

    return(
        // message on screen
        <div style={{textAlign:"center"}}>
            <h1>Oops, Something went wrong !!!</h1>
            <p>redirecting back to homepage... </p>
        </div>

    )
}
