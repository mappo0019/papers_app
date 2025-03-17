import "../styles/WatcherMain.css"
import { Link } from "react-router-dom";
import Boton from "./Boton";

export default function FichaProyecto(props){

    return(
        <>         
            <div className ="ficha_proyecto">
                <h3>{props.name}</h3>
                <Boton name="Ver Investigadores" route = {props.route}/>
            </div>          
        </>
    );

}