<template>
  <div>
    <ValidationObserver ref="formLocationComplaint">
      <form class="px-6 pb-6 pt-4 form-add-complaint">
        <h1 class="mb-2 font-bold text-base font-roboto">
          Lokasi Aduan
        </h1>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kota/Kabupaten" rules="requiredSelectForm">
            <jds-select
              v-model="dataLocationComplaint.city_id.value"
              name="Kota/Kabupaten"
              label="Kota/Kabupaten"
              placeholder="Pilih Kota/Kabupaten"
              :error-message="(dataLocationComplaint.city_id.isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listCity"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kecamatan" rules="requiredSelectForm">
            <jds-select
              v-model="dataLocationComplaint.district_id.value"
              name="Kecamatan"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              :error-message="(dataLocationComplaint.district_id.isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listDistrict"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kelurahan" rules="requiredSelectForm">
            <jds-select
              v-model="dataLocationComplaint.subdistrict_id.value"
              name="Kelurahan"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              :error-message="(dataLocationComplaint.subdistrict_id.isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listVillage"
            />
          </ValidationProvider>
        </div>
        <div>
          <ValidationProvider v-slot="{ errors }" name="Detail Lokasi" rules="required">
            <BaseTextArea
              v-model="addressDetail"
              placeholder="Masukkan Detail Lokasi"
              label="Detail Lokasi"
              name="Detail Lokasi"
              maxlength="255"
              :error-message="(isInputDirty || isSubmit) ? errors[0] : ''"
            />
          </ValidationProvider>
          <p class="text-sm text-gray-600">
            Tersisa {{ 255-addressDetail.length }} karakter
          </p>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'FormLocationComplaint',
  components: { ValidationObserver, ValidationProvider },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      listDataCity: [],
      listDataDistrict: [],
      listDataVillage: [],
      dataLocationComplaint: {
        city_id: {
          value: '',
          isChooseDirty: false
        },
        district_id: {
          value: '',
          isChooseDirty: false
        },
        subdistrict_id: {
          value: '',
          isChooseDirty: false
        }
      },
      addressDetail: '',
      isInputDirty: false,
      payloadLocationComplaint: {},
      isSubmit: false
    }
  },
  async fetch () {
    try {
      const responseDataCity = await this.$axios.get('/area/city', { params: { provinceId: 32 } })
      const dataCity = responseDataCity.data.data
      this.listDataCity = dataCity
      if (this.payloadLocationComplaint.city_id) {
        const responseDataDistrict = await this.$axios.get('/area/district', { params: { cityId: this.payloadLocationComplaint.city_id } })
        const dataDistrict = responseDataDistrict.data.data
        this.listDataDistrict = dataDistrict
      }
      if (this.payloadLocationComplaint.district_id) {
        const responseDataVillage = await this.$axios.get('/area/village', { params: { districtId: this.payloadLocationComplaint.district_id } })
        const dataVillage = responseDataVillage.data.data
        this.listDataVillage = dataVillage
      }
    } catch {
      this.listDataCity = []
      this.listDataDistrict = []
      this.listDataVillage = []
    }
  },
  computed: {
    listCity () {
      return this.listDataCity.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listDistrict () {
      return this.listDataDistrict.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    listVillage () {
      return this.listDataVillage.map((item) => {
        return { value: item.id, label: item.name }
      })
    }
  },
  watch: {
    dataLocationComplaint: {
      deep: true,
      handler () {
        this.changeDataLocationComplaint('input-choose')
        this.$fetch()
      }
    },
    addressDetail () {
      this.isInputDirty = true
      this.payloadLocationComplaint.address_detail = this.addressDetail
    }
  },
  methods: {
    changeDataLocationComplaint (typeChange) {
      Object.keys(this.dataLocationComplaint).forEach((item) => {
        switch (typeChange) {
          case 'input-choose': // this type for change when user choose & input data
            if (this.dataLocationComplaint[item].value) {
              this.dataLocationComplaint[item].isChooseDirty = true
              this.payloadLocationComplaint[item] = this.dataLocationComplaint[item].value
            }
            break
          case 'clear': // this type for clear form
            this.dataLocationComplaint[item].isChooseDirty = false
            this.dataLocationComplaint[item].value = ''
            break
          default:
            this.dataLocationComplaint[item].isChooseDirty = false
        }
      })
    },
    async inputDataLocationComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formLocationComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormLocationComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataLocationComplaint', { ...this.payloadLocationComplaint })
        this.changeDataLocationComplaint('submit')
        this.isSubmit = false
      }
    },
    clearFormLocationComplaintHandle () {
      this.changeDataLocationComplaint('clear')
      this.payloadLocationComplaint = {}
      this.isSubmit = false
      this.isInputDirty = false
      this.addressDetail = ''
    }
  }
}
</script>
