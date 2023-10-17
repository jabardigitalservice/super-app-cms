<template>
  <div>
    <DialogWithStepper :show-popup="showPopup" title="Tambah Aduan" :index-current-active="indexCurrentActive">
      <template #form-complaint>
        <div class="mt-8">
          <FormInformationComplaint v-show="indexCurrentActive === 1" ref="formInformationComplaint" />
          <FormLocationComplaint v-show="indexCurrentActive === 2" ref="formLocationComplaint" />
          <FormOtherComplaint v-show="indexCurrentActive === 3" ref="formOtherComplaint" />
        </div>
      </template>
      <template #footer>
        <BaseDialogFooter>
          <template #default>
            <div class="flex justify-between">
              <jds-button label="Batal" variant="tertiary" class="!font-bold !text-green-700" @click="closePopupAddComplaintHandle()" />
              <div class="flex">
                <div class="mr-3">
                  <jds-button label="Kembali" variant="secondary" class="!font-bold !border-green-700 !text-green-700" @click="prevToFormHandle()" />
                </div>
                <jds-button :label="labelButton" variant="primary" @click="showPopupConfirmationAddComplaint()" />
              </div>
            </div>
          </template>
        </BaseDialogFooter>
      </template>
    </DialogWithStepper>
    <DialogConfirmation :show-popup="isShowPopupConfirmation" :data-dialog="dataDialog" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormInformationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/InformationComplaint'
import FormLocationComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/LocationComplaint'
import FormOtherComplaint from '~/components/Aduan/Dialog/AddComplaint/Form/OthersComplaint'

export default {
  name: 'DialogAddComplaint',
  components: { FormInformationComplaint, FormLocationComplaint, FormOtherComplaint },
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
      dataDialog: {},
      isShowPopupConfirmation: false
    }
  },
  computed: {
    ...mapGetters('add-complaint', [
      'getIsValidFormInformationComplaint',
      'getIsValidFormLocationComplaint',
      'getIsValidFormOtherComplaint'
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
        this.$store.dispatch('add-complaint/submitDataAddComplaint')
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
      this.$emit('close')
      this.dataDialog = {
        title: 'Konfirmasi Pembatalan',
        description: 'Apakah Anda yakin ingin membatalkan aduan ini?',
        showButtonCancel: true,
        labelButtonCancel: 'Ya, Batalkan Aduan',
        labelButtonSubmit: 'Tetap Lanjutkan Aduan'
      }
    },
    closePopupAddComplaintHandle () {
      this.indexCurrentActive = 1
      this.$refs.formInformationComplaint.clearFormInformationComplaintHandle()
      this.$refs.formLocationComplaint.clearFormLocationComplaintHandle()
      this.$refs.formOtherComplaint.clearFormOtherComplaintHandle()
      this.$emit('close')
    }
  }
}
</script>
