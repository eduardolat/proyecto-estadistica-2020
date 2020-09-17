<template>
  <v-app>
    <v-container>
      <v-textarea
        outlined
        label="Ingrese los números, separados por una coma, un espacio o un salto de linea"
        v-model="rawData"
      ></v-textarea>
      <span>
        <b>Datos limpios</b>
        <br />
        {{ parsedDataArray }}
        <br />
        <b>Datos ordenados</b>
        <br />
        {{ sortedDataArray }}
        <br />
        <b>Todos los datos</b>
        <br />
        <div v-for="number in fullStatistics" :key="number.number">
          {{ number }}
        </div>
      </span>
      <br />&nbsp; <br />&nbsp; <br />&nbsp; <br />&nbsp;
    </v-container>
    <v-footer absolute>
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
