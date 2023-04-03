<script>
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';
import { fabric } from 'fabric';
import { mapState, mapWritableState } from 'pinia';
import useFileStore from '../stores';
import PDFStep from '../components/PDFStep.vue';
import SignNameAreaMobile from '../components/SignNameAreaMobile.vue';
import SignNameAreaPC from '../components/SignNameAreaPC.vue';

export default {
  components: {
    PDFStep,
    SignNameAreaMobile,
    SignNameAreaPC,
  },
  data() {
    return {
      scale: 1,
      viewport: 0,
      Base64Prefix: null,
      context: null,
    };
  },
  computed: {
    ...mapState(useFileStore, ['pdfList', 'targetPDF']),
    ...mapWritableState(useFileStore, ['canvasPDF', 'finalPDF', 'signStep']),
  },
  watch: {
    // scale() {
    // this.renderPDF(this.PDFFile);
    // },
  },
  mounted() {
    this.Base64Prefix = 'data:application/pdf;base64,';
    GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

    if (!this.targetPDF) {
      this.$router.push('/upload');
    } else {
      this.onFileChange(this.targetPDF[0].data.file);
    }
  },
  methods: {
    createFinal() {
      this.signStep = 'final';
      this.finalPDF = this.canvasPDF.toDataURL('image/png');
      this.$router.push('/final');
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
      this.canvasPDF = new fabric.Canvas('canvasPDF', {
        selection: true,
      });
      this.canvasPDF.requestRenderAll();
      const pdfData = await this.printPDF(file);
      const pdfImage = await this.pdfToImage(pdfData);

      // 透過比例設定 canvas 尺寸
      this.canvasPDF.setWidth(pdfImage.width / window.devicePixelRatio);
      this.canvasPDF.setHeight(pdfImage.height / window.devicePixelRatio);

      // 將 PDF 畫面設定為背景
      this.canvasPDF.setBackgroundImage(
        pdfImage,
        this.canvasPDF.renderAll.bind(this.canvasPDF),
      );
    },
  },
};
</script>

<template>
  <div class="flex flex-col md:flex-row h-[calc(100%-60px-117px-48px)]
  sm:h-[calc(100%-60px-75px-48px)]
  md:h-[calc(100%-60px-82px)] bg-gray">
    <!-- <input type="file" class="select" accept="application/pdf" @change="test($event)" /> -->
    <!-- <button class="p-4 border" @click="test">click</button>
    <button class="px-4" @click="increaseSize">+</button>
    <button class="px-4" @click="decreaseSize">-</button> -->
    <!-- 簽名功能 - PC -->
    <div class="w-3/12">
      <SignNameAreaPC />
    </div>
    <!-- canvas -->
    <div class="flex-1 overflow-auto md:w-9/12 p-2">
      <div class="overflow-auto border-2 h-full">
        <canvas ref="canvasPDF" id="canvasPDF"></canvas>
      </div>
    </div>
    <!-- 簽名功能 - 行動裝置 -->
    <SignNameAreaMobile />
  </div>
  <PDFStep @create="createFinal" />
</template>

<style>
.sign-enter-active {
  transition: all 0.3s ease-in;
}
</style>
