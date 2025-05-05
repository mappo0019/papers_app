import "../styles/WatcherMain.css"
import Boton from "../Components/Boton";
import { useEffect, useState } from "react";
import FichaProyecto from "../Components/FichaProyecto";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function CreatorIntro() {

    const {id} = useParams();

    const navigate = useNavigate();
  
  const [response, setResponse] = useState([]);
  const [openDel, setOpenDel] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  useEffect(()=>{
    const searchProjects = async ()=>{
      let promise = await fetch(`http://localhost:5154/api/projects/us?user=${id}`);
      let result =await promise.json();
      setResponse(result);
  }

  searchProjects();
  }, [openDel]);

  function setForDel(ident){
    setDeletedId(ident);
    setOpenDel(true);
  }

  async function deleteProj(){
    fetch(`http://localhost:5154/api/projects/${deletedId}`, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))

    fetch(`http://localhost:5154/api/projectPapers/pr?project=${deletedId}`, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))

    let promise = await fetch(`http://localhost:5154/api/users/proj?project=${deletedId}`);
      let result =await promise.json();
      for(let i = 0; i < await result.length; i++){
        let newProj = await result[i].project.filter(a=> a != deletedId);

        const new_user={
          Id: result[i].Id,
          name: result[i].name,
          username: result[i].username,
          openAlex_id:result[i].openAlex_id,
          rol: result[i].rol,
          project:newProj,
          coworkers:result[i].coworkers,
        }

        console.log(result[i].Id)

        fetch(`http://localhost:5154/api/users/${result[i].Id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(new_user),
        }).then(response => response.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))
      }

    setOpenDel(false);

    navigate(`/creator_intro/${id}`)
  }

    return (
      <>
        <div className = "watcher-body">
          <h2>TUS PROYECTOS</h2>
          <div>
          {response.map((resp)=>(
            <>
            <FichaProyecto name ={resp.name} bot_name1="Editar Proyecto" route1 = {`/creator_main/${resp.Id}/edit`} bot_name2="Eliminar Proyecto" onClickAlto2 = {()=>setForDel(resp.Id)}/>
            </>
                  
                ))}
        </div>
        <Boton name="Nuevo Proyecto" route={`/creator_main/${id}/create`} />
        </div>

        <Modal
        isOpen= {openDel}>
          <h2>¿Seguro que quieres eliminar este proyecto?</h2>
          <Boton name="Eliminar" onClickAlto={deleteProj}/>
          <Boton name="Cancelar" onClickAlto={()=>setOpenDel(false)}/>
      </Modal>
        
      </>
      
    );
  }
  
  export default CreatorIntro;