import { useState, useEffect } from "react";
import Boton from "../Components/Boton";
import "../styles/CreatorMain.css"
import { useParams } from "react-router-dom";
import Modal from "react-modal";

function CreatorMain() {

  const {id} = useParams();

    const [idProject, setIdProject] = useState("");
    const [nombre, setNombre] = useState("");
    const [main, setMain] = useState({});
    const [desc, setDesc] = useState("");
    const [participantes, setParticipantes] = useState([]);

    const [userNombre, setUserNombre] = useState("");
    const [userId, setUserId] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    var participantesId = [];

    useEffect(()=>{
        const getUser = async ()=>{
          let promise = await fetch(`http://localhost:5154/api/users/${id}`);
          let result =await promise.json();
          setMain(result);
          setParticipantes([...participantes, {id: result.Id, name: result.name, openAlex_id: result.openAlex_id}])
      }
      getUser();
      setIdProject(generarHex24());
     }, [])

     const generarHex24 = () => {
      const array = new Uint8Array(12); // 12 bytes = 24 caracteres hexadecimales
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
    };

    async function submitProyecto(){
      if(nombre === ""){
        alert("El Proyecto debe de tener un Nombre");
      }
      else{
        participantes.map((participa)=>{
          participantesId.push(participa.id);
        });

        participantes.map(async(participa)=>{
            var new_participantesId = participantesId.filter(a=> a != participa.id);
            const new_user={
              Id: participa.id,
              name: participa.name,
              openAlex_id:participa.openAlex_id,
              project:[idProject],
              coworkers:new_participantesId,
            }
            
            if(participa.id != main.Id){
              const posting = await fetch("http://localhost:5154/api/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(new_user),
              })
      
              const good = await posting.json();
              console.log(good);
            }
            else{
              fetch(`http://localhost:5154/api/users/${main.Id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(new_user),
              }).then(response => response.json())
              .then(data => console.log(data))
              .catch(err => console.log(err))
            }


          });
          
          
      ////////FALTA CREAR PROYECTO
        
        /*const new_project={
          Id: idProject,
          name: nombre,
          main_researcher: ,
          descripcion: desc,
          participantes:[],
          presupuesto: 0.0,
        }*/
        alert("Ready pal submit");
        
      }
    }

    function addUser(){
      if (userNombre != "" && userId != ""){
        setParticipantes([...participantes, {id: generarHex24(), name: userNombre, openAlex_id: userId}]);
        
        alert("Usuario añadido");
      }
      else{
        alert("Error al añadir usuario, faltan campos");
      }
    }

    function deleteUser(id_user){
      setParticipantes(participantes => participantes.filter(a=> a.openAlex_id != id_user));
    }


    
    return (
      <>
      <form >
        <input type="text" placeholder="Introduzca el Nombre del Proyecto..." onKeyUp={(e) => setNombre(e.target.value)}/>
        <input type="text" disabled={true} placeholder={main.name}></input>
        <input type="text" placeholder="Introduzca las características de su proyecto" onKeyUp={(e) => setDesc(e.target.value)}/>
        <Boton name="Añadir Participante" onClickAlto={handleOpen}/>
        <input type="number" placeholder="Financiación: 0.0€" disabled={true} />
      </form>
      <Boton name="Crear Proyecto" onClickAlto={submitProyecto}/>

      <Modal
        isOpen={open}
      >
          <Boton name="X" onClickAlto={handleClose}/>

          {participantes.map((participa)=>(
            <>
              <li>{participa.name}</li>
              <Boton name="Eliminar Usuario" onClickAlto={()=> deleteUser(participa.openAlex_id)}/>
            </>
          ))}
          <form >
            <input type="text" placeholder="Introduzca el Nombre del Investigador..." onKeyUp={(e) => setUserNombre(e.target.value)}/>
            <input type="text" placeholder="Introduzca el ID de OpenAlex" onKeyUp={(e) => setUserId(e.target.value)}/>
          </form>
          <Boton name="Añadir Usuario" onClickAlto={addUser}/>
      </Modal>
      </>
    );
  }
  
  export default CreatorMain;