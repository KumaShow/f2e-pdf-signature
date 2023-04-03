<script>
import { mapState, mapWritableState } from 'pinia';
import PDFStep from '../components/PDFStep.vue';
import useFileStore from '../stores';

export default {
  components: {
    PDFStep,
  },
  computed: {
    ...mapState(useFileStore, ['finalPDF']),
    ...mapWritableState(useFileStore, ['signStep']),
  },
  created() {
    if (!this.finalPDF) this.$router.push('/');
  },
  mounted() {
    this.signStep = 'final';
  },
};
</script>

<template>
  <div
  class="p-2 overflow-auto h-[calc(100%-59px-117px)]
    md:h-[calc(100%-59px-82px)] md:container md:w-8/12"
  >
    <div class="border-2">
      <img :src="finalPDF" alt="文件" class="w-full h-full">
    </div>
  </div>
  <PDFStep />
</template>
