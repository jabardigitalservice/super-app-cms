<template>
  <div>
    <DialogWithStepper
      :show-popup="showPopup"
      title="Tambah Aduan"
      :index-current-active="indexCurrentActive"
      :label-button="labelButton"
      @close="showPopupConfirmationAddComplaint()"
      @prev="prevToFormHandle()"
      @submit="submitFormAddComplaint()"
    >
      <template #form-complaint>
        <div class="mt-8">
          <FormInformationComplaint v-show="indexCurrentActive === 1" ref="formInformationComplaint" />
          <FormLocationComplaint v-show="indexCurrentActive === 2" ref="formLocationComplaint" />
          <FormOtherComplaint v-show="indexCurrentActive === 3" ref="formOtherComplaint" />
        </div>
      </template>
    </DialogWithStepper>
    <DialogConfirmation :show-popup="isShowPopupConfirmation" :data-dialog="dataDialog" @submit="submitPopupConfirmationHandle()" @close="closePopupConfirmationHandle()" />
    <DialogLoading :show-popup="getIsLoading" />
    <DialogInformation :show-popup="isShowPopupInformation" :data-dialog="dataDialog" :icon-popup="iconPopup" @close="closePopupAddComplaintHandle ()" @submit="saveDataComplaintHandle()" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormInformationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/InformationComplaint'
import FormLocationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/LocationComplaint'
import FormOtherComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/OthersComplaint'
import popupAduanMasuk from '~/mixins/popup-aduan-masuk'

export default {
  name: 'DialogAddComplaint',
  components: { FormInformationComplaint, FormLocationComplaint, FormOtherComplaint },
  mixins: [popupAduanMasuk],
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      indexCurrentActive: 1,
      labelButton: 'Lanjutkan',
      isShowPopupConfirmation: false,
      isShowPopupInformation: false,
      typeConfirmation: 'cancel'
    }
  },
  computed: {
    ...mapGetters('add-complaint', [
      'getIsValidFormInformationComplaint',
      'getIsValidFormLocationComplaint',
      'getIsValidFormOtherComplaint',
      'getIsLoading',
      'getIsError'
    ])
  },
  methods: {
    submitFormAddComplaint () {
      switch (this.indexCurrentActive) {
        case 1 :
          return this.submitFormInformationComplaintHandle()
        case 2:
          return this.submitFormLocationComplaintHandle()
        case 3 :
          return this.submitFormOtherComplaintHandle()
      }
    },
    async submitFormInformationComplaintHandle () {
      await this.$refs.formInformationComplaint.inputDataInformationComplaintHandle()
      if (this.getIsValidFormInformationComplaint) {
        this.indexCurrentActive = 2
      }
    },
    async submitFormLocationComplaintHandle () {
      await this.$refs.formLocationComplaint.inputDataLocationComplaintHandle()
      if (this.getIsValidFormLocationComplaint) {
        this.indexCurrentActive = 3
        this.labelButton = 'Simpan'
      }
    },
    async submitFormOtherComplaintHandle () {
      await this.$refs.formOtherComplaint.inputDataOtherComplaintHandle()
      if (this.getIsValidFormOtherComplaint) {
        this.typeConfirmation = 'submit'
        this.showPopupConfirmationAddComplaint()
      }
    },
    prevToFormHandle () {
      if (this.indexCurrentActive > 1) {
        this.indexCurrentActive--
      }

      if (this.indexCurrentActive < 3) {
        this.labelButton = 'Lanjutkan'
      }
    },
    showPopupConfirmationAddComplaint () {
      this.isShowPopupConfirmation = true
      this.dataDialog = {
        showButtonCancel: true
      }

      if (this.typeConfirmation === 'submit') {
        this.setDataDialog({ title: 'Konfirmasi Tambah Aduan', description: 'Apakah Anda yakin ingin menyimpan data ini?', labelButtonSubmit: 'Ya Simpan' })
      } else {
        this.setDataDialog({
          title: 'Konfirmasi Pembatalan',
          description: 'Apakah Anda yakin ingin membatalkan aduan ini?',
          labelButtonCancel: 'Ya, Batalkan Aduan',
          labelButtonSubmit: 'Tetap Lanjutkan Aduan'
        })
      }
    },
    submitPopupConfirmationHandle () {
      if (this.typeConfirmation === 'submit') {
        this.saveDataComplaintHandle()
        this.$emit('close')
      } else {
        this.isShowPopupConfirmation = false
      }
    },
    async saveDataComplaintHandle () {
      this.$emit('close')
      this.isShowPopupConfirmation = false
      await this.$store.dispatch('add-complaint/submitDataAddComplaint')
      this.isShowPopupInformation = true
      this.typeConfirmation = 'information'
      const dataDialogInformation = {
        success: this.setSucessFailedInformationHandle('Tambah Data Aduan berhasil dilakukan', true),
        failed: this.setSucessFailedInformationHandle('Tambah Data Aduan gagal dilakukan', false)
      }
      this.dataDialog.title = 'Informasi Tambah Aduan'
      if (this.getIsError) {
        this.setDataDialog({ ...dataDialogInformation.failed })
        this.setIconPopup({ ...dataDialogInformation.failed.icon })
      } else {
        this.setDataDialog({ ...dataDialogInformation.success })
        this.setIconPopup({ ...dataDialogInformation.success.icon })
      }
    },
    closePopupAddComplaintHandle () {
      this.indexCurrentActive = 1
      this.isShowPopupConfirmation = false
      this.isShowPopupInformation = false
      this.$refs.formInformationComplaint.clearFormInformationComplaintHandle()
      this.$refs.formLocationComplaint.clearFormLocationComplaintHandle()
      this.$refs.formOtherComplaint.clearFormOtherComplaintHandle()
      this.$emit('close')
    },
    closePopupConfirmationHandle () {
      if (this.typeConfirmation === 'submit') {
        this.isShowPopupConfirmation = false
      } else {
        this.closePopupAddComplaintHandle()
      }
    }
  }
}
</script>
