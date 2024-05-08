<template>
  <BaseDialogFrame name="dialog-batalkan-reservasi">
    <BaseDialogPanel custom-width="w-[460px]">
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Konfirmasi Pembatalan Reservasi
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
      <div class="px-6 py-10">
        <p class="text-[ #424242] font-lato text-[14px] font-[400]">
          Apakah Anda yakin ingin membatalkan reservasi ini?
        </p>
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
              label="Batalkan Reservasi"
              variant="danger"
              class="ml-3 font-lato text-sm font-bold"
              @click="$emit('cancel')"
            />
          </div>
        </div>
      </BaseDialogFooter>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>
