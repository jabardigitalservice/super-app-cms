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
                  <th scope="col" class="session-head">SESI</th>
                  <th
                    v-for="(headerDate, index1) in DateDataList"
                    :key="index1"
                    scope="col"
                  >
                    {{ headerDate.dateData }}
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="(sessionData, index2) in sessionDataList"
                :key="index2"
              >
                <tr>
                  <td class="text-[14px]">
                    <p class="font-[600]">
                      {{ sessionData.sessionName }}
                    </p>
                    <p>{{ sessionData.sessionTime }}</p>
                  </td>
                  <td
                    v-for="(dateData, index3) in DateDataList"
                    :key="index3"
                    @click="handleClickDate(dateData, sessionData)"
                  >
                    <p class="font-[600]">
                      {{ getEventTitle(dateData, sessionData.event) }}
                    </p>
                  </td>
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
export default {
  name: 'SribadugaKalenderReservasi',
  data() {
    return {
      DateDataList: [],
      sessionDataList: [
        {
          sessionName: 'Sesi 1',
          sessionTime: '08:00 - 09:00',
          event: [
            {
              title: 'test 1',
              date: '2024-03-18',
            },
            {
              title: 'test 2',
              date: '2024-03-19',
            },
            {
              title: 'test 4',
              date: '2024-03-21',
            },
          ],
        },
        {
          sessionName: 'Sesi 2',
          sessionTime: '09:00 - 10:00',
        },
        {
          sessionName: 'Sesi 3',
          sessionTime: '10:00 - 11:00',
          event: [
            {
              title: 'test 1',
              date: '2024-03-18',
            },
            {
              title: 'test 2',
              date: '2024-03-19',
            },
            {
              title: 'test 4',
              date: '2024-03-21',
            },
          ],
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
            rawDateData: newDate,
          }
        )
      }
      this.DateDataList = dateList
      console.log('dateList', dateList)
    },
    getEventTitle(dateData, eventList) {
      console.log('dateData', dateData)
      console.log('eventList', eventList)
      const event = eventList?.find(
        (event) =>
          event.date === dateData.rawDateData.toISOString().split('T')[0]
      )
      return event ? event.title : ''
    },
    handleClickDate(dateData, sessionData) {
      console.log('dateData', dateData)
      console.log('sessionData', sessionData)
    },
  },
}
</script>
<style>
/* .table-scroll {
  height: 250px;
  max-width: 100vw;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
  margin-top: 100px;
}
.table-scroll table {
  border-collapse: collapse;
  color: lightgrey;
  table-layout: fixed;
}
.table-wrap {
  position: relative;
}
.table-scroll th,
.table-scroll td {
  padding: 5px 10px;
  border: 1px solid #000;
  background: #fff;
  vertical-align: top;
}
.table-scroll thead th {
  background: #333;
  color: #fff;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.table-scroll tfoot,
.table-scroll tfoot th,
.table-scroll tfoot td {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #666;
  color: #fff;
  z-index: 4;
}

a:focus {
  background: red;
} 

th:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #ccc;
}

td:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
}
thead th:first-child,
tfoot th:first-child {
  z-index: 5;
}
.fc .fc-button-group .fc--button {
  display: none;
} */
/* .table-scroll {
  position: relative;
  width: 100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
  height: 350px;
} */
.session-head {
  width: 120px;
}
.table-scroll table {
  width: 100%;
  min-width: 500px;
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
}
/* .table-wrap {
  position: relative;
} */
.table-scroll th,
.table-scroll td {
  padding: 5px 10px;
  border: 1px solid #000;
  background: #fff;
  vertical-align: top;
}

/* safari and ios need the tfoot itself to be position:sticky also */
/* .table-scroll tfoot,
.table-scroll tfoot th,
.table-scroll tfoot td {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  background: #666;
  color: #fff;
  z-index: 4;
} */

a:focus {
  background: red;
} /* testing links*/

/* th:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
  background: #ccc;
}
thead th:first-child,
tfoot th:first-child {
  z-index: 5;
}
.fc .fc-button-group .fc--button {
  display: none;
} */
/* .fc .fc-scrollgrid .fc-col-header tr:nth-child(1) {
  display: none;
} */
/* .fc .fc-scrollgrid .fc-scrollgrid-sync-table {
  display: none;
} */
/* .fc .fc-scrollgrid .fc-timegrid-now-indicator-container {
  height: 200px;
} */
</style>
