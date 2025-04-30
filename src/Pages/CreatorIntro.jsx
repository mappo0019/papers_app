import "../styles/WatcherMain.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import FichaProyecto from "../Components/FichaProyecto";
import { useParams } from "react-router-dom";

function CreatorIntro() {

    const {id} = useParams();
  
  const [response, setResponse] = useState([]);

  useEffect(()=>{
    const searchProjects = async ()=>{
      let promise = await fetch(`http://localhost:5154/api/projects/us?user=${id}`);
      let result =await promise.json();
      setResponse(result);
  }

  searchProjects();
  }, [])

    return (
      <>
        <div className = "watcher-body">
          <h2>TUS PROYECTOS</h2>
          <div>
          {response.map((resp)=>(
            <>
            <FichaProyecto name ={resp.name} bot_name1="Editar Proyecto" route1 = {`/watcher_users/${resp.Id}`} bot_name2="Eliminar Proyecto" route2 = {`/graph_data/${resp.Id}/project/-`}/>
            </>
                  
                ))}
        </div>
        <Boton name="Nuevo Proyecto" route={`/creator_main/${id}`} />
        </div>
        
      </>
      
    );
  }
  
  export default CreatorIntro;