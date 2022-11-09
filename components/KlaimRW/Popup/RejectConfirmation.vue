<template>
  <BaseDialog
    title="Tolak Akun RW"
    :show-popup="showPopup"
    label-button="Tolak akun RW ini"
    confirmation-type="reject"
    dialog-type="confirmation"
    :is-reject-confirmation="true"
    @submit="$emit('submit')"
    @close="$emit('close')"
  >
    <div class="py-[16px] font-lato text-gray-800">
      <p class="text-[14px] text-gray-800 font-lato">
        Apakah Anda yakin ingin menolak akun RW ini?
      </p>
      <div class="text-[16px] font-lato text-gray-800">
        <strong>{{ accountName }}</strong>
      </div>
      <div class="mt-[22px] hidden">
        <label class="text-[15px] font-lato text-gray-800">Masukkan alasan penolakan akun RW</label>
        <textarea
          class="w-full h-[147px] border border-gray-500 bg-gray-50 rounded-lg mt-3 text-[14px] px-[8px] pt-[10px] pb-[18px] text-gray-600
          placeholder:text-[14px] placeholder:text-gray-600 outline-0"
          placeholder="Masukkan disini"
        />
        <div class="text-[12px] font-lato text-gray-600">
          Tersisa 5000 Karakter
        </div>
      </div>
      <div class="mt-[22px]">
        <label class="text-[14px] font-lato">Alamat Email</label>
        <div class="text-[16px] font-lato text-gray-800">
          <strong>{{ accountEmail }}</strong>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script>
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    accountName: {
      type: String,
      default: ''
    },
    accountEmail: {
      type: String,
      default: ''
    }
  }
}
</script>
