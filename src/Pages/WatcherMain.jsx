import "../styles/Watcher.css"
import { useEffect, useState } from "react";
import FichaProyecto from "../Components/FichaProyecto";
import Boton from "../Components/Boton";

function WatcherMain() {
  

  const [response, setResponse] = useState([]);
  var cont = 0;

  useEffect(()=>{
    const searchProjects = async ()=>{
      let prom = await fetch(`http://localhost:5000/api/users/${localStorage.getItem("userId")}`);
      let res = await prom.json();
      
      for(let i = 0; i < await res.project.length; i++){
        let promise = await fetch(`http://localhost:5000/api/projects/${res.project[i]}`);
        let result =await promise.json();
        setResponse(response=> [...response, result]);
      }
      
  }
  if(cont === 0){
    searchProjects();
    cont++;
  }
  
  }, [])

    return (
      <>
        <div className ="cabecera">
          <Boton class = "back_btn" name="↩" route={`/watcher_intro`}/>
          <h2>PROYECTOS SEGUIDOS</h2>
          </div>
          <div className = "watcher_body">
          <div>
          {response.map((resp)=>(
            <>
            <FichaProyecto name ={resp.name} bot_name1="Ver Investigadores" route1 = {`/watcher_users/${resp.Id}`} bot_name2= "Ver Proyecto" route2 = {`/project_list/${resp.Id}`}/>
            </>
                  
                ))}
        </div>
        </div>
        
      </>
      
    );
  }
  
  export default WatcherMain;