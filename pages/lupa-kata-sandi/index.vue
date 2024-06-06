<template>
  <div class="min-h-screen bg-[#F6F6F9]">
    <div class="flex h-screen items-center justify-center">
      <PopOver
        :icon="iconForgotPassword"
        title="Lupa Kata Sandi"
        description="Masukkan email akun Sapawarga Anda untuk dapatkan tautan mengubah password."
      >
        <ValidationObserver ref="form" tag="div" class="w-full pt-5">
          <form class="w-full">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
              name="Email"
              tag="div"
            >
              <SectionMessage
                v-if="isShowSectionMessage"
                :message="errorMessage"
                :icon="iconInformation"
                :is-show-button-close="true"
                class="!mb-5 !h-[43px] border border-red-700 bg-pink-50 !px-2 !py-[10px]"
                @close="isShowSectionMessage = false"
              />
              <jds-input-text
                v-model="email"
                label="Alamat Email"
                helper-text="Masukkan alamat email akun CMS Sapawarga Anda"
                placeholder="Contoh: agus.permadi@mail.com"
                :error-message="errors[0]"
              >
                <template #prefix-icon>
                  <BaseIconSvg
                    icon="/icon/default/envelope.svg"
                    :size="12.8"
                    fill-color="#616161"
                  />
                </template>
              </jds-input-text>
            </ValidationProvider>
            <div class="mt-5">
              <jds-button
                variant="primary"
                class="flex w-full items-center justify-center"
                @click.prevent="sendEmail()"
              >
                <jds-spinner v-if="isLoading" size="20" class="mt-1" />
                <label v-else class="text-[14px] font-bold">Kirim Email</label>
              </jds-button>
            </div>
            <div class="mt-3 w-full py-[10px] px-2 text-center">
              <NuxtLink
                class="text-[14px] font-bold text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="isLoading"
                to="/login"
              >
                Kembali ke Login
              </NuxtLink>
            </div>
          </form>
        </ValidationObserver>
      </PopOver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'PageForgotPassword',
  auth: false,
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      iconForgotPassword: {
        fileName: 'icon-lock-forgot-password.svg',
        name: 'icon-lock-forgot-password',
        size: '72',
      },
      isLoading: false,
      isShowSectionMessage: false,
      errorMessage: '',
      email: '',
      iconInformation: {
        path: '/icon/default/Info-icon.svg',
        fill: '#D32F2F',
      },
    }
  },
  methods: {
    async sendEmail() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        try {
          await this.$axios.post('/users/admin/complaint/forgot-password', {
            email: this.email,
          })
          const emailEncode = Buffer.from(this.email).toString('base64')
          this.$router.push(`/cek-email?email=${emailEncode}`)
        } catch (error) {
          this.isShowSectionMessage = true
          this.errorMessage =
            'Email gagal dikirim. Terjadi kesalahan pada sistem. Silahkan coba kembali.'
          if (error.response.status === 404) {
            this.errorMessage = 'E-mail yang Anda masukkan tidak terdaftar'
          }
        }
      }
    },
  },
}
</script>

<style scoped>
.jds-input-text::v-deep .jds-input-text__input-wrapper {
  @apply !mt-1 rounded-[6px] !border !border-gray-300;
}
.jds-input-text::v-deep .jds-input-text__prefix-icon {
  @apply !w-[30px] !rounded-l-[6px] !border !border-r-gray-300 !bg-gray-100 !px-2 !py-[11px];
}

.jds-input-text::v-deep input {
  @apply !rounded-r-[6px] !bg-gray-50;
}

/* css input text has filled */
.jds-input-text::v-deep input:not(:placeholder-shown) {
  @apply !bg-white;
}

.jds-input-text::v-deep.jds-input-text--focused
  .jds-input-text__input-wrapper::after {
  @apply !border !border-green-700 !shadow-none;
}

.jds-input-text::v-deep.jds-input-text--focused input {
  @apply !bg-white;
}

.jds-input-text::v-deep.jds-input-text--error .jds-input-text__input-wrapper {
  @apply !border !border-red-700;
}

.jds-input-text::v-deep.jds-input-text--error input {
  @apply !bg-[#FFF9FA];
}

.section-message::v-deep .description {
  @apply !ml-2 !text-left;
}
</style>
