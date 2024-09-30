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
      <div v-if="idTab === 'all'" class="flex">
        <div
          v-for="(button, index) in listButton"
          v-show="
            button?.complaintStatus === detailComplaint?.complaint_status_id
          "
          :key="index"
        >
          <div :class="{ 'mr-3': listButton.length > 1 }">
            <jds-button
              :label="button.label"
              :variant="button.variant"
              class="!font-bold"
              :class="button.classButton"
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
            :type-aduan-page="typeAduanPage"
            @button-image="isShowPopupViewImage = true"
          />
          <AduanDaftarIKPTableDetail
            v-else-if="idTab === 'instruksi-aduan'"
            :show-daftar-aduan="
              typeAduanPage === typeAduan.instruksiKewenanganNonPemprov.props
            "
            :ikp-type-page="typeAduanPage"
            detail-complaint-link="/aduan/instruksi-kewenangan-non-pemprov/detail"
            :ikp-code="ikpCode"
            @select-tab="selectedTab"
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
import {
  ENDPOINT_ADUAN,
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
  },
  mixins: [popupAduanMasuk],
  props: {
    typeAduanPage: {
      type: String,
      default: '',
    },
    listButton: {
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
        },
        {
          id: 'instruksi-aduan',
          name: 'Detail Instruksi Aduan',
          icon: '/icon/icon-aduan/instruction-detail.svg',
        },
      ],
      detailComplaint: {},
      idTab: '',
      listPhoto: [],
      isShowPopupViewImage: false,
      isShowPopupDetailStatusComplaint: false,
      ikpCode: '',
      typeAduan,
    }
  },
  async fetch() {
    try {
      const endpoint =
        this.typeAduan.instruksiKewenanganNonPemprov.props ===
        this.typeAduanPage
          ? ENDPOINT_ADUAN_NON_PEMPROV
          : ENDPOINT_ADUAN
      const response = await this.$axios.get(
        `${endpoint}/${this.$route.params.id}`
      )
      const dataDetailComplaint = response.data.data
      dataDetailComplaint.complaint_status =
        complaintStatus[dataDetailComplaint?.complaint_status_id]
      if (typeAduan.aduanDialihkanSpanLapor.id === this.typeAduanPage) {
        dataDetailComplaint.complaint_status_id = !dataDetailComplaint.sp4n_id
          ? 'no-id-span'
          : dataDetailComplaint.complaint_status_id
      }
      this.detailComplaint = {
        ...dataDetailComplaint,
        created_at_api: dataDetailComplaint?.created_at,
        created_at_format:
          dataDetailComplaint?.created_at &&
          formatDate(dataDetailComplaint?.created_at, 'dd/MM/yyyy - HH:mm'),
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
        complaint_source:
          dataDetailComplaint.complaint_source === 'sp4n'
            ? 'SP4N Lapor'
            : dataDetailComplaint.complaint_source,
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
      return this.listDataTab.filter((item) =>
        this.checkShowTabIkp() ? item : item.id !== 'instruksi-aduan'
      )
    },
  },
  mounted() {
    this.selectedTab('all')
  },
  methods: {
    selectedTab(idTab) {
      this.idTab = idTab
      const indexTab = this.listDataTab.findIndex(
        (dataTab) => dataTab.id === idTab
      )
      this.$refs.tabBarDetail.selectedTabIndexHandle(indexTab)
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
        typeAduan.instruksiKewenanganPemprov.props === this.typeAduanPage ||
        typeAduan.instruksiKewenanganNonPemprov.props === this.typeAduanPage
      )
    },
    clickButtonConfirmationHandle(idButton) {
      switch (idButton) {
        case complaintButtonDetail.verified.idButton:
          return this.showPopupConfirmationVerificationComplaintHandle(
            this.detailComplaint
          )
        case complaintButtonDetail.failed.idButton:
          return this.showPopupConfirmationFailedComplaintHandle(
            this.detailComplaint
          )
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
    goToBackHandle() {
      const { fromInstructionPage, ...newQuery } = this.$route.query
      this.$router.push({
        path:
          this.typeAduanPage ===
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
