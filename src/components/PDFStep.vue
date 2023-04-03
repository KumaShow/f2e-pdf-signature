<script>
import jsPDF from 'jspdf';
import { mapState, mapWritableState } from 'pinia';
import useFileStore from '../stores';

export default {
  computed: {
    ...mapState(useFileStore, ['finalPDF']),
    ...mapWritableState(useFileStore, ['targetPDF', 'signStep']),

    stepUploadStyle() {
      if (this.signStep !== 'upload') {
        return 'bg-secondary';
      }
      return 'bg-primary after:animate-ping';
    },
    stepSignStyle() {
      if (this.signStep === 'sign') {
        return 'bg-primary after:animate-ping';
      }
      if (this.signStep === 'final') {
        return 'bg-secondary';
      }
      return '';
    },
    stepFinalStyle() {
      if (this.signStep === 'final') {
        return 'bg-primary after:animate-ping';
      }
      return '';
    },
  },
  methods: {
    openPDF() {
      this.$router.push('/sign');
      this.signStep = 'sign';
    },
    download() {
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        dpi: 500,
        unit: 'mm',
        format: 'a4',
      });
      // 設定背景在 PDF 中的位置及大小
      const { width } = pdf.internal.pageSize;
      const { height } = pdf.internal.pageSize;
      pdf.addImage(this.finalPDF, 'png', 0, 0, width, height);

      pdf.save('download.pdf');
    },
    cancel() {
      this.$router.push('/');
      this.signStep = 'upload';
      this.targetPDF = null;
    },
  },
};
</script>

<template>
  <footer
    class="bg-light-main py-2.5 w-full fixed bottom-0"
  >
    <div class="sm:flex sm:justify-between sm:items-center md:container">
      <!-- 簽署進度條 -->
      <div class="border-b pb-[15px] mb-1.5 sm:border-0 sm:pb-0">
        <ul class="flex text-gray-dark text-center mb-1.5">
          <li
            :class="{
              'text-primary': signStep === 'upload',
              'text-secondary': signStep !== 'upload'
            }"
            class="w-1/3 text-10 sm:text-14 sm:px-2 md-text-20"
          >
            <p>上傳文件</p>
          </li>
          <li
            :class="{
              'text-primary': signStep === 'sign',
              'text-secondary': signStep === 'final'
            }"
            class="w-1/3 text-10 sm:text-14 sm:px-2 md-text-20"
          >
            <p>進行簽署</p>
          </li>
          <li
            class="w-1/3 text-10 sm:text-14 sm:px-2 md-text-20"
            :class="{'text-primary': signStep === 'final'}"
          >
            <p>下載文件</p>
          </li>
        </ul>
        <div class="flex justify-around">
          <!-- step 上傳文件 -->
          <div class="text-center bg-white w-[22px] h-[22px] rounded-full
            p-[3px] flex justify-center items-center
            shadow-[0px_4px_4px_0_rgba(238,237,232,1)]"
          >
            <span
              class="rounded-full w-full h-full inline-block relative
              after:content-[''] after:w-4 after:h-4
              after:bg-inherit after:absolute after:left-[0%] after:top-[0%]
              after:rounded-full"
              :class="stepUploadStyle"
            ></span>
          </div>
          <!-- step 進行簽署 -->
          <div class="text-center bg-white w-[22px] h-[22px] rounded-full
            p-[3px] flex justify-center items-center
            shadow-[0px_4px_4px_0_rgba(238,237,232,1)]"
          >
            <span
              class="rounded-full w-full h-full inline-block relative
              after:content-[''] after:w-4 after:h-4
              after:bg-inherit after:absolute after:left-[0%] after:top-[0%]
              after:rounded-full"
              :class="stepSignStyle"
            ></span>
          </div>
          <!-- step 下載文件 -->
          <div class="text-center bg-white w-[22px] h-[22px] rounded-full
            p-[3px] flex justify-center items-center
            shadow-[0px_4px_4px_0_rgba(238,237,232,1)]"
          >
            <span
              class="rounded-full w-full h-full inline-block relative
              after:content-[''] after:w-4 after:h-4
              after:bg-inherit after:absolute after:left-[0%] after:top-[0%]
              after:rounded-full"
              :class="stepFinalStyle"
            ></span>
          </div>
        </div>
      </div>
      <!-- 功能按鈕 -->
      <div class="text-end px-1.5">
        <button
        type="button"
          @click="cancel"
          class="py-1.5 px-5 sm:py-3 sm:px-7 md:py-4 md:px-11 text-12 sm:text-16 md:text-20
          mr-1.5 sm:mr-3 md:mr-7 text-secondary bg-white
          hover:text-primary rounded-[35px] shadow-md transition-colors"
        >
          取消
        </button>
        <button
          v-if="signStep === 'upload' || !targetPDF"
          @click="openPDF"
          :disabled="!targetPDF"
          class="py-1.5 px-3 sm:py-3 sm:px-7 md:py-4 md:px-11
          text-12 sm:text-16 md:text-20 text-white bg-secondary
          transition-colors hover:bg-primary rounded-[35px] shadow-md disabled:bg-disabled"
        >
          開啟文件
        </button>
        <button
          v-else-if="signStep === 'sign'"
          @click="this.$emit('create')"
          class="py-1.5 px-3 sm:py-3 sm:px-7 md:py-4 md:px-11
          text-12 sm:text-16 md:text-20 text-white bg-secondary
          transition-colors hover:bg-primary rounded-[35px] shadow-md"
        >
          創建文件
        </button>
        <button
          v-else-if="signStep === 'final'"
          @click="download"
          class="py-1.5 px-3 sm:py-3 sm:px-7 md:py-4 md:px-11
          text-12 sm:text-16 md:text-20 text-white bg-secondary
          transition-colors hover:bg-primary rounded-[35px] shadow-md">
          下載文件
        </button>
      </div>
    </div>
  </footer>
</template>
