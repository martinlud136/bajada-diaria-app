import { useEffect, useState } from "react";

import Papa from "papaparse";
import xlsx from "json-as-xlsx";

import Button from "../components/button/button.component";
import Input from "../components/input/input.component";
import {
  faltoAFormacion,
  completarData,
  convertirAXlxs,
  convertirAObjeto,
} from "../utils/helpers";

import { DirectoryContainer } from "./directory.styles";

const Directory = () => {
  const [valuesFiles, setValuesFiles] = useState({});
  const {patron, primerBajada, segundaBajada} = valuesFiles

  const [faltoASegundaBajada, setFaltoASegundaBajada] = useState([]);
  const [noEstabaEnPrimerBajada, setNoEstabaEnPrimerBajada] = useState([]);
  const handleChange = (e) => {
    const archivo = e.target.files[0];
    Papa.parse(archivo, {
      complete: function (results) {
        const data = results.data;
        const { name } = e.target;

        const bajadaAObjeto = convertirAObjeto(data);

        const datosCompletosDeBajada = valuesFiles.patron
          ? completarData(valuesFiles.patron, bajadaAObjeto)
          : null;

        setValuesFiles({
          ...valuesFiles,
          [name]: datosCompletosDeBajada ?? bajadaAObjeto,
        });
      },
    });
  };

  const downloadDiferenciasFiles = () => {
    const data = [
        convertirAXlxs(faltoASegundaBajada, "Faltó en la segunda bajada"),
        convertirAXlxs(noEstabaEnPrimerBajada, "No estaba en la primer bajada"),
    ];
    let settings = {
      fileName: "Diferencias entre Bajadas",
    };
    xlsx(data, settings);
  };
  const downloadInfoPrimer = () =>{
    const primerBajadaData = primerBajada ? convertirAXlxs(primerBajada, "Info de primer bajada") : null
    const data = [
        primerBajadaData,
    ]
    let settings = {
        fileName: "Info de Primer Bajada",
      };
      xlsx(data, settings);
  }
  const downloadInfoSegunda = () =>{
    const segundaBajadaData = segundaBajada ? convertirAXlxs(segundaBajada, "Info de primer bajada") : null
    const data = [
        segundaBajadaData,
    ]
    let settings = {
        fileName: "Info de segunda Bajada",
      };
      xlsx(data, settings);
  }
  useEffect(() => {
    const { primerBajada, segundaBajada } = valuesFiles;
    if (
      primerBajada?.length &&
      segundaBajada?.length &&
      primerBajada.length > segundaBajada.length
    ) {
      setFaltoASegundaBajada(faltoAFormacion(primerBajada, segundaBajada));
    }
    if (
      primerBajada?.length &&
      segundaBajada?.length &&
      primerBajada.length > segundaBajada.length
    ) {
      setNoEstabaEnPrimerBajada(faltoAFormacion(segundaBajada, primerBajada));
    }
  }, [valuesFiles]);

  const canUploadBajadas = (patron) =>{
    return patron?.length ? true: false
  }
  const canDownloadDiferenciasInfo = () =>{
    return !!(faltoASegundaBajada.length && noEstabaEnPrimerBajada.length)
  }
  const canDownloadInfoPrimer = () =>{
    return !(primerBajada === undefined)
  }
  const canDownloadInfoSegunda = () =>{
    return !(segundaBajada === undefined)
  }
console.log({ patron, primerBajada, segundaBajada });
  return (
    <DirectoryContainer>
      <Input
        label={"Seleccionar archivo patron"}
        name="patron"
        onChange={handleChange}
      />
      <Input
        label={"Seleccionar archivo de la primer bajada"}
        name="primerBajada" onChange={handleChange}
        disabled={!canUploadBajadas(patron)}
      />
      <br />
      <Button onClick={downloadInfoPrimer} disabled={!canDownloadInfoPrimer()}>descargar info Primer Bajada</Button>
      <Input
        label={"Seleccionar archivo de la segunda bajada"}
        name="segundaBajada" onChange={handleChange}
        disabled={!canUploadBajadas(patron)}
      />
      <br />
      <Button onClick={downloadInfoSegunda} disabled={!canDownloadInfoSegunda()} >descargar info Segunda Bajada</Button>
      <br />
      <br />
      <Button onClick={downloadDiferenciasFiles} disabled={!canDownloadDiferenciasInfo()}>descargar diferencias entre bajadas</Button>
      <br />
      <br />
      
    </DirectoryContainer>
  );
};

export default Directory;
