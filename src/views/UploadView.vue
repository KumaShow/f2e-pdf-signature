<template>
  <main class="p-2.5 bg-gray-light h-[calc(100%-76px-60px-20px)] flex flex-col">
    <!-- 上傳 tab -->
    <div class="flex flex-none bg-light-main">
      <a
        @click.prevent="() => setCurrentTab('UploadNew')"
        class="w-1/2 text-center text-secondary
        active:text-primary hover:text-primary bg-white py-2
        rounded-t-[15px] shadow-[8px_4px_4px_0_rgba(238,237,232,0.5)]
        cursor-pointer"
      >
        上傳新文件
      </a>
      <a
        @click.prevent="() => setCurrentTab('UploadStorage')"
        class="w-1/2 text-center text-secondary active:text-primary
        hover:text-primary active:primary rounded-t-[15px] py-2
        cursor-pointer"
      >
        選擇已上傳文件
      </a>
    </div>
    <!-- 上傳區域 -->
    <!-- 上傳新文件 -->
    <component
      :is="currentTab"
      />
      <!-- :pdf-list="pdfList" -->
      <!-- @upload="uploadPDF" -->
    <!-- 選擇已上傳文件 -->
  </main>
  <!-- step -->
  <PDFStep />
  <!-- 檔案大小提示 -->
  <div class="fixed top-0 left-0 w-full h-full bg-dark/20 hidden" ref="modal">
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
    bg-white text-dark h-[154px] flex items-center justify-center
    rounded-[15px] container"
    >
      <p>您的檔案太大了!</p>
      <button type="button" class="rounded-[15px] py-1.5 px-3
            absolute bottom-2.5 right-2.5 bg-secondary text-white"
            @click="closeModal">
        我知道了
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import PDFStep from '../components/PDFStep.vue';
import UploadNew from '../components/UploadNew.vue';
import UploadStorage from '../components/UploadStorage.vue';
import SignView from './SignView.vue';
import useFileStore from '../stores';

export default {
  components: {
    PDFStep,
    UploadNew,
    UploadStorage,
    SignView,
  },
  data() {
    return {
      modal: null,
      // uploadState: 'new',
      // pdfList: [],
      currentTab: 'UploadNew',
    };
  },
  watch: {
    // uploadState() {
    //   if (this.uploadState === 'new') {
    //     // console.log();
    //   }
    // },
    isFileOverSize() {
      if (this.isFileOverSize) {
        this.modal.classList.remove('hidden');
      }
    },
  },
  computed: {
    ...mapState(useFileStore, ['isFileOverSize']),
  },
  methods: {
    // ...mapActions(useFileStore, ['uploadPDF']),
    // uploadPDF(data) {
    //   if (data.file === undefined) return;
    //   if (data.file.size > 10485760) {
    //     this.modal.classList.remove('hidden');
    //   } else {
    //     // 產生 fileReader 物件
    //     const fileReader = new FileReader();

    //     fileReader.readAsArrayBuffer(data.file);
    //     fileReader.addEventListener('load', () => {
    //     // 獲取 readAsArrayBuffer 產生的結果，並用來渲染 PDF
    //       const typedarray = new Uint8Array(fileReader.result);
    //       // renderPDF(typedarray);
    //       // console.log(typedarray);
    //       this.pdfList.push({
    //         data,
    //         typedarray,
    //       });
    //     });
    //   }
    // },
    setCurrentTab(tab) {
      this.currentTab = tab;
    },
    closeModal() {
      this.modal.classList.add('hidden');
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
};
</script>
