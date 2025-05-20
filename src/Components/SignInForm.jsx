import { useNavigate } from "react-router-dom";
import "../styles/Login.css"
import Boton from "./Boton.jsx"

export function SignInForm(){

    const navigate = useNavigate();

    const generarHex24 = () => {
        const array = new Uint8Array(12); // 12 bytes = 24 caracteres hexadecimales
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
      };

    async function submit(){
        var avanza = false;
        var valid_user= checkText(document.getElementById('us').value);
        if(valid_user){
            let prom = await fetch(`http://localhost:5154/api/users/us?username=${document.getElementById('us').value}`);
                if(prom.status !== 200){ 
                    if(document.getElementById('openAlexId').disabled === false){
                        const reg_exp = new RegExp("^[A-Z0-9_-]");
                        var new_id = document.getElementById('openAlexId').value;
                        if (reg_exp.test(new_id)){
                            let promise = await fetch(`https://api.openalex.org/people/${new_id}`);
                            if(promise.status === 200){
                                let promise2 = await fetch(`http://localhost:5154/api/users/open?id=${new_id}`);
                                if(promise2.status !== 200){
                                    avanza = true;
                                }
                                else{
                                    alert("Error: El ID de OpenAlex ya está registrado")
                                }
                            }
                            else{
                                alert ("Error: ID de OpenAlex No Válido")
                            }
                        }
                        else{
                            alert("Error: El ID de OpenAlex no puede contener letras minúsculas")
                        }
                    }
                    else{
                        avanza = true;
                    }

                    if(avanza){    
                        var valid_pass= checkText(document.getElementById('passwd').value);
                        if(valid_pass){
                            if(document.getElementById('check1').checked || document.getElementById('check2').checked){

                                const login={
                                    Id: generarHex24(),
                                    user: document.getElementById('us').value,
                                    password: document.getElementById('passwd').value,

                                }
                                let rol= document.getElementById('check1').checked;

                                let promise = await fetch(`https://api.openalex.org/people/${document.getElementById('openAlexId').value}`);
                                let result = await promise.json();

                                const new_user={
                                        Id: generarHex24(),
                                        openAlex_id: new_id? new_id : "",
                                        username: document.getElementById('us').value,
                                        name: result.display_name? result.display_name : "",
                                        rol: rol,
                                        project: [],
                                        coworkers: []
                                }
                                const posting2 = await fetch("http://localhost:5154/api/login", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                                    body: JSON.stringify(login),
                                  })
                          
                                  const good2 = await posting2.json();
                                  console.log(good2);

                                const posting = await fetch("http://localhost:5154/api/users", {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                                    body: JSON.stringify(new_user),
                                  })
                                  const good = await posting.json();
                                  console.log(good);

                                  
                                  if(rol === true){
                                    localStorage.setItem("userId", await new_user.Id);
                                    navigate(`/creator_intro/`);  
                                }
                                else{
                                    localStorage.setItem("userId", await new_user.Id);
                                    navigate(`/watcher_intro/`);
                                }
                            }
                            else{
                                alert("Error: Debe marcar el rol que quiere desempeñar en esta web")
                            }
                        
                        }
                        else{
                            alert("Error: La contraseña debe tener entre 3 y 15 no puede contener caracteres especiales")
                        }
                    }       
                }
                else{
                    alert("Error: Este nombre de usuario ya existe")
                }

        }
        else{
            alert("Error: El usuario debe tener entre 3 y 15 no puede contener caracteres especiales")
        }
    }

    function checkText(text){
        const reg_exp = new RegExp("^[A-Za-z0-9_-]{3,15}$");

        return reg_exp.test(text);
    }

    function disableBox(){
        if(document.getElementById('check1').checked){
            document.getElementById('check2').disabled = true;
        }
        else
            document.getElementById('check2').disabled = false;

        if(document.getElementById('check2').checked){
            document.getElementById('check1').disabled = true;
            document.getElementById('openAlexId').disabled = true;
        }
        else{
            document.getElementById('check1').disabled = false;
            document.getElementById('openAlexId').disabled = false;
        }
            

    }

    return(
        <>
        <div className="login_form">

            <div className="form_cnt">
                <label htmlFor="user" className="titulo_form">Usuario:</label>
                <input id ="us" type="text" className="input_login" placeholder="Introduza su nombre de usuario" required/>
            </div>

            <div className="form_cnt">
                <label htmlFor="openAlex" className="titulo_form">ID de OpenAlex:</label>
                <input id="openAlexId" type="text" className="input_login" placeholder="Introduzca su ID de OpenAlex" required/>
            </div>

            <div className="form_cnt">
                <label htmlFor="password" className="titulo_form">Password:</label>
                <input id="passwd" type="password" className="input_login" placeholder="Introduzca su contraseña" required/>
            </div>

            <div className="form_cnt">
                <label className="titulo_form">Rol:</label>
                <br></br>
                <input id="check1" type="checkbox" className="input_login" value="Creator" onClick={disableBox}/>
                <label for="creator" className="titulo_form">Creator</label>
                <br></br>
                <input id="check2" type="checkbox" className="input_login" onClick={disableBox} value="Watcher"/>
                <label for="watcher" className="titulo_form">Watcher</label>
            </div>

            <div className="form_cnt">
                <Boton name="Sign In" onClickAlto={submit} />
            </div>

        </div>
    </>
    );
}