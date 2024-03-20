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
            v-show="button.status === dataDetail.status?.id"
            :variant="button.variant"
            :label="button.label"
            class="!text-[14px] !font-bold"
            @click="showPopupConfirmation(button.id)"
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
      :dialog-modal="confirmationDialog.active"
      :detail-item-modal="detailItem"
    />
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog.nonActive"
      :detail-item-modal="detailItem"
    />
    <DialogConfirmationNew
      :dialog-modal="confirmationDialog.delete"
      :detail-item-modal="detailItem"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TabBarDetail from '~/components/Aduan/TabBar/Detail'
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import DetailTableAccount from '~/components/Aduan/AccountManagement/Detail/TableDetail'
import {
  managementAccountComplaintStatus,
  confirmationDialog,
} from '~/constant/management-user'

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
          status: managementAccountComplaintStatus.not_active.id,
        },
        {
          id: 'delete',
          label: 'Hapus',
          variant: 'danger',
          status: managementAccountComplaintStatus.not_active.id,
        },
        {
          id: 'nonActive',
          label: 'Non-aktifkan',
          variant: 'secondary',
          status: managementAccountComplaintStatus.active.id,
        },
      ],
      dataDetail: {},
      confirmationDialog,
    }
  },
  async fetch() {
    try {
      const response = await this.$mockApi.get(
        `/users/admin/complaints/${this.$route.params.id}`
      )
      this.dataDetail = response.data.data
    } catch (error) {
      this.dataDetail = {}
    }
  },
  computed: {
    ...mapGetters('management-account', {
      detailItem: 'getDetailItem',
    }),
  },
  methods: {
    goToBackHandle() {
      this.$router.push({
        path: '/aduan/management-akun',
        query: this.$route.query,
      })
    },
    showPopupConfirmation(typeDialog) {
      this.$store.commit('management-account/setDetailItem', {
        title: `${this.dataDetail.name} - ${this.dataDetail.email}`,
      })
      this.$store.dispatch(
        'management-account/showConfirmationDialog',
        typeDialog
      )
    },
  },
}
</script>
