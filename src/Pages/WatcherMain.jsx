import "../styles/WatcherMain.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import FichaProyecto from "../Components/FichaProyecto";

function WatcherMain() {

  const [input, setInput] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(()=>{
    const searchProjects = async ()=>{
      let promise = await fetch(`http://localhost:5154/api/projects`);
      let result =await promise.json();
      setResponse(result);
  }

  searchProjects();
  }, [])

    return (
      <>
        <div className = "watcher-body">
          <h2>PROYECTOS A LOS QUE SIGUES</h2>
          <div>
          {response.map((resp)=>(
                  <FichaProyecto name ={resp.name} route = {`/watcher_users/${resp.Id}`}/>
                ))}
        </div>
        </div>
        
      </>
      
    );
  }
  
  export default WatcherMain;