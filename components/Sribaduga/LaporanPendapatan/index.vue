<template>
  <div>
    <BaseTabGroup>
      <template #tab-panel>
        <BaseTabPanel class="!rounded-lg px-3 pt-6 pb-4">
          <div class="mb-4 flex w-full">
            <div class="ml-4 flex items-center">
              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Tanggal Kunjungan
                </h5>

                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
                  class="!ml-2 mr-2"
                  :disabled-date="disabledRange"
                  @close="isShowPopupDate = false"
                  @clear="clearDateRangeHandle"
                  @change="changeDateRangeHandle"
                  @input="checkMaxDate"
                >
                  <template #icon-calendar>
                    <jds-icon
                      name="calendar-date-outline"
                      size="sm"
                      fill="#069550"
                    />
                  </template>
                  <template #footer="{ emit }">
                    <BaseDialogFooter
                      label-button-submit="Pilih"
                      :show-cancel-button="true"
                      @close="closePopupDateHandle()"
                      @submit="filterDateHandle(emit)"
                    />
                  </template>
                </date-picker>
              </div>
              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Jenis Kunjungan
                </h5>
                <jds-select
                  v-model="query.visitType"
                  placeholder="Semua Jenis Kunjungan"
                  :options="listKunjunganSribaduga"
                  class="mr-2"
                />
              </div>

              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Ketegori Tiket
                </h5>
                <jds-select
                  v-model="query.category"
                  placeholder="Semua Kategori Tiket"
                  :options="listKategoriTiketSribaduga"
                  class="mr-2"
                />
              </div>

              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Status Tiket/Scan
                </h5>
                <jds-select
                  v-model="query.statusCode"
                  placeholder="Semua Status"
                  :options="listCategoryStatus"
                  class="mr-2"
                />
              </div>

              <div class="mt-5 mr-3 flex flex-col">
                <div
                  class="relative overflow-x-auto rounded-lg border border-green-jds"
                >
                  <BaseButton class="text-green-jds" @click="handleFilter">
                    Filter
                  </BaseButton>
                </div>
              </div>

              <div class="mt-5 flex flex-col">
                <div
                  class="relative overflow-x-auto rounded-lg border border-gray-300"
                >
                  <BaseButton class="text-[#616161]" @click="resetFilter">
                    Reset
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>

          <div v-if="loading" class="flex items-center justify-center p-4">
            <jds-spinner size="24px" />
          </div>

          <template v-else>
            <div
              v-if="listDataLaporan.length > 0"
              class="relative mx-6 overflow-x-auto rounded-lg border border-gray-300"
            >
              <div class="flex justify-end">
                <BaseButtonDropdown
                  class="m-[12px]"
                  :list-menu-pop-over="actionDownloadLaporan"
                  @xls="downloadExcelReport"
                >
                  Download Laporan
                </BaseButtonDropdown>
              </div>
              <div class="max-h-96">
                <table
                  id="table-laporan-pendapatan"
                  class="w-full text-left text-sm text-gray-500"
                >
                  <thead
                    class="bg-gray-200 font-roboto text-xs font-semibold uppercase text-gray-800"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Tanggal Kunjungan
                      </th>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Jenis Kunjungan
                      </th>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Kategori Tiket
                      </th>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Jumlah Tiket
                      </th>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Tarif (RP)
                      </th>
                      <th scope="col" class="px-6 py-3 font-roboto font-bold">
                        Jumlah Total (RP)
                      </th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <template v-for="(item, index) in listDataLaporan">
                      <tr
                        :key="index"
                        class="font-[14px] border-b bg-gray-50 font-lato font-medium text-gray-800"
                      >
                        <td
                          scope="row"
                          class="whitespace-nowrap border px-6 py-4"
                        >
                          {{
                            formatDate(item.reservationDate, 'dd MMMM yyyy') ||
                            '-'
                          }}
                        </td>
                        <td class="px-6 py-4">
                          {{ item.visitType?.name || '-' }}
                        </td>
                        <td>
                          <div class="font-[14px] h-full flex-col">
                            <p
                              v-for="(
                                ticketCategory, indexTicketCategory
                              ) in item.tickets"
                              :key="`index-${indexTicketCategory}`"
                              class="flex-1 border px-6 py-4 font-lato"
                            >
                              {{ ticketCategory?.name }}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div class="font-[14px] h-full flex-col">
                            <p
                              v-for="(
                                ticketQuantity, indexQuantity
                              ) in item.tickets"
                              :key="`index-${indexQuantity}`"
                              class="flex-1 border px-6 py-4 font-lato"
                            >
                              {{ ticketQuantity?.qty }}
                            </p>
                          </div>
                        </td>

                        <td>
                          <div class="font-[14px] h-full flex-col">
                            <p
                              v-for="(ticketPrice, indexPrice) in item.tickets"
                              :key="`index-${indexPrice}`"
                              class="flex-1 border px-6 py-4 font-lato"
                            >
                              {{ convertToRupiah(ticketPrice?.price) }}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="font-[14px] h-full flex-col">
                            <p
                              v-for="(ticketTotal, indexTotal) in item.tickets"
                              :key="`index-${indexTotal}`"
                              class="flex-1 px-6 py-4 font-lato"
                            >
                              {{ convertToRupiah(ticketTotal?.totalPrice) }}
                            </p>
                          </div>
                        </td>
                      </tr>

                      <tr
                        :key="index"
                        class="font-[14px] border-b bg-gray-100 font-lato font-bold text-gray-800"
                      >
                        <td colspan="4" />
                        <td class="px-6 py-4">Total</td>
                        <td class="px-6 py-4">
                          {{ convertToRupiah(calculateRowTotal(item)) || '-' }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                  <tfoot class="sticky bottom-0 bg-gray-200">
                    <tr
                      class="font-[14px] border-b font-lato font-bold text-gray-800"
                    >
                      <td colspan="4" />
                      <td class="px-6 py-4">Grand Total</td>
                      <td class="px-6 py-4">
                        {{ convertToRupiah(grandTotal) }}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div v-else class="mx-6 rounded-lg border border-gray-300">
              <div class="flex h-[556px] flex-col items-center justify-center">
                <BaseIconSvg
                  icon="/icon/no-data.png"
                  mode="image"
                  :width="160"
                  :height="160"
                  class="mt-[2px]"
                />

                <h3
                  class="font-roboto text-[21px] font-medium leading-[34px] text-gray-900"
                >
                  Belum ada data!
                </h3>
                <h5
                  class="font-lato text-[14px] font-normal leading-[23px] text-gray-700"
                >
                  Terapkan filter untuk dapat menampilkan data laporan yang
                  sesuai.
                </h5>
              </div>
            </div>
          </template>
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
  </div>
</template>

<script>
import { formatDate, convertToRupiah, formatExcelDate } from '~/utils'
import {
  listStatusSribaduga,
  listKunjunganSribaduga,
  listKategoriTiketSribaduga,
} from '@/constant/sribaduga.js'
import 'vue2-datepicker/index.css'

export default {
  name: 'LaporanPendapatanSribaduga',
  data() {
    const today = new Date()
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return {
      listDataTypeAssurance: [
        {
          value: 'with-assurance',
          label: 'Dengan Asuransi',
        },
        {
          value: 'without-assurance',
          label: 'Tanpa Asuransi',
        },
      ],
      listStatusSribaduga,
      listKunjunganSribaduga,
      listKategoriTiketSribaduga,

      query: {
        forScan: true,
        page: 1,
        search: null,
        perPage: 25,
        sortOrder: 'desc',
        sortBy: 'orderedAt',
        statusCode: '',
        tabIndex: 0,
        visitType: 'all',
        attraction: 'c64143d6-d630-4ccf-8529-483b9b737a52',
        category: '',
      },
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      dateRange: [oneMonthAgo, today],
      listDataLaporan: [],
      assurancePrice: 0,
      grandTotal: 0,
      selectAsurance: 'with-assurance',
      actionDownloadLaporan: [{ menu: 'Microsoft Excel (.xls)', value: 'xls' }],
      listDataCategoryWisatawan: [],
      loading: true,
    }
  },
  async fetch() {
    this.loading = true
    this.setQuery({
      startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
      endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
    })
    try {
      const responseDataLaporan = await this.$axios.get(
        '/ticket/tms/admin/orders/incomes',
        {
          params: this.query,
        }
      )

      const { data } = responseDataLaporan.data
      console.log(data)
      this.listDataLaporan = data || []
      this.assurancePrice = data?.assurancePrice
      this.calculateGrandTotal(this.listDataLaporan)
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  },
  computed: {
    listCategoryWisatawan() {
      return this.listDataCategoryWisatawan.map((item) => {
        return {
          value: item.code,
          label: item.name,
        }
      })
    },
    listCategoryStatus() {
      return this.listStatusSribaduga.map((item) => {
        return {
          value: item.statusCode,
          label: item.label,
        }
      })
    },
  },
  watch: {
    dateRange() {
      if (!this.isShowPopupDateRange) {
        this.$refs.datepicker.closePopup()
      } else {
        this.$refs.datepicker.openPopup()
      }
    },
  },
  methods: {
    handleFilter() {
      this.$fetch()
    },
    resetFilter() {
      this.query = {
        category: '',
        status: '',
      }
      this.dateRange = [
        new Date(new Date().setMonth(new Date().getMonth() - 1)),
        new Date(),
      ]
      this.selectAsurance = 'with-assurance'
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    disabledRange: function (date, inputDate) {
      const endDate = new Date(
        inputDate[1] === undefined ? inputDate[0] : inputDate[1]
      )
      endDate.setMonth(endDate.getMonth() - 3)
      return date > new Date() || date < endDate
    },
    checkMaxDate(date) {
      const endDate = new Date(date[1])
      endDate.setMonth(endDate.getMonth() - 3)
      if (date[0] < endDate) {
        date[0] = endDate
      }
    },
    clearDateRangeHandle() {
      this.dateRange = [this.oneMonthAgo, new Date()]

      this.setQuery({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
      })
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle() {
      this.isShowPopupDateRange = true
    },
    closePopupDateHandle() {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    filterDateHandle() {
      this.setQuery({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd'),
      })
      this.$refs.datepicker.closePopup()
    },
    setQuery(params) {
      this.query = { ...this.query, ...params }
    },
    calculateRowTotal(item) {
      // sum every totalPrice in item.tickets array
      return item.tickets.reduce((acc, ticket) => {
        return acc + ticket.totalPrice
      }, 0)
    },
    getTypeAssurance(selectedType) {
      const selectedOption = this.listDataTypeAssurance.find(
        (option) => option.value === selectedType
      )
      return selectedOption ? selectedOption.label : '-'
    },
    checkAsurance(price) {
      return this.selectAsurance === 'with-assurance'
        ? price
        : price - this.assurancePrice
    },
    calculateGrandTotal(dataLaporan) {
      // sum every totalPrice in item.tickets array
      this.grandTotal = dataLaporan.reduce((acc, item) => {
        return acc + this.calculateRowTotal(item)
      }, 0)
    },
    formatDate,
    convertToRupiah,
    formatExcelDate,
    downloadExcelReport() {
      /*eslint-disable*/
      const table = document.getElementById('table-laporan-pendapatan')

      const wscols = [
        { wch: 20 },
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 },
        { wch: 20 },
      ]
      // create nested table rows for each item in listDataLaporan
      const rows = []
      for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i]
        const cells = []
        for (let j = 0; j < row.cells.length; j++) {
          cells.push(row.cells[j].innerText)
        }
        rows.push(cells)
      }

      const ws = XLSX.utils.aoa_to_sheet(rows)
      ws['!cols'] = wscols
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Laporan Pendapatan')
      XLSX.writeFile(wb, 'Laporan Pendapatan.xlsx')
    },
  },
}
</script>

<style scoped lang="scss">
.jds-input-text {
  @apply border-gray-300;
}

.mx-datepicker {
  width: 222px;
  border-width: 1px;

  border-radius: 8px;
  height: 38px;
  .mx-input {
    width: 222px;
    border-width: 1px;

    border-radius: 8px;
    height: 38px;

    padding: 10px 8px 10px 8px;
  }
}
</style>
