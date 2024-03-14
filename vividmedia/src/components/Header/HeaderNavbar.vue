

<script>
export default {
  data: () => ({
    tab: null,
  }),

  watch: {
    tab(newTab) {
      console.log("🪟🪟", newTab, "tab:", this.tab);
      // if (newTab === 1) {
      //   this.$router.push('/');
      // } else if (newTab === 2) {
      //   this.$router.push('/gallery');
      // } else if (newTab === 3) {
      //   this.$router.push('/contact');
      // }
    }
  },

}
</script>

<style>
.scrollable-container {
  height: calc(100% - 48px);
  /* Subtract the height of the tabs */
  overflow-y: auto;
}
</style>