import "../styles/Creator.css"
import { Link } from "react-router-dom";
import Boton from "./Boton";

export default function FichaProyecto(props){

    return(
        <>         
            <div className ="ficha_proyecto">
                <h3>{props.name}</h3>
                <Boton class = "change_btn" name={props.bot_name1} route = {props.route1} onClickAlto = {props.onClickAlto1}/>
                <Boton class = "bad_btn" name={props.bot_name2} route = {props.route2} onClickAlto = {props.onClickAlto2}/>
            </div>          
        </>
    );

}