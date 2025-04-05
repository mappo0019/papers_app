import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Graph} from "../Components/Graph.tsx";
import * as d3 from "d3";
import "../styles/ProjectList.css";

 function ProjectList(props) {
  const {id} = useParams();

  const [data, setData] = useState([]); 


  const fetchData = async () => {
    try {
     
      const response = await fetch(`http://localhost:5154/api/graphData/fcc5cdc825b6267d6e535156`);
      const result = await response.json();
      console.log(await result.authors);
      setData(await result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

        useEffect(() => {
          fetchData(); 
          console.log(data); 
        }, []);

        return (
          <>
            <div>
                <h3>Papers de {id}  </h3>
            </div>

            <Graph width="2500" height="2000" nodes = {data.authors} links = {data.relationship}></Graph>
          </>
        );
  }
  
  export default ProjectList;