<template>
  <div>
    <BaseDialog :show-popup="showPopup">
      <BaseDialogPanel class="max-h-[626px] w-[600px]">
        <BaseDialogHeader :title="dataDialog.title" />
        <div class="form-followup-ikp max-h-[506px] overflow-y-auto px-6 pt-2">
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
                <tr>
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
                  <td>{{ itemIkp.narrative }}</td>
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
    <DialogCreateIkp
      :show-popup="isShowPopupCreateIkp"
      @back-form-followup="closePopupCreateIkp()"
      @close-all-popup="closeAllPopup()"
      @close-popup-info="handleClosePopupInformation"
      @back-form-ikp="backToFormIkp()"
    />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import AlertInformation from '~/components/Aduan/Alert/Information'
import ListFollowupProcess from '~/components/Aduan/Dialog/FollowupComplaint/ListFollowupProcess'
import DialogIkpNarrative from '~/components/Aduan/Dialog/IkpNarrative'
import DialogCreateIkp from '~/components/Aduan/Dialog/CreateIkp'

export default {
  name: 'DialogFollowupComplaint',
  components: {
    AlertInformation,
    ListFollowupProcess,
    DialogIkpNarrative,
    DialogCreateIkp
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    dataDialog: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      query: {
        search: null,
        limit: 3,
        page: 1
      },
      listIkp: [],
      isFollowup: false,
      search: '',
      dataIkp: {},
      dataDialogConfirmation: {},
      isShowPopupConfirmationFollowup: false,
      listMenuTableAction: [
        { menu: 'Lihat Narasi IKP', value: 'detail-narrative' }
      ],
      isShowPopupIkpNarrative: false,
      isShowPopupCreateIkp: false
    }
  },
  async fetch () {
    try {
      const responseIkp = await this.$axios.get('/warga/ikp', {
        params: { ...this.query, is_admin: 1 }
      })
      this.listIkp = responseIkp.data.data.data
    } catch {
      this.listIkp = []
    }
  },
  watch: {
    search: debounce(function (value) {
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
      this.dataIkp = dataIkp
      this.isFollowup = true
    },
    cancelFollowupProcess () {
      this.isFollowup = false
    },
    closePopupFollowupComplaint () {
      this.isFollowup = false
      this.$emit('close')
    },
    closePopupCreateIkp () {
      this.isShowPopupCreateIkp = false
      this.$emit('open')
    },
    closeAllPopup () {
      this.isShowPopupCreateIkp = false
      this.$emit('close')
    },
    handleClosePopupInformation (valueIkp) {
      this.dataIkp = valueIkp
      if (Object.keys(this.dataIkp).length > 0) {
        this.isFollowup = true
      }
      this.$emit('open')
    },
    showPopupConfirmationFollowupComplaint () {
      this.$emit('close')
      this.dataDialogConfirmation = {
        title: 'Tindaklanjuti Aduan',
        description: 'Apakah Anda yakin ingin menindaklanjuti aduan tersebut?',
        labelButtonSubmit: 'Tindaklanjuti Aduan'
      }
      this.isShowPopupConfirmationFollowup = true
    },
    showPopupIkpNarrative (dataIkp) {
      this.dataIkp = dataIkp
      this.isShowPopupIkpNarrative = true
    },
    showPopupCreateIkp () {
      this.$emit('close')
      this.$store.commit('edit-ikp-narrative/setDataIkpNarrative', this.dataDialog.proposed_ikp_narrative)
      this.isShowPopupCreateIkp = true
    },
    submitDataFollowupComplaint () {
      this.isShowPopupConfirmationFollowup = false
      this.$emit('submit', this.dataIkp)
      this.isFollowup = false
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
</style>
