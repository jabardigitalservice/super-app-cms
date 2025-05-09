<template>
  <div>
    <DialogWithStepper
      :name-modal="nameModal"
      title="Tambah Aduan"
      :index-current-active="indexCurrentActive"
      :label-button="labelButton"
      @close="showPopupConfirmationAddComplaint()"
      @prev="prevToFormHandle()"
      @submit="submitFormAddComplaint()"
    >
      <template #form-complaint>
        <div
          class="form-add-complaint max-h-fit w-full overflow-y-auto sm:h-[calc(100vh-240px)]"
        >
          <FormInformationComplaint
            v-if="indexCurrentActive === 1"
            ref="formInformationComplaint"
          />
          <FormLocationComplaint
            v-if="indexCurrentActive === 2"
            ref="formLocationComplaint"
          />
          <FormOtherComplaint
            v-if="indexCurrentActive === 3"
            ref="formOtherComplaint"
          />
        </div>
      </template>
    </DialogWithStepper>
    <DialogConfirmationBasic :dialog-modal="dialogConfirmation">
      <template #footer-custom>
        <div class="mr-4">
          <jds-button
            :label="dialogConfirmation.buttonCancel?.label"
            type="button"
            :variant="dialogConfirmation?.buttonCancel?.variant"
            @click="closePopupConfirmation()"
          />
        </div>

        <jds-button
          :label="dialogConfirmation?.buttonSubmit?.label"
          type="button"
          :variant="dialogConfirmation?.buttonSubmit?.variant"
          @click="submitPopupConfirmation()"
        />
      </template>
    </DialogConfirmationBasic>
    <DialogInformationNew
      :name-modal="dialogInformmation.nameModal"
      :dialog-modal="dialogInformmation.dialogModal"
      :is-success="!isError"
      @retry="backToForm()"
      @close-all-modal="closePopup()"
    >
      <template #button-error>
        <jds-button
          label="Coba Lagi"
          type="button"
          variant="primary"
          class="!text-[14px] !font-bold"
          @click="backToForm()"
        />
      </template>
    </DialogInformationNew>
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormInformationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/InformationComplaint'
import FormLocationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/LocationComplaint'
import FormOtherComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/OthersComplaint'
import { iconPopup } from '~/constant/icon-popup-new'

export default {
  name: 'DialogAddComplaint',
  components: {
    FormInformationComplaint,
    FormLocationComplaint,
    FormOtherComplaint,
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      indexCurrentActive: 1,
      labelButton: 'Lanjutkan',
      isShowPopupConfirmation: false,
      isShowPopupInformation: false,
      typeConfirmation: 'cancel',
      dialogConfirmation: {},
      dialogInformmation: {},
      nameModal: 'addComplaint',
    }
  },
  computed: {
    ...mapGetters('add-complaint', {
      isValidFormInformationComplaint: 'getIsValidFormInformationComplaint',
      isValidFormLocationComplaint: 'getIsValidFormLocationComplaint',
      isValidFormOtherComplaint: 'getIsValidFormOtherComplaint',
      isLoading: 'getIsLoading',
      isError: 'getIsError',
    }),
  },
  methods: {
    submitFormAddComplaint() {
      switch (this.indexCurrentActive) {
        case 1:
          return this.submitFormInformationComplaintHandle()
        case 2:
          return this.submitFormLocationComplaintHandle()
        case 3:
          return this.submitFormOtherComplaintHandle()
        default:
          return null
      }
    },
    async submitFormInformationComplaintHandle() {
      await this.$refs.formInformationComplaint.inputDataInformationComplaintHandle()
      if (this.isValidFormInformationComplaint) {
        this.indexCurrentActive = 2
      }
    },
    async submitFormLocationComplaintHandle() {
      await this.$refs.formLocationComplaint.inputDataLocationComplaintHandle()
      if (this.isValidFormLocationComplaint) {
        this.indexCurrentActive = 3
        this.labelButton = 'Simpan'
      }
    },
    async submitFormOtherComplaintHandle() {
      await this.$refs.formOtherComplaint.inputDataOtherComplaintHandle()
      if (this.isValidFormOtherComplaint) {
        this.typeConfirmation = 'submit'
        this.showPopupConfirmationAddComplaint()
      }
    },
    prevToFormHandle() {
      if (this.indexCurrentActive > 1) {
        this.indexCurrentActive--
      }

      if (this.indexCurrentActive < 3) {
        this.labelButton = 'Lanjutkan'
      }
    },
    showPopupConfirmationAddComplaint() {
      if (this.typeConfirmation === 'submit') {
        this.dialogConfirmation = {
          title: 'Konfirmasi Tambah Aduan',
          nameModal: `${this.nameModal}Confirmation`,
          descriptionText: 'Apakah Anda yakin ingin menyimpan data ini?',
          buttonSubmit: {
            label: 'Ya, Simpan',
            variant: 'primary',
          },
          buttonCancel: {
            label: 'Batalkan',
            variant: 'secondary',
          },
        }
      } else {
        // confirmation cancel add complaint
        this.dialogConfirmation = {
          title: 'Konfirmasi Pembatalan',
          nameModal: `${this.nameModal}Confirmation`,
          descriptionText: 'Apakah Anda yakin ingin membatalkan aduan ini?',
          buttonSubmit: {
            label: 'Tetap Lanjutkan Aduan',
            variant: 'primary',
          },
          buttonCancel: {
            label: 'Ya, Batalkan Aduan',
            variant: 'secondary',
          },
        }
      }
      this.$store.commit('modals/OPEN', this.dialogConfirmation.nameModal)
    },
    submitPopupConfirmation() {
      if (this.typeConfirmation === 'submit') {
        this.$store.commit('modals/CLOSEALL')
        this.saveDataComplaint()
      } else {
        // confirmation cancel add complaint
        this.$store.commit('modals/CLOSE', this.dialogConfirmation?.nameModal)
      }
    },
    async saveDataComplaint() {
      this.typeConfirmation = 'information'
      const nameModal = `${this.nameModal}Information`
      const dataDialogSuccess = {
        nameModal,
        dialogModal: {
          title: 'Tambah Aduan',
          descriptionText: 'Tambah Data Aduan berhasil dilakukan',
          icon: { ...iconPopup.success },
        },
      }

      const dataDialogFailed = {
        nameModal,
        dialogModal: {
          title: 'Informasi Tambah Aduan',
          descriptionText: 'Tambah Data Aduan gagal dilakukan',
          icon: { ...iconPopup.failed },
        },
      }
      await this.$store.dispatch('add-complaint/submitDataAddComplaint')
      if (!this.isError) {
        this.dialogInformmation = dataDialogSuccess
      } else {
        this.dialogInformmation = dataDialogFailed
      }

      this.$store.commit('modals/OPEN', nameModal)
    },
    closePopupAddComplaint() {
      this.closePopup()
      this.$store.commit('add-complaint/setIsError', false)
    },
    closePopupConfirmation() {
      if (this.typeConfirmation === 'submit') {
        this.$store.commit('modals/CLOSE', this.dialogConfirmation?.nameModal)
      } else {
        // confirmation cancel add complaint
        this.$store.commit('modals/CLOSEALL')
        this.closePopupAddComplaint()
      }
    },
    closePopup() {
      this.indexCurrentActive = 1
      this.$store.dispatch('add-complaint/clearDataInformationComplaint')
      this.$store.dispatch('add-complaint/clearDataLocationComplaint')
      this.$store.dispatch('add-complaint/clearDataOtherComplaint')
      this.$emit('close')
    },
    backToForm() {
      this.$store.commit('add-complaint/setIsError', false)
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', this.nameModal)
    },
  },
}
</script>

<style scoped>
.form-add-complaint::-webkit-scrollbar {
  @apply h-5 w-5;
}

.form-add-complaint::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.form-add-complaint::-webkit-scrollbar-thumb {
  @apply rounded-xl border-[6px] border-solid border-transparent bg-gray-300 bg-clip-content;
}
</style>
