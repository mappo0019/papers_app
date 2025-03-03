import Boton from "./Boton"

export default function Buscador(props){
    
    return(
        <>
            <input placeholder= {props.text} type="text" />
            <Boton name ="Buscar" onClickAlto="" className ="search_btn"></Boton>
        </>
    )
}