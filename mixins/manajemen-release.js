import {
  deleteConfirmationPopup,
  deleteInformationPopup,
  verificationConfirmationPopup,
  verificationInformationPopup,
  statusTable
} from '~/constant/manajemen-release'
import dialog from '~/mixins/dialog'
export default {
  data () {
    return {
      deleteConfirmationPopup,
      deleteInformationPopup,
      verificationConfirmationPopup,
      verificationInformationPopup,
      popupMessage: {
        titlePopup: '',
        detailPopup: ''
      },
      dataPopup: {
        title: '',
        descriptionText: '',
        dialogType: '',
        buttonLeft: {
          label: '',
          variant: ''
        },
        buttonRight: {
          label: '',
          variant: ''
        }
      },
      dataDetail: {},
      isError: false,
      showPopUp: false,
      popupName: '' //  to find out which popup is running, ex: 'verify' or 'delete'
    }
  },
  mixins: [dialog],

  methods: {
    showVerificationManajemenRelease (itemDataDetail) {
      this.confirmationPopupHandle(this.verificationConfirmationPopup, itemDataDetail, itemDataDetail.versiRilis)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopUp = true
      this.popupName = 'verify'
    },
    showDeleteManajemenRelease (itemDataDetail) {
      this.confirmationPopupHandle(this.deleteConfirmationPopup, itemDataDetail, itemDataDetail.versiRilis)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
      this.showPopUp = true
      this.popupName = 'delete'
    },
    submitHandle () {
      if (this.popupName === 'verify') {
        this.verificationManajemenRelease()
      } else {
        this.deleteManajemenRelease()
      }
    },
    async verificationManajemenRelease () {
      this.popupMessage = {}
      this.popupMessage.titlePopup = this.dataDetail.versiRilis
      this.dataPopup = {
        title: this.verificationInformationPopup.title,
        buttonLeft: this.verificationInformationPopup.buttonLeft
      }
      try {
        await this.$axios.post('/manajemen-release', { versiRilis: this.dataDetail.versiRilis })
      } catch {
        this.isError = true
      }
      this.informationPopupHandle(this.verificationInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    async deleteManajemenRelease () {
      this.popupMessage = {}
      this.popupMessage.titlePopup = this.dataDetail.versiRilis
      this.dataPopup = {
        title: this.deleteInformationPopup.title,
        buttonLeft: this.deleteInformationPopup.buttonLeft
      }
      try {
        await this.$axios.post('/manajemen-release', { versiRilis: this.dataDetail.versiRilis })
      } catch (error) {
        this.isError = true
      }
      this.informationPopupHandle(this.deleteInformationPopup, this.isError)
      this.$store.commit('dialog/setMessage', this.popupMessage)
      this.$store.dispatch('dialog/showHandle', this.dataPopup)
    },
    closeHandle () {
      this.$store.commit('dialog/clearState')
      this.showPopUp = false
      this.$fetch()
    },
    goToBackHandle () {
      this.$router.push('/management-release')
    },
    getColorIconStatus (status) {
      switch (status) {
        case statusTable.released:
          return 'bg-green-600'
        case statusTable.deleted:
          return 'bg-red-600'
        case statusTable.waiting:
          return 'bg-yellow-600'
        default:
          return 'bg-black'
      }
    }
  }
}
