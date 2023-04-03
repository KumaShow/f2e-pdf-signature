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
      currentTab: 'UploadNew',
    };
  },
  watch: {
    isFileOverSize() {
      if (this.isFileOverSize) {
        this.modal.classList.remove('hidden');
      }
    },
  },
  computed: {
    ...mapState(useFileStore, ['isFileOverSize']),

    activeTab() {
      return this.currentTab === 'UploadNew'
        ? 'UploadNew'
        : 'UploadStorage';
    },
  },
  methods: {
    setCurrentTab(tab) {
      this.currentTab = tab;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
    getTabClass(tab) {
      const isActive = this.isActive(tab);
      return {
        'w-1/2': true,
        'text-center': true,
        'py-2': true,
        'rounded-t-[15px]': true,
        'cursor-pointer': true,
        'transition-colors': true,
        'text-12': true,
        'sm:text-16': true,
        'md:text-20': true,
        'text-primary': isActive,
        'text-secondary': !isActive,
        'bg-white': isActive,
        'shadow-[8px_4px_4px_0_rgba(238,237,232,0.5)]': isActive && tab === 'UploadNew',
        'shadow-[-8px_4px_4px_0_rgba(238,237,232,0.5)]': isActive && tab === 'UploadStorage',
      };
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

<template>
  <div class="flex flex-col h-[calc(100%-60px)]">
    <main class="p-2.5 bg-gray flex flex-col flex-1
      pb-[144px] sm:pb-[94px] md:pb-[108px]"
    >
      <!-- 上傳 tab -->
      <div class="md:container w-full lg:w-10/12">
        <div class="flex flex-none bg-light-main rounded-t-[15px]"
        >
          <a
            @click.prevent="setCurrentTab('UploadNew')"
            :class="getTabClass('UploadNew')"
          >
            上傳新文件
          </a>
          <a
            @click.prevent="setCurrentTab('UploadStorage')"
            :class="getTabClass('UploadStorage')"
          >
            選擇已上傳文件
          </a>
        </div>
      </div>
      <div class="md:container w-full lg:w-10/12 h-full">
        <component :is="currentTab" />
      </div>
    </main>
    <!-- step -->
    <PDFStep />
  </div>
  <!-- 檔案大小提示 -->
  <div class="fixed top-0 left-0 w-full h-full bg-dark/20 hidden" ref="modal">
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]
    bg-white text-dark h-[154px] flex items-center justify-center
    rounded-[15px] container"
    >
      <p>您的檔案太大了!</p>
      <button
        type="button"
        class="rounded-[15px] py-1.5 px-3 absolute bottom-2.5 right-2.5 bg-secondary text-white"
        @click="closeModal"
      >
        我知道了
      </button>
    </div>
  </div>
</template>
