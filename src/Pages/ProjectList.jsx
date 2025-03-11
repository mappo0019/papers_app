import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"

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

        return (
          <div>
              <h3>Papers de {id}</h3>
              {data.map((resp)=>(
                <li>{resp.title} <a href={resp.id}> Enlace </a> </li> 
              ))}

          </div>
        );
  }
  
  export default ProjectList;