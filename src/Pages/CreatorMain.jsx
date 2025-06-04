import { useState, useEffect } from "react";
import Boton from "../Components/Boton";
import "../styles/Creator.css"
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

function CreatorMain() {

  const navigate = useNavigate();

  const {id, type} = useParams();

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

    var proj_papers = [];
    var user_papers = [];
    var all_users_papers = [];
    var graphDatas = [];
    var participantesId = [];
    var nodes = [];
    var links = [];
    var hasMore = true;
    var currentPage = 1;
    var newpaper = true;

    useEffect(()=>{
        const getUser = async (ident = id)=>{
          let promise = await fetch(`http://localhost:5154/api/users/${ident}`);
          let result =await promise.json();
          setMain(result);
          setParticipantes([...participantes, {id: await result.Id, name: await result.name, openAlex_id: await result.openAlex_id}])
      }

      const getProj = async ()=>{
        let promise = await fetch(`http://localhost:5154/api/projects/${id}`);
        let result =await promise.json();

        var parti= [];

        setParticipantes(parti);

        let promise2 = await fetch(`http://localhost:5154/api/users/${await result.main_researcher}`);
          let result2 =await promise2.json();
          setMain(result2);

        for (let i = 0; i < await result.participantes.length; i++){
          let prom = await fetch(`http://localhost:5154/api/users/${result.participantes[i]}`);
          let res =await prom.json();
          parti.push({id: await res.Id, name: await res.name, openAlex_id: await res.openAlex_id})
      }

        setNombre(await result.name);
        setDesc(await result.descripcion);
    }
      if(type==="create"){
        getUser();
      setIdProject(generarHex24());
      }
      else if (type === "edit"){
        getProj();
        setIdProject(id);
        document.getElementById("nombre").value = nombre;
      }
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

            const response = await fetch(`http://localhost:5154/api/users/open?id=${participa.openAlex_id}`);
            const result = await response.json();
            if(response.status != 200){
            //AÑADIR NUEVOS
              const new_user={
                Id: participa.id,
                name: participa.name,
                username: participa.username,
                openAlex_id:participa.openAlex_id,
                rol: true,
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
              var cow = result.coworkers;
              for(let a = 0; a < new_participantesId.length; a++){
                var repetido = false;
                for(let b = 0; b < result.coworkers.length; b++){
                  if(new_participantesId[a] === result.coworkers[b])
                    repetido = true;
                }
                if (!repetido){
                  cow.push(new_participantesId[a]);
                }
              }

              const new_user={
                Id: result.Id,
                name: result.name,
                username: result.username,
                rol:result.rol,
                openAlex_id:result.openAlex_id,
                project:[...result.project, idProject],
                coworkers:cow,
              }

              fetch(`http://localhost:5154/api/users/${result.Id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(new_user),
              }).then(response => response.text())
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
        }

        if(type==="edit"){

          fetch(`http://localhost:5154/api/projects/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(new_project),
          }).then(response => response.text())
          .then(data => console.log(data))
          .catch(err => console.log(err))

        }
        else if(type === "create"){
          const posting1 = await fetch("http://localhost:5154/api/projects", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(new_project),
        })

        const good1 = await posting1.json();
        console.log(good1);
        }

        //POST PAPERS
        for (let i = 0; i < participantes.length; i++){
          nodes = [];
          links = []
          graphDatas = [];
          user_papers = [];
          currentPage = 1;
          hasMore = true;

          await fetchData(currentPage, participantes[i].openAlex_id);

          for (let j = 0; j < graphDatas.length; j++){
            const posting = await fetch("http://localhost:5154/api/graphData", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json; charset=UTF-8' },
              body: JSON.stringify(graphDatas[j]),
            })
    
            const good = await posting.json();
            console.log(good);
          } 
          
        }

        for (var k = 0; k < proj_papers.length; k++){
          proj_papers[k] = JSON.stringify(proj_papers[k]);
        }
        

        const new_project_papers = {
          Id: generarHex24(),
          project: idProject,
          raw: (proj_papers)
        }

        if(type==="edit"){
          fetch(`http://localhost:5154/api/projectPapers/pr?project=${id}`, {
            method: 'DELETE',
          })
          .then(res => res.text())
          .then(res => console.log(res))
        }

        const posting = await fetch(`http://localhost:5154/api/projectPapers/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(new_project_papers),
        })

        const good = await posting.json();
        console.log(good);
        

        for (let e =0; e < all_users_papers.length; e++){
          const posting = await fetch("http://localhost:5154/api/papers", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(all_users_papers[e]),
          })
  
          const good = await posting.json();
          console.log(good);
        }
        

        alert("Proyecto creado con éxito");
        navigate(`/creator_intro`);
      }
        
    }

    async function fetchData(page, userId){
      try {

        const resp = await fetch(`http://localhost:5154/api/graphData/us?user=${userId}`);
        const res = await resp.json();
        if(await res.length !== 0){
          for (let a = 0; a < res.length; a++){
            fetch(`http://localhost:5154/api/graphData/${res[a].Id}`, {
              method: 'DELETE',
            })
            .then(res => res.text())
            .then(res => console.log(res))
          }
          
        }

        const response = await fetch(`https://api.openalex.org/works?filter=author.id:${userId}&page=${page}`);
        const result = await response.json();

        if(await result.meta.count > currentPage-1* itemsPerPage){

          user_papers.push(result.results);

        for(let i = 0; i < await result.results.length; i++){
            nodes = [];
            links = [];
            let authors = await result.results[i].authorships;
            let year = await result.results[i].publication_year;

            for(let j = 0; j < await authors.length; j++){
              var color = "rgb(97, 205, 187)";
              if(await authors[j].author.display_name == main.name)
                color = "rgb(255, 0, 0)";
              else{
                for(let c = 0; c < participantes.length; c++){
                  if (await authors[j].author.display_name == participantes[c].name)
                    color = "rgb(255, 115, 0)";
                }
              }
              const new_node = {
                Ident: generarHex24(),
                id: await authors[j].author.display_name,
                height: 1,
                size: 10,
                color: color
              }         
                nodes.push(await new_node);
            }

            const new_graph_data = {
              Id: generarHex24(),
              user: await userId.toUpperCase(),
              year: await year,
              authors: await nodes,
            }

            graphDatas.push(new_graph_data);

            newpaper = true;

            for(var k = 0; k < proj_papers.length; k++)
              if(proj_papers[k].id === await result.results[i].id)
                newpaper = false;
                         
            if(newpaper){
              proj_papers.push(await result.results[i]);
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
        else{
          var stringed_papers = [];
          for (var d = 0; d < user_papers.length; d++){
            for(var e = 0; e < user_papers[d].length; e++)
            stringed_papers.push(JSON.stringify(user_papers[d][e]));
          }

          const new_papers = {
            Id: generarHex24(),
            user: userId,
            raw: (stringed_papers)
          }

          const response = await fetch(`http://localhost:5154/api/papers/us?user=${new_papers.user}`);
          if(response.status === 200){
            const result = await response.json();
            fetch(`http://localhost:5154/api/papers/${await result.Id}`, {
            method: 'DELETE',
          })
          .then(res => res.text())
          .then(res => console.log(res))
          }
          

          all_users_papers.push(new_papers);

        }
      }
    }

    async function addUser(){
      console.log(await participantes);
      if (userNombre != "" && userId != ""){
        var repe = false;
        for(let i = 0; i < participantes.length; i++){
          if(userId === participantes[i].openAlex_id)
            repe = true;
        }
        if(!repe){
          const response = await fetch(`https://api.openalex.org/people/${userId}`);
        if (response.status == 200){
          const reg_exp = new RegExp("^[A-Z0-9_-]");
          if (reg_exp.test(userId)){
            try{
              const response2 = await fetch(`http://localhost:5154/api/users/open?id=${userId}`)
              if(response2.status == 200){
                const result = await response2.json();
                setParticipantes([...participantes, {id: await result.Id, name: await result.name, username: await result.username, openAlex_id: await result.openAlex_id}]);
              }     
              else
                setParticipantes([...participantes, {id: generarHex24(), name: userNombre, username: userNombre, openAlex_id: userId}]);
            }catch(error){
              console.error("Error fetching data:", error);
            }
          }
          else
            alert("El ID de OpenAlex no puede contener letras minúsculas")          
        }     
        else
          alert("Este usuario no existe en OpenAlex");
        }
        else
          alert("Este usuario ya ha sido añadido al proyecto")
        
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
      <div className = "cabecera">
        <Boton class= "back_btn" name="↩" route={`/creator_intro`}/>

        {type === "edit" ?
        <h1>Editar Proyecto</h1>
        :
        <h1>Crear Proyecto</h1>
        }
      </div>
        <div className = "main_body">
          <div className = "container" >
            <input type="text" disabled={true} placeholder={idProject}></input>
            {type ==="edit" ? 
            <>
              <input id = "nombre" type="text" placeholder="Nombre del Proyecto" onKeyUp={((e) => setNombre(e.target.value))} value={nombre} disabled={true}/>
            </>
            :
            <>
              <input id = "nombre" type="text" placeholder="Nombre del Proyecto" onKeyUp={((e) => setNombre(e.target.value))}/>
            </>}
        
            <input type="text" disabled={true} placeholder={main.name}></input>
            {type ==="edit" ? 
            <>
              <input type="text" placeholder="Características del proyecto" onKeyUp={(e) => setDesc(e.target.value)} value={desc} disabled={true} />
            </>
            :
            <>
              <input type="text" placeholder="Características del proyecto" onKeyUp={(e) => setDesc(e.target.value)} />
            </>}
        
            <Boton class = "neutral_btn" name="Añadir Participante" onClickAlto={handleOpen}/>
          </div>
        </div>
        <br />
        <div className = "main_body">
          {type ==="edit" ? 
        <>
          <Boton class = "good_btn" name="Actualizar Proyecto" onClickAlto={submitProyecto}/>
        </>
        :
        <>
          <Boton class = "good_btn" name="Crear Proyecto" onClickAlto={submitProyecto}/>
        </>}

      <Modal
        isOpen={open}
      >
          <Boton name="X" onClickAlto={handleClose}/>
            
          {participantes.map((participa)=>(
            participa.id != main.Id ?
            <>
              <div className = "main_body">
              <li>{participa.name}</li>

              <Boton class= "bad_btn" name="Eliminar Usuario" onClickAlto={()=> deleteUser(participa.openAlex_id)}/>

              </div>
            </>
            :
            <>
            <div className = "main_body">
            <br></br>
            <li>{participa.name}</li>
            <br></br>
            </div>
            </>
            

          ))}
          <br />
          <div className = "main_body">
          <div className = "container">
            <input type="text" placeholder="Introduzca el Nombre del Investigador..." onKeyUp={(e) => setUserNombre(e.target.value)}/>
            <input type="text" placeholder="Introduzca el ID de OpenAlex" onKeyUp={(e) => setUserId(e.target.value)}/>
          <Boton class= "neutral_btn" name="Añadir Usuario" onClickAlto={addUser}/>
          </div>
          </div>
          
      </Modal>
        </div>
      
      </>
    );
  }
  
  export default CreatorMain;