<template>
  <div>
    <BaseHeader
      :navigations="navigations"
      description-page="Berisi semua daftar pesan yang dikirimkan ke aplikasi Sapawarga."
    />
    <div class="mt-8">
      <div class="flex justify-between mb-4">
        <jds-search
          value=""
          placeholder="Masukkan judul pesan"
          icon
          :button="false"
          small
          class="w-[275px] h-[38px] text-gray-500"
        />
        <BaseButton class="bg-green-600 w-[102px] text-white font-semibold">
          Buat Pesan
        </BaseButton>
      </div>
      <JdsDataTable
        :headers="messageNotifHeader"
        :items="items"
        :loading="false"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <MessageNotifTableAction @detail="$router.push(`/message-notif/detail/${item.id}`)" />
        </template>
      </JdsDataTable>
    </div>
  </div>
</template>

<script>
import { messageNotifHeader } from '~/constant/message-notif'
export default {
  name: 'ListMessageNotif',
  data () {
    return {
      navigations: [
        {
          label: 'Pesan Broadcast',
          link: '/message-notif'
        }
      ],
      items: [
        {
          title: 'Mitigasi Bencana Gerakan Tanah',
          createdDate: '22/10/2022 10:54',
          publishDate: '22/10/2022 10:54',
          status: 'Menunggu Verifikasi'
        },
        {
          title: 'Mitigasi Bencana Gerakan Tanah',
          createdDate: '22/10/2022 10:54',
          publishDate: '22/10/2022 10:54',
          status: 'Menunggu Verifikasi'
        }
      ],
      messageNotifHeader
    }
  }
}
</script>

<style scoped>
  .jds-data-table:deep{
    border-spacing: 1px !important;
    @apply rounded-lg;
  }

  .jds-data-table:deep tr th:first-child{
    @apply min-w-[435px] rounded-tl-lg;
  }

  .jds-data-table:deep tr th:last-child{
    @apply rounded-tr-lg;
  }
  .jds-data-table:deep tr th {
    @apply min-w-[191px] h-[42px] border-r border-white bg-green-600;
  }
  .jds-pagination:deep{
    @apply !bg-red-600;
  }
</style>
