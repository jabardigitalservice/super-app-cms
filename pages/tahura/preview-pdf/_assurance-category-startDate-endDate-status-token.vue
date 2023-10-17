<template>
  <div>
    <div id="loader" :class="{hidden: !loading}">
      <div class="flex h-[300px] flex-col items-center justify-center">
        <jds-spinner class="mb-4" size="56" />
        <p class="font-lato text-2xl font-bold text-green-700">
          Loading....
        </p>
      </div>
    </div>

    <BasePreviewPdf :class="{hidden: loading}">
      <template #title>
        Laporan Pendapatan Tiket Masuk Wisata
      </template>
      <template #header>
        <div class="mt-5">
          <table>
            <tbody>
              <tr>
                <td>Waktu Export</td>
                <td>:</td>
                <td>{{ formatDate(Date.now(), "dd MMMM yyyy HH:mm") }} WIB</td>
              </tr>
              <tr>
                <td>Nama Wisata</td>
                <td>:</td>
                <td>Taman Hutan Raya Ir. H. Djuanda (Tahura)</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>
                  Kompleks Tahura, Jl. Ir. H. Juanda No.99, Ciburial, Kec.
                  Cimenyan, Kabupaten Bandung, Jawa Barat 40198
                </td>
              </tr>

              <tr>
                <td>Tanggal Laporan</td>
                <td>:</td>
                <td>
                  {{ formatDate($route.params.startDate, "dd MMMM yyyy") }}
                  -
                  {{ formatDate($route.params.endDate, "dd MMMM yyyy") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template #body>
        <div v-if="listDataLaporan.length > 0" class="mt-5">
          <table
            id="table-laporan-pendapatan"
            class="w-full border-collapse border border-black text-left text-sm text-black"
          >
            <thead
              class="bg-[#CCD9F5] font-roboto text-xs font-semibold uppercase text-black"
            >
              <tr>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Tanggal Kunjungan
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  No
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Tipe Wisatawan
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Tipe Asuransi
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Jumlah Tiket
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Tarik (RP)
                </th>
                <th scope="col" class="border border-black px-6 py-3 font-bold">
                  Jumlah Total (RP)
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in listDataLaporan">
                <tr
                  v-for="(itemCategories, indexCategory) in item.categories"
                  :key="`list-${index}-${indexCategory}`"
                  class="font-[14px] border-b font-lato font-medium text-black"
                >
                  <td
                    scope="row"
                    class="whitespace-nowrap border border-black px-6 py-4"
                  >
                    {{
                      formatDate(item.reservationDate, "dd MMMM yyyy") || "-"
                    }}
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{ indexCategory + 1 }}
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{ itemCategories.name || "-" }}
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{ getTypeAssurance($route.params.assurance) || "-" }}
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{ itemCategories.quantity || "-" }}
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{ convertToRupiah(checkAsurance(itemCategories.price)) || "-" }}
                  </td>
                  <td class="border border-black px-6 py-4">
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
                  class="font-[14px] border-b font-lato font-bold text-black"
                >
                  <td
                    class="border border-black bg-[#CCD9F5] px-6 py-4 text-right"
                    colspan="6"
                  >
                    Total
                  </td>
                  <td class="border border-black px-6 py-4">
                    {{
                      convertToRupiah(calculateRowTotal(item.categories)) || "-"
                    }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>

        <div class="flex flex-col">
          <h5 class="mt-5 text-[16px] text-black">
            Total Pendapatan:
            <span class="font-bold"> {{ convertToRupiah(grandTotal) }}</span>
          </h5>

          <h5 class="mt-5 text-[16px] text-black">
            Di<em>export</em> oleh: Sistem <em>E-Ticketing</em> Sapawarga
          </h5>

          <div class="mt-[50px] break-inside-avoid">
            <div class="flex flex-row">
              <div class="flex flex-1 flex-col text-center">
                <h5 class="mb-5">
                  Mengetahui
                </h5>
                <h5>KEPALA BLUD TAHURA</h5>
                <h5 class="mt-[150px]">
                  Lutfi Erizka, S.I.Kom
                </h5>
                <h5>NIP. 198309222009011001</h5>
              </div>
              <div class="flex flex-1 flex-col text-center">
                <h5 class="mb-5">
                  {{ formatDate(Date.now(), "dd MMMM yyyy") }}
                </h5>
                <h5>Pembuat Daftar</h5>
                <h5 class="mt-[150px]">
                  Reni Herlina B, S.H
                </h5>
                <h5>NIP. 196510012007012008</h5>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BasePreviewPdf>
  </div>
</template>

<script>
import { formatDate, convertToRupiah } from '~/utils'
export default {
  name: 'PreviewPdfTahura',
  auth: false,
  data () {
    return {
      navigations: [
        {
          label: 'Preview Laporan Pendapatan',
          link: '/tahura/preview-pdf'
        }
      ],
      descriptionPage: 'Preview Laporan Pendapatan Taman Hutan Raya.',
      listDataLaporan: [],
      assurancePrice: 0,
      grandTotal: 0,
      loading: true,
      listDataTypeAssurance: [
        {
          value: 'with-assurance',
          label: 'Dengan Asuransi'
        },
        {
          value: 'without-assurance',
          label: 'Tanpa Asuransi'
        }
      ]
    }
  },
  async fetch () {
    this.loading = true
    if (this.$route.params.token) {
      try {
        const responseDataLaporan = await this.$axios.get(
          '/ticket/tahura/income',
          {
            params: {
              assurance: this.$route.params.assurance,
              startDate: this.$route.params.startDate,
              endDate: this.$route.params.endDate,
              status: this.$route.params.status,
              category: this.$route.params.category
            },
            headers: {
              Authorization: this.$route.params.token
            }

          }
        )

        const { data } = responseDataLaporan.data
        this.listDataLaporan = data?.data || []
        this.assurancePrice = data?.assurancePrice
        this.calculateGrandTotal(this.listDataLaporan)
        this.generatePdf()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  },
  methods: {
    calculateGrandTotal (dataLaporan) {
      let grandTotal = 0

      for (const item of dataLaporan) {
        for (const category of item.categories) {
          grandTotal += category.quantity * this.checkAsurance(category.price)
        }
      }

      this.grandTotal = grandTotal
    },
    checkAsurance (price) {
      return this.$route.params.assurance ===
        'with-assurance'
        ? price
        : price - this.assurancePrice
    },
    formatDate,
    convertToRupiah,
    getTypeAssurance (selectedType) {
      const selectedOption = this.listDataTypeAssurance.find(
        option => option.value === selectedType
      )
      return selectedOption ? selectedOption.label : '-'
    },
    calculateRowTotal (categories) {
      let total = 0
      categories.forEach((category) => {
        total += category.quantity * this.checkAsurance(category.price)
      })
      return total || '-'
    },
    async generatePdf () {
      try {
        await this.$axios.post('/ticket/tahura/income/report', {
          previewUrl: window.location.href
        }, {
          headers: {
            Authorization: this.$route.params.token
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
