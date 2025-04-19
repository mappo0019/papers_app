import { useNavigate } from "react-router-dom";
import "../styles/Login.css"
import Boton from "./Boton.jsx"

export function LoginForm(){

    const navigate = useNavigate();

    var loginuser = {};

    async function submit(){

        try{
            var user = document.getElementById('us').value;
            var passwd = document.getElementById('passwd').value;
            let promise = await fetch(`http://localhost:5154/api/login/us?user=${user}`);
            let result =await promise.json();
            loginuser = await result;
            
            if(loginuser.Id != null){
                if(user === loginuser.user && passwd == loginuser.password){
                    let promise2 = await fetch(`http://localhost:5154/api/users/us?name=${user}`);
                    let result2 =await promise2.json();
                    var rol = await result2.rol;
                    
                    if(rol != null){
                        if(rol === true){
                            navigate(`/creator_main/${await result2.Id}`);  
                        }
                        else{
                            navigate(`/watcher_main/${await result2.Id}`);
                        }
                    }
                    else{
                        alert("Error: Usuario o contraseña son inválido(s)")
                    }
                    
                }
                else{
                    alert("Error: Usuario o contraseña son inválido(s)")
                }
            }
            else{
                alert("Error: Usuario o contraseña son inválido(s)")
            }
        } catch(error){
            console.error("Error fetching data:", error);
        }
            
        
    }

    return(
        <>
        <div className="login_form">

            <div className="form_cnt">
                <label htmlFor="user" className="titulo_form">User:</label>
                <input id ="us" type="text" className="input_login" place required/>
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