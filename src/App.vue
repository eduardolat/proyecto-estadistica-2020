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
        <b>Datos ordenados</b>
        <br />
        {{ sortedDataArray }}
      </span>
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
      return this.rawData
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
    },
    sortedDataArray() {
      return this.parsedDataArray
        .filter((item, pos) => {
          return this.parsedDataArray.indexOf(item) == pos;
        })
        .sort((a, b) => a - b);
    },
  },
  created() {
    setInterval(() => {
      this.nextFooterMessage();
    }, 5000);
  },
};
</script>
