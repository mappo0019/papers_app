import "../styles/Watcher.css"
import { Link } from "react-router-dom";
import Boton from "./Boton";

export default function CompDash(props){

    return(
        <>         
            <div className ="ficha_proyecto">
                <h3>{props.name}</h3>
                <h1>{props.valor}</h1>
            </div>          
        </>
    );

}