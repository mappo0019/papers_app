import Boton from "../Components/Boton";
import { LoginForm } from "../Components/LoginForm";
import "../styles/Login.css"

function Login() {
  return (
    <>
      <div className ="login_body">
        <h1>PAPERS APP</h1>
        <Boton name="¿No tienes cuenta?" route="/sign_in" />
        <div className="login_form">
          <LoginForm />
        </div>
        
      </div>
      
    </>
    
  );
}

export default Login;