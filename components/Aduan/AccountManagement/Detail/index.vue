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
      <div class="flex">
        <div v-for="button in listButton" :key="button.id" class="ml-3">
          <jds-button
            v-show="button.status === dataDetail.status?.code"
            :variant="button.variant"
            :label="button.label"
            class="!text-[14px] !font-bold"
            @click="showPopupConfirmation(button.id, button.httpMethod)"
          />
        </div>
      </div>
    </div>
    <BaseTabGroup>
      <template #tab-list>
        <TabBarDetail :list-tab="listDataTab" />
      </template>
      <template #tab-panel>
        <BaseTabPanel
          class="layout-content h-fit overflow-y-auto py-4 px-[19px]"
        >
          <DetailTableAccount :data-detail="dataDetail" />
        </BaseTabPanel>
      </template>
    </BaseTabGroup>
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog"
      :detail-item-modal="detailItem"
      :path="apiPath"
      :http-method="httpMethod"
      @success="showPopupInformation"
      @error="showPopupInformation"
    />
    <DialogInformationNew
      :name-modal="informationDialog.nameModal"
      :dialog-modal="informationDialog"
      :detail-item-modal="detailItem"
      :is-success="isSuccessInformation"
      @close-all-modal="refreshPage"
    >
      <template #button-error>
        <jds-button
          :label="informationDialog?.button?.label"
          type="button"
          :variant="informationDialog?.button?.variant"
          class="!text-[14px] !font-bold"
          @click="backToPopupConfirmation"
        />
      </template>
    </DialogInformationNew>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableAccount from '~/components/Aduan/AccountManagement/Detail/TableDetail'
import { managementAccountComplaintStatus } from '~/constant/management-user'

export default {
  name: 'PageDetailManagementAccount',
  components: {
    TabBarDetail,
    ArrowLeft,
    DetailTableAccount,
  },
  data() {
    return {
      listDataTab: [
        {
          id: 'management-akun',
          name: 'Detail Akun',
          icon: '/icon/icon-aduan/complaint-detail.svg',
        },
      ],
      listButton: [
        {
          id: 'active',
          label: 'Aktifkan',
          variant: 'secondary',
          httpMethod: 'post',
          status: managementAccountComplaintStatus.not_active.id,
        },
        {
          id: 'delete',
          label: 'Hapus',
          variant: 'danger',
          httpMethod: 'delete',
          status: managementAccountComplaintStatus.not_active.id,
        },
        {
          id: 'nonActive',
          label: 'Non-aktifkan',
          variant: 'secondary',
          httpMethod: 'post',
          status: managementAccountComplaintStatus.active.id,
        },
      ],
      dataDetail: {},
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.get(
        `/users/admin/complaint/${this.$route.params.id}`
      )
      this.dataDetail = response.data.data
    } catch (error) {
      this.dataDetail = {}
    }
  },
  computed: {
    ...mapGetters('management-account', {
      detailItem: 'getDetailItem',
      httpMethod: 'getHttpMethod',
      apiPath: 'getApiPath',
      confirmationDialog: 'getConfirmationDialog',
      informationDialog: 'getInformationDialog',
      isSuccessInformation: 'getSuccessInformation',
      typeDialog: 'getTypeDialog',
    }),
  },
  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/management-akun',
        query: this.$route.query,
      })
    },
    showPopupConfirmation(typeDialog, httpMethod) {
      this.$store.commit('management-account/setTypeDialog', typeDialog)
      this.$store.commit('management-account/setDetailItem', {
        title: `${this.dataDetail.name} - ${this.dataDetail.email}`,
      })
      this.$store.commit('management-account/setHttpMethod', httpMethod)
      this.$store.dispatch('management-account/showConfirmationDialog', {
        typeDialog,
        detailAccount: this.dataDetail,
      })
    },
    showPopupInformation(modalName = null, isSuccess) {
      this.$store.dispatch(
        'management-account/showInformationDialog',
        isSuccess
      )
    },
    backToPopupConfirmation() {
      this.$store.dispatch('management-account/backToPopupConfirmation')
    },
    refreshPage() {
      if (this.typeDialog === 'delete') {
        this.goToBackHandle()
      }
      this.$fetch()
    },
  },
}
</script>
