import "../styles/WatcherMain.css"
import { Link } from "react-router-dom";
import Boton from "./Boton";

export default function FichaSeguir(props){

    return(
        <>         
            <div className ="ficha_proyecto">
                <h3>{props.name}</h3>
                <Boton name="Seguir Proyecto" onClickAlto = {props.onClickAlto2}/>
            </div>          
        </>
    );

}