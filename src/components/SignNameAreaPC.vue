<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
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
    ...mapState(useFileStore, ['targetPDF']),
    ...mapWritableState(useFileStore, ['canvasPDF', 'signImgList']),

    signList() {
      if (localStorage.getItem('img')) {
        return localStorage.getItem('img');
      }
      return '';
    },
    fileName() {
      if (this.targetPDF) {
        return this.targetPDF[0].data.file.name;
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
    class="h-[calc(100vh-59px-82px)] bg-white w-full transition-all
    hidden md:block overflow-y-scroll"
  >
    <!-- 文件名稱 -->
    <div class="py-6 px-4 border-b-[1px]">
      <p class="text-16 text-gray-dark mb-4">文件名稱</p>
      <p class="text-16 text-gray-dark">{{ fileName }}</p>
    </div>
    <!-- 簽名區 -->
    <div class="py-6 px-4">
      <p class="text-16 text-gray-dark mb-4">我的簽名</p>
      <button
        type="button"
        @click="createSign"
        class="block w-full border-dashed border-2
          justify-center py-4 mb-4 text-gray-dark hover:bg-light-main transition-all"
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
        class="block w-full border-dashed border-2
          justify-center py-4 mb-4 text-gray-dark disabled:bg-gray-light"
        disabled
      >
        上傳圖片
        <img
          src="@/assets/images/icon-picture.png"
          alt="圖片簽名"
          class="inline ml-[5px]"
        />
      </button>
      <!-- 簽名檔列表 -->
      <ul>
        <template v-for="img in signImgList" :key="img.id">
          <li class="border-2 border-dashed mb-3 w-full relative">
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
  </div>
  <SignNameModal ref="signModal" />
</template>
