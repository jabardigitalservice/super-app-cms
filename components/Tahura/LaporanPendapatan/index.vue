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
                  Tipe Wisatawan
                </h5>
                <jds-select
                  v-model="query.category"
                  placeholder="Semua Wisatawan"
                  :options="listCategoryWisatawan"
                  class="!ml-2 mr-2"
                  @change="filterCategoryHandle"
                />
              </div>

              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Tipe Asuransi
                </h5>
                <jds-select
                  v-model="selectAsurance"
                  placeholder="Dengan Asuransi"
                  :options="listDataTypeAssurance"
                  class="!ml-2 mr-2"
                  @change="filterCategoryHandle"
                />
              </div>

              <div class="flex flex-col">
                <h5
                  class="mx-2 mb-1 font-lato text-[15px] font-normal leading-6 text-gray-800"
                >
                  Pilih Tanggal/Range Tanggal
                </h5>

                <date-picker
                  ref="datepicker"
                  v-model="dateRange"
                  format="DD/MM/YYYY"
                  range
                  range-separator=" - "
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
                  Status Tiket/Scan
                </h5>
                <jds-select
                  v-model="query.status"
                  placeholder="Semua Status"
                  :options="listCategoryStatus"
                  class="!ml-2 mr-2"
                  @change="filterCategoryHandle"
                />
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
                      <th scope="col" class="px-6 py-3 font-bold">
                        Tanggal Kunjungan
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">No</th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Tipe Wisatawan
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Tipe Asuransi
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Jumlah Tiket
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Tarif (RP)
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Jumlah Total (RP)
                      </th>
                    </tr>
                  </thead>
                  <tbody class="overflow-y-auto">
                    <template v-for="(item, index) in listDataLaporan">
                      <tr
                        v-for="(
                          itemCategories, indexCategory
                        ) in item.categories"
                        :key="`list-${index}-${indexCategory}`"
                        class="font-[14px] border-b bg-gray-50 font-lato font-medium text-gray-800"
                      >
                        <td scope="row" class="whitespace-nowrap px-6 py-4">
                          {{
                            formatDate(item.reservationDate, 'dd MMMM yyyy') ||
                            '-'
                          }}
                        </td>
                        <td class="px-6 py-4">
                          {{ indexCategory + 1 }}
                        </td>
                        <td class="px-6 py-4">
                          {{ itemCategories.name || '-' }}
                        </td>
                        <td class="px-6 py-4">
                          {{ getTypeAssurance(selectAsurance) || '-' }}
                        </td>
                        <td class="px-6 py-4">
                          {{ itemCategories.quantity || '-' }}
                        </td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              checkAsurance(itemCategories.price)
                            ) || '-'
                          }}
                        </td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              checkAsurance(itemCategories.price) *
                                itemCategories.quantity
                            ) || '-'
                          }}
                        </td>
                      </tr>
                      <tr
                        :key="`total-${index}`"
                        class="font-[14px] border-b bg-gray-100 font-lato font-bold text-gray-800"
                      >
                        <td colspan="5" />
                        <td class="px-6 py-4">Total</td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              calculateRowTotal(item.categories)
                            ) || '-'
                          }}
                        </td>
                      </tr>
                    </template>
                  </tbody>
                  <tfoot class="sticky bottom-0 bg-gray-200">
                    <tr
                      class="font-[14px] border-b font-lato font-bold text-gray-800"
                    >
                      <td colspan="5" />
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
import { listStatusTahura } from '@/constant/tahura.js'
import 'vue2-datepicker/index.css'

export default {
  name: 'LaporanPendapatanTahura',
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
      listStatusTahura,
      query: {
        category: '',
        status: '',
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
        '/ticket/tahura/income',
        {
          params: this.query,
        }
      )

      const { data } = responseDataLaporan.data
      this.listDataLaporan = data?.data || []
      this.assurancePrice = data?.assurancePrice
      this.calculateGrandTotal(this.listDataLaporan)

      const responseCategoryWisatawan = await this.$axios.get(
        '/ticket/tahura/categories'
      )

      this.listDataCategoryWisatawan = responseCategoryWisatawan.data.data

      this.listDataCategoryWisatawan = [
        {
          code: '',
          name: 'Semua Wisatawan',
        },
        ...this.listDataCategoryWisatawan,
      ]
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
      return this.listStatusTahura.map((item) => {
        return {
          value: item.statusCode,
          label: item.label,
        }
      })
    },
  },
  watch: {
    query: {
      deep: true,
      handler() {
        this.$fetch()
      },
    },
    dateRange() {
      if (!this.isShowPopupDateRange) {
        this.$refs.datepicker.closePopup()
      } else {
        this.$refs.datepicker.openPopup()
      }
    },
  },
  methods: {
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
    filterCategoryHandle() {
      this.$fetch()
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
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    setQuery(params) {
      this.query = { ...this.query, ...params }
    },
    calculateRowTotal(categories) {
      let total = 0
      categories.forEach((category) => {
        total += category.quantity * this.checkAsurance(category.price)
      })
      return total || '-'
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
      let grandTotal = 0

      for (const item of dataLaporan) {
        for (const category of item.categories) {
          grandTotal += category.quantity * this.checkAsurance(category.price)
        }
      }

      this.grandTotal = grandTotal
    },
    formatDate,
    convertToRupiah,
    formatExcelDate,
    downloadExcelReport() {
      /*eslint-disable*/
      const table = document.getElementById('table-laporan-pendapatan')
      const ws = XLSX.utils.table_to_sheet(table)
      const wb = XLSX.utils.book_new()
      const wscols = [
        { wch: 20 },
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 },
        { wch: 20 },
      ]

      // mengambil row
      const rowCount = table.rows.length

      // mengambil value row
      for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: 0 })
        // mengambil value, format pada row

        // mengubah data yg ada value nya dan berformat n (waktu pada excel)
        if (ws[cellAddress].v && ws[cellAddress].t === 'n') {
          const originalValue = ws[cellAddress].v
          const formattedValue = formatExcelDate(originalValue)

          ws[cellAddress] = { v: formattedValue } // mengubah value
        }
      }

      ws['!cols'] = wscols

      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      XLSX.writeFile(
        wb,
        `Laporan Pendatapan Tahura Tanggal ${formatDate(
          this.query.startDate,
          'dd MMMM yyyy'
        )} - ${formatDate(this.query.endDate, 'dd MMMM yyyy')}.xlsx`
      )
    },
  },
}
</script>

<style scoped>
.jds-input-text {
  @apply border-gray-300 !important;
}
</style>
