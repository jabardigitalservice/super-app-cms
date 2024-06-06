<template>
  <BaseDialogFrame name="detail-reservasi" :use-opacity="isUseOpacity">
    <BaseDialogPanel>
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Detail Reservasi
          </h1>

          <button @click="$emit('close')">
            <BaseIconSvg
              icon="/icon/default/cross.svg"
              class="!h-6 !w-6"
              fill-color="#212121"
            />
          </button>
        </div>
      </BaseDialogHeader>
      <SkeletonLoadingDetailReservasi v-if="loading" />
      <div v-else>
        <div class="px-6 py-2">
          <p class="font-lato text-[14px]">Media Reservasi</p>
          <div
            class="flex h-[31px] items-center gap-x-2 rounded-[4px]"
            :class="
              isOrderedByAdmin
                ? 'w-[74px] bg-[#E3F2FD]'
                : 'w-[94px] bg-[#E8F5E9]'
            "
          >
            <div
              class="ml-[3px] h-[23px] w-[3px] rounded-t-[3px] rounded-b-[3px]"
              :class="isOrderedByAdmin ? 'bg-[#1565C0]' : 'bg-[#2E7D32]'"
            ></div>

            <p class="font-lato text-[14px] font-[700]">
              {{ isOrderedByAdmin ? 'Manual' : 'Sapawarga' }}
            </p>
          </div>
          <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
            <p class="font-lato text-[16px]">Informasi Pemesan</p>
            <div class="grid-rows-12 mt-3 mb-3 grid grid-flow-col">
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">Nama Pemesan</p>
                <p class="font-[700]">
                  {{ reservatorName }}
                </p>
              </div>
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">Nama Instansi</p>
                <p class="font-[700]">
                  {{ instanceName }}
                </p>
              </div>
            </div>
            <div class="grid-rows-12 grid grid-flow-col">
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">No. Tlp</p>
                <p class="font-[700]">
                  {{ phoneNumber }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
            <p class="font-lato text-[16px]">Reservasi & Kunjungan</p>
            <div class="grid-rows-12 mt-3 mb-3 grid grid-flow-col">
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">Tanggal Reservasi</p>
                <p class="font-[700]">
                  {{ reservationDate }}
                </p>
              </div>
            </div>
            <div class="grid-rows-12 mt-3 grid grid-flow-col">
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">Tanggal Kunjungan</p>
                <p class="font-[700]">{{ visitDate }}</p>
              </div>
              <div class="col-span-6 font-lato text-[14px]">
                <p class="text-[ #616161] font-[500]">Sesi Kunjungan</p>
                <p class="font-[700]">
                  {{
                    `${session?.name} (${session?.start_time} - ${session?.end_time})`
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-3 mb-3 flex justify-between p-4 font-lato">
            <p class="text-[16px] font-[700]">Tiket</p>
            <p class="text-[14px] font-[500]">
              {{ `Total ${totalTicket} Tiket` }}
            </p>
          </div>
          <div class="grid-rows-12 mb-3 grid grid-flow-col gap-2">
            <div class="col-span-4">
              <div
                class="h-[91px] w-[139.33px] rounded-[12px] border border-[#EEEEEE] p-5 font-lato text-[14px]"
              >
                <p class="mb-3 font-[400]">Anak-anak</p>
                <p class="font-[700]">
                  {{ childrensTicket ? `${childrensTicket} Tiket` : '-' }}
                </p>
              </div>
            </div>
            <div class="col-span-4">
              <div
                class="h-[91px] w-[139.33px] gap-y-4 rounded-[12px] border border-[#EEEEEE] p-4 font-lato text-[14px]"
              >
                <p class="mb-3 font-[400]">Dewasa</p>
                <p class="font-[700]">
                  {{ adultsTicket ? `${adultsTicket} Tiket` : '-' }}
                </p>
              </div>
            </div>
            <div class="col-span-4">
              <div
                class="h-[91px] w-[139.33px] gap-y-4 rounded-[12px] border border-[#EEEEEE] p-4 font-lato text-[14px]"
              >
                <p class="mb-3 w-[20px] font-[400]">Wisatawan Mancanegara</p>
                <p class="font-[400]">
                  {{
                    foreignTouristTicket ? `${foreignTouristTicket} Tiket` : '-'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex px-6 py-4"
          :class="!isOrderedByAdmin ? 'justify-end' : 'justify-between'"
        >
          <div
            v-if="isOrderedByAdmin"
            class="relative overflow-x-auto bg-transparent text-red-700"
            @click="$emit('dialog-batalkan-reservasi')"
          >
            <BaseButton> Batalkan Reservasi </BaseButton>
          </div>
          <div
            v-if="isOrderedByAdmin"
            class="relative overflow-x-auto rounded-lg bg-green-jds text-white"
            @click="$emit('dialog-ubah-detail')"
          >
            <BaseButton class="flex items-center gap-2">
              <BaseIconSvg
                icon="/icon/pencil-edit.svg"
                mode="image"
                :width="18"
                :height="18"
                class="mt-[2px]"
              />
              Ubah Detail
            </BaseButton>
          </div>

          <div
            v-else
            class="relative overflow-x-auto rounded-lg bg-green-jds text-white"
            @click="$emit('dialog-reschedule')"
          >
            <BaseButton class="flex items-center gap-2">
              <BaseIconSvg
                icon="/icon/calendar.svg"
                mode="image"
                :width="18"
                :height="18"
                class="mt-[2px]"
              />
              Reschedule
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
import { mapState } from 'vuex'
import SkeletonLoadingDetailReservasi from './../SkeletonLoadingDetailReservasi/index.vue'
import { formatDate } from '~/utils'

export default {
  name: 'DialogDetailReservasi',
  components: {
    SkeletonLoadingDetailReservasi,
  },
  props: {
    isOrderedByAdmin: {
      type: Boolean,
      default: false,
    },
    invoiceId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      reservatorName: '',
      instanceName: '',
      phoneNumber: '',
      reservationDate: '',
      visitDate: '',
      session: null,
      totalTicket: 0,
      childrensTicket: '',
      adultsTicket: '',
      foreignTouristTicket: '',
      loading: false,
      isUseOpacity: true,
    }
  },
  computed: {
    ...mapState({
      dialogOpen: (state) => state.modals.open,
    }),
  },
  watch: {
    invoiceId: {
      handler(val) {
        if (val) {
          this.fetchDetailReservation()
        }
      },
      immediate: true,
    },
    dialogOpen: {
      handler(val) {
        if (
          val.includes('dialog-reschedule') ||
          val.includes('dialog-batalkan-reservasi')
        ) {
          this.isUseOpacity = false
        } else {
          this.isUseOpacity = true
        }
      },
    },
  },

  methods: {
    async fetchDetailReservation() {
      this.loading = true

      try {
        const detailReservationResponse = await this.$axios.get(
          `ticket/tms/admin/orders/${this.invoiceId}`
        )

        const { data } = detailReservationResponse.data
        this.reservatorName = data.customerName
        this.instanceName = this.getInstanceNameBaseOnQuestionId(
          data.customerData
        )
        this.phoneNumber = this.getPhoneNumberBaseOnQuestionId(
          data.customerData
        )
        this.reservationDate = formatDate(data.orderedAt, 'dd MMMM yyyy')
        this.visitDate = formatDate(data.reservationDate, 'dd MMMM yyyy')
        this.session = data.session
        this.totalTicket = data.ticketCount
        this.childrensTicket = this.getChildrensTicket(data.tickets)
        this.adultsTicket = this.getAdultsTicket(data.tickets)
        this.foreignTouristTicket = this.getForeignTouristTicket(data.tickets)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    getInstanceNameBaseOnQuestionId(data) {
      const instanceName = data.find(
        (item) => item.questionId === 'instance-name'
      )
      return instanceName ? instanceName.answer : '-'
    },
    getPhoneNumberBaseOnQuestionId(data) {
      const phoneNumber = data.find((item) => item.questionId === 'phone')
      return phoneNumber ? phoneNumber.answer : '-'
    },
    getChildrensTicket(data) {
      const childrensTicket = data.find((item) => item.name === 'Anak-anak')
      return childrensTicket ? childrensTicket.qty : ''
    },
    getAdultsTicket(data) {
      const adultsTicket = data.find((item) => item.name === 'Dewasa')
      return adultsTicket ? adultsTicket.qty : ''
    },
    getForeignTouristTicket(data) {
      const foreignTouristTicket = data.find(
        (item) => item.name === 'Wisatawan Mancanegara'
      )
      return foreignTouristTicket ? foreignTouristTicket.qty : ''
    },
  },
}
</script>
