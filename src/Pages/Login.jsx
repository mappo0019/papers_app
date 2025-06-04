import Boton from "../Components/Boton";
import { LoginForm } from "../Components/LoginForm";
import "../styles/Login.css"

function Login() {
  return (
    <>
      <div className ="login_body">
        <h1 className = "cabecera">PAPERS APP</h1>
        
        <div className="body_login_form">
          <LoginForm />
        </div>
      </div>  
    </>
    
  );
}

export default Login;