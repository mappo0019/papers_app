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

    const itemsPerPage = 25;

    var participantesId = [];
    var nodes = [];
    var links = [];
    var hasMore = true;
    var currentPage = 1;

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
        
        //ACTUALIZAR USERS
        participantes.map((participa)=>{
          participantesId.push(participa.id);
        });

        participantes.map(async(participa)=>{

            var new_participantesId = participantesId.filter(a=> a != participa.id); 

            if(participa.id != main.Id){
            //AÑADIR NUEVOS
              const new_user={
                Id: participa.id,
                name: participa.name,
                openAlex_id:participa.openAlex_id,
                project:[idProject],
                coworkers:new_participantesId,
              }

              const posting = await fetch("http://localhost:5154/api/users", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(new_user),
              })
      
              const good = await posting.json();
              console.log(good);
              
            }
            else{

              //ACTUALIZAR MAIN
              var cow = [...main.coworkers, ...new_participantesId];

              const new_user={
                Id: participa.id,
                name: participa.name,
                openAlex_id:participa.openAlex_id,
                project:[...main.project, idProject],
                coworkers:cow,
              }

              fetch(`http://localhost:5154/api/users/${main.Id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(new_user),
              }).then(response => response.json())
              .then(data => console.log(data))
              .catch(err => console.log(err))
              
            }
          });

          //POST PROYECTO
          const new_project={
          Id: idProject,
          name: nombre,
          main_researcher: main.Id,
          descripcion: desc,
          participantes:participantesId,
          presupuesto: 0.0,
        }

        const posting = await fetch("http://localhost:5154/api/projects", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(new_project),
        })

        const good = await posting.json();
        console.log(good);
      
        //POST PAPERS
        for (let i = 0; i < participantes.length; i++){
          nodes = [];
          links = []
          currentPage = 1;
          hasMore = true;

          await fetchData(currentPage, participantes[i].openAlex_id);
          
            const new_graph_data = {
              Id: generarHex24(),
              user: participantes[i].openAlex_id.toUpperCase(),
              authors: await nodes,
              relationship: await links
            }

           const posting = await fetch("http://localhost:5154/api/graphData", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              body: JSON.stringify(new_graph_data),
            })
    
            const good = await posting.json();
            console.log(good);
            
        }

        alert("Proyecto creado con éxito");
        
      }
    }

    async function fetchData(page, userId){
      try {
          
        const response = await fetch(`https://api.openalex.org/works?filter=author.id:${userId}&page=${page}`);
        const result = await response.json();


        if(await result.results){
          for(let i = 0; i < await result.results.length; i++){
            var authors = await result.results[i].authorships;
            for(let i = 0; i < await authors.length; i++){
              const new_node = {
                Ident: generarHex24(),
                id: authors[i].author.id.substring(21),
                name: authors[i].author.display_name,
              }

              const new_link = {
                source: userId.toUpperCase(),
                target: authors[i].author.id.substring(21),
              }
              nodes.push(new_node);
              links.push(new_link);
            }
          }

        if (await result.meta.count-(itemsPerPage*(currentPage-1)) < itemsPerPage) {  
          hasMore = false; 
        }
        else{
          hasMore = true;
        }
      }
      else{
        hasMore = false;
      }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (hasMore) {
          currentPage++;
          await fetchData(currentPage, userId);
        }
      }
    }

    function addUser(){
      if (userNombre != "" && userId != ""){
        setParticipantes([...participantes, {id: generarHex24(), name: userNombre, openAlex_id: userId}]);
      }
      else{
        alert("Error al añadir usuario, todos los campos deben rellenarse");
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