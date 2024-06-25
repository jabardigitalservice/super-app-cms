<template>
  <BaseDialogFrame name="dialog-reschedule">
    <BaseDialogPanel custom-width="w-[460px]">
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Reschedule Reservasi
          </h1>

          <button @click="closeDialogReschedule()">
            <BaseIconSvg
              icon="/icon/default/cross.svg"
              class="!h-6 !w-6"
              fill-color="#212121"
            />
          </button>
        </div>
      </BaseDialogHeader>
      <div v-for="data in rescheduleValue" :key="data.id">
        <div class="px-6 py-2 font-lato text-[15px] font-[400] text-[#424242]">
          <label>Pilih Tanggal</label>
          <date-picker
            v-model="data.date"
            format="DD/MM/YYYY"
            :clearable="false"
            class="date-picker mb-3"
            :disabled-date="disableDate"
          />

          <label>Pilih Sesi</label>
          <v-select
            v-model="data.session"
            :options="sessionDataList"
            class="session-select"
            :selectable="(option) => option.isBookable"
            :searchable="false"
            :clearable="false"
          >
            <template #option="{ label, isBookable }">
              <p v-if="isBookable">{{ label }}</p>
              <p v-else>{{ `${label} | Tidak Tersedia` }}</p>
            </template>
          </v-select>
        </div>
      </div>

      <BaseDialogFooter>
        <div class="flex justify-end">
          <div>
            <jds-button
              label="Batal"
              variant="secondary"
              class="font-lato text-sm font-bold"
              @click="closeDialogReschedule()"
            />
            <jds-button
              label="Simpan"
              variant="primary"
              class="ml-3 font-lato text-sm font-bold"
              @click="postRescheduleData()"
            />
          </div>
        </div>
      </BaseDialogFooter>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
import { formatDate } from '~/utils'

export default {
  props: {
    rescheduleValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    invoiceId: {
      type: String,
      default: '',
    },
    holidayList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sessionList: [],
      query: {
        attractionId: 'c64143d6-d630-4ccf-8529-483b9b737a52',
        reservationDate: null,
        visitorType: 'reservation',
      },
    }
  },
  computed: {
    sessionDataList() {
      return this.sessionList.map((sessionData) => {
        return {
          label: `${sessionData.name}  (${sessionData.startTime} - ${sessionData.endTime})`,
          value: sessionData.id,
          isBookable: sessionData.isBookable,
        }
      })
    },
  },
  watch: {
    rescheduleValue: {
      handler(val) {
        val.forEach((data) => {
          if (data.date) {
            this.query.reservationDate = formatDate(data.date, 'yyyy-MM-dd')
            this.fetchSessionList()
          }
        })
      },
      deep: true,
    },
  },

  methods: {
    async fetchSessionList() {
      try {
        const sessionResponse = await this.$axios.get(
          'ticket/tms/admin/session/availability',
          {
            params: this.query,
          }
        )

        const { data } = sessionResponse.data

        this.sessionList = data
      } catch (error) {
        console.error(error)
      }
    },
    async postRescheduleData() {
      const sessionId = this.rescheduleValue.find((data) => data.date)

      const payload = {
        invoice: this.invoiceId,
        reservationDate: this.query.reservationDate,
        sessionId: Number(sessionId.session.value),
      }
      try {
        await this.$axios.post('/ticket/tms/admin/orders/reschedule', payload)
        this.$store.commit('modals/CLOSE', 'dialog-reschedule')
        this.$store.commit('modals/CLOSE', 'detail-reservasi')
        this.$store.commit(
          'dialog/setTitle',
          'Jadwal Reservasi Berhasil Diubah'
        )
        this.$store.commit('modals/OPEN', 'dialog-success')
      } catch (error) {
        console.error(error)
      }
    },
    disableDate(date) {
      const dateToCompare = formatDate(date, 'yyyy-MM-dd')
      const isHoliday = this.holidayList.some(
        (holiday) => formatDate(holiday.date, 'yyyy-MM-dd') === dateToCompare
      )

      return date < new Date() || isHoliday
    },
    closeDialogReschedule() {
      this.$store.commit('modals/CLOSE', 'dialog-reschedule')
    },
  },
}
</script>

<style scoped>
.date-picker {
  width: 412px !important;
}
.date-picker .mx-input-wrapper .mx-input {
  border-color: #e0e0e0 !important;
}
.session-select :deep(.jds-select),
.session-select :deep(.jds-input-text) {
  width: 412px !important;
  border-radius: 8px;
}
.jds-input-text .jds-input-text__input-wrapper {
  border-radius: 8px;
  border-color: #e0e0e0 !important;
  border-width: 2px !important;
}
</style>
