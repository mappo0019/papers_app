import { SignInForm } from "../Components/SignInForm";
import "../styles/Login.css"

function SignIn() {
  return (
    <>
      <div className ="login_body">
        <h1>REGÍSTRATE</h1>
        <div className="login_form">
          <SignInForm />
        </div>
        
      </div>
      
    </>
    
  );
}

export default SignIn;