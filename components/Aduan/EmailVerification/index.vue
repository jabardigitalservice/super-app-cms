<template>
  <div class="flex flex-col items-center text-center">
    <img
      :src="`/icon/icon-aduan/${emailVerification[verificationType].iconPath}`"
      width="72"
      height="72"
      alt="icon"
    />
    <h1 class="mt-6 mb-2 font-roboto text-2xl font-bold">Halo Admin!</h1>
    <p class="mb-2 text-[14px] leading-[23px]">
      {{ emailVerification[verificationType].description }}
    </p>
    <div
      v-if="verificationType === 'failed'"
      class="w-fit rounded-lg border border-[#EFF1F3] bg-[#F9FBFC] px-3 py-[10px]"
    >
      {{ email }}
    </div>
    <div class="mt-10">
      <jds-button
        variant="primary"
        class="!w-[348px] !text-[14px]"
        :label="emailVerification[verificationType].button"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationEmail',
  props: {
    description: {
      type: String,
      default: '',
    },
    verificationType: {
      type: String,
      default: 'success',
      required: true,
      validator(value) {
        return ['success', 'failed'].includes(value)
      },
    },
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      emailVerification: {
        success: {
          description: 'Email Anda sudah terdaftar sebagai akun Sapawarga.',
          button: 'Silahkan Login',
          iconPath: 'email-verification-success.svg',
        },
        failed: {
          description:
            'Email Anda belum terdaftar sebagai akun Sapawarga. Silahkan melakukan pembuatan kata sandi terlebih dahulu dengan email dibawah!',
          button: 'Buat Kata Sandi Sekarang',
          iconPath: 'email-verification-failed.svg',
        },
      },
    }
  },
}
</script>
