<template>
  <div>
    <BaseTabGroup>
      <template #tab-panel>
        <BaseTabPanel class="!rounded-lg px-3 pt-6 pb-4">
          <div class="mb-4 flex w-full justify-between">
            <div class="ml-4 flex items-center">
              <div class="flex flex-col">
                <div
                  class="relative overflow-x-auto rounded-lg border border-gray-300"
                >
                  <BaseButton @click="handleClickPreviousDateList()">
                    <BaseIconSvg
                      icon="/icon/arrow-left.svg"
                      mode="image"
                      :width="18"
                      :height="18"
                      class="mt-[2px]"
                    />
                  </BaseButton>
                </div>
              </div>
              <div class="ml-2 flex flex-col">
                <div
                  class="relative overflow-x-auto rounded-lg border border-gray-300"
                >
                  <BaseButton @click="handleClickNextDateList()">
                    <BaseIconSvg
                      icon="/icon/arrow-right.svg"
                      mode="image"
                      :width="18"
                      :height="18"
                      class="mt-[2px]"
                    />
                  </BaseButton>
                </div>
              </div>

              <div class="ml-2 flex flex-col">
                <p class="font-lato text-[18px] font-[700]">
                  {{ monthAndYearTitle }}
                </p>
              </div>
            </div>
            <div class="ml-4 flex items-center">
              <div class="mr-2 flex flex-col">
                <date-picker
                  v-model="initialDateValue"
                  format="DD/MM/YYYY"
                  :clearable="false"
                />
              </div>
              <div class="flex flex-col">
                <div class="flex">
                  <div
                    class="relative w-[80px] overflow-x-auto rounded-tl-lg rounded-bl-lg border border-green-jds"
                    :class="{
                      'bg-green-jds': initialTabValue === 'hari',
                    }"
                  >
                    <BaseButton @click="handleClickTabDay()">
                      <p
                        :class="
                          initialTabValue === 'hari'
                            ? 'text-white'
                            : 'text-green-jds'
                        "
                      >
                        Hari
                      </p>
                    </BaseButton>
                  </div>

                  <div
                    class="relative w-[80px] overflow-x-auto rounded-tr-lg rounded-br-lg border border-l-0 border-green-jds"
                    :class="{
                      'bg-green-jds': initialTabValue === 'minggu',
                    }"
                  >
                    <BaseButton @click="handleClickTabWeek()">
                      <p
                        :class="
                          initialTabValue === 'minggu'
                            ? 'text-white'
                            : 'text-green-jds'
                        "
                      >
                        Minggu
                      </p>
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SkeletonLoadingKalender v-if="loading" />

          <div v-else>
            <table id="main-table" class="main-table">
              <thead>
                <tr>
                  <th scope="col" class="session-head">
                    <p>SESI</p>
                  </th>
                  <th
                    v-for="headerDate in dateDataList"
                    :key="headerDate.dateNumber"
                    scope="col"
                  >
                    <div class="ml-2 flex justify-center">
                      <p>{{ headerDate.dateName }}</p>
                      <p class="ml-3 mr-3">-</p>
                      <p>{{ headerDate.dateNumber }}</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="sessionData in sessionDataList"
                :key="sessionData.session.id"
              >
                <tr>
                  <td class="pl-2 font-roboto text-[14px]">
                    <p class="mb-3 font-[600]">
                      {{ sessionData.session.name }}
                    </p>
                    <p>
                      {{
                        `${sessionData.session.startTime} - ${sessionData.session.endTime}`
                      }}
                    </p>
                  </td>
                  <td
                    v-for="dateData in dateDataList"
                    :key="dateData.dateNumber"
                    class="cursor-pointer"
                    @click="handleClickDate(dateData, sessionData)"
                  >
                    <div
                      v-if="
                        getIsOrderedByAdmin(dateData, sessionData.orders) ===
                        null
                      "
                      class="flex h-[88px] items-center justify-center text-[14px] font-[600] text-gray-500 opacity-0 hover:opacity-100"
                      @click="handleOpenDialogTambahReservasi()"
                    >
                      <p>{{ sessionData.session.name }}</p>
                    </div>
                    <div
                      v-else
                      class="flex h-[88px] items-center"
                      :class="{
                        'bg-[#E6F6EC]':
                          getIsOrderedByAdmin(dateData, sessionData.orders) ===
                          false,
                        'bg-[#E3F2FD]':
                          getIsOrderedByAdmin(dateData, sessionData.orders) ===
                          true,
                      }"
                      @click="
                        openDialogDetailReservasi(
                          getIsOrderedByAdmin(dateData, sessionData.orders)
                        )
                      "
                    >
                      <div
                        class="ml-[3px] h-[75px] w-[3px] rounded-t-[3px] rounded-b-[3px]"
                        :class="{
                          'bg-green-jds':
                            getIsOrderedByAdmin(
                              dateData,
                              sessionData.orders
                            ) === false,
                          'bg-[#1E88E5]':
                            getIsOrderedByAdmin(
                              dateData,
                              sessionData.orders
                            ) === true,
                        }"
                      ></div>
                      <div class="ml-2 font-lato">
                        <BaseIconSvg
                          v-if="getIsRescheduled(dateData, sessionData.orders)"
                          icon="/icon/reschedule.svg"
                          mode="image"
                          :width="90"
                          :height="17"
                          class="mt-[2px]"
                        />
                        <p class="text-[14px] font-[600]">
                          {{ getInstanceName(dateData, sessionData.orders) }}
                        </p>
                        <p class="text-[12px] font-[400] text-[#424242]">
                          {{ getTicketCount(dateData, sessionData.orders) }}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <DialogDetailReservasi
              :is-ordered-by-admin="isOrderedByAdmin"
              @close="closeDialogDetailReservasi()"
              @dialog-reschedule="openDialogReschedule()"
              @dialog-ubah-detail="handleOpenDialogUbahDetail()"
            />
            <DialogReschedule
              :reschedule-value="rescheduleValue"
              :options="sessionDataListForReschedule"
              @close="closeDialogReschedule()"
              @save="onSaveReschedule()"
            />
          </div>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>

    <DialogTambahReservasi
      :date-value="dateValue"
      :order-and-session-value="orderAndSessionValue"
      :is-new-reservation="isNewReservation"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogDetailReservasi from '~/components/Sribaduga/DialogDetailReservasi'
import DialogReschedule from '~/components/Sribaduga/DialogReschedule'
import DialogTambahReservasi from '~/components/Sribaduga/DialogTambahReservasi'
import SkeletonLoadingKalender from '~/components/Sribaduga/SkeletonLoadingKalender'
export default {
  name: 'SribadugaKalenderReservasi',
  components: {
    DialogDetailReservasi,
    DialogReschedule,
    DialogTambahReservasi,
    SkeletonLoadingKalender,
  },
  data() {
    return {
      dateDataList: [],
      monthAndYearTitle: '',
      initialDateValue: new Date(),
      initialTabValue: 'minggu',
      sessionDataList: [],
      isOrderedByAdmin: false,
      dateValue: null,
      orderAndSessionValue: null,
      rescheduleValue: [
        {
          id: 1,
          date: new Date(),
          session: '',
        },
      ],
      loading: false,
      isNewReservation: false,
    }
  },
  async fetch() {
    this.loading = true

    try {
      const calendarResponse = await this.$axios.get(
        '/ticket/tms/admin/orders/calendar'
      )

      const { data } = calendarResponse.data
      this.sessionDataList = data
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  },
  computed: {
    ...mapState({
      refetchCalendar: (state) => state.add_reservation.refetchCalendar,
    }),
    sessionDataListForReschedule() {
      return this.sessionDataList.map((sessionData) => {
        return {
          label: `${sessionData.session.name}  (${sessionData.session.startTime} - ${sessionData.session.endTime})`,
          value: sessionData.session.id,
        }
      })
    },
  },
  watch: {
    initialDateValue() {
      if (this.initialTabValue === 'hari') {
        this.getDataInDayList()
      } else {
        this.getDateDataInWeekList()
      }
    },
    initialTabValue() {
      if (this.initialTabValue === 'hari') {
        this.getDataInDayList()
      } else {
        this.getDateDataInWeekList()
      }
    },
    refetchCalendar: {
      handler(val) {
        if (val) {
          this.$fetch()
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.getDateDataInWeekList()
  },
  methods: {
    getDateDataInWeekList() {
      // get six date list with format DD - dd
      const dateList = []
      const date = this.initialDateValue
      for (let i = 0; i < 6; i++) {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + i)
        dateList.push(
          // push into dateData
          {
            dateName: newDate.toLocaleDateString('id-ID', {
              weekday: 'long',
            }),
            dateNumber: newDate.getDate(),
            rawDateData: newDate,
          }
        )
      }
      this.dateDataList = dateList
      this.monthAndYearTitle = `${dateList[0].rawDateData.toLocaleDateString(
        'id-ID',
        {
          month: 'long',
        }
      )} ${dateList[0].rawDateData.getFullYear()}`
    },
    getDataInDayList() {
      const dateList = []
      const date = this.initialDateValue
      for (let i = 0; i < 1; i++) {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + i)
        dateList.push(
          // push into dateData
          {
            dateName: newDate.toLocaleDateString('id-ID', {
              weekday: 'long',
            }),
            dateNumber: newDate.getDate(),
            rawDateData: newDate,
          }
        )
      }
      this.dateDataList = dateList
      this.monthAndYearTitle = `${dateList[0].rawDateData.toLocaleDateString(
        'id-ID',
        {
          month: 'long',
        }
      )} ${dateList[0].rawDateData.getFullYear()}`
    },

    getInstanceName(dateData, eventList) {
      if (eventList) {
        const event = eventList?.find(
          (event) =>
            event.reservationDate ===
            dateData.rawDateData.toISOString().split('T')[0]
        )
        return event ? event.instanceName : ''
      } else {
        return null
      }
    },
    getIsOrderedByAdmin(dateData, eventList) {
      if (eventList) {
        const event = eventList?.find(
          (event) =>
            event.reservationDate ===
            dateData.rawDateData.toISOString().split('T')[0]
        )
        return event ? event.isOrderedByAdmin : null
      } else {
        return null
      }
    },
    getTicketCount(dateData, eventList) {
      if (eventList) {
        const event = eventList?.find(
          (event) =>
            event.reservationDate ===
            dateData.rawDateData.toISOString().split('T')[0]
        )
        return event ? `${event.ticketCount} Tiket` : ''
      } else {
        return null
      }
    },
    getIsRescheduled(dateData, eventList) {
      if (eventList) {
        const event = eventList?.find(
          (event) =>
            event.reservationDate ===
            dateData.rawDateData.toISOString().split('T')[0]
        )
        return event ? event.isRescheduled : null
      } else {
        return null
      }
    },
    handleClickDate(dateData, sessionData) {
      this.dateValue = dateData
      this.orderAndSessionValue = sessionData
      this.rescheduleValue = [
        {
          id: 1,
          date: dateData.rawDateData,
          session: sessionData.session.id,
        },
      ]
      this.$store.commit(
        'add_reservation/setReservationDateValue',
        dateData.rawDateData
      )
      this.$store.commit(
        'add_reservation/setSessionValue',
        sessionData.session.id
      )
    },
    handleClickNextDateList() {
      const dateList = []
      if (this.initialTabValue === 'minggu') {
        const date = new Date(this.dateDataList[5].rawDateData)
        for (let i = 0; i < 6; i++) {
          const newDate = new Date(date)
          newDate.setDate(date.getDate() + i)
          dateList.push(
            // push into dateData
            {
              dateName: newDate.toLocaleDateString('id-ID', {
                weekday: 'long',
              }),
              dateNumber: newDate.getDate(),
              rawDateData: newDate,
            }
          )
        }
      } else {
        const date = new Date(this.dateDataList[0].rawDateData)
        date.setDate(date.getDate() + 1) // add 1 days before the loop
        for (let i = 0; i < 1; i++) {
          const newDate = new Date(date)
          newDate.setDate(date.getDate() + i) // add i days in the loop
          dateList.push(
            // push into dateData
            {
              dateName: newDate.toLocaleDateString('id-ID', {
                weekday: 'long',
              }),
              dateNumber: newDate.getDate(),
              rawDateData: newDate,
            }
          )
        }
      }

      this.dateDataList = dateList

      this.monthAndYearTitle = `${dateList[0].rawDateData.toLocaleDateString(
        'id-ID',
        {
          month: 'long',
        }
      )} ${dateList[0].rawDateData.getFullYear()}`
      this.initialDateValue = dateList[0].rawDateData
    },

    handleClickPreviousDateList() {
      // get six date list with format DD - dd

      const dateList = []
      if (this.initialTabValue === 'minggu') {
        const date = new Date(this.dateDataList[0].rawDateData)
        date.setDate(date.getDate() - 5) // subtract 5 days before the loop
        for (let i = 0; i < 6; i++) {
          const newDate = new Date(date)
          newDate.setDate(date.getDate() + i) // add i days in the loop
          dateList.push(
            // push into dateData
            {
              dateName: newDate.toLocaleDateString('id-ID', {
                weekday: 'long',
              }),
              dateNumber: newDate.getDate(),
              rawDateData: newDate,
            }
          )
        }
      } else {
        const date = new Date(this.dateDataList[0].rawDateData)
        date.setDate(date.getDate() - 1) // subtract 1 days before the loop
        for (let i = 0; i < 1; i++) {
          const newDate = new Date(date)
          newDate.setDate(date.getDate() + i) // add i days in the loop
          dateList.push(
            // push into dateData
            {
              dateName: newDate.toLocaleDateString('id-ID', {
                weekday: 'long',
              }),
              dateNumber: newDate.getDate(),
              rawDateData: newDate,
            }
          )
        }
      }
      this.dateDataList = dateList
      this.monthAndYearTitle = `${dateList[0].rawDateData.toLocaleDateString(
        'id-ID',
        {
          month: 'long',
        }
      )} ${dateList[0].rawDateData.getFullYear()}`
      this.initialDateValue = dateList[0].rawDateData
    },
    handleClickTabDay() {
      this.initialTabValue = 'hari'
    },
    handleClickTabWeek() {
      this.initialTabValue = 'minggu'
    },
    openDialogDetailReservasi(isOrderedByAdmin) {
      this.isOrderedByAdmin = isOrderedByAdmin
      this.$store.commit('modals/OPEN', 'detail-reservasi')
    },
    closeDialogDetailReservasi() {
      this.$store.commit('modals/CLOSE', 'detail-reservasi')
    },
    openDialogReschedule() {
      this.$store.commit('modals/OPEN', 'dialog-reschedule')
    },
    closeDialogReschedule() {
      this.$store.commit('modals/CLOSE', 'dialog-reschedule')
    },
    onSaveReschedule() {
      this.closeDialogReschedule()
      this.closeDialogDetailReservasi()
    },
    handleOpenDialogTambahReservasi() {
      this.$store.commit('add_reservation/setIsOpenForm', true)
      this.$store.commit('add_reservation/setRefetchCalendar', false)
      this.isNewReservation = true
    },
    handleOpenDialogUbahDetail() {
      this.$store.commit('modals/CLOSE', 'detail-reservasi')
      this.$store.commit('add_reservation/setIsOpenForm', true)
      this.$store.commit('add_reservation/setRefetchCalendar', false)
      this.isNewReservation = false
    },
  },
}
</script>
<style lang="scss" scoped>
.session-head {
  width: 120px;
}

table {
  width: 100%;
  min-width: 500px;
  margin: auto;
  border: 1px solid #ddd;
  border-collapse: separate;
  border-left: 0;
  border-radius: 10px;
  border-spacing: 0px;
}
thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
  border-collapse: separate;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
th,
td {
  border-left: 1px solid #ddd;
}
td {
  border-top: 1px solid #ddd;
}
thead:first-child tr:first-child th:first-child,
tbody:first-child tr:first-child td:first-child {
  border-radius: 10px 0 0 0;
}
thead:last-child tr:last-child th:first-child,
tbody:last-child tr:last-child td:first-child {
  border-radius: 0 0 0 10px;
}
</style>
