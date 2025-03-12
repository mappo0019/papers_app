import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Boton from "../Components/Boton";

function ProjectList(props) {
      const {id} = useParams();

      const [data, setData] = useState([]);         
      const [loading, setLoading] = useState(false);  
      const [currentPage, setCurrentPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);   

      const itemsPerPage = 25;

      const fetchData = async (page) => {
        if (loading) return; 
    
        setLoading(true);
    
        try {
         
          const response = await fetch(`https://api.openalex.org/works?filter=author.id:${id}&page=${currentPage}`);
          const result = await response.json();
    
          setData((prevData) => [...prevData, ...result.results]); 
    

          if (result.meta.count-(itemsPerPage*(currentPage-1)) < itemsPerPage) {
            setHasMore(false); 
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
          if (hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        }
      };

      useEffect(() => {
        fetchData(currentPage);
      }, [currentPage]);

      const generarHex24 = () => {
        const array = new Uint8Array(12); // 12 bytes = 24 caracteres hexadecimales
        window.crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, "0")).join("");
      };

      async function submitPapers(){

        const pack={
          id: generarHex24(),
          user: id,
          raw: JSON.stringify(data)
        } 

        const posting = await fetch("http://localhost:5154/api/papers", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(pack),
        })

        const good = await posting.json();
        console.log(good);
      }

        return (
          <>
            <div>
                <h3>Papers de {id}</h3>
                {data.map((resp)=>(
                  <li>{resp.title} <a href={resp.id}> Enlace </a> </li> 
                ))}
            </div>
            <Boton name = "Llevar a la BD" onClickAlto={submitPapers}/>
          </>
        );
  }
  
  export default ProjectList;