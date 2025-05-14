import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/UserList.css";
import CompDash from "../Components/CompDash";
import Boton from "../Components/Boton";
import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveLine } from '@nivo/line'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from "react-modal";

 function ProjectList(props) {
    const {id} = useParams();

    const [data, setData] = useState([]); 
    const [databars, setDataBars] = useState([]); 
    const [datalines, setDataLines] = useState([]); 
    const [datatables, setDataTables] = useState([]);
    const [fechainicio, setFechainicio] = useState(0);
    const [fechafin, setFechafin] = useState(0);
    const [cites, setCites] = useState(0); 
    const [h_index, setHIndex] = useState(0);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var data2 = []; 
    var contador = 0;  
    var fechas = []; 
    var papers_por_fecha = [];
    var citas_por_fecha = [];
    var final_papers_magazines = []; 
    
    function selectionSort(array) {
      let n = array.length;
      for (let i = 0; i < n - 1; i++) {
          let minIndex = i;
          for (let j = i + 1; j < n; j++) {
              if (array[j] < array[minIndex]) {
                  minIndex = j;
              }
          }
          // Swap arr[i] and arr[minIndex]
          let temp = array[i];
          array[i] = array[minIndex];
          array[minIndex] = temp;
      }
      return array;
  }

  function selectionSort_Objects(array) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j].papers < array[minIndex].papers) {
                minIndex = j;
            }
        }
        // Swap arr[i] and arr[minIndex]
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
  }

  const fetchData = async () => {
      try {
       
        const response = await fetch(`http://localhost:5154/api/projectPapers/pr?project=${id}`);
        const result = await response.json();

        for (let i = 0; i < await result.raw.length; i++){
          if(contador < await result.raw.length){
            data2.push(await JSON.parse(await result.raw[i])) 
            contador++;
            setData(data2);
          }
        }
        await getCites(await data2);
        await getHIndex(await data2);
        await getBarData(await data2);
        await getLineData(await data2);
        await getMagazines(await data2);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    async function getCites(dat){
      var cit = 0;
      for (let i = 0; i <  dat.length; i++){
        cit+= dat[i].cited_by_count;
      }
      setCites(cit);
    }

    async function getHIndex(dat){
      setHIndex(0);
      var greater = true
      var index = 0;
      for(let i = 0; i < dat.length && greater; i++){
        if(dat[i].cited_by_count < index){
          greater = false
        }
        else
          index++;
      }
      setHIndex(index);

    }

    async function getBarData(dat){
      papers_por_fecha = [];
      for(let i = 0; i < dat.length; i++){
        if(fechas.indexOf(dat[i].publication_year) === -1)
          fechas.push(dat[i].publication_year);
      }
      fechas = selectionSort(fechas);
      
      for(let i = 0; i < fechas.length; i++){
        var cont = 0;

        for(let j = 0; j < dat.length; j++){
          if (dat[j].publication_year === fechas[i])
            cont++;
        }
              
        papers_por_fecha.push(cont);
      }

      var datbar = [];
      for(let i = 0; i < fechas.length; i++){
        var new_bar_data ={
          "year": fechas[i].toString(),
          "Nº Papers": papers_por_fecha[i],
          "paperColor": "hsl(0, 70.20%, 50.00%)",
        }
        datbar.push(new_bar_data);
      }

      setDataBars(datbar);

    }

    async function getLineData(dat){
      var linedata = [];
      var inner_data = [];

      for(let i = 0; i < fechas.length; i++){
        var cont = 0;

        for(let j = 0; j < dat.length; j++){
          if (dat[j].publication_year === fechas[i])
            cont+= dat[j].cited_by_count;
        }
              
        citas_por_fecha.push(cont);
      }

      for(let i = 0; i < fechas.length; i++){
        var new_inner_data ={
          "x": fechas[i].toString(),
          "y": citas_por_fecha[i],
        }
        inner_data.push(new_inner_data);
      }
      var new_line_data={
        "id": "Papers/Año",
        "data": inner_data,
      }

      linedata.push(new_line_data);

      setDataLines(linedata);
    }

    async function getMagazines(dat){
      var papers_por_magazine = [];
      var magazines = [];
      final_papers_magazines = [];
      for(let i = 0; i < dat.length; i++){
        if(dat[i].best_oa_location !== null && dat[i].best_oa_location.source!== null){
          if(magazines.indexOf(dat[i].best_oa_location.source.display_name) === -1)
          magazines.push(dat[i].best_oa_location.source.display_name);
        }
      }
      
      for(let i = 0; i < magazines.length; i++){
        var cont = 0;

        for(let j = 0; j < dat.length; j++){
          if(dat[j].best_oa_location !== null && dat[j].best_oa_location.source!== null){
            if (dat[j].best_oa_location.source.display_name === magazines[i])
              cont++;
          }
          
        }
              
        papers_por_magazine.push(cont);
      }

      for(let i = 0; i < magazines.length; i++){
        papers_por_magazine[i] = {
          "name": magazines[i],
          "papers": papers_por_magazine[i],
        }
      }

      papers_por_magazine = selectionSort_Objects(papers_por_magazine);

      for (let i = papers_por_magazine.length-1; i > papers_por_magazine.length-11; i--){
        if(papers_por_magazine[i] != null)
        final_papers_magazines.push(papers_por_magazine[i]);
      }

      setDataTables(final_papers_magazines);

    }

  async function getName(){
        try {
          const response = await fetch(`http://localhost:5154/api/projects/${id}`);
          const result = await response.json();
          setName(await result.name);
  
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
    }

  useEffect(() => {
      fetchData(); 
      getName();     
    }, []);


    if(cites !== undefined){
    return (
      <>
      <Boton name="Atrás" route={`/watcher_main/`}/>
        <div>
            <h3>Información de {name}  </h3>
            <CompDash name="Número de papers publicados" valor={data.length}/>
            <CompDash name="Citas al autor" valor={cites}/>
            <CompDash name="Valor del h-index" valor={h_index}/>

            <Boton name="Ver Red de Autoría" onClickAlto={handleOpen}/>
            
                    <Modal
                            isOpen={open}
                          >
                              <Boton name="X" onClickAlto={handleClose}/>
                              <h3>Buscar por fechas</h3>
                              <form >
                                <input id="fechainicio" type="number" placeholder="fecha de inicio" min = "0" onChange={(e) => setFechainicio(e.target.value)}/>
                                <input id="fechafin" type="number" placeholder="fecha de fin" min = "0" onChange={(e) => setFechafin(e.target.value)}/>
                                <Boton name="Ver Red Por Fechas" route={`/graph_data/${id}/project/${fechainicio}-${fechafin}`}/>
                              </form>
                              <Boton name="Ver Red Completa" route={`/graph_data/${id}/project/-`}/>
                              <br />
                              <h3>Buscar por fechas solo investigadores</h3>
                              <form >
                                <input id="fechainicio" type="number" placeholder="fecha de inicio" min = "0" onChange={(e) => setFechainicio(e.target.value)}/>
                                <input id="fechafin" type="number" placeholder="fecha de fin" min = "0" onChange={(e) => setFechafin(e.target.value)}/>
                                <Boton name="Ver Red Por Fechas" route={`/graph_data/${id}/justresearchers/${fechainicio}-${fechafin}`}/>
                              </form>
                              <Boton name="Ver Solo Investigadores" route={`/graph_data/${id}/justresearchers/-`}/>
                    </Modal>
          
          <h3>Número de papers publicados por año</h3>
                  <div className="graph-cont">
                  <ResponsiveBar
                              data={databars}
                              keys={[
                                  'Nº Papers',
                              ]}
                              indexBy="year"
                              margin={{ top: 130, right: 130, bottom: 130, left: 130 }}
                              padding={0.3}
                              valueScale={{ type: 'linear' }}
                              indexScale={{ type: 'band', round: true }}
                              borderColor={{
                                  from: 'color',
                                  modifiers: [
                                      [
                                          'darker',
                                          1.6
                                      ]
                                  ]
                              }}
                              axisTop={null}
                              axisRight={null}
                              axisBottom={{
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Año',
                                  legendPosition: 'middle',
                                  legendOffset: 32,
                                  truncateTickAt: 0
                              }}
                              axisLeft={{
                                  tickSize: 5,
                                  tickPadding: 5,
                                  tickRotation: 0,
                                  legend: 'Nº Papers',
                                  legendPosition: 'middle',
                                  legendOffset: -40,
                                  truncateTickAt: 0
                              }}
                              labelSkipWidth={12}
                              labelSkipHeight={12}
                              labelTextColor={{
                                  from: 'color',
                                  modifiers: [
                                      [
                                          'darker',
                                          1.6
                                      ]
                                  ]
                              }}
                              legends={[
                                  {
                                      dataFrom: 'keys',
                                      anchor: 'bottom-right',
                                      direction: 'column',
                                      justify: false,
                                      translateX: 120,
                                      translateY: 0,
                                      itemsSpacing: 2,
                                      itemWidth: 100,
                                      itemHeight: 20,
                                      itemDirection: 'left-to-right',
                                      itemOpacity: 0.85,
                                      symbolSize: 20,
                                      effects: [
                                          {
                                              on: 'hover',
                                              style: {
                                                  itemOpacity: 1
                                              }
                                          }
                                      ]
                                  }
                              ]}
                              role="application"
                              ariaLabel="Nivo bar chart demo"
                              barAriaLabel={e=>`${e.id}: ${e.formattedValue} en el año: ${e.indexValue}`}
                          />
                  </div>
          
                  <h3>Número de citas por año</h3>
                  <div className="graph-cont">
                  <ResponsiveLine
                  data={datalines}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{
                      type: 'linear',
                      min: 'auto',
                      max: 'auto',
                      stacked: true,
                      reverse: false
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Año',
                      legendOffset: 36,
                      legendPosition: 'middle',
                      truncateTickAt: 0
                  }}
                  axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Nº de Citas',
                      legendOffset: -40,
                      legendPosition: 'middle',
                      truncateTickAt: 0
                  }}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'seriesColor' }}
                  pointLabelYOffset={-12}
                  enableTouchCrosshair={true}
                  useMesh={true}
                  legends={[
                      {
                          anchor: 'bottom-right',
                          direction: 'column',
                          justify: false,
                          translateX: 100,
                          translateY: 0,
                          itemsSpacing: 0,
                          itemDirection: 'left-to-right',
                          itemWidth: 80,
                          itemHeight: 20,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: 'circle',
                          symbolBorderColor: 'rgba(0, 0, 0, .5)',
                          effects: [
                              {
                                  on: 'hover',
                                  style: {
                                      itemBackground: 'rgba(0, 0, 0, .03)',
                                      itemOpacity: 1
                                  }
                              }
                          ]
                      }
                  ]}
                  role="application"
              />
          
              <h3>Principales 10 revistas en las que ha publicado</h3>
          
              <div className="graph-cont">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Revista</TableCell>
                        <TableCell align="right">Artículos Publicados</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datatables.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.papers}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               
              </div>
            
        </div>
        </div>
      </>
    );
  }
  else return(<div>Cargando información...</div>)
}
  
  export default ProjectList; 
  