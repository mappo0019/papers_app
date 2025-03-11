import "../styles/Boton.css"

import { Link } from "react-router-dom";

export default function Boton(props){

    return(
        <>
           <Link to={props.route}> 
            <button className={props.class? props.class : "black_btn"} onClick={props.onClickAlto}>{props.name}</button>
           </Link> 
        </>
    );

}