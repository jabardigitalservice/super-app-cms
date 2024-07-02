<template>
  <BaseDialogFrame name="dialog-success" :is-close-from-outside="false">
    <BaseDialogPanel custom-width="w-[460px]">
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Berhasil
          </h1>
        </div>
      </BaseDialogHeader>

      <div class="flex px-6 py-7">
        <jds-icon
          name="check-mark-circle"
          size="sm"
          fill="#008444"
          class="mr-3"
        />
        <p class="font-lato text-[14px] font-[400] text-[#424242]">
          {{ successText }}
        </p>
      </div>
      <BaseDialogFooter>
        <div class="flex justify-center">
          <jds-button
            label="Saya Mengerti"
            variant="primary"
            class="ml-3 font-lato text-sm font-bold"
            @click="handleCloseDialog()"
          />
        </div>
      </BaseDialogFooter>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      successText: (state) => state.dialog.title,
    }),
  },
  methods: {
    handleCloseDialog() {
      this.$store.commit('modals/CLOSE', 'dialog-success')
      this.$store.commit('add_reservation/setRefetchCalendar', true)
    },
  },
}
</script>
