<template>
  <BaseDialogFrame :name="`${nameModal}-${typeModal}`">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dialogModal?.title" />
      <div class="flex items-start px-6 pt-4 pb-10">
        <jds-icon
          :name="dialogModal.icon?.name"
          size="sm"
          :fill="dialogModal.icon?.fill"
          class="mr-3 mt-1"
          :class="{ 'mt-0': !dialogModal?.descriptionText }"
        />
        <BaseDialogDescription
          :description="dialogModal?.descriptionText"
          :sub-description="detailItemModal?.title"
        />
      </div>
      <div class="mt-3 rounded-b-lg bg-gray-50 px-6 py-4">
        <div
          class="flex justify-end"
          :class="{ 'justify-center': isSuccess }"
        >
          <template v-if="isSuccess">
            <div>
              <jds-button
                label="Saya mengerti"
                type="button"
                variant="primary"
                class="!text-[14px] !font-bold"
                @click="closeModalSuccess()"
              />
            </div>
          </template>
          <template v-else>
            <div class="mr-4">
              <jds-button
                label="Batal"
                type="button"
                variant="secondary"
                class="!text-[14px] !font-bold"
                @click="$store.commit('modals/CLOSEALL')"
              />
            </div>
            <div>
              <jds-button
                label="Coba Lagi"
                type="button"
                variant="danger"
                class="!text-[14px] !font-bold"
                @click="$store.commit('modals/CLOSE', `${nameModal}-${typeModal}`)"
              />
            </div>
          </template>
        </div>
      </div>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  name: 'DialogInformationNew',
  props: {
    nameModal: { type: String, default: '' },
    typeModal: { type: String, default: 'information' },
    dialogModal: { type: Object, default: () => ({}) },
    detailItemModal: { type: Object, default: () => ({}) },
    isSuccess: { type: Boolean, default: false }
  },
  methods: {
    closeModalSuccess () {
      this.$store.commit('modals/CLOSEALL')
      this.$emit('close-all-modal')
    }
  }
}
</script>
