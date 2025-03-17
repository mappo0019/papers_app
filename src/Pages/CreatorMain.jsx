import { useState, useEffect } from "react";
import Boton from "../Components/Boton";
import "../styles/CreatorMain.css"
import { useParams } from "react-router-dom";
import Modal from "react-modal";

function CreatorMain() {

  const {id} = useParams();

    const [nombre, setNombre] = useState("");
    const [main, setMain] = useState({});
    const [desc, setDesc] = useState("");
    const [participantes, setParticipantes] = useState([]);
    const [finan, setFinan] = useState(0.0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        const getUser = async ()=>{
          let promise = await fetch(`http://localhost:5154/api/users/${id}`);
          let result =await promise.json();
          setMain(result);
          setParticipantes([...participantes, {name: result.name, openAlex_id: result.openAlex_id}])
      }
      getUser();
     }, [])

    function submitProyecto(){
      if(nombre === ""){
        alert("El Proyecto debe de tener un Nombre");
      }
      else{
        alert("Ready pal submit");
        console.log(participantes);
      }
    }
    return (
      <>
      <form >
        <input type="text" placeholder="Introduzca el Nombre del Proyecto..." onKeyUp={(e) => setNombre(e.target.value)}/>
        <input type="text" disabled={true} placeholder={main.name}></input>
        <input type="text" placeholder="Introduzca las características de su proyecto" onKeyUp={(e) => setNombre(e.target.value)}/>
        <Boton name="Añadir Participante" onClickAlto={handleOpen}/>
        <input type="number" placeholder="Financiación: 0.0€" disabled={true} />
      </form>
      <Boton name="Crear Proyecto" onClickAlto={submitProyecto}/>

      <Modal
        isOpen={open}
      >
          <div>jajajajaja</div>
          <Boton name="X" onClickAlto={handleClose}/>
      </Modal>
      </>
    );
  }
  
  export default CreatorMain;