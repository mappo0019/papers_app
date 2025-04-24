import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/UserList.css";
import CompDash from "../Components/CompDash";

 function UserList(props) {
    const {id} = useParams();

    const [data, setData] = useState([]); 
    const [cites, setCites] = useState(0); 
    const [name, setName] = useState("");
    var data2 = []; 
    var contador = 0;    
    
    

    const fetchData = async () => {
      try {
       
        const response = await fetch(`http://localhost:5154/api/papers/us?user=${id}`);
        const result = await response.json();

        for (let i = 0; i < await result.raw.length; i++){
          if(contador < await result.raw.length){
            data2.push(await JSON.parse(await result.raw[i])) 
            contador++;
            setData(data2);
          }
        }
        await getCites(await data2);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    async function getCites(dat){
      var cit = 0;
      for (let i = 0; i <  dat.length; i++){
        cit+= dat[i].cited_by_count;
      }
      setCites(cit);
    }

    async function getName(){
        try {
          const response = await fetch(`http://localhost:5154/api/users/open?id=${id}`);
          const result = await response.json();
          setName(await result.name);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
      }

    useEffect(() => {
      fetchData(); 
      getName();     
    }, []);

    if(cites !== undefined){
      return (
        <>
          <div>
              <h3>Información de {name}  </h3>

              <CompDash name="Número de papers publicados" valor={data.length}/>
              <CompDash name="Citas al autor" valor={cites}/>
              
          </div>
        </>
      );
    }
    else{
      return(
        <>
        <p>Cargando Información...</p>
        </>
      );
    }
      
  }
  
  export default UserList;
 