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
                  <BaseButton>
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
                  <BaseButton>
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
                <p>November</p>
              </div>
            </div>
          </div>
          <div id="table-scroll" class="table-scroll">
            <table id="main-table" class="main-table">
              <thead>
                <tr>
                  <th scope="col">SESI</th>
                  <th
                    v-for="(headerDate, index) in DateDataList"
                    :key="index"
                    scope="col"
                  >
                    {{ headerDate.dateData }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(headerDate, index) in DateDataList" :key="index">
                  <td>
                    {{ headerDate.sessionName }} <br />
                    {{ headerDate.sessionTime }}
                  </td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>

                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
// import allLocales from '@fullcalendar/core/locales-all'

// import { formatTime } from '~/utils'
// import { formatInTimeZone } from 'date-fns-tz'
// import { isValid, parse } from 'date-fns'
// import id from 'date-fns/locale/id'

export default {
  name: 'SribadugaKalenderReservasi',
  data() {
    return {
      DateDataList: [],
      sessionDataList: [
        {
          sessionName: 'Sesi 1',
          sessionTime: '08:00 - 09:00',
        },
        {
          sessionName: 'Sesi 2',
          sessionTime: '09:00 - 10:00',
        },
        {
          sessionName: 'Sesi 3',
          sessionTime: '10:00 - 11:00',
        },
        {
          sessionName: 'Sesi 4',
          sessionTime: '11:00 - 12:00',
        },
        {
          sessionName: 'Sesi 5',
          sessionTime: '12:00 - 13:00',
        },
        {
          sessionName: 'Sesi 6',
          sessionTime: '13:00 - 14:00',
        },
      ],
    }
  },

  mounted() {
    this.getDateDataList()
  },
  methods: {
    getDateDataList() {
      // get six date list with format DD - dd
      const dateList = []
      const date = new Date()
      for (let i = 0; i < 6; i++) {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + i)
        dateList.push(
          // push into dateData
          {
            dateData: `${newDate.toLocaleDateString('id-ID', {
              weekday: 'long',
            })} - ${newDate.getDate()}`,
          }
        )

        // push 'SESI' in the first array
        // if (i === 0) {
        //   dateList[0].dateData = 'SESI'
        // }
        // if array is same with sessionDataList, push sessionDataList into dateList
        this.sessionDataList.forEach((session, index) => {
          if (i === index) {
            dateList[i].sessionName = session.sessionName
            dateList[i].sessionTime = session.sessionTime
          }
        })
      }
      this.DateDataList = dateList
      console.log('dateList', dateList)
    },
  },
}
</script>
<style>
table {
  border-collapse: collapse;
  color: lightgrey;
  table-layout: fixed;
}
</style>
