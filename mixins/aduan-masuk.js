export default {
  data () {
    return {
      popup: {
        confirmation: false,
        information: false,
        viewImage: false
      }
    }
  },
  methods: {
    closePopupHandle () {
      this.popup.confirmation = false
      this.popup.information = false
      this.popup.viewImage = false
    }
  }
}
