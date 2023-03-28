<template>
  <div class="flex flex-col h-[calc(100%-60px-76px-20px)]">
    <!-- <input type="file" class="select" accept="application/pdf" @change="test($event)" /> -->
    <!-- <button class="p-4 border" @click="test">click</button>
    <button class="px-4" @click="increaseSize">+</button>
    <button class="px-4" @click="decreaseSize">-</button> -->
    <div class="grow overflow-scroll">
      <canvas class="p-4 h-full w-full" ref="canvasPDF" id="canvasPDF"></canvas>
    </div>
    <!-- 簽名功能 -->
    <div class="w-full shadow-[0_-4px_4px_0px_rgba(0,0,0,0.2)]">
      <button
        @click="createSign"
        class="w-1/2 inline-flex justify-center border-r-2 py-1.5 hover:bg-light-main"
        type="button"
      >
        創建簽名 <img src="@/assets/images/icon-pen.png" alt="手寫簽名" class="inline ml-[5px]">
      </button>
      <button class="w-1/2 inline-flex justify-center py-1.5 hover:bg-light-main"> 創建簽名 <img
          src="@/assets/images/icon-picture.png" alt="圖片簽名" class="inline ml-[5px]">
      </button>
    </div>
  </div>
  <SignNameModal ref="signModal" />
  <PDFStep />
</template>

<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
import { fabric } from 'fabric';
import { mapState, mapWritableState } from 'pinia';
import useFileStore from '../stores';
import PDFStep from '../components/PDFStep.vue';
import SignNameModal from './SignNameModal.vue';

export default {
  components: {
    PDFStep,
    SignNameModal,
  },
  data() {
    return {
      scale: 1,
      // PDFFile: null,
      viewport: 0,
      Base64Prefix: null,
      // canvasPDF: null,
      context: null,
    };
  },
  computed: {
    ...mapState(useFileStore, ['pdfList', 'targetPDF']),
    ...mapWritableState(useFileStore, ['canvasPDF']),
  },
  watch: {
    // scale() {
    // this.renderPDF(this.PDFFile);
    // },
  },
  mounted() {
    // this.canvasPDF = this.$refs.canvasPDF;
    this.Base64Prefix = 'data:application/pdf;base64,';
    GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    // this.context = this.canvasPDF.getContext('2d');
    if (!this.targetPDF) {
      this.$router.push('/upload');
    } else {
      this.onFileChange(this.targetPDF[0].data.file);
      // this.renderPDF(this.targetPDF);
      // console.log(this.targetPDF[0].data.file);
    }
  },
  methods: {
    createSign() {
      this.$refs.signModal.openModal();
    },

    // async renderPDF(data) {
    //   const pdfDoc = await getDocument(data).promise;
    //   const pdfPage = await pdfDoc.getPage(1);
    //   const viewport = pdfPage.getViewport({ scale: this.scale });
    //   // const parent = canvas.parentNode;
    //   // canvas.width = parent.offsetWidth;
    //   // canvas.height = parent.offsetHeight;
    //   this.canvas.width = viewport.width;
    //   this.canvas.height = viewport.height;

    //   // const scale = Math.min(canvas.width / viewport.width, canvas.height / viewport.height);
    //   // const scaledViewport = page.getViewport({ scale });
    //   pdfPage.render({
    //     canvasContext: this.context,
    //     viewport,
    //   });
    // },
    resetSize() {
      this.scale = 1;
    },
    increaseSize() {
      this.scale += 0.2;
    },
    decreaseSize() {
      this.scale -= 0.2;
    },
    // 使用原生 FileReader 轉檔
    readBlob(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result));
        reader.addEventListener('error', reject);
        reader.readAsDataURL(blob);
      });
    },
    async printPDF(pdfData) {
      // 將檔案處理成 base64
      const base64PDF = await this.readBlob(pdfData);

      // 將 base64 中的前綴刪去，並進行解碼
      const data = atob(base64PDF.substring(this.Base64Prefix.length));

      // 利用解碼的檔案，載入 PDF 檔及第一頁
      const pdfDoc = await getDocument({ data }).promise;
      const pdfPage = await pdfDoc.getPage(1);

      // 設定尺寸及產生 canvas
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // 設定 PDF 所要顯示的寬高及渲染
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport,
      };
      const renderTask = pdfPage.render(renderContext);

      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas);
    },
    async pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio;
      // 回傳圖片
      return new fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale,
      });
    },
    async onFileChange(file) {
      this.canvasPDF = new fabric.Canvas('canvasPDF');
      this.canvasPDF.requestRenderAll();
      const pdfData = await this.printPDF(file);
      const pdfImage = await this.pdfToImage(pdfData);

      // 透過比例設定 canvas 尺寸
      this.canvasPDF.setWidth(pdfImage.width / window.devicePixelRatio);
      this.canvasPDF.setHeight(pdfImage.height / window.devicePixelRatio);

      // 將 PDF 畫面設定為背景
      this.canvasPDF.setBackgroundImage(pdfImage, this.canvasPDF.renderAll.bind(this.canvasPDF));
    },
  },
};
</script>
