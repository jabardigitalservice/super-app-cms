<template>
  <div>
    <div class="table-content">
      <BaseTableDetail header="Informasi Akun" class="mb-4">
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Nama</strong>
          </td>
          <td>
            {{ dataDetail?.name || '-' }}
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Email </strong>
          </td>
          <td>
            {{ dataDetail?.email || '-' }}
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>NIP </strong>
          </td>
          <td>
            {{ dataDetail?.employee_number || '-' }}
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Status Kepegawaian </strong>
          </td>
          <td>
            {{ dataDetail?.employee_status?.name || '-' }}
          </td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Role </strong>
          </td>
          <td>{{ dataDetail?.role?.name || '-' }}</td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Instansi </strong>
          </td>
          <td>{{ dataDetail?.organization?.name || '-' }}</td>
        </tr>
        <tr>
          <td class="text-lato w-[164px] text-[14px]">
            <strong>Status </strong>
          </td>
          <td>
            <div class="flex items-center">
              <p
                v-if="dataDetail?.status?.id"
                class="mr-4 h-fit w-fit rounded-[32px] bg-gray-100 px-[10px] py-1 text-xs font-semibold"
                :class="getStatusColor(dataDetail?.status?.id)"
              >
                {{ dataDetail?.status?.name }}
              </p>
              <p v-else>-</p>
              <jds-button
                v-if="
                  dataDetail?.status?.id ===
                  managementAccountComplaintStatus.unverified.id
                "
                variant="primary"
                class="!text-[14px]"
                label="Kirim Ulang Email Verifikasi"
              />
            </div>
          </td>
        </tr>
      </BaseTableDetail>
    </div>
  </div>
</template>

<script>
import { managementAccountComplaintStatus } from '~/constant/management-user'

export default {
  name: 'AccountManagementTableDetail',
  props: {
    dataDetail: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  data() {
    return {
      managementAccountComplaintStatus,
    }
  },
  methods: {
    getStatusColor(status) {
      const textColor = managementAccountComplaintStatus[status]?.statusColor
      switch (textColor) {
        case 'yellow':
          return 'text-[#FF7500]'
        case 'green':
          return 'text-green-700'
        case 'red':
          return 'text-[#DD5E5E]'
        default:
          return 'text-gray-900'
      }
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

.jds-data-table::v-deep td:nth-child(2) {
  @apply !w-[162px];
}
</style>
