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
          idTab === 'all' && typeAduanPage.props !== typeAduan.aduanMasuk.props
        "
        class="flex"
      >
        <div
          v-for="(button, index) in listButton"
          v-show="
            button?.complaintStatus === detailComplaint?.complaint_status_id
          "
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
            :list-photo="listPhoto"
            :type-aduan-page="typeAduanPage.props"
            @button-image="isShowPopupViewImage = true"
          />
          <AduanDaftarIKPTableDetail
            v-else-if="idTab === 'instruksi-aduan'"
            :show-daftar-aduan="
              typeAduanPage.props ===
              typeAduan.instruksiKewenanganNonPemprov.props
            "
            :ikp-type-page="typeAduanPage.props"
            detail-complaint-link="/aduan/instruksi-kewenangan-non-pemprov/detail"
            :ikp-code="ikpCode"
            @select-tab="selectedTab"
          />
          <AduanDetailTableEvidenceFollowup
            v-else-if="idTab === 'bukti-tindak-lanjut'"
            :list-photo="detailComplaint?.evidence?.photos"
            :list-file="detailComplaint?.evidence?.files"
            :detail-complaint="detailComplaint"
          />
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogViewImage
      :list-photo="listPhoto"
      :show-popup="isShowPopupViewImage"
      @close="isShowPopupViewImage = false"
    />
    <DialogTrackingSpanLapor
      :show-popup="isShowPopupDetailStatusComplaint"
      :data-dialog="dataDialog"
      @close="isShowPopupDetailStatusComplaint = false"
    />
    <DialogFollowupHotlineJabar />
    <DialogEvidenceFollowupHotline />
    <DialogInputText
      :data-dialog="dataDialog"
      :show-popup="isShowPopupInputIdSpan"
      @close="closePopupHandle()"
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
      :data-dialog="dataDialog"
      :show-popup="isShowPopupProcessComplaint"
      @close="isShowPopupProcessComplaint = false"
    />
    <DialogFollowupComplaint
      :data-dialog="dataDialog"
      @submit="submitFollowupComplaint"
    />
  </div>
</template>

<script>
import {
  complaintStatus,
  typeAduan,
  complaintButtonDetail,
  complaintSource,
} from '~/constant/aduan-masuk'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DialogViewImage from '~/components/Aduan/DialogViewImage'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'
import DialogTrackingSpanLapor from '~/components/Aduan/Dialog/TrackingSpanLapor'
import TableComplaintDetail from '~/components/Aduan/Detail/Table/Complaint'
import { formatDate } from '~/utils'
import DialogProcessComplaint from '~/components/Aduan/Dialog/ProcessComplaint'
import DialogFollowupComplaint from '~/components/Aduan/Dialog/FollowupComplaint'
import DialogFollowupHotlineJabar from '~/components/Aduan/Dialog/FollowupHotlineJabar'
import DialogEvidenceFollowupHotline from '~/components/Aduan/Dialog/EvidenceFollowupHotline'
import {
  ENDPOINT_ADUAN,
  ENDPOINT_ADUAN_HOTLINE_JABAR,
  ENDPOINT_ADUAN_NON_PEMPROV,
} from '~/constant/endpoint-api'

export default {
  name: 'DetailAduan',
  components: {
    DialogViewImage,
    TabBarDetail,
    DialogTrackingSpanLapor,
    ArrowLeft,
    DialogProcessComplaint,
    TableComplaintDetail,
    DialogFollowupComplaint,
    DialogFollowupHotlineJabar,
    DialogEvidenceFollowupHotline,
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
          complaintStatus: ['all'],
        },
        {
          id: 'instruksi-aduan',
          name: 'Detail Instruksi Aduan',
          icon: '/icon/icon-aduan/instruction-detail.svg',
          complaintType: [
            typeAduan.instruksiKewenanganPemprov.props,
            typeAduan.instruksiKewenanganNonPemprov.props,
          ],
          complaintStatus: [
            complaintStatus.followup.id,
            complaintStatus.finished.id,
            complaintStatus.postponed.id,
            complaintStatus.review.id,
            complaintStatus.not_yet_coordinated.id,
            complaintStatus.coordinated.id,
          ],
        },
        {
          id: 'bukti-tindak-lanjut',
          name: 'Bukti Tindaklanjut',
          icon: '/icon/icon-aduan/complaint-detail.svg',
          complaintType: [typeAduan.aduanDialihkanHotlineJabar.props],
          complaintStatus: [complaintStatus.finished.id],
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
      listPhoto: [],
      isShowPopupViewImage: false,
      isShowPopupDetailStatusComplaint: false,
      isShowDropdown: false,
      ikpCode: '',
      typeAduan,
      complaintStatus,
    }
  },
  async fetch() {
    try {
      const endpoint = this.checkEndpointComplaint()
      const response = await this.$axios.get(
        `${endpoint}/${this.$route.params.id}`
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
          formatDate(dataDetailComplaint?.deadline_date, 'dd/MM/yyyy - HH:mm'),
        sp4n_created_at:
          dataDetailComplaint?.sp4n_created_at &&
          formatDate(
            dataDetailComplaint?.sp4n_created_at || '',
            'dd/MM/yyyy - HH:mm'
          ),
        sp4n_added_at:
          dataDetailComplaint?.sp4n_added_at &&
          formatDate(
            dataDetailComplaint?.sp4n_added_at || '',
            'dd/MM/yyyy - HH:mm'
          ),
        complaint_source: dataDetailComplaint?.complaint_source
          ? this.getComplaintSource(dataDetailComplaint)
          : '',
      }

      this.ikpCode = dataDetailComplaint?.ikp_code

      this.listPhoto = dataDetailComplaint?.photos || []
    } catch {
      this.detailComplaint = {}
      this.listPhoto = []
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
      console.log(this.detailComplaint)
      return this.listDataTab.filter(
        (item) =>
          item.complaintType.includes('all') ||
          (item.complaintType.includes(this.typeAduanPage.props) &&
            item.complaintStatus.includes(
              this.detailComplaint?.complaint_status_id
            ))
      )
    },
  },
  mounted() {
    this.selectedTab('all')
  },
  methods: {
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
          return this.$store.commit('modals/OPEN', 'evidenceFollowupHotline')
        case complaintButtonDetail.addIdSpan.idButton:
          return this.showPopupInputIdSpanHandle(this.detailComplaint)
        case complaintButtonDetail.complaintProcess.idButton:
          return this.showPopupProcessComplaintHandle(this.detailComplaint)
        case complaintButtonDetail.followup.idButton:
          return this.showPopupFollowupComplaint(this.detailComplaint)
      }
    },
    showViewPhotoDialogHandle(url) {
      this.photo.showPopup = true
      this.photo.url = 'loading'
      this.photo.url = url
    },
    showPopupDetailStatusComplaintHandle(detailComplaint) {
      this.isShowPopupDetailStatusComplaint = true
      this.dataDialog = {
        subDescription: detailComplaint.complaint_id,
      }
    },
    showPopupFollowupHotlineJabar() {
      this.$store.dispatch('popup-complaint/showPopupFollowupHotlineJabar', {
        dataComplaint: this.detailComplaint,
        dialogName: 'followupHotlineJabar',
      })
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
