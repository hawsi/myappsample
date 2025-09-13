// Manages local component state (data that changes over time).
// Allows you to store and update data inside a component.
import React, {useState} from "react";
// Redirects users programmatically to different routes.
// Programmatically navigate (redirect) to another route/page inside your app.
// Provides routing system for navigation between pages in React apps.  react-router-dom
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";


function LoginPage(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error,setError] = useState('')
 const navigate = useNavigate();    // baanu update

const handleSubmit = async (e) => {
    // the method e.preventDefault() is used to stop the default behavior of an event from happening in the browser.
    // Normally, when you perform certain actions in the browser (like submitting a form, clicking a link, etc.), the browser has built-in default behaviors: 
    //Form submission (<form>) → refreshes/reloads the page. Anchor tag (<a>) → navigates to the URL in href.
    //Checkbox/radio buttons → toggle their checked state automatically.
    //If you don’t want that automatic behavior (because you want to handle it your own way in React), you call e.preventDefault() inside your event handler.
    
    e.preventDefault();

    try{
       //  console.log(userData)
        const userData = await UserService.login(email, password)
        console.log(userData)
        if(userData.token){
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            console.log();
        //    navigate("/") baanu
            navigate('/profile')
         // return <navigate to = `/profile` />;
        }else{
            setError(userData.message)
        }
    }catch (error){
        console.log(error)
    //    return <div>{"Login Please"}</div>;
       setError(error.message)
        setTimeout(()=>{setError('');
        }, 5000);
    }
}


return(
    <div className="auth-container">
        <h2>Login Hi</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Emai: </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
)

}

export default LoginPage;
