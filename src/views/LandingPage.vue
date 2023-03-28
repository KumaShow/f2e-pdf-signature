<template>
  <main class="bg-[url('@/assets/images/cover-sm.png')] bg-center bg-cover
        h-screen container">
    <div class="w-2/3 mx-auto py-16 h-full flex flex-col grow justify-between">
      <div>
        <img class="mb-2" src="@/assets/images/LOGO_1.png" alt="點點簽">
        <p class="text-secondary text-10 tracking-[1em] text-center">線上簽署，方便快速。</p>
      </div>
      <RouterLink to="/upload"
          class="py-3.5 text-10 text-dark tracking-[1em] text-center
          rounded-none bg-light-main shadow"
      >
        簽署新文件
      </RouterLink>
    </div>
  </main>
</template>
