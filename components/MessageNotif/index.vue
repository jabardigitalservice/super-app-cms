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
        <template #item.status="{item}">
          <div class="flex items-center">
            <div
              v-show="item?.messageStatus"
              :class="{
                'mr-2 h-2 w-2 rounded-full':true,
                'bg-green-600': item.messageStatus.id == messageStatus.published.id,
                'bg-yellow-600': item.messageStatus.id == messageStatus.waiting.id,
              }"
            />
            {{ item.messageStatus.status || "-" }}
          </div>
        </template>
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.action="{ item }">
          <BaseTableAction :list-menu-pop-over="filterTableAction(item.messageStatus)" />
        </template>
      </JdsDataTable>
    </div>
  </div>
</template>

<script>
import { messageNotifHeader, messageStatus } from '~/constant/message-notif'
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
          messageStatus: {
            id: 1,
            status: 'Menunggu Publikasi'
          }
        },
        {
          title: 'Informasi Vaksin Booster 2',
          createdDate: '22/10/2022 10:54',
          publishDate: '22/10/2022 10:54',
          messageStatus: {
            id: 2,
            status: 'Dipublikasikan'
          }
        }
      ],
      messageNotifHeader,
      messageStatus,
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Publikasikan', value: 'publish' },
        { menu: 'Hapus', value: 'delete' }
      ]
    }
  },
  methods: {
    filterTableAction (currentUserStatus) {
      if (currentUserStatus.id === messageStatus.published.id) {
        return this.menuTableAction.filter(item => item.menu !== 'Publikasikan')
      } else {
        return this.menuTableAction
      }
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
