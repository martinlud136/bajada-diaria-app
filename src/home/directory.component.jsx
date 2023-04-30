import { useEffect, useState } from "react";

import Papa from "papaparse";
import xlsx from "json-as-xlsx"

import {
    faltoAFormacion,
    completarData,
    convertirAXlxs,
    convertirAObjeto
  } from "../utils/helpers"


const Directory = () =>{
    const [valuesFiles, setValuesFiles] = useState({});
    const [ faltoASegundaBajada, setFaltoASegundaBajada] = useState([])
    const [ noEstabaEnPrimerBajada, setNoEstabaEnPrimerBajada] = useState([])
  
    const handleChange = (e) => {
      const archivo = e.target.files[0];
      Papa.parse(archivo, {
        complete: function (results) {
          const data = results.data;
          const { name } = e.target;
  
          const bajadaAObjeto = convertirAObjeto(data)
          
          const datosCompletosDeBajada =valuesFiles.patron ? completarData(valuesFiles.patron,bajadaAObjeto): null
  
          setValuesFiles({
            ...valuesFiles,
            [name]: datosCompletosDeBajada ?? bajadaAObjeto,
          });
        },
      });
    };
  
    const downloadFile = () =>{
      const data = [
        convertirAXlxs(faltoASegundaBajada, "faltoASegundaBajada"),
        convertirAXlxs(noEstabaEnPrimerBajada, "noEstabaEnPrimerBajada")
      ]
      let settings = {
        fileName: "Bajada COTM",
      }
      xlsx(data, settings)
    }
  
    useEffect(() => {
      const {primerBajada, segundaBajada} = valuesFiles
      if(primerBajada?.length && segundaBajada?.length && (primerBajada.length > segundaBajada.length)){
        setFaltoASegundaBajada(faltoAFormacion(primerBajada,segundaBajada))
      }
      if(primerBajada?.length && segundaBajada?.length && (primerBajada.length > segundaBajada.length)){
        setNoEstabaEnPrimerBajada(faltoAFormacion(segundaBajada ,primerBajada))
      }
    }, [valuesFiles]);
  
    // console.log({ valuesFiles, faltoASegundaBajada, noEstabaEnPrimerBajada });
    return (
      <div>
        <h1>Seleccionar archivo patron</h1>
        <input type="file" name="patron" onChange={handleChange} />
        <h1>Seleccionar archivo de la primer bajada</h1>
        <input type="file" name="primerBajada" onChange={handleChange} />
        <h1>Seleccionar archivo de la segunda bajada</h1>
        <input type="file" name="segundaBajada" onChange={handleChange} />
        <h1>descargar archivos</h1>
        <button onClick={downloadFile}>descargar</button>
      </div>
    );
}

export default Directory
