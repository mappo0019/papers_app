import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import * as d3 from "d3";
import "../styles/UserList.css";

 function UserList(props) {
    const {id} = useParams();

    const [data, setData] = useState([]); 
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

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();

      
    }, []);


      return (
        <>
          <div>
              <h3>Papers de {id}  </h3>
              {data.length === 0 ? 
              (<p> Este usuario no ha publicado ningún paper en OpenAlex</p>) : 
              data.map((resp)=>(
                <li>{resp.title} <a href={resp.id}> Enlace </a> </li> 
              ))}
          </div>
        </>
      );
  }
  
  export default UserList;
  //<Graph width="2500" height="2000" nodes = {data.authors} links = {data.relationship}></Graph>