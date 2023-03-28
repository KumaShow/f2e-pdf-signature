<template>
  <footer class="bg-light-main py-2.5 w-full fixed bottom-0">
    <div class="border-b pb-[15px] mb-1.5">
      <ul class="flex text-center text-gray-dark">
        <li class="w-1/3 text-primary">
          <p>上傳文件</p>
        </li>
        <li class="w-1/3">
          <p>進行簽署</p>
        </li>
        <li class="w-1/3">
          <p>下載文件</p>
        </li>
      </ul>
    </div>
    <div class="text-end px-4">
      <button
      type="button"
        @click="this.$router.push('/')"
        class="py-1.5 px-5 mr-1.5 text-12 text-secondary bg-white
        hover:text-primary rounded-[35px] shadow-md"
      >
        取消
      </button>
      <button
        @click="openPDF"
        :disabled="!targetPDF"
        class="py-1.5 px-3 text-12 text-white bg-secondary
        hover:bg-primary rounded-[35px] shadow-md disabled:bg-disabled"
      >
        開啟文件
      </button>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'pinia';
import useFileStore from '../stores';

export default {
  computed: {
    ...mapState(useFileStore, ['targetPDF']),
  },
  methods: {
    openPDF() {
      this.$router.push('/sign');
    },
  },
};
</script>
