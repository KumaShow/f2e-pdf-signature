<script>
import { mapActions, mapWritableState } from 'pinia';
import { fabric } from 'fabric';
import useFileStore from '../stores';
import SignNameModal from './SignNameModal.vue';

export default {
  components: {
    SignNameModal,
  },
  data() {
    return {
      isSignOpen: false,
    };
  },
  computed: {
    ...mapWritableState(useFileStore, ['canvasPDF', 'signImgList']),

    signList() {
      if (localStorage.getItem('img')) {
        return localStorage.getItem('img');
      }
      return '';
    },
  },
  methods: {
    ...mapActions(useFileStore, ['removeSign']),

    createSign() {
      this.$refs.signModal.openModal();
    },
    toggleSign() {
      this.isSignOpen = !this.isSignOpen;
    },
    addSignPicture(id) {
      this.signStep = 'sign';
      let img;
      if (localStorage.getItem('imgList')) {
        const imgList = JSON.parse(localStorage.getItem('imgList'));
        img = imgList.filter((item) => item.id === id);
      }
      fabric.Image.fromURL(img[0].imgUrl, (image) => {
        image.set({
          top: 0,
          scaleX: 0.5,
          scaleY: 0.5,
          hasControls: true,
        });
        this.canvasPDF.add(image);
      });
    },
  },
};
</script>

<template>
  <div
    class="h-12 overflow-y-scroll shadow-[0_-4px_4px_0px_rgba(0,0,0,0.2)]
    fixed bottom-[117px] sm:bottom-[75px] bg-white w-full transition-all
    md:hidden"
    :class="{ 'h-60': isSignOpen }"
  >
    <a
      @click.prevent="toggleSign"
      class="py-3 block text-center sticky top-0 bg-white text-secondary"
      href="#"
    >
      我的簽名
      <i class="fa-solid animate-bounce" :class="{'fa-chevron-down': isSignOpen}"></i>
      <i class="fa-solid animate-bounce" :class="{'fa-chevron-up': !isSignOpen}"></i>
    </a>
    <!-- 簽名按鈕 -->
    <div class="pt-4">
      <p class="text-center text-gray-dark text-10 mb-2">（往下滾動並點擊簽名使用）</p>
      <button
        type="button"
        @click="createSign"
        class="block w-80 mx-auto border-dashed border-2
          justify-center py-3 mb-3 text-gray-dark hover:bg-light-main transition-all"
      >
        創建簽名
        <img
          src="@/assets/images/icon-pen.png"
          alt="手寫簽名"
          class="inline ml-[5px]"
        />
      </button>
      <button
        type="button"
        class="block w-80 mx-auto border-dashed border-2
          justify-center py-3 mb-3 text-gray-dark disabled:bg-gray-light"
        disabled
      >
        上傳圖片
        <img
          src="@/assets/images/icon-picture.png"
          alt="圖片簽名"
          class="inline ml-[5px]"
        />
      </button>
    </div>
    <!-- 簽名檔列表 -->
    <ul>
      <template v-for="img in signImgList" :key="img.id">
        <li class="border-2 border-dashed mb-3 w-80 mx-auto relative">
          <img
            @click="addSignPicture(img.id)"
            :src="img.imgUrl"
            alt="簽名檔"
            class="h-20 object-cover block w-full"
          />
          <button
            @click="removeSign(img.id)"
            class="absolute top-1.5 right-1.5"
            type="button"
          >
              <i class="fa-solid fa-circle-xmark text-20 transition-colors
              hover:text-primary"></i>
          </button>
        </li>
      </template>
    </ul>
  </div>
  <SignNameModal ref="signModal" />
</template>
