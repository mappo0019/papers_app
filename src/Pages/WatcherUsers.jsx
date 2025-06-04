import "../styles/Watcher.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WatcherUsers() {

  const {proj_id} = useParams();

  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState([]);
  const [primera, setPrimera] = useState(false);

  useEffect(()=>{
    
    searchUsers();

  }, [])

  useEffect(()=>{
      getUsers();
  
    }, [primera])

  const searchUsers = async ()=>{
    let promise = await fetch(`http://localhost:5154/api/projects/${proj_id}`);
    let result =await promise.json();
    setResponse(result.participantes);
    setPrimera(true);
    
  }

  const getUsers = () =>{ 
      localStorage.setItem("projId", proj_id)
      response.map(async (participa)=>{
        let promise = await fetch(`http://localhost:5154/api/users/${participa}`);
        let result =await promise.json();
        setUsers(users=> [...users, result]);        
      })   
  }

  function salir(){
    localStorage.removeItem("projId");
  }
  return (
    <>
      <div className = "cabecera">
        <Boton class = "back_btn" name="↩" route={`/watcher_main/`} onClickAlto={salir}/>
        <h2>Usuarios:</h2>
        </div>
        <div className = "watcher_body">
        {users.map((resp)=>(
          <>
            <Boton class = "good_btn" className = "" name ={resp.name} route = {`/user_list/${resp.openAlex_id}`}></Boton>
            <br></br>
          </>
          
        ))}
        </div>
    </>
    
  );
  }
  
  export default WatcherUsers;