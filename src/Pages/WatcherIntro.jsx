import "../styles/Watcher.css"
import Boton from "../Components/Boton";
import { useState } from "react";
import FichaSeguir from "../Components/FichaSeguir";

function WatcherIntro() {
  
    const [project, setProject] = useState(null);

  async function searchProjects(){
    var ident = document.getElementById('busca').value;
    if(ident !== ""){
        let promise = await fetch(`http://localhost:5154/api/projects/${ident}`);
        let result =await promise.json();
        setProject(await result);
    }
  } 

  async function seguirProj(pr_id){

    let promise = await fetch(`http://localhost:5154/api/users/${localStorage.getItem("userId")}`);
    let result =await promise.json();

    var proj = result.project;
    if(proj.indexOf(pr_id)=== -1)
        proj.push(pr_id);
    
    
    var new_user ={
        Id: result.Id,
        name: result.name,
        username: result.username,
        openAlex_id:result.openAlex_id,
        rol: result.rol,
        project:proj,
        coworkers:result.coworkers,
    }

    fetch(`http://localhost:5154/api/users/${result.Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(new_user),
      }).then(response => response.text())
      .then(data => console.log(data))
      .catch(err => console.log(err));

      alert("Proyecto seguido con éxito")
  }

  function salir(){
    localStorage.removeItem("userId");
    
  }

    if(project != null)
        return (
        <>
            <div className = "cabecera">
                <Boton class = "back_btn" name="↩" onClickAlto={salir} route={"/"}/>
                <h1>BUSCAR NUEVOS PROYECTOS</h1>
            </div>
            <div className = "watcher_body">
            <div className = "buscador">
                <input id="busca" placeholder= "Introduce el nombre del proyecto" type="text" />
                <Boton class = "neutral_btn" name ="Buscar" onClickAlto={searchProjects} className ="search_btn"></Boton>
            </div>
            
                <FichaSeguir name ={project.name} onClickAlto2={()=>seguirProj(project.Id)} />
            
            </div>

            <div className = "watcher_body">
            <Boton class = "neutral_btn" name="Proyectos Seguidos" route={`/watcher_main/`} />
            </div>
        </>
        
        );
    else
    return (
        <>
            <div className = "cabecera">
                <Boton class = "back_btn" name="↩" onClickAlto={salir} route={"/"}/>
                <h1>BUSCAR NUEVOS PROYECTOS</h1>
            </div>
            <div className = "watcher_body">
                <Boton class = "neutral_btn" name="Proyectos Seguidos" route={`/watcher_main/`} />
                <br />
                <div className = "buscador">
                    <input id="busca" placeholder= "Introduce el nombre del proyecto" type="text" />
                    <Boton class = "neutral_btn" name ="Buscar" onClickAlto={searchProjects} className ="search_btn"></Boton>
                </div>
                <p>Ningún proyecto coincide con el ID introducido</p>
            
            </div>
            
        </>
        
        );
  }
  
  export default WatcherIntro;