<template>
  <div>
    <BaseTabGroup>
      <template #tab-panel>
        <BaseTabPanel class="px-3 pt-6 pb-4">
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

              <div class="flex">
                <BaseButton
                  class="mx-3 bg-green-700 text-white hover:bg-green-600"
                >
                  Download Laporan
                </BaseButton>
              </div>
            </div>
          </div>

          <div
            class="relative mx-6 overflow-x-auto rounded-lg border border-gray-300"
          >
            <div class="max-h-96">
              <table class="w-full text-left text-sm text-gray-500">
                <thead
                  class="sticky top-0 bg-gray-200 font-roboto text-xs font-semibold uppercase text-gray-800"
                >
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Tanggal Kunjungan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3">
                      tipe wistawan
                    </th>
                    <th scope="col" class="px-6 py-3">
                      tipe asuransi
                    </th>
                    <th scope="col" class="px-6 py-3">
                      jumlah tiket
                    </th>
                    <th scope="col" class="px-6 py-3">
                      tarif (rp)
                    </th>
                    <th scope="col" class="px-6 py-3">
                      jumlah total (rp)
                    </th>
                  </tr>
                </thead>
                <tbody class="h-96 overflow-y-auto">
                  <template v-for="(item, index) in listDataLaporan.data">
                    <tr
                      v-for="(itemCategories, indexCategory) in item.categories"
                      :key="`${item.reservationDate}-${indexCategory}`"
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
                      :key="index"
                      class="font-[14px] border-b bg-gray-100 font-lato font-bold text-gray-800"
                    >
                      <td colspan="5" />
                      <td class="px-6 py-4">
                        Total
                      </td>
                      <td class="px-6 py-4">
                        {{
                          convertToRupiah(calculateRowTotal(item.categories)) ||
                            "-"
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
      search: '',
      // TODO: changes dummy data from API, if API ready
      dataDummy: [
        {
          status: true,
          message: 'Success',
          code: '2000800',
          data: {
            assurancePrice: 2000,
            data: [
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-14',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 100,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 40,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-13',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 90,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 34,
                    price: 57000
                  }
                ]
              },
              {
                reservationDate: '2023-09-12',
                categories: [
                  {
                    code: 'wni',
                    name: 'Wisatawan Lokal',
                    quantity: 97,
                    price: 17000
                  },
                  {
                    code: 'wna',
                    name: 'Wisatawan Asing',
                    quantity: 12,
                    price: 57000
                  }
                ]
              }
            ]
          }
        }
      ],
      listDataCategoryWisatawan: [
        {
          code: 'wni',
          name: 'Wisatawan Lokal'
        },
        {
          code: 'wna',
          name: 'Wisatawan Asing'
        }
      ],
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
      selectAsurance: 'with-assurance',
      grandTotal: 0
    }
  },
  async fetch () {
    try {
      const responseDataLaporan = await this.$axios.get(
        '/ticket/tahura/income',
        {
          params: this.query
        }
      )

      const { data } = responseDataLaporan.data
      this.listDataLaporan = data?.data || []
      this.calculateGrandTotal(this.listDataLaporan.data)
    } catch (error) {
      this.listDataLaporan = this.dataDummy[0].data
      this.assurancePrice = this.listDataLaporan.assurancePrice
      this.calculateGrandTotal(this.listDataLaporan.data)
      console.error(error)
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
      this.dateRange = [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date()
      ]
      this.setDate({
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd')
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
        start_date: formatDate(this.dateRange[0], 'yyyy-MM-dd'),
        end_date: formatDate(this.dateRange[1], 'yyyy-MM-dd')
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
    convertToRupiah
  }
}
</script>

<style scoped>
.jds-input-text {
  @apply border-gray-300 !important;
}
</style>
