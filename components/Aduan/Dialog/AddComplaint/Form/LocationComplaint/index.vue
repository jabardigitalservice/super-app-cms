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
              v-model="payloadLocationComplaint.city_id"
              name="Kota/Kabupaten"
              label="Kota/Kabupaten"
              placeholder="Pilih Kota/Kabupaten"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listCity"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kecamatan" rules="requiredSelectForm">
            <jds-select
              v-model="payloadLocationComplaint.district_id"
              name="Kecamatan"
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listDistrict"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kelurahan" rules="requiredSelectForm">
            <jds-select
              v-model="payloadLocationComplaint.subdistrict_id"
              name="Kelurahan"
              label="Kelurahan"
              placeholder="Pilih Kelurahan"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listSubDistrict"
            />
          </ValidationProvider>
        </div>
        <div>
          <ValidationProvider v-slot="{ errors }" name="Detail Lokasi" rules="required">
            <label class="text-[15px] text-gray-800">Detail Lokasi</label>
            <div class="mt-1">
              <textarea
                v-model="payloadLocationComplaint.address_detail"
                maxlength="255"
                placeholder="Masukkan Detail Lokasi"
                class="h-[83px] w-full resize-none rounded-lg bg-gray-50 border border-gray-400 py-[10px] px-2 font-lato text-gray-600 placeholder:text-sm placeholder:text-gray-600 focus:outline-none"
                :class="{ 'border border-red-600': (isInputDirty || isSubmit) ? errors[0] : '' }"
              />
            </div>
            <small class="text-red-600">{{ (isInputDirty || isSubmit) ? errors[0] : '' }}</small>
          </ValidationProvider>
          <p class="text-sm text-gray-600">
            Tersisa {{ 255-payloadLocationComplaint.address_detail.length }} karakter
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
      listCity: [{
        value: 'bandung',
        label: 'Bandung'
      },
      {
        value: 'tasikmalaya',
        label: 'Tasikmalaya'
      }],
      listDistrict: [{
        value: 'margahayu',
        label: 'Margahayu'
      }],
      listSubDistrict: [{
        value: 'jatihandap',
        label: 'Jatihandap'
      }],
      payloadLocationComplaint: {
        city_id: '',
        district_id: '',
        subdistrict_id: '',
        address_detail: ''
      },
      isInputDirty: false,
      isChooseDirty: false,
      isSubmit: false
    }
  },
  watch: {
    payloadLocationComplaint: {
      deep: true,
      handler () {
        if (this.payloadLocationComplaint.city_id || this.payloadLocationComplaint.district_id || this.payloadLocationComplaint.subdistrict_id) {
          this.isChooseDirty = true
        }
        if (this.payloadLocationComplaint.address_detail) {
          this.isInputDirty = true
        }
      }
    }
  },
  methods: {
    async inputDataLocationComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formLocationComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormLocationComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataLocationComplaint', { ...this.payloadLocationComplaint })
        this.isChooseDirty = false
        this.isInputDirty = false
        this.isSubmit = false
      }
    },
    clearFormLocationComplaintHandle () {
      this.payloadLocationComplaint = {
        city_id: '',
        district_id: '',
        subdistrict_id: '',
        address_detail: ''
      }
      this.isChooseDirty = false
      this.isInputDirty = false
      this.isSubmit = false
    }
  }
}
</script>
