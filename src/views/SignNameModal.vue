<template>
  <div
    class="bg-black/20 fixed z-50 top-0 bottom-0 w-full transition-opacity duration-300"
    :class="{
      'opacity-0 pointer-events-none': !isModalShow,
      'opacity-100 pointer-events-auto': isModalShow }"
    ref="modal"
    @click.self="closeModal"
  >
    <div class="p-5 inline-block rounded-[15px] bg-white
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <h2 class="text-gray-dark text-center mb-2 text-12">
        在框格內簽下大名!
      </h2>
      <div class="mb-2.5 relative">
        <canvas
          id="signCanvas"
          width="280"
          height="130"
          class="border-dashed border-2"
          @mousedown.prevent="startPosition"
          @mouseup="finishedPosition"
          @mouseleave="finishedPosition"
          @mousemove="draw"
          @touchstart.prevent="startPosition"
          @touchend="finishedPosition"
          @touchcancel="finishedPosition"
          @touchmove="draw"
        ></canvas>
        <button
          @click="reset"
          class="clear mr-5 absolute bottom-1.5 left-2 text-12"
        >
          清除
        </button>
      </div>
      <div class="flex items-center justify-between">
        <!-- 顏色按鈕 -->
        <div class="flex">
          <button
            class="w-3 h-3 p-2 bg-black rounded-full border-2 border-white
            mr-3 shadow-[0_1.96px_1.96px_0_rgba(0,0,0,0.25)]"
            type="button"
            @click="changeColor('black')"
          >
          </button>
          <button
            class="w-3 h-3 p-2 bg-[#0038a6] rounded-full border-2 border-white
            mr-3 shadow-[0_1.96px_1.96px_0_rgba(0,0,0,0.25)]"
            type="button"
            @click="changeColor('#0038a6')"
          >
          </button>
          <button
            class="w-3 h-3 p-2 bg-[#ff0000] rounded-full border-2 border-white
            shadow-[0_1.96px_1.96px_0_rgba(0,0,0,0.25)]"
            type="button"
            @click="changeColor('#ff0000')"
          >
          </button>
        </div>
        <!-- 取消 & 完成 -->
        <div>
          <button
          @click="closeModal"
            class="py-1.5 px-5 rounded-[15px] mr-2.5 text-12 text-secondary bg-light-main"
            type="button"
          >
            取消
          </button>
          <button
            @click="saveImage"
            class="py-1.5 px-5 rounded-[15px] text-12 text-white bg-secondary
              disabled:text-white disabled:bg-gray"
            type="button"
            :disabled="!isCanvasFilled"
          >
            簽好了
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <img
    :src="imgUrl"
    class="show-img mt-4"
    height="150"
    style="border: 1px solid"
    width="250"
  /> -->

  <!-- <div class="btn-group">
    <button class="save" @click="openModal">open</button>
  </div> -->
</template>

<script>
import fabric from 'fabric';
import { mapState } from 'pinia';
import useFileStore from '../stores';

export default {
  data() {
    return {
      isPainting: false,
      isCanvasFilled: false,
      isModalShow: false,
      canvas: null,
      ctx: null,
      imgUrl: null,
      modal: null,
      signImg: null,
    };
  },
  computed: {
    ...mapState(useFileStore, ['canvasPDF']),
  },
  methods: {
    // 取得滑鼠 / 手指在畫布上的位置
    getPaintPosition(e) {
      const canvasSize = this.canvas.getBoundingClientRect();
      if (e.type === 'mousemove') {
        return {
          x: e.clientX - canvasSize.left,
          y: e.clientY - canvasSize.top,
        };
      }
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    },
    // 開始繪圖時，將狀態開啟
    startPosition() {
      this.isPainting = true;
    },
    // 結束繪圖時，將狀態關閉，並產生新路徑
    finishedPosition() {
      this.isPainting = false;
      this.ctx.beginPath();
    },
    // 繪圖過程
    draw(e) {
      // 滑鼠移動過程中，若非繪圖狀態，則跳出
      if (!this.isPainting) return;
      this.isCanvasFilled = true;

      // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
      const paintPosition = this.getPaintPosition(e);

      // 設定線條的相關數值
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round'; // 兩條線條交匯時，建立圓形邊角
      this.ctx.shadowBlur = 1; // 邊緣模糊，防止直線邊緣出現鋸齒
      // this.ctx.shadowColor = 'black'; // 邊緣顏色

      // 移動滑鼠位置並產生圖案
      this.ctx.lineTo(paintPosition.x, paintPosition.y);
      this.ctx.stroke();
    },
    // 重新設定畫布
    reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.isCanvasFilled = false;
    },
    saveImage() {
      // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
      const newImg = this.canvas.toDataURL('image/png');
      this.imgUrl = newImg;
      localStorage.setItem('img', newImg);
      this.closeModal();
    },
    addSignPicture() {
      // 若 localStorage 有資料才放入
      if (localStorage.getItem('img')) {
        this.signImg = localStorage.getItem('img');
      }
      fabric.Image.fromURL(this.signImg, (image) => {
        // 設定簽名出現的位置及大小，後續可調整
        const imageData = image;
        imageData.top = 400;
        imageData.scaleX = 0.5;
        imageData.scaleY = 0.5;
        this.canvasPDF.add(imageData);
      });
    },
    changeColor(color) {
      this.ctx.strokeStyle = color;
    },
    openModal() {
      this.isModalShow = true;
    },
    closeModal() {
      this.isModalShow = false;
    },
  },
  mounted() {
    this.canvas = document.querySelector('#signCanvas');
    this.ctx = this.canvas.getContext('2d'); // 要使用 2D 的方式繪圖
    // const clearBtn = document.querySelector('.clear');

    this.modal = this.$refs.modal;
  },
};
</script>
