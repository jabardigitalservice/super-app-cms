<template>
  <div>
    <BaseDialog :show-popup="isShowPopupFollowup">
      <BaseDialogPanel class="max-h-[750px] w-[600px]">
        <BaseDialogHeader :title="dataDialog.title" />
        <div class="form-followup-ikp max-h-[630px] overflow-y-auto px-6 pt-2">
          <BaseDialogDescription
            description="No.Aduan"
            :sub-description="dataDialog.subDescription"
            class="mb-3"
          />
          <div class="mb-6">
            <label class="mb-1 text-sm">Narasi IKP</label>
            <p class="text-sm">
              {{ dataDialog.proposed_ikp_narrative }}
            </p>
          </div>
          <div class="mb-3">
            <label class="mb-1 text-[15px]">Pencarian</label>
            <jds-search
              v-model="search"
              placeholder="Masukkan ID atau narasi IKP"
              :icon="false"
              button
              small
            />
          </div>
          <div
            class="mb-3 flex items-center justify-between rounded-lg border border-gray-300 py-2 px-3"
          >
            <AlertInformation
              message="Jika tidak menemukan IKP, Anda dapat menambahkan IKP baru."
            />
            <jds-button
              label="Buat IKP Baru"
              variant="secondary"
              class="!h-[38px] !w-[120px] !px-0 !py-0 !text-[14px] font-bold"
              @click="showPopupCreateIkp()"
            />
          </div>
          <!-- Show no data found when user searching data IKP -->
          <div
            v-if="listIkp.length === 0 && search.length > 0 && !isFollowup"
            class="mb-6 flex flex-col items-center rounded-lg bg-gray-50 py-[10px] text-gray-900"
          >
            <div
              class="mb-1 flex h-20 w-20 items-center justify-center rounded-full bg-white"
            >
              <img
                src="~/assets/icon/data-not-found.svg"
                alt="data-not-found"
                width="80"
                height="80"
              >
            </div>
            <h1 class="text-sm font-bold">
              Tidak dapat menemukan IKP
            </h1>
            <p class="text-sm">
              Cobalah menggunakan id atau narasi yang berbeda.
            </p>
          </div>
          <!-- data IKP -->
          <div
            v-if="!isFollowup && listIkp.length > 0"
            class="mb-6 rounded-lg border border-gray-200"
          >
            <jds-simple-table>
              <thead>
                <tr class="66">
                  <th class="rounded-tl-lg !bg-green-600">
                    ID IKP
                  </th>
                  <th colspan="3" class="rounded-tr-lg !bg-green-600">
                    Narasi IKP
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(itemIkp, index) in listIkp" :key="index">
                  <td
                    :class="{ 'rounded-bl-lg': index === listIkp.length - 1 }"
                  >
                    <strong>{{ itemIkp.ikp_code }}</strong>
                  </td>
                  <td width="280">
                    <p class="w-[280px] truncate">
                      {{ itemIkp.narrative }}
                    </p>
                  </td>
                  <td width="73">
                    <BaseTableAction
                      :list-menu-pop-over="listMenuTableAction"
                      @detail-narrative="showPopupIkpNarrative(itemIkp)"
                    />
                  </td>
                  <td
                    width="63"
                    :class="{ 'rounded-br-lg': index === listIkp.length - 1 }"
                  >
                    <jds-button
                      label="Pilih"
                      variant="primary"
                      class="!h-[30px] !w-[51px] !px-0 !py-0 !text-[14px] font-bold"
                      @click="chooseDataFollowupProcess(itemIkp)"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="4" class="bg-gray-50 !p-0">
                    <Pagination
                      :pagination="pagination"
                      @next-page="nextPage()"
                      @previous-page="previousPage()"
                      @per-page-change="pageChanges"
                    />
                  </td>
                </tr>
              </tfoot>
            </jds-simple-table>
          </div>
          <!-- show list followup process when choose IKP want to followup -->
          <ListFollowupProcess
            v-if="isFollowup"
            :data-ikp="dataIkp"
            :list-menu-table-action="listMenuTableAction"
            @detail-narrative="showPopupIkpNarrative"
            @close="cancelFollowupProcess()"
          />
        </div>
        <BaseDialogFooter
          :show-cancel-button="true"
          label-button-submit="Tindaklanjuti Aduan"
          :is-disabled-button-submit="!isFollowup"
          @close="closePopupFollowupComplaint()"
          @submit="showPopupConfirmationFollowupComplaint()"
        />
      </BaseDialogPanel>
    </BaseDialog>
    <DialogConfirmation
      :data-dialog="dataDialogConfirmation"
      :show-popup="isShowPopupConfirmationFollowup"
      @close="isShowPopupConfirmationFollowup = false"
      @submit="submitDataFollowupComplaint()"
    />
    <DialogIkpNarrative
      :show-popup="isShowPopupIkpNarrative"
      :data-ikp="dataIkp"
      @close="isShowPopupIkpNarrative = false"
    />
    <DialogCreateIkp />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapGetters } from 'vuex'
import AlertInformation from '~/components/Aduan/Alert/Information'
import ListFollowupProcess from '~/components/Aduan/Dialog/FollowupComplaint/ListFollowupProcess'
import DialogIkpNarrative from '~/components/Aduan/Dialog/IkpNarrative'
import DialogCreateIkp from '~/components/Aduan/Dialog/CreateIkp'
import Pagination from '~/components/Aduan/Dialog/FollowupComplaint/Pagination'

export default {
  name: 'DialogFollowupComplaint',
  components: {
    AlertInformation,
    ListFollowupProcess,
    DialogIkpNarrative,
    DialogCreateIkp,
    Pagination
  },
  props: {
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      query: {
        search: null,
        limit: 5,
        page: 1
      },
      listDataIkp: [],
      search: '',
      dataDialogConfirmation: {},
      isShowPopupConfirmationFollowup: false,
      listMenuTableAction: [
        { menu: 'Lihat Narasi IKP', value: 'detail-narrative' }
      ],
      isShowPopupIkpNarrative: false,
      pagination: {
        currentPage: '',
        totalRows: '',
        itemsPerPage: '',
        totalPages: ''
      }
    }
  },
  async fetch () {
    try {
      this.setQuery({ sort_by: 'ikp_code', sort_type: 'ASC' })
      const responseIkp = await this.$axios.get('/warga/ikp', {
        params: { ...this.query, is_admin: 1 }
      })
      this.listDataIkp = responseIkp.data.data.data
      const pagination = responseIkp.data.data
      this.setPagination({
        currentPage: pagination?.page || 1,
        totalRows: pagination?.total_data || 0,
        itemsPerPage: pagination?.page_size || this.query.limit,
        totalPages: pagination?.total_pages || 0
      })
    } catch {
      this.listIkp = []
    }
  },
  computed: {
    ...mapGetters('followup-complaint', {
      isShowPopupFollowup: 'getIsShowPopup',
      isFollowup: 'getIsFollowup',
      dataIkp: 'getDataIkp'
    }),
    listIkp () {
      return this.listDataIkp.map((dataIkp) => {
        return { ...dataIkp, code: dataIkp.ikp_code }
      })
    }
  },
  watch: {
    search: debounce(function (value) {
      this.setQuery({ page: '' })
      if (value.length > 2 || value.length === 0) {
        this.query.search = value.length > 2 ? value : null
        this.$fetch()
      }
    }, 500)
  },
  methods: {
    backToFormIkp () {
      this.isShowPopupCreateIkp = true
    },
    chooseDataFollowupProcess (dataIkp) {
      this.$store.commit('followup-complaint/setDataIkp', dataIkp)
      this.$store.commit('followup-complaint/setIsFollowup', true)
    },
    cancelFollowupProcess () {
      this.$store.commit('followup-complaint/setIsFollowup', false)
    },
    closePopupFollowupComplaint () {
      this.$store.commit('followup-complaint/setIsFollowup', false)
      this.$store.commit('followup-complaint/setIsShowPopup', false)
    },
    nextPage () {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        this.setQuery({ page: this.pagination.currentPage + 1 })
        this.$fetch()
      }
    },
    previousPage () {
      if (this.pagination.currentPage > 1) {
        this.setQuery({ page: this.pagination.currentPage - 1 })
        this.$fetch()
      }
    },
    pageChanges (value) {
      this.pagination.currentPage = value
      this.setQuery({ page: value })
      this.$fetch()
    },
    showPopupConfirmationFollowupComplaint () {
      this.$store.commit('followup-complaint/setIsShowPopup', false)
      this.dataDialogConfirmation = {
        title: 'Tindaklanjuti Aduan',
        description: 'Apakah Anda yakin ingin menindaklanjuti aduan tersebut?',
        labelButtonSubmit: 'Tindaklanjuti Aduan'
      }
      this.isShowPopupConfirmationFollowup = true
    },
    showPopupIkpNarrative (dataIkp) {
      this.$store.commit('followup-complaint/setDataIkp', dataIkp)
      this.isShowPopupIkpNarrative = true
    },
    showPopupCreateIkp () {
      this.$store.commit('followup-complaint/setIsShowPopup', false)
      this.$store.commit(
        'create-ikp/setIkpNarrative',
        this.dataDialog.proposed_ikp_narrative
      )
      this.$store.dispatch('create-ikp/checkTruncate')
      this.$store.commit('create-ikp/setIsShowPopup', true)
    },
    submitDataFollowupComplaint () {
      this.isShowPopupConfirmationFollowup = false
      this.$emit('submit', this.dataIkp)
      this.$store.commit('followup-complaint/setIsFollowup', false)
    },
    setPagination (newPagination) {
      this.pagination = { ...this.pagination, ...newPagination }
    },
    setQuery (newQuery) {
      this.query = { ...this.query, ...newQuery }
    }
  }
}
</script>

<style>
.form-followup-ikp .jds-search {
  @apply !bg-gray-50;
}

.form-followup-ikp .jds-search__button--small {
  @apply !border-0 !bg-transparent;
}

.form-followup-ikp .jds-search__button--small .jds-icon__svg {
  @apply !h-4 !w-4 !fill-[#16A75C];
}

.form-followup-ikp::-webkit-scrollbar {
  @apply h-5 w-5;
}

.form-followup-ikp::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.form-followup-ikp::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
