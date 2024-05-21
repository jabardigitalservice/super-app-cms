<template>
  <div class="flex flex-col items-center">
    <img
      :src="require(`~/assets/icon/${information[informationType].icon}.svg`)"
      alt="icon"
      width="72"
      height="72"
    />
    <h1 class="mt-6 font-roboto text-2xl font-bold">
      {{ information[informationType].title }}
    </h1>
    <p class="mt-2 text-center text-[14px]">
      {{ information[informationType].description }}
      <strong>{{ email }}</strong>
    </p>
    <NuxtLink
      :to="link"
      class="mt-10 w-full rounded-lg bg-green-700 px-4 py-[14px] text-center font-lato text-[14px] font-bold leading-[18px] text-white"
      >{{ information[informationType].button }}</NuxtLink
    >
  </div>
</template>

<script>
export default {
  name: 'CreatePasswordInformation',
  props: {
    informationType: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '#',
    },
  },
  data() {
    return {
      information: {
        success: {
          title: 'Kata Sandi Anda Berhasil Dibuat',
          icon: 'icon-key-success',
          description:
            'Anda telah berhasil membuat kata sandi untuk akun dengan email',
          button: 'Masuk ke Akun Sekarang',
        },
        failed: {
          title: 'Kata Sandi Gagal Dibuat',
          icon: 'icon-key-failed',
          description:
            'Terjadi kesalahan pada sistem, kata sandi baru Anda tidak dapat dibuat. Silakan coba buat ulang kata sandi.',
          button: 'Buat Ulang Kata Sandi',
        },
      },
    }
  },
}
</script>
