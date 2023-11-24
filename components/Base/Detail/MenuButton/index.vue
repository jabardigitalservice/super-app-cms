<template>
  <div class="mt-4 mb-8 flex justify-between">
    <jds-button
      variant="secondary"
      class="!text-[14px] !font-bold"
      @click="$emit('button-back')"
    >
      <div class="flex items-center">
        <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
        Kembali
      </div>
    </jds-button>
    <div class="flex">
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
            @click="$emit(`button-${button.id}`,button.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
  props: {
    listButton: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
