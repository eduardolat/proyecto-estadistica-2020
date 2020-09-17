/*
 ** Limpia los datos y los convierte en un array de números eliminando todo el resto de caracteres
 ** Se tomara como un número distinto todo aquel que este separado por coma, espacio o salto de linea
 */
export const cleanDataset = (dataset: string): number[] => {
  return dataset
    .split(/[\n\s,]+/)
    .filter((n) => {
      if (!!n.replace(/[^0-9]/g, "").length) {
        return true;
      }
      return false;
    })
    .map((n) => {
      return parseInt(n.replace(/[^0-9]/g, ""));
    });
};

/*
 ** Determina el total de los datos limpios en el dataset
 */
export const totalData = (dataset: string): number => {
  return cleanDataset(dataset).length;
};

/*
 ** Ordena los datos ascendentemente y elimina los repetidos
 */
export const orderedDataset = (dataset: string): number[] => {
  let data = cleanDataset(dataset);
  return data
    .filter((item, pos) => {
      return data.indexOf(item) == pos;
    })
    .sort((a, b) => a - b);
};

/*
 ** Determina la frecuencia absoluta de un número en el dataset
 */
export const absoluteFrecuency = (dataset: string, number: number): number => {
  return cleanDataset(dataset).filter((x) => x == number).length;
};

/*
 ** Determina la frecuencia relativa de un número en el dataset
 */
export const relativeFrecuency = (dataset: string, number: number): number => {
  return absoluteFrecuency(dataset, number) / totalData(dataset);
};
