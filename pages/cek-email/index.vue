<template>
  <div class="min-h-screen bg-[#F6F6F9]">
    <div class="flex h-screen items-center justify-center">
      <PopOver
        :icon="iconEnvelope"
        title="Cek Email Anda"
        description="Kami telah mengirimkan tautan untuk mengubah kata sandi ke"
        :detail-item="email"
      >
        <countdown
          :time="initialMinutes * 60 * 1000"
          :transform="formatingTime"
          class="mt-10 w-full"
          @end="isShowButton = true"
        >
          <template #default="{ minutes, seconds }">
            <div class="flex items-center justify-between text-sm">
              <p class="text-gray-800">Belum menerima tautan?</p>
              <jds-button
                v-if="isShowButton"
                variant="tertiary"
                class="!text-sm !font-bold !text-green-600 hover:!bg-transparent focus:!shadow-none active:!bg-transparent disabled:opacity-40"
                :disabled="countShowButton > 3"
                @click="actionResendEmail()"
              >
                Kirim ulang
              </jds-button>
              <p v-else class="text-right text-gray-600">
                Kirim ulang dalam
                <strong class="text-green-700">
                  {{ minutes }}:{{ seconds }}
                </strong>
              </p>
            </div>
          </template>
        </countdown>
        <SectionMessage
          v-if="countShowButton > 3"
          message="Anda dapat mengirim tautan kembali dalam"
          detail-item="24 Jam kedepan."
          class="mt-10 w-full !border !border-[#EFF1F3] !bg-[#F9FBFC] !p-2"
          :icon="iconInformation"
        />
      </PopOver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCheckEmail',
  auth: false,
  data() {
    return {
      iconEnvelope: {
        fileName: 'icon-envelope.svg',
        name: 'icon-envelope',
        size: '72',
      },
      iconInformation: {
        path: '/icon/forgot-password/information-icon.svg',
        fill: '#16A75C',
        size: 16,
      },
      initialMinutes: 2, // for initialization the minutes start
      countShowButton: 1,
      isShowButton: false,
    }
  },
  computed: {
    email() {
      return Buffer.from(this.$route.query.email, 'base64').toString('utf-8')
    },
  },
  methods: {
    formatingTime(props) {
      Object.entries(props).forEach(([key, value]) => {
        const digits = value < 10 ? `0${value}` : value
        props[key] = `${digits}`
      })

      return props
    },
    async actionResendEmail() {
      // minutes will start 3 times. It will start from 2 minutes, 5 minutes and 10 minutes
      this.isShowButton = false
      const minutes =
        this.initialMinutes % 2 === 0
          ? this.initialMinutes++
          : this.initialMinutes
      this.countShowButton++
      if (this.countShowButton <= 3) {
        this.initialMinutes += minutes
        try {
          await this.$axios.post('/users/admin/complaint/forgot-password', {
            email: this.email,
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        this.isShowButton = true
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
  @apply !ml-2;
}
</style>
