<template>
  <div class="rounded-lg border border-green-700 bg-[#F2FFF7]">
    <table class="w-full">
      <tr>
        <td width="66" class="align-top">
          <strong>{{ dataIkp.ikp_code }}</strong>
        </td>
        <td class="align-top">
          {{ dataIkp.narrative }}
        </td>
        <td width="91" class="align-middle">
          <BaseTableAction
            :list-menu-pop-over="listMenuTableAction"
            @detail-narrative="$emit('detail-narrative', dataIkp)"
          />
        </td>
        <td width="63" class="rounded-r-lg align-middle">
          <jds-button
            label="Batal"
            variant="tertiary"
            class="!py-0 !text-[14px] font-bold"
            @click="$emit('close')"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListFollowupProcess',
  props: {
    dataIkp: {
      type: Object,
      default: () => ({})
    },
    listMenuTableAction: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style scoped>
tr td {
  @apply px-[8px] pt-[10px] pb-[9px] text-sm;
}
</style>
