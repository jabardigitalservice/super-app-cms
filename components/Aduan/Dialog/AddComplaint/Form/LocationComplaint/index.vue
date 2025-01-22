<template>
  <div>
    <ValidationObserver ref="formLocationComplaint">
      <!-- START FORM -->
      <div class="form-add-complaint px-6 pb-6 pt-4">
        <h1 class="mb-2 font-roboto text-base font-bold">Lokasi Aduan</h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kota/Kabupaten"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <div>
            <label class="mb-1 text-[15px] text-gray-800">Kota/Kabupaten</label>
          </div>
          <BaseSelectSearch
            v-model="dataLocationComplaint.city_id"
            name="Kota/Kabupaten"
            :options="listCity"
            placeholder="Pilih Kota/Kabupaten"
            width-button="100%"
            width-option="592px"
            filterable
            class="select-search"
            :class="{
              'select-search--error mb-2': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'city_id')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kecamatan"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <div>
            <label class="mt-5 mb-1 text-[15px] text-gray-800">Kecamatan</label>
          </div>
          <BaseSelectSearch
            v-model="dataLocationComplaint.district_id"
            name="Kecamatan"
            :options="listDistrict"
            placeholder="Pilih Kecamatan"
            width-button="100%"
            width-option="592px"
            filterable
            class="select-search"
            :class="{
              'select-search--error mb-1': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'district_id')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kelurahan"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <div>
            <label class="mb-1 text-[15px] text-gray-800">Kelurahan</label>
          </div>
          <BaseSelectSearch
            v-model="dataLocationComplaint.village_id"
            name="Kelurahan"
            :options="listVillage"
            placeholder="Pilih Kelurahan"
            class="select-search"
            width-button="100%"
            width-option="592px"
            filterable
            :class="{
              'select-search--error mb-1': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'village_id')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
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
      </div>
      <!-- END FORM -->
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
    changeSelectForm(value, keyObject) {
      this.dataLocationComplaint[keyObject] = value
      this.$store.commit('add-complaint/setDataLocationComplaint', {
        ...this.dataLocationComplaint,
      })
      if (keyObject === 'city_id') {
        this.$store.dispatch('utilities-complaint/getDataDistrict', value)
      } else if (keyObject === 'district_id') {
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
        const city = this.$store.state['utilities-complaint'].listCity.find(
          (item) => item.id === this.dataLocationComplaint.city_id
        )
        const district = this.$store.state[
          'utilities-complaint'
        ].listDistrict.find(
          (item) => item.id === this.dataLocationComplaint.district_id
        )
        const village = this.$store.state[
          'utilities-complaint'
        ].listVillage.find(
          (item) => item.id === this.dataLocationComplaint.village_id
        )
        this.dataLocationComplaint.city_name = city.name
        this.dataLocationComplaint.district_name = district.name
        this.dataLocationComplaint.village_name = village.name
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
