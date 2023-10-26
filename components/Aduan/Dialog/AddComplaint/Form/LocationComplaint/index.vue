<template>
  <div>
    <ValidationObserver ref="formLocationComplaint">
      <form class="px-6 pb-6 pt-4 form-add-complaint">
        <h1 class="mb-2 font-bold text-base font-roboto">
          Lokasi Aduan
        </h1>
        <ValidationProvider v-slot="{ errors,dirty }" name="Kota/Kabupaten" rules="requiredSelectForm" class="mb-4" tag="div">
          <jds-select
            v-model="payloadLocationComplaint.city_id"
            name="Kota/Kabupaten"
            label="Kota/Kabupaten"
            placeholder="Pilih Kota/Kabupaten"
            :error-message="(dirty || isSubmit) ? errors[0] : ''"
            :options="listCity"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors,dirty }" name="Kecamatan" rules="requiredSelectForm" class="mb-4" tag="div">
          <jds-select
            v-model="payloadLocationComplaint.district_id"
            :disabled="!payloadLocationComplaint.city_id"
            name="Kecamatan"
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            :error-message="(dirty || isSubmit) ? errors[0] : ''"
            :options="listDistrict"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors,dirty }" name="Kelurahan" rules="requiredSelectForm" class="mb-4" tag="div">
          <jds-select
            v-model="payloadLocationComplaint.subdistrict_id"
            :disabled="!payloadLocationComplaint.district_id"
            name="Kelurahan"
            label="Kelurahan"
            placeholder="Pilih Kelurahan"
            :error-message="(dirty || isSubmit) ? errors[0] : ''"
            :options="listVillage"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors,dirty }" name="Detail Lokasi" rules="required" class="mb-4" tag="div">
          <BaseTextArea
            v-model="addressDetail"
            placeholder="Masukkan Detail Lokasi"
            label="Detail Lokasi"
            name="Detail Lokasi"
            maxlength="255"
            :error-message="(dirty|| isSubmit) ? errors[0] : ''"
          />
        </ValidationProvider>
        <p class="text-sm text-gray-600 mt-1">
          Tersisa {{ 255-addressDetail.length }} karakter
        </p>
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
      payloadLocationComplaint: {
        city_id: '',
        district_id: '',
        subdistrict_id: ''
      },
      addressDetail: '',
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
      return this.listDataCity.map((city) => {
        return { value: city.id, label: city.name }
      })
    },
    listDistrict () {
      return this.listDataDistrict.map((district) => {
        return { value: district.id, label: district.name }
      })
    },
    listVillage () {
      return this.listDataVillage.map((village) => {
        return { value: village.id, label: village.name }
      })
    }
  },
  watch: {
    payloadLocationComplaint: {
      deep: true,
      handler () {
        this.$fetch()
      }
    },
    addressDetail () {
      this.isInputDirty = true
      this.payloadLocationComplaint.address_detail = this.addressDetail
    }
  },
  methods: {
    async inputDataLocationComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formLocationComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormLocationComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataLocationComplaint', { ...this.payloadLocationComplaint })
        this.isSubmit = false
      }
    },
    clearFormLocationComplaintHandle () {
      this.payloadLocationComplaint = {
        city_id: '',
        district_id: '',
        subdistrict_id: '',
        addressDetail: ''
      }
      this.addressDetail = ''
      this.isSubmit = false
      this.$refs.formLocationComplaint.reset()
    }
  }
}
</script>
