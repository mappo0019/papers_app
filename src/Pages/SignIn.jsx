import Boton from "../Components/Boton";
import { SignInForm } from "../Components/SignInForm";
import "../styles/Login.css"

function SignIn() {
  return (
    <>
      <div className ="login_body">
        <div className = "cabecera">
        <Boton class = "back_btn" name="↩" route="/"/>
        <h1>REGÍSTRATE</h1>
        </div>
        <br></br>
        <div className="body_login_form">
          <SignInForm />
        </div>
        
      </div>
      
    </>
    
  );
}

export default SignIn;