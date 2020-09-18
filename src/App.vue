<template>
  <v-app>
    <v-container class="pt-8 pb-15">
      <lottie-player
        class="mx-auto mb-3"
        src="https://assets7.lottiefiles.com/packages/lf20_fBCpuQ.json"
        background="transparent"
        speed="1"
        style="width: 200px; height: 200px;"
        loop
        autoplay
      ></lottie-player>

      <h1 class="text-center mx-auto mb-4">Calculadora estadística</h1>
      <p class="text-center mx-auto mb-6">
        Ingresa el set de datos en el campo que se encuentra a continuación, se
        limpiaran, se ordenaran, se calculará la frecuencia absoluta, frecuencia
        relativa y frecuencia acumulada, se dibujará un histograma para los
        datos ademas de calcular múltiples medidas de tendencia central.
      </p>
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
          <b
            >Datos limpios - {{ parsedDataArray.length }} números encontrados</b
          >

          <v-btn
            small
            type="button"
            color="primary"
            v-clipboard:copy="parsedDataArray.join('\n')"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            Copiar&nbsp;<i class="fas fa-copy"></i>
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
          <b>
            Datos ordenados - {{ sortedDataArray.length }} números encontrados
          </b>

          <v-btn
            small
            type="button"
            color="primary"
            v-clipboard:copy="sortedDataArray.join('\n')"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            Copiar&nbsp;<i class="fas fa-copy"></i>
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
        v-if="fullStatistics.length > 0"
        class="animate__animated animate__fadeInUp"
      >
        <b>Todos los datos</b>
        <div v-for="number in fullStatistics" :key="number.number">
          {{ number }}
        </div>
      </div>
    </v-container>
    <v-footer fixed>
      <span class="mx-auto text-center">
        &copy; {{ new Date().getFullYear() }}.
        <span v-html="currentFooterHTML"></span>
        <a
          target="_blank"
          href="https://github.com/eduardodevop/proyecto-estadistica-2020"
        >
          <i class="fab fa-github"></i>
        </a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  cleanDataset,
  orderedDataset,
  absoluteFrecuency,
  totalData,
  relativeFrecuency,
} from "./ts/statistics.ts";
export default {
  name: "app",
  data() {
    return {
      rawData: "",
      footerMessages: [
        "Hecho con el 💛 por Luis, Hugo y Fernan.",
        "Hecho con 😴 en la pandemia 🦠.",
        "Hecho con ☕ en Chimaltenango.",
      ],
      currentFooterMessage: 0,
    };
  },
  methods: {
    nextFooterMessage() {
      let nextMessage = this.currentFooterMessage + 1;
      if (nextMessage > this.footerMessages.length - 1) {
        this.currentFooterMessage = 0;
      } else {
        this.currentFooterMessage = nextMessage;
      }
    },
    onCopy: function(e) {
      Swal.fire("Texto copiado al portapapeles", "", "success");
    },
    onError: function(e) {
      Swal.fire(
        "Ocurrió un error inesperado al intentar copiar el texto",
        "",
        "error"
      );
    },
  },
  computed: {
    currentFooterHTML() {
      return `
        <span class="animate__animated animate__fadeIn">${
          this.footerMessages[this.currentFooterMessage]
        }</span>
      `;
    },
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
          relativeFrecuency: relativeFrec,
          accumulatedRelativeFrecuency: relativeFrecAcc,
        });
      });

      return statistics;
    },
  },
  created() {
    setInterval(() => {
      this.nextFooterMessage();
    }, 5000);
  },
};
</script>
