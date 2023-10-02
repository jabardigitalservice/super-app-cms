<template>
  <BasePreviewPdf>
    <template #title>
      Laporan Pendapatan Tiket Masuk Wisata
    </template>\
    <template #header>
      <div class="mt-5">
        <table>
          <tbody>
            <tr>
              <td>Waktu Export</td>
              <td>:</td>
              <td>09 September 2023 16:00 WIB</td>
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
              <td>06 September - 08 September 2023</td>
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
                  {{ formatDate(item.reservationDate, "dd MMMM yyyy") || "-" }}
                </td>
                <td class="border border-black px-6 py-4">
                  {{ indexCategory + 1 }}
                </td>
                <td class="border border-black px-6 py-4">
                  {{ itemCategories.name || "-" }}
                </td>
                <td class="border border-black px-6 py-4">
                  {{
                    getTypeAssurance(
                      $store.state.queryLaporanPendapatan.assurance
                    ) || "-"
                  }}
                </td>
                <td class="border border-black px-6 py-4">
                  {{ itemCategories.quantity || "-" }}
                </td>
                <td class="border border-black px-6 py-4">
                  {{
                    convertToRupiah(checkAsurance(itemCategories.price)) || "-"
                  }}
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
          Di<i>export</i> oleh: Sistem <i>E-Ticketing</i> Sapawarga
        </h5>

        <div class="mt-[50px]">
          <div class="flex flex-row">
            <div class="flex flex-col flex-1">
              <h5>Mengetahui</h5>
              <h5>KEPALA BLUD TAHURA</h5>
              <h5 class="mt-[150px]">
                Lutfi Erizka, S.I.Kom
              </h5>
              <h5>NIP. 198309222009011001</h5>
            </div>
            <div class="flex flex-col flex-1">
              <h5>September</h5>
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
</template>

<script>
import { formatDate, convertToRupiah } from '~/utils'
export default {
  name: 'PreviewPdfTahura',
  layout: 'Dashboard',
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
    try {
      const responseDataLaporan = await this.$axios.get(
        '/ticket/tahura/income',
        {
          params: this.$store.state.queryLaporanPendapatan
        }
      )

      const { data } = responseDataLaporan.data
      this.listDataLaporan = data?.data || []
      this.assurancePrice = data?.assurancePrice
      this.calculateGrandTotal(this.listDataLaporan)
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Laporan Pendapatan')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
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
      return this.$store.state.queryLaporanPendapatan.assurance ===
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
    }
  }
}
</script>

<style></style>
