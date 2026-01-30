<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search
        v-model="search"
        small
        icon
        :button="false"
        placeholder="Masukkan nama akun"
        class="w-[275px] text-gray-500"
        @input="onSearch"
      />
    </div>
    <div class="overflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="headerTableKlaimRT"
        :items="dataRT"
        :pagination="pagination"
        :loading="loading"
        @next-page="pageChange"
        @previous-page="pageChange"
        @page-change="pageChange"
        @per-page-change="perPageChange"
        @change:sort="sortChange"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.address="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="openModalDetailAddress(item)"
          >
            Lihat Alamat
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.document="{ item }">
          <button
            class="rounded-lg border border-green-700 px-4 py-1 text-green-700 hover:bg-green-50"
            @click="onClickDocument(item?.rtDecree)"
          >
            Lihat Dokumen
          </button>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{ item }">
          <div class="flex items-center">
            <span
              :class="{
                'mr-2 h-2 w-2 rounded-full': true,
                'bg-green-600': item.rtStatus === userStatus.verified,
                'bg-yellow-600': item.rtStatus === userStatus.waiting,
                'bg-red-600': item.rtStatus === userStatus.rejected,
              }"
            />
            {{ item.rtStatus }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <KlaimRTTableAction
            :status="item.rtStatus"
            @detail="goToDetail(item.id)"
            @verify="showVerifyPopupHandle(item)"
            @reject="rejectUser(item)"
          />
        </template>
      </JdsDataTable>
    </div>
    <KlaimRTDetailAddress
      title="Alamat RT"
      :loading="isLoadingDetailData"
      :detail-data="detailData"
      :data-user="dataUser"
      :show="showDetailAddress"
      @close="showDetailAddress = false"
    />
    <BaseViewFile
      title="Dokumen SK RT"
      :file="informationDialog.file"
      :mime-type="informationDialog.mimeType"
      :show="showDocument"
      @close="showDocument = false"
    />
    <PopupRejectRt
      :show-popup="showRejectRt"
      :account-name="dataUser.name"
      :account-email="dataUser.email"
      @close="showRejectRt = false"
      @submit="actionRejectUser"
    />
    <PopupVerifyRt
      :show-popup="showPopupVerifyConfirmation"
      :account-name="dataUser.name"
      @submit="actionVerifyUser"
      @close="showPopupVerifyConfirmation = false"
    />
    <PopupInformation
      :show-popup="informationDialog.show"
      :title="informationDialog.title"
      :description-text="informationDialog.info"
      :account-name="dataUser.name"
      :message="informationDialog.message"
      @close="onClosePopupInfo"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import PopupRejectRt from './Popup/RejectConfirmation.vue'
import PopupVerifyRt from './Popup/VerifyConfirmation.vue'
import PopupInformation from './Popup/Information.vue'
import { headerTableKlaimRT, userStatus } from '~/constant/klaim-rt'
import { generateItemsPerPageOptions, formatDate } from '~/utils'

export default {
  name: 'ComponentKlaimRT',
  components: {
    PopupRejectRt,
    PopupVerifyRt,
    PopupInformation,
  },
  data() {
    return {
      search: '',
      loading: false,
      data: [
        {
          id: 1,
          name: 'Isah',
          email: 'isah@example.com',
          createdAt: '2025-01-15T10:30:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-1',
          address: 'Jl. Raya No. 123',
          city: { name: 'Bandung' },
          district: { name: 'Cibiru' },
          village: { name: 'Cibiru Wetan' },
          subVillage: { name: 'Margasari' },
          rtRw: { name: 'RT 001/RW 005' },
          dataKtp: {
            nik: '3201234567890001',
            name: 'Isah',
            address: 'Jl. Raya No. 123'
          }
        },
        {
          id: 2,
          name: 'Ian Setiawan',
          email: 'ian.setiawan@example.com',
          createdAt: '2025-01-14T14:20:00Z',
          rtStatus: 'Terverifikasi',
          rtDecree: 'doc-2',
          address: 'Jl. Merdeka No. 45',
          city: { name: 'Bandung' },
          district: { name: 'Ujung Berung' },
          village: { name: 'Pasir Endah' },
          subVillage: { name: 'Cipamokolan' },
          rtRw: { name: 'RT 003/RW 007' },
          dataKtp: {
            nik: '3201234567890002',
            name: 'Ian Setiawan',
            address: 'Jl. Merdeka No. 45'
          }
        },
        {
          id: 3,
          name: 'Nono Mulyana',
          email: 'nono.mulyana@example.com',
          createdAt: '2025-01-13T09:15:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-3',
          address: 'Jl. Sudirman No. 78',
          city: { name: 'Bandung' },
          district: { name: 'Antapani' },
          village: { name: 'Antapani Kidul' },
          subVillage: { name: 'Sindangjaya' },
          rtRw: { name: 'RT 002/RW 004' },
          dataKtp: {
            nik: '3201234567890003',
            name: 'Nono Mulyana',
            address: 'Jl. Sudirman No. 78'
          }
        },
        {
          id: 4,
          name: 'Ahmed Yusep',
          email: 'ahmed.yusep@example.com',
          createdAt: '2025-01-12T16:45:00Z',
          rtStatus: 'Terverifikasi',
          rtDecree: 'doc-4',
          address: 'Jl. Ahmad Yani No. 90',
          city: { name: 'Bandung' },
          district: { name: 'Cicadas' },
          village: { name: 'Cicadas' },
          subVillage: { name: 'Mekar Jaya' },
          rtRw: { name: 'RT 004/RW 008' },
          dataKtp: {
            nik: '3201234567890004',
            name: 'Ahmed Yusep',
            address: 'Jl. Ahmad Yani No. 90'
          }
        },
        {
          id: 5,
          name: 'Indra Martin',
          email: 'indra.martin@example.com',
          createdAt: '2025-01-11T11:30:00Z',
          rtStatus: 'Menunggu Verifikasi',
          rtDecree: 'doc-5',
          address: 'Jl. Gatot Subroto No. 12',
          city: { name: 'Bandung' },
          district: { name: 'Rancasari' },
          village: { name: 'Derwati' },
          subVillage: { name: 'Derwati Indah' },
          rtRw: { name: 'RT 005/RW 010' },
          dataKtp: {
            nik: '3201234567890005',
            name: 'Indra Martin',
            address: 'Jl. Gatot Subroto No. 12'
          }
        },
      ],
      filteredData: [],
      detailData: {},
      isLoadingDetailData: false,
      pagination: {
        currentPage: 1,
        totalRows: 0,
        itemsPerPage: 5,
        itemsPerPageOptions: [],
        disabled: false,
      },
      headerTableKlaimRT,
      userStatus,
      showDetailAddress: false,
      showDocument: false,
      showRejectRt: false,
      showPopupVerifyConfirmation: false,
      dataUser: {
        id: null,
        name: '',
        email: '',
      },
      informationDialog: {
        show: false,
        title: '',
        info: '',
        message: '',
        file: '',
        mimeType: ''
      },
      sortBy: 'date',
      sortType: 'desc',
    }
  },
  computed: {
    dataRT() {
      const result = [...this.filteredData]

      // Apply sorting
      if (this.sortBy && this.sortType) {
        result.sort((a, b) => {
          let aVal, bVal

          if (this.sortBy === 'date') {
            aVal = new Date(a.createdAt).getTime()
            bVal = new Date(b.createdAt).getTime()
          } else if (this.sortBy === 'status') {
            aVal = a.rtStatus
            bVal = b.rtStatus
          } else if (this.sortBy === 'name') {
            aVal = a.name?.toLowerCase() || ''
            bVal = b.name?.toLowerCase() || ''
          }

          if (this.sortType === 'asc') {
            return aVal > bVal ? 1 : -1
          } else {
            return aVal < bVal ? 1 : -1
          }
        })
      }

      // Apply pagination
      const start = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage
      const end = start + this.pagination.itemsPerPage

      return result.slice(start, end).map((item) => {
        return {
          ...item,
          date: formatDate(item.createdAt || ''),
        }
      })
    },
  },
  mounted() {
    this.filteredData = [...this.data]
    this.pagination.totalRows = this.filteredData.length
    this.pagination.itemsPerPageOptions = generateItemsPerPageOptions(
      this.pagination.itemsPerPage
    )
  },
  methods: {
    searchTitle: debounce(function (value) {
      if (value.length > 2) {
        this.filteredData = this.data.filter(item =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      } else if (value.length === 0) {
        this.filteredData = [...this.data]
      }
      this.pagination.totalRows = this.filteredData.length
      this.pagination.currentPage = 1
    }, 500),
    onSearch(value) {
      this.searchTitle(value)
    },
    pageChange(value) {
      this.pagination.currentPage = value
    },
    perPageChange(value) {
      if (value) {
        this.pagination.itemsPerPage = value
      }
      this.pagination.currentPage = 1
    },
    sortChange(value) {
      const key = Object.keys(value)[0]
      if (key && value[key] !== 'no-sort') {
        this.sortType = value[key]
        this.sortBy = key === 'status' ? 'status' : key
      } else {
        this.sortType = 'desc'
        this.sortBy = 'date'
      }
    },
    openModalDetailAddress(item) {
      const { name, email } = item
      this.dataUser.name = name || '-'
      this.dataUser.email = email || '-'
      this.showDetailAddress = true
      this.isLoadingDetailData = true

      // Simulate API call with setTimeout
      setTimeout(() => {
        this.detailData = {
          dataKtp: item.dataKtp,
          dataDomicile: {
            address: item.address,
            city: item.city?.name,
            district: item.district?.name,
            village: item.village?.name,
            subVillage: item.subVillage?.name,
            rtRw: item.rtRw?.name,
          },
        }
        this.isLoadingDetailData = false
      }, 500)
    },
    onClickDocument(fileId) {
      this.showDocument = true
      this.informationDialog.file = 'loading'

      // Simulate document loading
      setTimeout(() => {
        this.informationDialog.file = 'https://via.placeholder.com/600x800/CCCCCC/000000?text=SK+RT+Document'
        this.informationDialog.mimeType = 'image/png'
      }, 500)
    },
    goToDetail(id) {
      this.$router.push({
        path: `/klaim-rt/detail/${id}`,
      })
    },
    showVerifyPopupHandle(item) {
      this.dataUser = {
        id: item.id,
        name: item.name,
        email: item.email,
      }
      this.showPopupVerifyConfirmation = true
    },
    rejectUser(item) {
      this.dataUser = {
        id: item.id,
        name: item.name,
        email: item.email,
      }
      this.showRejectRt = true
    },
    actionVerifyUser() {
      this.showPopupVerifyConfirmation = false

      // Simulate API call
      setTimeout(() => {
        // Update status in mock data
        const index = this.data.findIndex(item => item.id === this.dataUser.id)
        if (index !== -1) {
          this.data[index].rtStatus = 'Terverifikasi'
          this.filteredData = [...this.data]
        }

        this.informationDialog = {
          show: true,
          title: 'Verifikasi Akun RT',
          info: 'Verifikasi akun RT telah berhasil dilakukan.',
          message: 'Email terkait informasi verifikasi telah dikirimkan ke email akun RT bersangkutan.',
          file: '',
          mimeType: ''
        }
      }, 500)
    },
    actionRejectUser(reason) {
      this.showRejectRt = false

      // Simulate API call
      setTimeout(() => {
        // Update status in mock data
        const index = this.data.findIndex(item => item.id === this.dataUser.id)
        if (index !== -1) {
          this.data[index].rtStatus = 'Ditolak'
          this.filteredData = [...this.data]
        }

        this.informationDialog = {
          show: true,
          title: 'Penolakan Akun RT',
          info: 'Penolakan akun RT telah berhasil dilakukan.',
          message: 'Email terkait informasi penolakan telah dikirimkan ke email akun RT bersangkutan.',
          file: '',
          mimeType: ''
        }
      }, 500)
    },
    onClosePopupInfo() {
      this.informationDialog = {
        show: false,
        title: '',
        info: '',
        message: '',
        file: '',
        mimeType: ''
      }
      this.showPopupVerifyConfirmation = false
    },
  },
}
</script>

<style scoped>
.jds-data-table:deep {
  border-spacing: 1px !important;
  @apply !bg-[#EDEFF3];
}

.jds-data-table:deep tr th {
  @apply min-w-[170px] border-r border-white;
}

.jds-data-table:deep tr td {
  @apply min-w-[170px] border-r border-gray-200;
}
</style>
