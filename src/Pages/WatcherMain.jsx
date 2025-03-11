import Boton from "../Components/Boton";
import { useEffect, useState } from "react";

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
      <div>
        {response.map((resp)=>(
                <Boton name ={resp.name} route = {`/watcher_users/${resp.Id}`}></Boton>
              ))}
      </div>
    );
  }
  
  export default WatcherMain;