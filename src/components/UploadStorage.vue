<script>
import { mapState, mapWritableState } from 'pinia';
import useFileStore from '../stores';

export default {
  // emits: ['upload'],
  // props: {
  //   pdfList: {
  //     type: Array,
  //   },
  // },
  data() {
    return {
      // testList: ['六角學院2022版活動', '廠商合約.pdf'],
      storageList: [
        {
          data: {
            file: {},
            uploadTime: null,
          },
        },
      ],
      selected: 0,
    };
  },
  computed: {
    ...mapState(useFileStore, ['pdfList']),
    ...mapWritableState(useFileStore, ['targetPDF']),
  },
  methods: {
    getPDF(id) {
      this.selected = id;
      const file = this.pdfList.filter((item) => item.id === id);
      // this.targetPDF = file[0].typedarray;
      this.targetPDF = file;
    },
  },
  mounted() {
    this.storageList = this.pdfList;
  },
};
</script>

<template>
  <section class="p-2.5 bg-white h-full rounded-[15px] text-10">
    <div>
      <div class="relative">
        <input
        class="rounded-full border w-full py-2 px-4 mb-[5px]
          placeholder-[#d9d9d9] focus:border-gray-dark focus:outline-none"
        placeholder="搜尋文件名稱"
        id="search"
        type="text"
        />
        <label class="material-symbols-outlined text-[#d9d9d9]
        absolute top-2 right-3 text-20" for="search">
          search
        </label>
      </div>
      <div class="px-4 mb-[5px] flex text-gray-dark">
        <p class="w-1/2">名稱</p>
        <p class="w-1/2">上傳時間</p>
      </div>
    </div>
    <ul>
      <template v-for="(item) in storageList" :key="item.id">
        <li class="">
          <a
            @click.prevent="getPDF(item.id)"
            class="flex hover:bg-light-main
            rounded-full w-full py-2 px-4 text-gray-dark"
            :class="{ 'bg-light-main': this.selected === item.id }"
            href="#"
            :data-id="item.id"
          >
            <p class="truncate w-1/2 text-10">{{ item?.data?.file?.name }}</p>
            <p class="truncate w-1/2 text-10">{{ item?.data?.uploadTime }}</p>
          </a>
        </li>
      </template>
    </ul>
  </section>
</template>
