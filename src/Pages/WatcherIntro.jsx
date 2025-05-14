import "../styles/WatcherMain.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
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
        <Boton name="Salir" onClickAlto={salir} route={"/"}/>
            <div className = "watcher-body">
            <h2>BUSCA NUEVOS PROYECTOS</h2>
            <Boton name="Proyectos Seguidos" route={`/watcher_main/`} />
            <div>
                <input id="busca" placeholder= "Introduce el nombre del proyecto" type="text" />
                <Boton name ="Buscar" onClickAlto={searchProjects} className ="search_btn"></Boton>
            </div>

            <div>
                <FichaSeguir name ={project.name} onClickAlto2={()=>seguirProj(project.Id)} />
            </div>
            
            </div>
            
        </>
        
        );
    else
    return (
        <>
        <Boton name="Salir" onClickAlto={salir} route={"/"}/>
            <div className = "watcher-body">
            <h2>BUSCA NUEVOS PROYECTOS</h2>
            <Boton name="Proyectos Seguidos" route={`/watcher_main/`} />
            <div>
                <input id="busca" placeholder= "Introduce el nombre del proyecto" type="text" />
                <Boton name ="Buscar" onClickAlto={searchProjects} className ="search_btn"></Boton>
            </div>

            <div>
                <p>Ningún proyecto coincide con el ID introducido</p>
            </div>
            
            </div>
            
        </>
        
        );
  }
  
  export default WatcherIntro;