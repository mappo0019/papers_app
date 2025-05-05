import "../styles/WatcherMain.css"
import { useEffect, useState } from "react";
import FichaProyecto from "../Components/FichaProyecto";
import { useParams } from "react-router-dom";
import Boton from "../Components/Boton";

function WatcherMain() {
  
  const {id} = useParams();

  const [response, setResponse] = useState([]);
  var cont = 0;

  useEffect(()=>{
    const searchProjects = async ()=>{
      let prom = await fetch(`http://localhost:5154/api/users/${id}`);
      let res = await prom.json();
      
      for(let i = 0; i < await res.project.length; i++){
        let promise = await fetch(`http://localhost:5154/api/projects/${res.project[i]}`);
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
        <div className = "watcher-body">
          <Boton name="Atrás" route={`/watcher_intro/${id}`}/>
          <h2>PROYECTOS A LOS QUE SIGUES</h2>
          <div>
          {response.map((resp)=>(
            <>
            <FichaProyecto name ={resp.name} bot_name1="Ver Investigadores" route1 = {`/watcher_users/${resp.Id}`} bot_name2= "Ver Papers del Proyecto" route2 = {`/graph_data/${resp.Id}/project/-`}/>
            </>
                  
                ))}
        </div>
        </div>
        
      </>
      
    );
  }
  
  export default WatcherMain;