<script>
import moment from 'moment';
import { mapActions, mapState, mapWritableState } from 'pinia';
import useFileStore from '../stores';

export default {
  data() {
    return {
      time: '',
    };
  },
  computed: {
    ...mapState(useFileStore, ['isMobile']),
    ...mapWritableState(useFileStore, ['signStep']),
  },
  methods: {
    ...mapActions(useFileStore, ['uploadPDF']),
    upload() {
      const date = moment();
      const uploadDate = date.format('YYYY/MM/DD, HH:mm');
      const file = this.$refs.fileInput.files[0];
      this.uploadPDF({
        uploadTime: uploadDate,
        file,
      });
    },
  },
};
</script>

<template>
  <div
    class="p-2.5 md:p-[30px] bg-white grow rounded-b-[15px]
    h-full"
  >
    <label
      class="border border-dashed border-gray-dark rounded-[15px] h-full flex
      items-center justify-center hover:bg-gray-light"
    >
      <div
        class="text-center text-gray-dark text-10 sm:text-16 md:text-20"
      >
        <p class="mb-3.5">
          點擊此處上傳
          <span v-if="!isMobile"> 或 直接拖曳檔案</span>
        </p>
        <img
          class="mb-3.5 mx-auto"
          alt="PDF icon"
          src="@/assets/images/icon-document-pdf.png"
        >
        <p>(限10MB以下PDF檔)</p>
        <input
          @change="upload"
          class="hidden"
          accept="application/pdf"
          placeholder="選擇PDF檔案"
          type="file"
          ref="fileInput"
        />
      </div>
    </label>
  </div>
</template>
