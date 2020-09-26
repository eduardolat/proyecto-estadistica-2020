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

/*
 ** Determina la media aritmética de el dataset
 */
export const arithmeticMean = (dataset: string): number => {
  let cleanData = cleanDataset(dataset);
  let sumTotal = cleanData.reduce(function(a, b) {
    return a + b;
  }, 0);
  let dataLen = cleanData.length;
  return sumTotal / dataLen;
};

/*
 ** Determina la mediana aritmética del dataset
 */
export const arithmeticMedian = (dataset: string): number => {
  let values = cleanDataset(dataset);

  values.sort(function(a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

/*
 ** Determina la moda aritmética del dataset
 */
export const arithmeticMode = (dataset: string): number => {
  let count = {};

  cleanDataset(dataset).forEach((e) => {
    if (!(e in count)) {
      count[e] = 0;
    }

    count[e]++;
  });

  let bestElement: number;
  let bestCount: number = 0;

  Object.entries(count).forEach(([k, v]) => {
    if (v > bestCount) {
      bestElement = parseInt(k);
      bestCount = parseInt(v.toString());
    }
  });

  return bestElement;
};
