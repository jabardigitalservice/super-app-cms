<template>
  <div class="mt-3 rounded-b-lg bg-gray-50 px-6 py-4">
    <div class="flex justify-end">
      <div class="mr-4">
        <jds-button
          label="Batal"
          type="button"
          variant="secondary"
          class="!text-[14px] !font-bold"
          @click="$store.commit('modals/CLOSE', name)"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDialogFooterNew',
  props: {
    name: { type: String, required: true }
  }
}
</script>

<style scoped>
.jds-button::v-deep {
  @apply !text-[14px] !font-bold disabled:pointer-events-none disabled:!bg-neutral-300 disabled:!text-neutral-500;
}
</style>
