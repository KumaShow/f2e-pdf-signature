<script>
import { mapWritableState } from 'pinia';
import useFileStore from '../stores';

export default {
  computed: {
    ...mapWritableState(useFileStore, ['signStep']),
  },
  mounted() {
    this.signStep = 'upload';
  },
};
</script>

<template>
  <main
    class="bg-center bg-cover bg-no-repeat h-[calc(100vh-59px)] banner"
  >
  <div class="container h-full">
    <div class="w-2/3 mx-auto py-16 h-full flex flex-col grow justify-between
        md:absolute md:top-[15%] md:right-[10%] md:max-w-[24rem] md:h-0"
    >
      <div class="md:mb-16">
        <img class="mb-2" src="@/assets/images/LOGO_1.png" alt="點點簽">
        <p class="text-secondary text-12 tracking-[0.9em] text-center sm:text-16 md:text-20">
          線上簽署，方便快速。
        </p>
      </div>
      <RouterLink
        to="/upload"
        class="py-3.5 md:py-5 text-12 sm:text-16 text-dark tracking-[1em] text-center
          rounded-none bg-white hover:bg-primary  hover:text-white
          transition-colors shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] md:text-20"
      >
        簽署新文件
      </RouterLink>
    </div>
  </div>
  </main>
</template>

<style>
.banner {
  background-image: url('@/assets/images/banner_main.png'),
                    url('@/assets/images/banner_second.png');
  background-position: left center, center center;
  background-size: 95%, cover;
  background-repeat: no-repeat;
}
@media (min-width: 576px) {
  .banner{
    background-position: left center, right center;
    background-size: 80%, cover;
  }
}
@media (min-width: 768px) {
  .banner{
    background-position: left center, right center;
    background-size: 53%, cover;
  }
}
</style>
