<template>
  <BaseDialogFrame name="detail-reservasi">
    <BaseDialogPanel>
      <BaseDialogHeader>
        <div class="flex items-center justify-between">
          <h1 class="font-roboto text-[21px] font-bold text-green-jds">
            Detail Reservasi
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
      <div class="px-6 py-2">
        <p class="font-lato text-[14px]">Media Reservasi</p>
        <div
          class="flex h-[31px] w-[74px] items-center gap-x-2 rounded-[4px] bg-[#E3F2FD]"
        >
          <div
            class="ml-[3px] h-[23px] w-[3px] rounded-t-[3px] rounded-b-[3px] bg-[#1E88E5]"
          ></div>

          <p class="font-lato text-[14px] font-[700]">Manual</p>
        </div>
        <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
          <p class="font-lato text-[16px]">Informasi Pemesan</p>
          <div class="grid-rows-12 mt-3 mb-3 grid grid-flow-col">
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                Nama Pemesan
              </p>
              <p class="font-lato text-[14px] font-[700]">16 November 2024</p>
            </div>
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                Nama Instansi
              </p>
              <p class="font-lato text-[14px] font-[700]">Tk Budi Luhur</p>
            </div>
          </div>
          <div class="grid-rows-12 grid grid-flow-col">
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                No. Tlp
              </p>
              <p class="font-lato text-[14px] font-[700]">0822 1000 2000</p>
            </div>
          </div>
        </div>

        <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
          <p class="font-lato text-[16px]">Reservasi & Kunjungan</p>
          <div class="grid-rows-12 mt-3 mb-3 grid grid-flow-col">
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                Tanggal Reservasi
              </p>
              <p class="font-lato text-[14px] font-[700]">16 November 2024</p>
            </div>
          </div>
          <div class="grid-rows-12 mt-3 grid grid-flow-col">
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                Tanggal Kunjungan
              </p>
              <p class="font-lato text-[14px] font-[700]">17 November 2023</p>
            </div>
            <div class="col-span-6">
              <p class="text-[ #616161] font-lato text-[14px] font-[500]">
                Sesi Kunjungan
              </p>
              <p class="font-lato text-[14px] font-[700]">
                Sesi 1 (08:00 - 09:15 WIB)
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 mb-3 flex justify-between p-4">
          <p class="font-lato text-[16px] font-[700]">Tiket</p>
          <p class="font-lato text-[14px] font-[500]">Total 90 Tiket</p>
        </div>
        <div class="grid-rows-12 mb-3 grid grid-flow-col gap-2">
          <div class="col-span-4">
            <div
              class="h-[91px] w-[139.33px] rounded-[12px] border border-[#EEEEEE] p-5"
            >
              <p class="mb-3 font-lato text-[14px] font-[400]">Anak-anak</p>
              <p class="font-lato text-[14px] font-[700]">60 Tiket</p>
            </div>
          </div>
          <div class="col-span-4">
            <div
              class="h-[91px] w-[139.33px] gap-y-4 rounded-[12px] border border-[#EEEEEE] p-4"
            >
              <p class="mb-3 font-lato text-[14px] font-[400]">Dewasa</p>
              <p class="font-lato text-[14px] font-[700]">30 Tiket</p>
            </div>
          </div>
          <div class="col-span-4">
            <div
              class="h-[91px] w-[139.33px] gap-y-4 rounded-[12px] border border-[#EEEEEE] p-4"
            >
              <p class="mb-3 w-[20px] font-lato text-[14px] font-[400]">
                Wisatawan Mancanegara
              </p>
              <p class="font-lato text-[14px] font-[400]">-</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex px-6 py-4"
        :class="!isOrderedByAdmin ? 'justify-end' : 'justify-between'"
      >
        <div
          v-if="isOrderedByAdmin"
          class="relative overflow-x-auto bg-transparent text-red-700"
        >
          <BaseButton> Batalkan Reservasi </BaseButton>
        </div>
        <div
          v-if="isOrderedByAdmin"
          class="relative overflow-x-auto rounded-lg bg-green-jds text-white"
          @click="$emit('dialog-ubah-detail')"
        >
          <BaseButton class="flex items-center gap-2">
            <BaseIconSvg
              icon="/icon/pencil-edit.svg"
              mode="image"
              :width="18"
              :height="18"
              class="mt-[2px]"
            />
            Ubah Detail
          </BaseButton>
        </div>

        <div
          v-else
          class="relative overflow-x-auto rounded-lg bg-green-jds text-white"
          @click="$emit('dialog-reschedule')"
        >
          <BaseButton class="flex items-center gap-2">
            <BaseIconSvg
              icon="/icon/calendar.svg"
              mode="image"
              :width="18"
              :height="18"
              class="mt-[2px]"
            />
            Reschedule
          </BaseButton>
        </div>
      </div>
    </BaseDialogPanel>
  </BaseDialogFrame>
</template>

<script>
export default {
  name: 'DialogDetailReservasi',

  props: {
    isOrderedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
