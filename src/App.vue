<template>
  <v-app>
    <v-main>
      <v-container class="pt-8 pb-15">
        <lottie-player
          class="mx-auto mb-3"
          src="./chart-lottie.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px"
          loop
          autoplay
        ></lottie-player>

        <h1 class="text-center mx-auto mb-4">Calculadora estadística</h1>
        <p class="text-justify mx-auto mb-6">
          Ingresa el set de datos en el campo que se encuentra a continuación,
          se limpiaran, se ordenaran, se calculará la frecuencia absoluta,
          frecuencia relativa y frecuencia acumulada, se dibujará un histograma
          para los datos ademas de calcular múltiples medidas de tendencia
          central.
        </p>
        <v-switch
          class="switch-center mx-auto"
          label="Tema oscuro"
          color="orange"
          inset
          v-model="darkMode"
        ></v-switch>
        <v-textarea
          outlined
          name="raw-data"
          label="Ingresa los números, separados por una coma, un espacio o un salto de linea"
          v-model="rawData"
          autofocus
        ></v-textarea>

        <v-row>
          <v-col
            cols="12"
            md="6"
            v-if="parsedDataArray.length > 0"
            class="animate__animated animate__fadeInUp"
          >
            <h2>
              Datos limpios - {{ parsedDataArray.length }} números encontrados
            </h2>

            <v-btn
              small
              type="button"
              color="primary"
              v-clipboard:copy="parsedDataArray.join('\n')"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              Copiar&nbsp;
              <i class="fas fa-copy"></i>
            </v-btn>
            <v-textarea
              class="mt-2"
              name="parsed-data"
              outlined
              readonly
              :value="parsedDataArray.join('\n')"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
            md="6"
            v-if="sortedDataArray.length > 0"
            class="animate__animated animate__fadeInUp"
          >
            <h2>
              Datos ordenados - {{ sortedDataArray.length }} números encontrados
            </h2>

            <v-btn
              small
              type="button"
              color="primary"
              v-clipboard:copy="sortedDataArray.join('\n')"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              Copiar&nbsp;
              <i class="fas fa-copy"></i>
            </v-btn>
            <v-textarea
              class="mt-2"
              name="ordered-data"
              outlined
              readonly
              :value="sortedDataArray.join('\n')"
            ></v-textarea>
          </v-col>
        </v-row>

        <div
          v-if="fullStatistics.length > 1"
          class="animate__animated animate__fadeInUp"
        >
          <h2>Tabla de datos</h2>
          <v-data-table
            :headers="[
              { text: 'Número', value: 'number' },
              { text: 'Frecuencia Absoluta', value: 'absoluteFrecuency' },
              {
                text: 'Frecuencia Absoluta Acumulada',
                value: 'accumulatedAbsoluteFrecuency',
              },
              { text: 'Frecuencia Relativa', value: 'relativeFrecuency' },
              {
                text: 'Frecuencia Relativa Acumulada',
                value: 'accumulatedRelativeFrecuency',
              },
            ]"
            :items="fullStatistics"
            class="elevation-1 mt-2"
            hide-default-footer
            disable-sort
          ></v-data-table>
        </div>

        <div
          v-if="sortedDataArray.length > 0"
          class="animate__animated animate__fadeInUp mt-10"
        >
          <h2>Medidas de tendencia central</h2>
          <v-data-table
            :headers="[
              { text: 'Moda aritmética', value: 'arithmeticMode' },
              { text: 'Media aritmética', value: 'arithmeticMean' },
              { text: 'Mediana aritmética', value: 'arithmeticMedian' },
            ]"
            :items="measuresOfCentralTendency"
            class="elevation-1 mt-2"
            hide-default-footer
            disable-sort
          ></v-data-table>
        </div>

        <div
          v-show="sortedDataArray.length > 0"
          class="animate__animated animate__fadeInUp mt-10"
        >
          <h2>Histograma</h2>
          <canvas id="histograma"></canvas>
        </div>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import {
  cleanDataset,
  orderedDataset,
  absoluteFrecuency,
  totalData,
  relativeFrecuency,
  arithmeticMean,
  arithmeticMedian,
  arithmeticMode,
} from "./ts/statistics.ts";

import Footer from "./components/common/Footer.vue";

export default {
  name: "app",
  data() {
    return {
      rawData: "",
      chart: "",
      darkMode: localStorage.getItem("darkModeEnabled") ? true : false,
    };
  },
  methods: {
    onCopy: function (e) {
      Swal.fire("Texto copiado al portapapeles", "", "success");
    },
    onError: function (e) {
      Swal.fire(
        "Ocurrió un error inesperado al intentar copiar el texto",
        "",
        "error"
      );
    },
    createHistogramaChart() {
      let chartData = {
        type: "line",
        data: {},
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
      };
      this.chart = new Chart(document.getElementById("histograma"), {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
  computed: {
    parsedDataArray() {
      return cleanDataset(this.rawData);
    },
    sortedDataArray() {
      return orderedDataset(this.rawData);
    },
    fullStatistics() {
      let statistics = [];
      let absoluteFrecAcc = 0;
      let relativeFrecAcc = 0;

      this.sortedDataArray.forEach((x) => {
        let absoluteFrec = absoluteFrecuency(this.rawData, x);
        let relativeFrec = relativeFrecuency(this.rawData, x);
        absoluteFrecAcc += absoluteFrec;
        relativeFrecAcc += relativeFrec;
        statistics.push({
          number: x,
          absoluteFrecuency: absoluteFrec,
          accumulatedAbsoluteFrecuency: absoluteFrecAcc,
          relativeFrecuency: (relativeFrec * 100).toFixed(2) + "%",
          accumulatedRelativeFrecuency:
            (relativeFrecAcc * 100).toFixed(2) + "%",
        });
      });

      statistics.push({
        number: "TOTALES:",
        absoluteFrecuency: absoluteFrecAcc,
        accumulatedAbsoluteFrecuency: "",
        relativeFrecuency: (relativeFrecAcc * 100).toFixed(2) + "%",
        accumulatedRelativeFrecuency: "",
      });

      return statistics;
    },
    measuresOfCentralTendency() {
      return [
        {
          arithmeticMean: arithmeticMean(this.rawData),
          arithmeticMedian: arithmeticMedian(this.rawData),
          arithmeticMode: arithmeticMode(this.rawData),
        },
      ];
    },
  },
  watch: {
    darkMode: function (status) {
      if (status === true) {
        localStorage.setItem("darkModeEnabled", JSON.stringify(true));
        this.$vuetify.theme.dark = true;
      } else {
        localStorage.removeItem("darkModeEnabled");
        this.$vuetify.theme.dark = false;
      }
    },
    sortedDataArray: function (n, old) {
      if (n == old) {
        return;
      }
      this.chart.data = {
        labels: this.sortedDataArray.map((x) => {
          return `No. ${x}`;
        }),
        datasets: [
          {
            label: "Frecuencia absoluta",
            data: this.sortedDataArray.map((x) => {
              return absoluteFrecuency(this.rawData, x);
            }),
            backgroundColor: this.sortedDataArray.map((x) => {
              return "rgba(222, 230, 0, .8)";
            }),
            borderColor: this.sortedDataArray.map((x) => {
              return "#f4fc03";
            }),
            borderWidth: 3,
          },
        ],
      };
      this.chart.update();
    },
  },
  mounted() {
    this.createHistogramaChart();
  },
  components: {
    Footer,
  },
};
</script>

<style scoped>
.switch-center {
  display: flex;
  justify-content: center;
}
</style>
