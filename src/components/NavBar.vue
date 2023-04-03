<script>
import { mapWritableState } from 'pinia';
import useFileStore from '../stores';

export default {
  data() {
    return {
      isNavOpen: false,
    };
  },
  computed: {
    ...mapWritableState(useFileStore, ['isMobile']),
    navLinkStyle() {
      return {
        'h-0': !this.isNavOpen,
        hidden: !this.isNavOpen,
      };
    },
    navMaskStyle() {
      return {
        'opacity-20': this.isNavOpen,
        block: this.isNavOpen,
        'opacity-0': !this.isNavOpen,
        hidden: !this.isNavOpen,
      };
    },
  },
  mounted() {
    this.isMobile = window.matchMedia('(max-width: 576px)').matches;
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
  },
};
</script>

<template>
  <header class="bg-light-main">
    <div class="md:container px-2.5 flex items-center justify-between lg:w-10/12">
      <h1 class="py-[17px] mr-auto">
        <RouterLink
          to="/"
          class="bg-[url('@/assets/images/LOGO_2.png')]
                w-[100px] h-[25px] indent-[101%] block overflow-hidden whitespace-nowrap"
        >
          點點簽
        </RouterLink>
      </h1>
      <!-- PC 樣式 -->
      <ul class="flex" :class="{'hidden': isMobile}">
        <li class="mr-[30px]">
          <a
            @click.prevent
            class="text-disabled pointer-events-none"
            href="#"
          >
            邀請他人簽署
          </a>
        </li>
        <li class="mr-[30px]">
          <RouterLink
            class="text-secondary hover:text-primary transition-colors"
            to="/upload"
          >
            簽署新文件
          </RouterLink>
        </li>
        <li>
          <a
            class="text-secondary hover:text-primary transition-colors"
            @click.prevent
          >
            登入
          </a>
        </li>
      </ul>
      <!-- 手機樣式 -->
      <button type="button" @click="toggleNav" :class="{'hidden': !isMobile}">
        <i class="fa-solid fa-bars text-secondary text-20"></i>
      </button>
      <div class="absolute top-[59px] left-0 w-full">
        <ul
          class="bg-white text-center transition-all relative z-50"
          :class="navLinkStyle"
        >
          <li>
            <a
              @click.prevent
              class="text-disabled block py-1.5 pointer-events-none"
              href="#"
            >
              邀請他人簽署
            </a>
          </li>
          <li>
            <RouterLink to="/upload" class="text-secondary block py-1.5">
              簽署新文件
            </RouterLink>
          </li>
          <li>
            <a @click.prevent class="text-secondary block py-1.5">
              登入
            </a>
          </li>
        </ul>
        <div
          @click="toggleNav"
          class="absolute z-40 top-0 left-0 h-[calc(100vh-59px)] w-full
          bg-black transition-all"
          :class="navMaskStyle"
        ></div>
      </div>
    </div>
  </header>
</template>
