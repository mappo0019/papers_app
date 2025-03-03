import { LoginForm } from "../Components/LoginForm";
import "../styles/Login.css"

function Login() {
  return (
    <>
      <div className ="login_body">
        <h1>TITULO DE LA APLICACIÓN</h1>
        <div className="login_form">
          <LoginForm />
        </div>
        
      </div>
      
    </>
    
  );
}

export default Login;