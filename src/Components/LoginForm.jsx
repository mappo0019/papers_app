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
            let promise = await fetch(`http://localhost:5000/api/login/us?user=${user}`);
            let result =await promise.json();
            loginuser = await result;
            
            if(loginuser.Id != null){
                if(user === loginuser.user && passwd == loginuser.password){
                    let promise2 = await fetch(`http://localhost:5000/api/users/us?username=${user}`);
                    let result2 =await promise2.json();
                    var rol = await result2.rol;
                    
                    if(rol != null){
                        if(rol === true){
                            localStorage.setItem("userId", await result2.Id);
                            navigate(`/creator_intro/`);  
                        }
                        else{
                            localStorage.setItem("userId", await result2.Id);
                            navigate(`/watcher_intro/`);
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
        <div className="container">

            <div className="form_cnt">
                <input placeholder= "User" id ="us" type="text" className="input_login" place required/>
            </div>

            <div className="form_cnt">
                <input placeholder= "Password" id="passwd" type="password" className="input_login" required/>
            </div>
            <Boton class ="neutral_btn" name="Log In" onClickAlto={submit} />

            <a href="/sign_in"> <p> ¿No tienes una cuenta? ¡Regístrate! </p></a>
            
            

        </div>
        
    </>
    );
}