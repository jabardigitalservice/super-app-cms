<template>
  <BaseCustomPopup :title="title" :show-popup="showPopup">
    <template #body-popup>
      <div class="mt-6 px-6">
        <p class="font-lato text-[14px] text-gray-800">Nama</p>
        <p class="font-lato text-[16px] font-bold text-gray-800">
          <strong>{{ accountName }}</strong>
        </p>
        <form
          class="select__form py-4"
          :class="{ 'mb-4': errorMessage !== '' }"
        >
          <jds-select
            placeholder="Pilih status"
            :label="`Status Akun ${typeClaimPage.name}`"
            :options="statusOptions"
            :value="valueStatusRw"
            :error-message="errorMessage"
            @change="getStatusFromSelect"
          />
        </form>
      </div>
    </template>
    <template #footer-popup>
      <div class="flex h-fit justify-end bg-gray-50">
        <div class="mr-[16px]">
          <jds-button
            label="Batal"
            variant="secondary"
            class="!font-lato !text-sm !font-bold"
            @click="$emit('close')"
          />
        </div>
        <jds-button
          label="Simpan"
          variant="primary"
          class="!font-lato !text-sm !font-bold"
          @click="editStatusHandle"
        />
      </div>
    </template>
  </BaseCustomPopup>
</template>
<script>
import { userStatus } from '~/constant/klaim-rw'
export default {
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
    typeClaimPage: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    accountName: {
      type: String,
      default: '',
    },
    accountStatus: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      statusOptions: [
        {
          label: userStatus.verified,
          value: userStatus.verified,
        },
        {
          label: userStatus.rejected,
          value: userStatus.rejected,
        },
      ],
      statusRw: '',
      userStatus,
      // isChangeStatus is used for check if status claim rw change from select form
      isChangeStatus: false,
      errorMessage: '',
    }
  },
  computed: {
    valueStatusRw() {
      let result = this.accountStatus
      if (this.isChangeStatus) {
        result = this.statusRw
      }
      return result
    },
  },
  methods: {
    getStatusFromSelect(value) {
      this.statusRw = value
      this.isChangeStatus = true
      this.errorMessage = ''
    },
    validateSelectFormHandle() {
      if (this.statusRw === '' || this.statusRw === userStatus.waiting) {
        return `Status Akun ${this.typeClaimPage.name} wajib dipilih.`
      } else if (
        this.statusRw === this.accountStatus &&
        this.accountStatus === userStatus.rejected
      ) {
        return `Status Akun ${this.typeClaimPage.name} sudah ditolak.`
      } else {
        return ''
      }
    },
    editStatusHandle() {
      this.statusRw =
        this.accountStatus === userStatus.rejected && !this.isChangeStatus
          ? this.accountStatus
          : this.statusRw
      const validate = this.validateSelectFormHandle()
      if (validate === '') {
        this.$emit('submit', this.statusRw)
        this.isChangeStatus = false
      } else {
        this.errorMessage = validate
      }
    },
    closeHandle() {
      this.$emit('close')
      this.errorMessage = ''
      this.statusRw = this.accountStatus
      this.isChangeStatus = false
    },
  },
}
</script>

<style>
.select__form .jds-select,
.select__form .jds-input-text {
  width: 462px !important;
}

.select__form .jds-options__option-list-item--selected {
  display: none !important;
}
</style>
