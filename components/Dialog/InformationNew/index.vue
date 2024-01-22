<template>
  <BaseDialogFrame :name="`${nameModal}-${typeModal}`" :close-modal-self="!isSuccess">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dialogModal?.title" />
      <div class="flex items-start px-6 pt-4 pb-4">
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
      <slot />
      <div class="mt-3 rounded-b-lg bg-gray-50 px-6 py-4">
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
                @click="$store.commit('modals/CLOSEALL')"
              />
            </div>
            <div>
              <jds-button
                label="Coba Lagi"
                type="button"
                variant="danger"
                class="!text-[14px] !font-bold"
                @click="
                  $store.commit('modals/CLOSE', `${nameModal}-${typeModal}`)
                "
              />
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
    isWarning: { type: Boolean, default: false }
  },
  data () {
    return {
      typeModal: 'information'
    }
  },
  methods: {
    closeModalSuccess () {
      this.$store.commit('modals/CLOSEALL')
      this.$emit('close-all-modal')
    }
  }
}
</script>
