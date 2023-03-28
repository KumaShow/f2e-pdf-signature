import { defineStore } from 'pinia';

const useFileStore = defineStore('file', {
  state: () => ({
    isFileOverSize: false,
    pdfList: [],
    targetPDF: null,
    canvasPDF: null,
    canvasSign: null,
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
          // renderPDF(typedarray);
          // console.log(typedarray);
          this.pdfList.push({
            data,
            typedarray,
            id: this.pdfList.length,
          });
        });
      }
    },
  },
});

export default useFileStore;
