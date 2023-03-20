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
    <div class="table-content overflow-x-auto rounded-lg font-roboto">
      <JdsDataTable
        :headers="headerTicketMuseum"
        :items="items"
        :loading="false"
        class="w-full"
      >
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template #item.status="{ item }">
          <div class="flex items-center">
            <div
              v-show="item?.status"
              class="mr-2 h-2 w-2 rounded-full"
              :class="getColorIconStatus(ticketStatus[`${item.status}`])"
            />
            {{ ticketStatus[`${item.status}`] }}
          </div>
        </template>
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
          fileId: 'asdf',
          invoice: '1',
          amount: '2',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '1',
          status: 'confirmed',
          orderedAt: '7'
        },
        {
          fileId: '1321',
          invoice: '1123',
          amount: '212321',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '2',
          status: 'verified',
          orderedAt: '7213312'
        },
        {
          fileId: '1321',
          invoice: '1123',
          amount: '212321',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '3',
          status: 'rejected',
          orderedAt: '7213312'
        },
        {
          fileId: '1321',
          invoice: '1123',
          amount: '212321',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '4',
          status: 'canceled',
          orderedAt: '7213312'
        },
        {
          fileId: '1321',
          invoice: '1123',
          amount: '212321',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '5',
          status: 'expired',
          orderedAt: '7213312'
        },
        {
          fileId: '1321',
          invoice: '1123',
          amount: '212321',
          sessionName: 'Sesi 2',
          reservationDate: 'Rabu, 08 Feb 2023',
          ticketCount: '6',
          status: 'ordered',
          orderedAt: '7213312'
        }
      ],
      headerTicketMuseum,
      ticketStatus
    }
  },
  methods: {
    getColorIconStatus (status) {
      if (status === ticketStatus.verified) {
        return 'bg-green-600'
      } else if (
        status === ticketStatus.rejected ||
        status === ticketStatus.canceled ||
        status === ticketStatus.expired
      ) {
        return 'bg-red-600'
      } else if (
        status === ticketStatus.ordered ||
        status === ticketStatus.confirmed
      ) {
        return 'bg-yellow-600'
      } else {
        return 'bg-black'
      }
    }
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
