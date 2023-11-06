<template>
  <div class="mt-4">
    <jds-search
      value=""
      placeholder="Masukkan no. handphone"
      icon
      :button="false"
      small
      class="
      w-[275px]
      h-[38px]
      text-gray-500"
    />

    <jds-data-table
      :headers="managementUserHeader"
      :loading="false"
      empty-text=""
      local-sort
      class="mt-4"
      :items="items"
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.action="{ item }">
        <BaseTableAction :list-menu-pop-over="menuTableAction" @detail="goToDetailPageHandle(item)" />
      </template>
    </jds-data-table>
  </div>
</template>

<script>
import { managementUserHeader } from '~/constant/management-user'
export default {
  name: 'ManagementUser',
  data () {
    return {
      managementUserHeader,
      items: [{ id: '1', account: 'Asep Kumaha', phone_number: '082210002000', email: 'asep.kumaha@gmail.com', createdAt: '2/10/2022' },
        { id: '2', account: 'Nisa Anisa', phone_number: '082210002000', email: 'nisa.anisa@gmail.com', createdAt: '2/10/2022' }],
      menuTableAction: [
        { menu: 'Lihat Detail', value: 'detail' },
        { menu: 'Edit No. HP', value: 'edit_phone_number' }
      ]
    }
  },
  methods: {
    goToDetailPageHandle (item) {
      this.$router.push(`/management-user/detail/${item.id}`)
    }
  }
}
</script>

<style scoped>
  .jds-data-table:deep tr th {
    @apply h-[42px] border-r border-white bg-green-600;
  }

  .jds-data-table:deep tr th:first-child{
    @apply rounded-tl-lg;
  }

  .jds-data-table:deep tr th:last-child{
    @apply rounded-tr-lg;
  }
</style>
