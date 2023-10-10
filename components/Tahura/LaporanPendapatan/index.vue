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
                  @close="isShowPopupDate = false"
                  @clear="clearDateRangeHandle"
                  @change="changeDateRangeHandle"
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
                      label-button="Pilih"
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
                  :options="listDataStatus"
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
                  @pdf="downloadPdfReport"
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
                      <th scope="col" class="px-6 py-3 font-bold">
                        No
                      </th>
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
                        Tarik (RP)
                      </th>
                      <th scope="col" class="px-6 py-3 font-bold">
                        Jumlah Total (RP)
                      </th>
                    </tr>
                  </thead>
                  <tbody class="h-96 overflow-y-auto">
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
                            formatDate(item.reservationDate, "dd MMMM yyyy") ||
                              "-"
                          }}
                        </td>
                        <td class="px-6 py-4">
                          {{ indexCategory + 1 }}
                        </td>
                        <td class="px-6 py-4">
                          {{ itemCategories.name || "-" }}
                        </td>
                        <td class="px-6 py-4">
                          {{ getTypeAssurance(selectAsurance) || "-" }}
                        </td>
                        <td class="px-6 py-4">
                          {{ itemCategories.quantity || "-" }}
                        </td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              checkAsurance(itemCategories.price)
                            ) || "-"
                          }}
                        </td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              checkAsurance(itemCategories.price) *
                                itemCategories.quantity
                            ) || "-"
                          }}
                        </td>
                      </tr>
                      <tr
                        :key="`total-${index}`"
                        class="font-[14px] border-b bg-gray-100 font-lato font-bold text-gray-800"
                      >
                        <td colspan="5" />
                        <td class="px-6 py-4">
                          Total
                        </td>
                        <td class="px-6 py-4">
                          {{
                            convertToRupiah(
                              calculateRowTotal(item.categories)
                            ) || "-"
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
                      <td class="px-6 py-4">
                        Grand Total
                      </td>
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
import { formatDate, convertToRupiah } from '~/utils'
import 'vue2-datepicker/index.css'

export default {
  name: 'LaporanPendapatanTahura',
  data () {
    return {
      listDataTypeAssurance: [
        {
          value: 'with-assurance',
          label: 'Dengan Asuransi'
        },
        {
          value: 'without-assurance',
          label: 'Tanpa Asuransi'
        }
      ],

      listDataStatus: [
        {
          value: '',
          label: 'Semua Status'
        },
        {
          value: 'scanned',
          label: 'Berhasil Scan'
        },
        {
          value: 'paid',
          label: 'Belum Scan'
        }
      ],
      query: {
        category: '',
        status: ''
      },
      isShowPopupDate: false,
      isShowPopupDateRange: false,
      dateRange: [
        new Date(new Date().setFullYear(new Date().getFullYear())),
        new Date()
      ],
      listDataLaporan: [],
      assurancePrice: 0,
      grandTotal: 0,
      selectAsurance: 'with-assurance',
      actionDownloadLaporan: [
        { menu: 'Portable Data Format (.pdf)', value: 'pdf' },
        { menu: 'Microsoft Excel (.xls)', value: 'xls' }
      ],
      listDataCategoryWisatawan: [],
      loading: true
    }
  },
  async fetch () {
    this.loading = true
    this.setDate({
      startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
      endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
    })
    try {
      const responseDataLaporan = await this.$axios.get(
        '/ticket/tahura/income',
        {
          params: this.query
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
          name: 'Semua Wisatawan'
        },
        ...this.listDataCategoryWisatawan
      ]
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  },
  computed: {
    listCategoryWisatawan () {
      return this.listDataCategoryWisatawan.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        this.$fetch()
      }
    },
    dateRange () {
      if (!this.isShowPopupDateRange) {
        this.$refs.datepicker.closePopup()
      } else {
        this.$refs.datepicker.openPopup()
      }
    }
  },
  methods: {
    filterCategoryHandle () {
      this.$fetch()
    },
    clearDateRangeHandle () {
      console.log('clear data')
      this.dateRange = [
        new Date(),
        new Date()
      ]

      console.log(this.dateRange)
      this.setDate({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.isShowPopupDateRange = false
      this.$fetch()
    },
    changeDateRangeHandle () {
      this.isShowPopupDateRange = true
    },
    closePopupDateHandle () {
      this.isShowPopupDateRange = false
      this.$refs.datepicker.closePopup()
    },
    filterDateHandle () {
      this.setDate({
        startDate: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        endDate: formatDate(this.dateRange[1], 'yyyy-MM-dd')
      })
      this.$fetch()
      this.$refs.datepicker.closePopup()
    },
    setDate (params) {
      this.query = { ...this.query, ...params }
    },
    calculateRowTotal (categories) {
      let total = 0
      categories.forEach((category) => {
        total += category.quantity * this.checkAsurance(category.price)
      })
      return total || '-'
    },
    getTypeAssurance (selectedType) {
      const selectedOption = this.listDataTypeAssurance.find(
        option => option.value === selectedType
      )
      return selectedOption ? selectedOption.label : '-'
    },
    checkAsurance (price) {
      return this.selectAsurance === 'with-assurance'
        ? price
        : price - this.assurancePrice
    },
    calculateGrandTotal (dataLaporan) {
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
    downloadExcelReport () {
      /*eslint-disable*/
      const table = document.getElementById("table-laporan-pendapatan");
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      const wscols = [
        { wch: 20 },
        { wch: 5 },
        { wch: 20 },
        { wch: 20 },
        { wch: 10 },
        { wch: 20 },
        { wch: 20 },
      ];
      ws["!cols"] = wscols;

      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(
        wb,
        `Laporan Pendatapan Tahura Tanggal ${formatDate(
          this.query.startDate,
          "dd MMMM yyyy"
        )} - ${formatDate(this.query.endDate, "dd MMMM yyyy")}.xlsx`
      );
    },
    downloadPdfReport() {
    this.query.assurance = this.selectAsurance
    console.log(this.query)
    window.open(`/preview-pdf/tahura/${this.query.assurance}/${this.query.category || '-'}/${this.query.startDate}/${this.query.endDate}/${this.query.status || '-'}`, '_blank');
    },
  },
};
</script>

<style scoped>
.jds-input-text {
  @apply border-gray-300 !important;
}
</style>