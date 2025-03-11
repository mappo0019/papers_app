import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WatcherUsers() {

    const {id} = useParams();

  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(()=>{
    
  //AQUI SACAR LOS USUARIOS CON LOS IDS
    searchUsers();;
  }, [])

  const searchUsers = async ()=>{
    let promise = await fetch(`http://localhost:5154/api/projects/${id}`);
    let result =await promise.json();
    setResponse(result.participantes);
  }

  const getUsers = () =>{
      response.map(async (participa)=>{
        let promise = await fetch(`http://localhost:5154/api/users/${participa}`);
      let result =await promise.json();
      if(users.length < 2){
        setUsers([...users, result]);
      }
      })   
  }

  getUsers();

    return (
      <div>
        {users.map((resp)=>(
                <Boton name ={resp.name} route = {`/project_list/${resp.openAlex_id}`}></Boton>
              ))}
      </div>
    );
  }
  
  export default WatcherUsers;