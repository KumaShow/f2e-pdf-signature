<template>
  <header class="bg-light-main">
    <div class="container mx-auto flex items-center justify-between">
      <div class="">
        <h1 class="py-[17px]">
          <RouterLink
            to="/"
            class="bg-[url('@/assets/images/LOGO_2.png')]
                  w-[100px] h-[25px] indent-[101%] block overflow-hidden whitespace-nowrap"
          >
            點點簽
          </RouterLink>
        </h1>
      </div>

      <ul class="flex">
        <li class="">
          <a href="#" class="text-disabled" @click.prevent>邀請他人簽署</a>
        </li>
        <li class="">
          <RouterLink to="/upload" class="text-secondary">簽署新文件</RouterLink>
        </li>
        <li class="">
          <RouterLink to="/login" class="text-secondary">登入</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {

};
</script>
