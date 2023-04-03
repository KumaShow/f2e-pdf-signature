import { defineStore } from 'pinia';

const useFileStore = defineStore('file', {
  state: () => ({
    isFileOverSize: false,
    isMobile: true,
    pdfList: [],
    targetPDF: null,
    finalPDF: null,
    canvasPDF: null,
    canvasSign: null,
    signImgList: [],
    signStep: 'upload',
  }),
  getters: {

  },
  actions: {
    uploadPDF(data) {
      if (data.file === undefined) return;
      if (data.file.size > (1024 * 1024 * 10)) {
        this.isFileOverSize = true;
      } else {
        this.isFileOverSize = false;
        // 產生 fileReader 物件
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(data.file);
        fileReader.addEventListener('load', () => {
        // 獲取 readAsArrayBuffer 產生的結果，並用來渲染 PDF
          const typedarray = new Uint8Array(fileReader.result);
          this.pdfList.push({
            data,
            typedarray,
            id: this.pdfList.length,
          });
        });
      }
    },
    removeSign(id) {
      const idx = this.signImgList.findIndex((item) => item.id === id);
      this.signImgList.splice(idx, 1);

      const arrString = JSON.stringify(this.signImgList);
      localStorage.setItem('imgList', arrString);

      this.signImgList = JSON.parse(localStorage.getItem('imgList'));
    },
  },
});

export default useFileStore;
