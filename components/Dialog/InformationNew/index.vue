<template>
  <BaseDialogFrame :name="nameModal" :close-modal-self="!isSuccess">
    <BaseDialogPanel class="w-[510px]">
      <BaseDialogHeader :title="dialogModal?.title" />
      <div class="flex max-h-[122px] min-h-[94px] items-start px-6 py-4">
        <jds-icon
          :name="dialogModal?.icon?.name || 'warning'"
          size="sm"
          :fill="dialogModal?.icon?.fill"
          class="mr-3 mt-1"
          :class="{ 'mt-0': !dialogModal?.descriptionText }"
        />
        <BaseDialogDescription
          :description="dialogModal?.descriptionText"
          :sub-description="detailItemModal?.title"
        />
      </div>
      <div class="rounded-b-lg bg-gray-50 px-6 py-4">
        <template v-if="isSuccess || isWarning">
          <div class="flex justify-center">
            <div>
              <jds-button
                label="Saya mengerti"
                type="button"
                variant="primary"
                class="!text-[14px] !font-bold"
                @click="closeModalSuccess()"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="flex justify-end">
            <div class="mr-4">
              <jds-button
                label="Batal"
                type="button"
                variant="secondary"
                class="!text-[14px] !font-bold"
                @click="closeModal()"
              />
            </div>
            <div>
              <slot name="button-error">
                <jds-button
                  label="Coba Lagi"
                  type="button"
                  variant="danger"
                  class="!text-[14px] !font-bold"
                  @click="handleRetryButton()"
                />
              </slot>
            </div>
          </div>
        </template>
      </div>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  name: 'DialogInformationNew',
  props: {
    nameModal: { type: String, default: '' },
    dialogModal: { type: Object, default: () => ({}) },
    detailItemModal: { type: Object, default: () => ({}) },
    isSuccess: { type: Boolean, default: false },
    isWarning: { type: Boolean, default: false },
  },
  methods: {
    closeModal() {
      this.$emit('close-all-modal')
      this.$store.commit('modals/CLOSEALL')
    },
    handleRetryButton() {
      this.$emit('retry')
      this.$store.commit('modals/CLOSE', this.nameModal)
    },
  },
}
</script>
