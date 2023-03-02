<template>
  <BaseDialog
    title="Edit Status Akun RW"
    :show-popup="showPopup"
    label-button="Simpan"
    dialog-type="confirmation"
    @submit="$emit('submit',statusRw)"
    @close="closeHandle"
  >
    <div class="mt-6">
      <p class="text-[14px] font-lato text-gray-800">
        Nama
      </p>
      <p class="text-[16px] font-lato text-gray-800 font-bold">
        <strong>{{ accountName }}</strong>
      </p>
      <form class="py-4 select__form">
        <jds-select placeholder="Pilih status" label="Status Akun RW" :options="statusOptions" :value="getValueStatusRw" @change="getStatusFromSelect" />
      </form>
    </div>
  </BaseDialog>
</template>
<script>
import { userStatus } from '~/constant/klaim-rw'
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
    accountStatus: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      statusOptions: [
        {
          label: userStatus.verified,
          value: userStatus.verified
        },
        {
          label: userStatus.rejected,
          value: userStatus.rejected
        }
      ],
      statusRw: '',
      userStatus,
      // isChangeStatus is used for check if status claim rw change from select form
      isChangeStatus: false
    }
  },
  computed: {
    getValueStatusRw () {
      let result = this.accountStatus
      if (this.isChangeStatus) {
        result = this.statusRw
      }
      return result
    }
  },
  methods: {
    getStatusFromSelect (value) {
      this.statusRw = value
      this.isChangeStatus = true
    },
    closeHandle () {
      this.$emit('close')
      this.statusRw = this.accountStatus
    }
  }
}
</script>

<style>
  .select__form .jds-select,
  .select__form .jds-input-text{
    width:462px !important;
  }
</style>
