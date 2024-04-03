<template>
  <BaseDialogFrame name="dialog-reschedule">
    <BaseDialogPanel custom-width="w-[460px]">
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Reschedule Reservasi
          </h1>

          <button @click="$emit('close')">
            <BaseIconSvg
              icon="/icon/default/cross.svg"
              class="!h-6 !w-6"
              fill-color="#212121"
            />
          </button>
        </div>
      </BaseDialogHeader>
      <div v-for="data in rescheduleValue" :key="data.id">
        <div class="px-6 py-2">
          <date-picker
            v-model="data.date"
            format="DD/MM/YYYY"
            :clearable="false"
            class="date-picker"
          />
        </div>
        <div class="px-6 py-2">
          <jds-select
            v-model="data.session"
            placeholder="Pilih sesi"
            class="session-select"
            :options="options"
          />
        </div>
      </div>

      <BaseDialogFooter>
        <div class="flex justify-end">
          <div>
            <jds-button
              label="Batal"
              variant="secondary"
              class="font-lato text-sm font-bold"
              @click="$emit('close')"
            />
            <jds-button
              label="Simpan"
              variant="primary"
              class="ml-3 font-lato text-sm font-bold"
              @click="$emit('save')"
            />
          </div>
        </div>
      </BaseDialogFooter>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  props: {
    rescheduleValue: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>
.date-picker {
  width: 412px !important;
}
.date-picker .mx-input-wrapper .mx-input {
  border-color: #e0e0e0 !important;
}
.session-select .jds-select,
.session-select .jds-input-text {
  width: 412px !important;
  border-radius: 8px;
}
.jds-input-text .jds-input-text__input-wrapper {
  border-radius: 8px;
  border-color: #e0e0e0 !important;
  border-width: 2px !important;
}
</style>
