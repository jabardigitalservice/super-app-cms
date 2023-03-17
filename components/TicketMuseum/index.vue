<template>
  <div>
    <div class="mb-6 flex justify-between">
      <jds-search
        value=""
        placeholder="Masukkan id pembayaran"
        icon
        :button="false"
        small
        class="h-[38px] w-[275px] text-gray-500"
      />
    </div>
    <div class="overflow-x-auto rounded-lg font-roboto table-content">
      <JdsDataTable :headers="headerTicketMuseum" :items="items" :loading="false" class="w-full">
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <!-- <template #item.status="{ item }">
          <div class="flex items-center">
            <div
              v-show="item?.messageStatus"
              :class="{
                'mr-2 h-2 w-2 rounded-full': true,
                'bg-green-600':
                  item.messageStatus.id == messageStatus.published.id,
                'bg-yellow-600':
                  item.messageStatus.id == messageStatus.waiting.id,
              }"
            />
            {{ item.messageStatus.status || "-" }}
          </div>
        </template> -->
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <!-- <template #item.action="{ item }">
          <BaseTableAction
            :list-menu-pop-over="filterTableAction(item.messageStatus)"
          />
        </template> -->
      </JdsDataTable>
    </div>
  </div>
</template>

<script>
import { headerTicketMuseum, ticketStatus } from '~/constant/tiket-museum'
export default {
  name: 'ListTicketMuseum',
  data () {
    return {

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
      headerTicketMuseum,
      ticketStatus

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.jds-data-table:deep {
  border-spacing: 1px !important;
  @apply !bg-[#EDEFF3];
}

.jds-data-table:deep tr th {
  @apply min-w-[170px] border-r border-white;
}

.jds-data-table:deep tr td {
  @apply min-w-[170px] border-r border-gray-200;
}
.jds-pagination:deep {
  @apply !bg-red-600;
}

.table-content::-webkit-scrollbar {
  @apply h-5 w-5;
}

.table-content::-webkit-scrollbar-track {
  @apply rounded-b-lg border-none bg-gray-50;
}

.table-content::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
