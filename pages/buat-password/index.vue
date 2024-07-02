<template>
  <div>
    <EmailVerification
      v-if="isExpiredLink"
      :title="verificationType.title"
      :description="verificationType.description"
      :button="verificationType.button"
      :icon="verificationType.icon"
    />
    <div v-else>
      <div class="flex flex-col items-center">
        <img
          src="~/assets/icon/icon-lock.svg"
          alt="icon-lock"
          width="72"
          height="72"
        />
      </div>

      <h1 class="mt-4 text-center font-roboto text-2xl font-bold">
        Buat Kata Sandi
      </h1>
      <ValidationObserver
        ref="form"
        tag="div"
        class="form-add-account w-full px-6"
      >
        <form class="py-5">
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|min:6|lowercase|uppercase|digit|symbol"
            name="Kata Sandi Baru"
            tag="div"
          >
            <div
              class="flex items-center justify-between"
              :class="{ 'label--error': errors.length > 0 }"
            >
              <label class="text-[15px]">Kata Sandi Baru</label>
              <div class="flex w-1/3 items-center">
                <p class="mr-2 text-xs font-bold" :class="levelPassword?.text">
                  {{ levelPassword?.name }}
                </p>
                <div class="mt-[2px] h-2 w-full rounded-md bg-blue-gray-50">
                  <div :class="['h-2 rounded-md', levelPassword?.metter]"></div>
                </div>
              </div>
            </div>
            <BaseInputText
              v-model="password"
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="Masukkan Kata Sandi Baru"
              class="pt-1 pb-3"
              :class="{ 'input-eye': password.length > 0 }"
              :error-message="errors[0]"
            >
              <template #icon-left>
                <div
                  class="flex h-[38px] w-[35px] items-center rounded-l-md border border-gray-300 bg-gray-100 px-2"
                >
                  <BaseIconSvg
                    :icon="icon.key.path"
                    :size="12.8"
                    :fill-color="icon.key.fill"
                  />
                </div>
              </template>
              <template #icon-right>
                <button
                  v-if="password.length > 0"
                  class="button-show-password"
                  :class="{ 'button-show-password--error': errors[0] }"
                  @click.prevent="isShowPassword = !isShowPassword"
                >
                  <jds-icon
                    v-if="!isShowPassword"
                    name="eye"
                    size="sm"
                    fill="#16A75C"
                  />
                  <jds-icon v-else name="eye-off" size="sm" fill="#16A75C" />
                </button>
              </template>
            </BaseInputText>
          </ValidationProvider>
          <SectionMessage
            message="Password minimal 6 karakter dengan kombinasi huruf kapital, angka dan simbol."
            class="section-message"
            :icon="icon.information"
          />
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="Konfirmasi Kata Sandi Baru"
            tag="div"
          >
            <BaseInputText
              v-model="passwordConfirmation"
              placeholder="Konfirmasi Kata Sandi Baru"
              :type="isShowConfirmationPassword ? 'text' : 'password'"
              class="py-5"
              :class="{
                'input-eye': passwordConfirmation.length > 0,
                'label--error': errors.length > 0,
              }"
              label="Konfirmasi Kata Sandi Baru"
              :error-message="errors[0] || errorMessage"
            >
              <template #icon-left>
                <div
                  class="flex h-[38px] w-[35px] items-center rounded-l-md border border-gray-300 bg-gray-100 px-2"
                >
                  <BaseIconSvg
                    :icon="icon.key.path"
                    :size="12.8"
                    :fill-color="icon.key.fill"
                  />
                </div>
              </template>
              <template #icon-right>
                <button
                  v-if="passwordConfirmation.length > 0"
                  class="button-show-password"
                  :class="{ 'button-show-password--error': errors[0] }"
                  @click.prevent="
                    isShowConfirmationPassword = !isShowConfirmationPassword
                  "
                >
                  <jds-icon
                    v-if="!isShowConfirmationPassword"
                    name="eye"
                    size="sm"
                    fill="#16A75C"
                  />
                  <jds-icon v-else name="eye-off" size="sm" fill="#16A75C" />
                </button>
              </template>
            </BaseInputText>
          </ValidationProvider>
          <jds-button
            variant="primary"
            class="!w-full"
            @click.prevent="submitCreatePassword()"
          >
            <jds-spinner
              v-if="isLoading"
              :size="20"
              class="flex items-center"
            />
            <label v-else class="!text-[14px] !font-bold">
              Simpan Perubahan
            </label>
          </jds-button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { differenceInHours } from 'date-fns'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'PageCreatePassword',
  auth: false,
  components: { ValidationProvider, ValidationObserver },
  layout: 'Verification',
  data() {
    return {
      icon: {
        information: {
          path: '/icon/default/Info-icon.svg',
          fill: '#16A75C',
        },
        key: {
          path: '/icon/key.svg',
          fill: '#616161',
        },
      },
      password: '',
      passwordConfirmation: '',
      levelPassword: {},
      isShowPassword: false,
      isShowConfirmationPassword: false,
      errorMessage: '',
      isLoading: false,
      isExpiredLink: false,
      verificationType: {
        title: 'Tautan Sudah Tidak Valid',
        description:
          'Tautan yang Anda gunakan sudah tidak berlaku atau kadaluarsa. Silakan lakukan proses kirim ulang email, untuk mendapatkan tautan lupa kata sandi yang baru.',
        icon: 'email-verification-invalid',
        button: {
          label: 'Kirim Ulang Email',
          linkPage: '/lupa-kata-sandi',
        },
      },
    }
  },
  watch: {
    password(value) {
      this.checkPasswordStrength()
    },
  },
  created() {
    const timestamp = this.getDataDecode().split(':').slice(4).join(':')
    const linkExpiredDate = new Date(timestamp)
    const tokenType = this.getDataDecode().split(':')[0]
    const differentHour = differenceInHours(new Date(), linkExpiredDate)
    const expiredTime =
      tokenType === 'invitation'
        ? this.$config.expiredInvitationLink
        : this.$config.expiredForgotPasswordLink
    if (differentHour > expiredTime) {
      this.isExpiredLink = true
    }
  },
  methods: {
    getDataDecode() {
      const queryToken = this.$route.query?.token
      const dataDecode = Buffer.from(queryToken, 'base64').toString('utf-8')
      return dataDecode
    },
    checkPasswordStrength() {
      this.levelPassword = {}
      const levelPassword = {
        low: {
          name: 'Lemah',
          metter: 'w-1/3 bg-red-500',
          text: 'text-red-500',
        },
        medium: {
          name: 'Sedang',
          metter: 'w-2/3 bg-yellow-500',
          text: 'text-yellow-500',
        },
        strong: {
          name: 'Kuat',
          metter: 'w-full bg-green-500',
          text: 'text-green-500',
        },
      }

      // regex check lowercase, uppercase , digit and symbol
      const isLowercase = /(?=.*[a-z])/.test(this.password)
      const isUppercase = /(?=.*[A-Z])/.test(this.password)
      const isDigit = /(?=.*[0-9])/.test(this.password)
      const isSymbol = /(?=.*[!@#$%^&*])/.test(this.password)

      if (isUppercase || isLowercase || isSymbol || isDigit) {
        this.levelPassword = levelPassword.low
      }
      if (this.password.length > 6) {
        if (isLowercase && isUppercase && isDigit && isSymbol) {
          this.levelPassword = levelPassword.strong
        } else if ((isLowercase || isUppercase || isSymbol) && isDigit) {
          this.levelPassword = levelPassword.medium
        }
      }
    },
    checkConfirmationPassword() {
      this.errorMessage = ''
      if (this.password !== this.passwordConfirmation) {
        this.errorMessage = 'Konfirmasi Kata Sandi Baru tidak cocok'
        return false
      }
      return true
    },
    async submitCreatePassword() {
      const isValid = await this.$refs.form.validate()
      const isCheckConfirmationPassword = this.checkConfirmationPassword()
      if (isValid && isCheckConfirmationPassword) {
        this.isLoading = true
        const tokenType = this.getDataDecode().split(':')[0] // token from 'forgot-password' or 'invitation'
        const token = this.getDataDecode().split(':')[1]
        const userId = this.getDataDecode().split(':')[2]
        const email = this.getDataDecode().split(':')[3]
        const apiPath =
          tokenType === 'forgot-password'
            ? 'verify-change-password'
            : 'verify-create-password'
        let dataEncode = ''
        try {
          const payload = { token, user_id: userId, password: this.password } // payload request to api
          await this.$axios.post(`/users/admin/complaint/${apiPath}`, {
            ...payload,
          })
          dataEncode = Buffer.from(`true:${email}`).toString('base64')
        } catch (error) {
          const queryToken = this.$route.query?.token
          dataEncode = Buffer.from(`false:${queryToken}`).toString('base64')
        } finally {
          this.isLoading = false
        }
        this.$router.push(`/buat-password/informasi?token=${dataEncode}`)
      }
    },
  },
}
</script>

<style scoped>
.label--error label {
  @apply !text-red-700;
}

.form-input-text:deep .form-input-text--error input {
  @apply !bg-[#FFF9FA];
}

.form-input-text:deep .form-input-text--error input {
  @apply !bg-[#FFF9FA];
}

.form-input-text:deep.label--error label {
  @apply !text-red-700;
}

.form-input-text:deep.input-eye input {
  @apply !rounded-l-none !rounded-r-none !border !border-r-0 !border-l-0;
}

.form-input-text:deep input {
  @apply !rounded-l-none !border !border-l-0 !border-gray-300 !bg-white;
}

.button-show-password {
  @apply h-[38px] w-[35px] rounded-r-lg border border-l-0 border-gray-300 px-2;
}

.button-show-password--error {
  @apply !bg-[#FFF9FA] px-2;
}

.section-message {
  @apply !border !border-[#EFF1F3] bg-[#F9FBFC] !py-[10px] !px-2;
}

.section-message:deep p {
  @apply !ml-2 !text-left;
}
</style>
