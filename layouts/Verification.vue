<template>
  <div class="min-h-screen bg-[#F6F6F9] pt-[120px]">
    <div class="mb-6 flex items-center justify-center">
      <div
        class="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-white"
      >
        <img
          src="~/assets/logo/sapawarga.svg"
          width="24"
          height="33.38"
          alt="logo-sapawarga"
        />
      </div>

      <h1 class="font-roboto text-base font-extrabold">Sapawarga</h1>
    </div>
    <div class="mx-auto flex justify-center">
      <div
        class="h-fit w-[460px] rounded-lg border border-[#EAEAEF] bg-white p-10 drop-shadow-md"
      >
        <div>
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutVerification',
}
</script>
