import "../styles/WatcherUsers.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WatcherUsers() {

  const {id} = useParams();

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
    let promise = await fetch(`http://localhost:5154/api/projects/${id}`);
    let result =await promise.json();
    setResponse(result.participantes);
    setPrimera(true);
    
  }

  const getUsers = () =>{ 
      response.map(async (participa)=>{
        let promise = await fetch(`http://localhost:5154/api/users/${participa}`);
        let result =await promise.json();
        setUsers(users=> [...users, result]);        
      })   
  }
  return (
    <>
      <div className = "watcher-users">
        <Boton name="Atrás" route={`/watcher_main/${id}`}/>
        <h2>Usuarios:</h2>
        <div>
        {users.map((resp)=>(
          <>
            <Boton className = "" name ={resp.name} route = {`/user_list/${resp.openAlex_id}`}></Boton>
            <br></br>
          </>
          
        ))}
        </div>
      </div>
    </>
    
  );
  }
  
  export default WatcherUsers;