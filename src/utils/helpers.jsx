const convertirAObjeto = (bajada) => {
    let objTotal = [];
    for (let i = 0; i === 0; i++) {
      for (let j = 1; j < bajada.length; j++) {
        let devuelve = bajada[j].map((curr, index) => {
          const claveValor = { [bajada[i][index]]: bajada[j][index] };
          return claveValor;
        });
        const achicado = devuelve.reduce((acc, curr) => {
          return {
            ...acc,
            ...curr,
          };
        }, {});
        objTotal = [...objTotal, achicado];
      }
    }
    return objTotal;
  };
  
  const convertirAXlxs= (bajada, sheet) =>{
    const keys = Object.keys(bajada[0])
    const convertToValueKey = keys.map(key => key.split(" ").join(""))
  
    const columns = keys.map(key =>{
      const value = key.split(" ").join("")
      return{
        label: key,
        value
      }
    })
    const dataSinKeys = bajada.map(buque =>{
      return[
        ...Object.values(buque)
      ]
    })
  const content = dataSinKeys.map((data)=>{
    const dataToObject = data.reduce((acc, curr,indx)=>{
      const keyValuePair = {[convertToValueKey[indx]]: curr}
      return{
        ...acc,
        ...keyValuePair
      }
    },{})
   return {...dataToObject}
  })
    console.log({content})
    return {
      sheet,
      columns,
      content
    }
  }
  
  const completarData = (patron, bajada) =>{
    const dataCompleta = bajada.map(buque =>{
      const buquePatron = patron.find(buquePatron => buquePatron["IMO Number"] === buque["IMO Number"])
      if(!buquePatron) return buque
      let copiaBuque = {...buque}
      copiaBuque["Vessel Type"] = buquePatron["Vessel Type"]
  
      return copiaBuque
    })
    return dataCompleta
  }
  
  const faltoAFormacion = (primeraBajada, segundaBajada) =>{
    const faltoAFormacion = primeraBajada.reduce((acc, buquePrimerBajada)=>{
      const buqueEnSegundaBajada = segundaBajada.filter(buqueSegundaBajada => buqueSegundaBajada["IMO Number"] === buquePrimerBajada["IMO Number"])
      if(!buqueEnSegundaBajada.length){
        return[
          ...acc,
          buquePrimerBajada
        ]
      }
      return acc
    },[])
    return faltoAFormacion
  }

  export {
    faltoAFormacion,
    completarData,
    convertirAXlxs,
    convertirAObjeto
  }