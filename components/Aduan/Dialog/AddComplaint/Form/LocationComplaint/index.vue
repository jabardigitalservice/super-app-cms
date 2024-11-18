<template>
  <div>
    <ValidationObserver ref="formLocationComplaint">
      <form class="form-add-complaint px-6 pb-6 pt-4">
        <h1 class="mb-2 font-roboto text-base font-bold">Lokasi Aduan</h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kota/Kabupaten"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataLocationComplaint.city_id"
            name="Kota/Kabupaten"
            label="Kota/Kabupaten"
            placeholder="Pilih Kota/Kabupaten"
            :error-message="errors[0]"
            :options="listCity"
            @change="changeSelectForm(dataLocationComplaint.city_id, 'city')"
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kecamatan"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataLocationComplaint.district_id"
            :disabled="!dataLocationComplaint.city_id"
            name="Kecamatan"
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            :error-message="errors[0]"
            :options="listDistrict"
            @change="
              changeSelectForm(dataLocationComplaint.district_id, 'district')
            "
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kelurahan"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataLocationComplaint.village_id"
            :disabled="!dataLocationComplaint.district_id"
            name="Kelurahan"
            label="Kelurahan"
            placeholder="Pilih Kelurahan"
            :error-message="errors[0]"
            :options="listVillage"
            @change="
              changeSelectForm(dataLocationComplaint.village_id, 'village')
            "
          />
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Detail Lokasi"
          rules="required"
          class="mb-4"
          tag="div"
        >
          <BaseTextArea
            v-model="addressDetail"
            placeholder="Masukkan Detail Lokasi"
            label="Detail Lokasi"
            name="Detail Lokasi"
            maxlength="255"
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <p class="mt-1 text-sm text-gray-600">
          Tersisa
          {{ 255 - addressDetail.length }} karakter
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
      default: false,
    },
  },
  data() {
    return {
      listDataCity: [],
      listDataDistrict: [],
      listDataVillage: [],
      addressDetail: '',
      isSubmit: false,
    }
  },
  computed: {
    listCity() {
      return this.$store.state['utilities-complaint'].listCity.map((city) => {
        return { value: city.id, label: city.name }
      })
    },
    listDistrict() {
      return this.$store.state['utilities-complaint'].listDistrict.map(
        (district) => {
          return { value: district.id, label: district.name }
        }
      )
    },
    listVillage() {
      return this.$store.state['utilities-complaint'].listVillage.map(
        (village) => {
          return { value: village.id, label: village.name }
        }
      )
    },
    dataLocationComplaint: {
      get() {
        return { ...this.$store.state['add-complaint'].dataLocationComplaint }
      },
      set(value) {
        this.$store.commit('add-complaint/setDataLocationComplaint', value)
      },
    },
  },
  mounted() {
    this.$store.dispatch('utilities-complaint/getDataCity')
  },
  methods: {
    changeSelectForm(value, typeSelect) {
      if (typeSelect === 'city') {
        this.$store.dispatch('utilities-complaint/getDataDistrict', value)
      } else if (typeSelect === 'district') {
        this.$store.dispatch('utilities-complaint/getDataVillage', value)
      }
    },
    async inputDataLocationComplaintHandle() {
      this.isSubmit = true
      const isValid = await this.$refs.formLocationComplaint.validate()
      this.$store.commit(
        'add-complaint/setIsValidFormLocationComplaint',
        isValid
      )
      if (isValid) {
        this.$store.commit('add-complaint/setDataLocationComplaint', {
          ...this.dataLocationComplaint,
          address_detail: this.addressDetail,
        })
        this.isSubmit = false
      }
    },
    clearFormLocationComplaintHandle() {
      this.$store.dispatch('add-complaint/clearDataLocationComplaint')
      this.addressDetail = ''
      this.isSubmit = false
      this.$refs.formLocationComplaint.reset()
    },
  },
}
</script>
