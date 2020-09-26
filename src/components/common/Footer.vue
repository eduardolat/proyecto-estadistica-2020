<template>
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
</template>

<script>
export default {
  data() {
    return {
      currentFooterMessage: 0,
      footerMessages: [
        "Hecho con el 💛 por Luis, Hugo y Fernan.",
        "Hecho con 😴 en la pandemia 🦠.",
        "Hecho con ☕ en Chimaltenango.",
      ],
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
  },
  created() {
    setInterval(() => {
      this.nextFooterMessage();
    }, 5000);
  },
};
</script>

<style lang="scss" scoped>
</style>