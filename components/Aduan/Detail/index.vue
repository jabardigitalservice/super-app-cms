<template>
  <div>
    <div class="mt-4 mb-8 flex justify-between">
      <jds-button
        variant="secondary"
        class="!text-[14px] !font-bold"
        @click="goToBackHandle()"
      >
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <div
        v-if="
          typeAduanPage.props === typeAduan.aduanMasuk.props &&
          complaintStatus.unverified.id === detailComplaint.complaint_status_id
        "
        class="w-fit"
      >
        <BaseButtonDropdown
          label="Aksi"
          :list-menu-pop-over="listMenuPopover"
          @verified="
            showPopupConfirmationVerificationComplaintHandle(detailComplaint)
          "
          @failed="
            showPopupConfirmationComplaint(detailComplaint, 'failedComplaint')
          "
          @redirect-hotline-jabar="
            showPopupConfirmationComplaint(
              detailComplaint,
              'redirectHotlineComplaint'
            )
          "
        />
      </div>
      <div
        v-else-if="
          (idTab === 'all' &&
            typeAduanPage.props !== typeAduan.aduanMasuk.props) ||
          !detailComplaint.complaint_latest_status_id ===
            'not_yet_coordinated' ||
          !detailComplaint.complaint_latest_status_id === 'coordinated'
        "
        class="flex"
      >
        <div
          v-for="(button, index) in listButton"
          v-show="showButtonDetail(button)"
          :key="index"
        >
          <div :class="{ 'mr-3': listButton.length > 1 }">
            <jds-button
              :label="button?.label"
              :variant="button?.variant"
              class="!text-[14px] !font-bold"
              :class="button?.classButton"
              @click="clickButtonConfirmationHandle(button.idButton)"
            />
          </div>
        </div>
      </div>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarDetail
          ref="tabBarDetail"
          :list-tab="listTab"
          :is-load="loading"
          @button-tab="selectedTab"
        />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-[calc(100vh-280px)] overflow-y-auto py-4 px-[19px]"
        >
          <TableComplaintDetail
            v-if="idTab === 'all'"
            :detail-complaint="detailComplaint"
            :list-photo="listPhotoComplaint"
            :type-aduan-page="typeAduanPage.props"
            :field-detail="fieldDetail"
            :is-load="loading"
            @button-image="isShowPopupViewImage = true"
          />
          <AduanDaftarIKPTableDetail
            v-else-if="idTab === 'instruksi-aduan'"
            :show-daftar-aduan="
              typeAduanPage.props ===
              typeAduan.instruksiKewenanganNonPemprov.props
            "
            :ikp-type-page="typeAduanPage.props"
            :detail-instruction="detailInstruction"
            detail-complaint-link="/aduan/instruksi-kewenangan-non-pemprov/detail"
            :ikp-code="ikpCode"
            @select-tab="selectedTab"
          />
          <AduanDetailTableEvidenceFollowup
            v-else-if="
              idTab === 'bukti-tindak-lanjut' && detailComplaint?.evidence
            "
            :is-load="loading"
            :evidence="detailComplaint?.evidence"
          />
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogViewImage
      :list-photo="listPhotoComplaint"
      :show-popup="isShowPopupViewImage"
      @close="isShowPopupViewImage = false"
    />
    <DialogFollowupHotlineJabar @close-all-modal="$fetch()" />
    <DialogEvidenceFollowupHotline @close-all-modal="$fetch()" />
    <DialogAddIdSpan
      v-if="isShowPopupInputIdSpan"
      :data-dialog="dataDialog"
      :name-modal="dataDialog.nameModal"
      @submit="submitInputIdSpanHandle"
    />
    <DialogConfirmation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogInformation
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInformation"
      :icon-popup="iconPopup"
      @close="closePopupInformationHandle()"
      @submit="submitRetryHandle"
    />
    <DialogInputTextArea
      :data-dialog="dataDialog"
      :show-popup="isShowPopupConfirmationFailedVerification"
      @close="closePopupHandle()"
      @submit="submitPopupComplaintHandle"
    />
    <DialogLoading :show-popup="isLoading" />
    <DialogProcessComplaint
      v-if="isShowPopupProcessComplaint"
      :data-dialog="dataDialog"
      :show-popup="isShowPopupProcessComplaint"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
      @back-to-form="isShowPopupProcessComplaint = true"
    />
    <DialogProcessComplaint
      v-if="isShowPopupChangeAuthority"
      :data-dialog="dataDialog"
      :show-popup="isShowPopupChangeAuthority"
      @close="closePopupHandle()"
      @submit="submitProcessComplaint"
    />
    <DialogFollowupComplaint
      v-if="isPopupFollowupComplaint"
      :data-dialog="dataDialog"
      :complaint-type="typeAduanPage.props"
      @submit="submitFollowupComplaint"
    />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import TableComplaintDetail from '~/components/Aduan/Detail/Table/Complaint'
import DialogEvidenceFollowupHotline from '~/components/Aduan/Dialog/EvidenceFollowupHotline'
import DialogFollowupComplaint from '~/components/Aduan/Dialog/FollowupComplaint'
import DialogFollowupHotlineJabar from '~/components/Aduan/Dialog/FollowupHotlineJabar'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import DialogAddIdSpan from '~/components/Aduan/Dialog/AddIdSpan'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import {
  complaintButtonDetail,
  complaintSource,
  complaintStatus,
  typeAduan,
  detailField,
} from '~/constant/aduan-masuk'
import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_HOTLINE_JABAR,
  ENDPOINT_ADUAN_NON_PEMPROV,
} from '~/constant/endpoint-api'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'
import { formatDate } from '~/utils'

export default {
  name: 'DetailAduan',
  components: {
    DialogViewImage,
    TabBarDetail,
    ArrowLeft,
    DialogProcessComplaint,
    TableComplaintDetail,
    DialogFollowupComplaint,
    DialogFollowupHotlineJabar,
    DialogEvidenceFollowupHotline,
    DialogAddIdSpan,
  },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: Object,
      default: () => ({}),
    },
    listButton: {
      type: Array,
      default: () => [],
    },
    listTabDetail: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      listDataTab: [
        {
          id: 'all',
          name: 'Detail Aduan',
          icon: '/icon/icon-aduan/complaint-detail.svg',
          complaintType: ['all'],
          complaintStatus: this.getTabDetailByComplaintStatus(),
        },
        {
          id: 'instruksi-aduan',
          name: 'Detail Instruksi Aduan',
          icon: '/icon/icon-aduan/instruction-detail.svg',
          complaintType: [
            typeAduan.instruksiKewenanganPemprov.props,
            typeAduan.instruksiKewenanganNonPemprov.props,
          ],
          complaintStatus: this.getTabDetailByComplaintStatus(),
        },
        {
          id: 'bukti-tindak-lanjut',
          name: 'Bukti Tindaklanjut',
          icon: '/icon/icon-aduan/evidence-followup.svg',
          complaintType: [typeAduan.aduanDialihkanHotlineJabar.props],
          complaintStatus: this.getTabDetailByComplaintStatus(),
        },
      ],
      listMenuPopover: [
        {
          menu: 'Terverifikasi',
          value: 'verified',
        },
        {
          menu: 'Gagal Diverifikasi',
          value: 'failed',
        },
        {
          menu: 'Dialihkan ke Hotline Jabar',
          value: 'redirect-hotline-jabar',
        },
      ],
      detailComplaint: {},
      idTab: '',
      listPhotoComplaint: [],
      isShowPopupViewImage: false,
      isShowPopupDetailStatusComplaint: false,
      isShowDropdown: false,
      ikpCode: '',
      typeAduan,
      complaintStatus,
      loading: false,
      fieldDetail: {},
    }
  },
  async fetch() {
    this.loading = true
    try {
      const endpoint = this.checkEndpointComplaint()
      const response = await this.$axios.get(
        `${endpoint}/${this.$route.params.id}`,
        {
          params: {
            phase: this.typeAduanPage.phase,
          },
        }
      )
      const dataDetailComplaint = response.data.data
      dataDetailComplaint.complaint_status =
        complaintStatus[dataDetailComplaint?.complaint_status_id]
      if (typeAduan.aduanDialihkanSpanLapor.id === this.typeAduanPage.props) {
        dataDetailComplaint.complaint_status_id = !dataDetailComplaint.sp4n_id
          ? 'no-id-span'
          : dataDetailComplaint.complaint_status_id
      }

      this.detailComplaint = {
        ...dataDetailComplaint,
        complaint_status_note:
          dataDetailComplaint.complaint_status_id ===
          complaintStatus.directed_to_hotline_jabar.id
            ? dataDetailComplaint.directed_to_hotline_jabar_note
            : dataDetailComplaint.complaint_status_note,
        created_at_api: dataDetailComplaint?.created_at,
        created_at_format:
          dataDetailComplaint?.created_at &&
          formatDate(dataDetailComplaint?.created_at, 'dd/MM/yyyy - HH:mm'),
        deadline_at_format:
          dataDetailComplaint?.deadline_date &&
          formatDate(dataDetailComplaint?.deadline_date, 'dd/MM/yyyy'),
        ikp_deadline_at_format:
          dataDetailComplaint?.ikp?.deadline_at &&
          formatDate(dataDetailComplaint?.ikp?.deadline_at, 'dd/MM/yyyy'),
        sp4n_created_at_format:
          dataDetailComplaint?.sp4n_created_at &&
          formatDate(dataDetailComplaint?.sp4n_created_at || '', 'dd/MM/yyyy'),
        sp4n_added_at_format:
          dataDetailComplaint?.sp4n_added_at &&
          formatDate(
            dataDetailComplaint?.sp4n_added_at || '',
            'dd/MM/yyyy - HH:mm'
          ),
      }

      if (
        this.detailComplaint.complaint_status_id ===
          complaintStatus.diverted_to_span.id &&
        this.typeAduanPage.props === typeAduan.aduanDialihkanSpanLapor.props
      ) {
        this.detailComplaint.complaint_status_id = !this.detailComplaint.sp4n_id
          ? 'no-id-span'
          : this.detailComplaint.complaint_status_id
      }

      this.ikpCode = dataDetailComplaint?.ikp_code

      this.listPhotoComplaint = dataDetailComplaint?.photos || []
      this.getFieldDetail()

      this.$store.commit(
        'create-instruction/dataComplaint',
        this.detailComplaint
      )
      this.$store.dispatch('create-ikp/getDetailInstruction', this.ikpCode)
    } catch {
      this.detailComplaint = {}
      this.listPhotoComplaint = []
    } finally {
      this.loading = false
    }
  },
  computed: {
    // to get type aduan which will show status aduan
    listTypeAduanStatusAduan() {
      const listTypeAduanStatusAduan = []
      Object.values(this.typeAduan).forEach((item) => {
        if (
          item.props !== this.typeAduan.aduanDialihkanSpanLapor.props &&
          item.props !== this.typeAduan.aduanDariSpanLapor.props
        ) {
          listTypeAduanStatusAduan.push(item.props)
        }
      })
      return listTypeAduanStatusAduan
    },
    listTab() {
      return this.listDataTab.filter(
        (item) =>
          item.complaintType.includes('all') ||
          (item.complaintType.includes(this.typeAduanPage.props) &&
            item.complaintStatus.includes(
              this.detailComplaint?.complaint_status_id
            ))
      )
    },
    detailInstruction() {
      return this.$store.state['create-ikp'].detailInstruction
    },
  },
  mounted() {
    this.selectedTab('all')
  },
  methods: {
    getFieldDetail() {
      const dataFieldDetail = {}
      Object.keys(detailField).forEach((keyField) => {
        const isCheckColumn = this.checkDetailColumn(keyField)
        if (isCheckColumn) {
          dataFieldDetail[keyField] = detailField[keyField]
          dataFieldDetail[keyField] = {
            ...dataFieldDetail[keyField],
            field: this.filterDetailField(keyField),
          }
        }
      })
      this.fieldDetail = dataFieldDetail
    },
    filterDetailField(keyField) {
      return detailField[keyField].field.filter((item) => {
        if (
          this.showIdSpanLaporHandle(item.key) ||
          this.detailComplaint.coverage_of_affairs ===
            'Pemerintah Kabupaten/Kota' ||
          this.showDocumentEvidence(item.key)
        ) {
          return (
            this.filteredDetailFieldByMenu(item) &&
            this.filteredDetailFieldByStatus(item)
          )
        }
        return (
          this.filteredDetailFieldByMenu(item) &&
          this.filteredDetailFieldByStatus(item) &&
          item.key !== 'sp4n_id' &&
          item.key !== 'opd_pemprov_name' &&
          item.key !== 'document_evidence'
        )
      })
    },
    checkDetailColumn(column) {
      if (this.showTrackingSpan()) {
        return (
          this.filteredDetailFieldByMenu(detailField[column]) &&
          this.filteredDetailFieldByStatus(detailField[column])
        )
      }
      return (
        this.filteredDetailFieldByMenu(detailField[column]) &&
        this.filteredDetailFieldByStatus(detailField[column]) &&
        detailField[column].title !== 'Status SP4N Lapor'
      )
    },
    filteredDetailFieldByMenu(detailField) {
      // check detail field By complaint feature / menu
      return (
        detailField.menu.includes('all') ||
        detailField.menu.includes(this.typeAduanPage.props)
      )
    },
    filteredDetailFieldByStatus(detailField) {
      // check detail field By complaint status
      return (
        detailField.complaintStatus.includes('all') ||
        detailField.complaintStatus.includes(
          this.detailComplaint?.complaint_status_id
        )
      )
    },
    showDocumentEvidence(keyField) {
      return (
        this.detailComplaint.ikp?.evidence && keyField === 'document_evidence'
      )
    },
    showIdSpanLaporHandle(fieldKey) {
      if (this.typeAduanPage.props === typeAduan.penentuanKewenangan.props) {
        const complaintSource =
          this.detailComplaint.complaint_source?.id === 'sp4n'
        const complaintStatus =
          this.detailComplaint.complaint_status_id ===
            this.complaintStatus.coordinated.id ||
          this.detailComplaint.complaint_status_id ===
            this.complaintStatus.verified.id
        return complaintSource && complaintStatus && fieldKey === 'sp4n_id'
      }

      if (
        this.typeAduanPage.props === typeAduan.aduanDialihkanSpanLapor.props
      ) {
        return fieldKey === 'sp4n_id'
      }
      return false
    },
    showTrackingSpan() {
      return (
        this.typeAduanPage.props === typeAduan.aduanDialihkanSpanLapor.props &&
        this.detailComplaint?.sp4n_id
      )
    },
    getTabDetailByComplaintStatus() {
      switch (this.typeAduanPage.props) {
        case typeAduan.instruksiKewenanganPemprov.props:
          return [
            complaintStatus.finished.id,
            complaintStatus.postponed.id,
            complaintStatus.review.id,
            complaintStatus.followup.id,
          ]
        case typeAduan.instruksiKewenanganNonPemprov.props:
          return [
            complaintStatus.coordinated.id,
            complaintStatus.not_yet_coordinated.id,
          ]
        case typeAduan.aduanDialihkanHotlineJabar.props:
          return [complaintStatus.finished.id]
        default:
          return ['all']
      }
    },
    getComplaintSource(dataComplaint) {
      if (dataComplaint.complaint_source === 'sp4n') {
        return complaintSource.span
      }
      return complaintSource[dataComplaint.complaint_source]
    },
    selectedTab(idTab) {
      this.idTab = idTab
      const indexTab = this.listDataTab.findIndex(
        (dataTab) => dataTab.id === idTab
      )
      this.$refs.tabBarDetail.selectedTabIndexHandle(indexTab)
    },
    checkEndpointComplaint() {
      switch (this.typeAduanPage.props) {
        case typeAduan.aduanDialihkanHotlineJabar.props:
          return ENDPOINT_ADUAN_HOTLINE_JABAR
        case typeAduan.instruksiKewenanganNonPemprov.props:
        case typeAduan.instruksiNonPemprov.props:
          return ENDPOINT_ADUAN_NON_PEMPROV
        default:
          return ENDPOINT_ADUAN
      }
    },
    checkShowTabIkp() {
      return (
        this.checkTypePageForTab() &&
        this.detailComplaint.ikp_code &&
        !Object.keys(this.$route.query).find(
          (item) => item === 'fromInstructionPage'
        )
      )
    },
    checkTypePageForTab() {
      return (
        typeAduan.instruksiKewenanganPemprov.props ===
          this.typeAduanPage.props ||
        typeAduan.instruksiKewenanganNonPemprov.props ===
          this.typeAduanPage.props
      )
    },
    clickButtonConfirmationHandle(idButton) {
      switch (idButton) {
        case complaintButtonDetail.followupHotlineJabar.idButton:
          return this.showPopupFollowupHotlineJabar()
        case complaintButtonDetail.evidenceFollowupHotlineJabar.idButton:
          return this.showPopupEvidenceFollowupHotlineJabar()
        case complaintButtonDetail.addIdSpan.idButton:
          return this.showPopupInputIdSpanHandle(
            this.detailComplaint,
            'formAddIdSpan'
          )
        case complaintButtonDetail.editIdSpan.idButton:
          this.detailComplaint.sp4n_created_at =
            this.detailComplaint.sp4n_created_at_format
          return this.showPopupInputIdSpanHandle(
            this.detailComplaint,
            'formEditIdSpan'
          )
        case complaintButtonDetail.complaintProcess.idButton:
          return this.showPopupProcessComplaintHandle(this.detailComplaint)
        case complaintButtonDetail.followup.idButton:
          return this.showPopupFollowupComplaint(
            this.detailComplaint,
            'followupComplaint'
          )
        case complaintButtonDetail.createInstruction.idButton:
          return this.showPopupFollowupComplaint(
            this.detailComplaint,
            'createInstruction'
          )
      }
    },
    showButtonDetail(button) {
      if (button.idButton === 'button-edit-id-span') {
        return (
          this.detailComplaint.complaint_latest_status_id !==
            complaintStatus.not_yet_coordinated.id &&
          this.detailComplaint.complaint_latest_status_id !==
            'coordinated_nonpemprov' &&
          !!this.detailComplaint.sp4n_id
        )
      }

      return (
        button?.complaintStatus === this.detailComplaint?.complaint_status_id
      )
    },
    showViewPhotoDialogHandle(url) {
      this.photo.showPopup = true
      this.photo.url = 'loading'
      this.photo.url = url
    },

    showPopupFollowupHotlineJabar() {
      this.$store.dispatch('popup-complaint/showPopupFollowupHotlineJabar', {
        dataComplaint: this.detailComplaint,
        dialogName: 'followupHotlineJabar',
      })
    },
    showPopupEvidenceFollowupHotlineJabar() {
      this.$store.commit(
        'popup-complaint/setDataComplaint',
        this.detailComplaint
      )
      this.$store.commit('modals/OPEN', 'evidenceFollowupHotline')
    },
    goToBackHandle() {
      const { fromInstructionPage, ...newQuery } = this.$route.query
      this.$router.push({
        path:
          this.typeAduanPage.props ===
          this.typeAduan.instruksiKewenanganNonPemprov.props
            ? '/aduan/instruksi-kewenangan-non-pemprov'
            : this.$nuxt.context.from.path,
        query: newQuery,
      })
      this.$store.commit('setBackPage', true) // for control old query on page list
    },
  },
}
</script>

<style scoped>
.layout-content {
  scrollbar-color: #e0e0e0 white;
  scrollbar-width: thin;
  scroll-margin-right: 10px;
}

.layout-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.layout-content::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.layout-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}

.table-content tr td {
  @apply px-[8px] pt-[10px] pb-[9px] !important;
}
</style>
