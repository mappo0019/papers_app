import "../styles/Boton.css"

export default function Boton(props){

    return(
        <>
            <button className={props.class? props.class : "black_btn"} onClick={props.onClickAlto}>{props.name}</button>
        </>
    );

}