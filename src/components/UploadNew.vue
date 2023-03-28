<script>
import moment from 'moment';
import { mapActions } from 'pinia';
import useFileStore from '../stores';

export default {
  // emits: ['upload'],
  data() {
    return {
      time: '',
    };
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
      class="p-2.5 bg-white grow rounded-b-[15px]"
    >
      <label class="border border-dashed rounded-[15px] h-full flex items-center justify-center">
        <div class="text-center text-gray-dark">
          <p class="mb-3.5">點擊此處上傳</p>
          <img class="mb-3.5" src="@/assets/images/icon-document-pdf.png" alt="PDF icon">
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
