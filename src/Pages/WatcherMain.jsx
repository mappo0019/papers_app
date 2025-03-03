import Boton from "../Components/Boton";
import { useState } from "react";

function WatcherMain() {

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function searchPapers(){
    let promise = await fetch(`https://api.openalex.org/works?filter=author.id:${input}`);
    let response = await promise.json();
    console.log(response);
  }

    return (
      <div>
          <h3>Busca los papers de:</h3>
          <input placeholder = "Introduzca un nombre..." type="text" onInput={e => setInput(e.target.value)}/>
          <Boton name ="Buscar" onClickAlto={searchPapers}></Boton>
          <h1>{response}</h1>
      </div>
    );
  }
  
  export default WatcherMain;