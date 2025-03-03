import { useNavigate } from "react-router-dom";
import "../styles/Login.css"
import Boton from "./Boton.jsx"

export function LoginForm(){

    const navigate = useNavigate();

    function submit(){
        var value = document.getElementById('passwd').value;
        if(value === ""){
            navigate("/creator_main");
        }
        else{
            navigate("/watcher_main");
        }
        
    }

    return(
        <>
        <div className="login_form">

            <div className="form_cnt">
                <label htmlFor="user" className="titulo_form">User:</label>
                <input type="text" className="input_login" place required/>
            </div>

            <div className="form_cnt">
                <label htmlFor="password" className="titulo_form">Password:</label>
                <input id="passwd" type="password" className="input_login" required/>
            </div>

            <div className="form_cnt">
                <Boton name="Log In" onClickAlto={submit} />
            </div>
            
            

        </div>
        
    </>
    );
}