<template>
  <div>
    <ValidationObserver ref="formOtherComplaint">
      <form class="px-6 pb-6 pt-4 form-add-complaint">
        <h1 class="mb-2 font-bold text-base font-roboto">
          Kategori Aduan
        </h1>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Kategori" rules="requiredSelectForm">
            <jds-select
              v-model="payloadOtherComplaint.complaint_category_id"
              name="Kategori"
              label="Kategori"
              placeholder="Pilih Kategori"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listCategoryComplaint"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Sub Kategori" rules="requiredSelectForm">
            <jds-select
              v-model="payloadOtherComplaint.complaint_subcategory_id"
              name="Sub Kategori"
              label="Kategori"
              placeholder="Pilih Sub Kategori"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : '' "
              :options="listSubCategoryComplaint"
            />
          </ValidationProvider>
        </div>
        <h1 class="mb-2 font-bold text-base font-roboto">
          Disposisi & Kewenangan
        </h1>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Disposisi" rules="requiredSelectForm">
            <jds-select
              v-model="payloadOtherComplaint.disposition"
              name="Disposisi"
              label="Disposisi"
              placeholder="Pilih Dinas Untuk Disposisi"
              :error-message="(isChooseDirty || isSubmit) ? errors[0] : '' "
              :options="listDisposition"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <jds-input-text v-model="payloadOtherComplaint.authority" name="Kewenangan" label="Kewenangan" disabled class="!w-full" />
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'FormLocationComplaint',
  components: { ValidationProvider, ValidationObserver },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      listDataCategoryComplaint: [],
      listDataSubCategoryComplaint: [],
      listDataDisposition: [],
      payloadOtherComplaint: {
        complaint_category_id: '',
        complaint_subcategory_id: '',
        disposition: '',
        authority: 'Pemerintah Provinsi Jawa Barat'
      },
      isChooseDirty: false,
      isSubmit: false
    }
  },
  async fetch () {
    try {
      const responseDataCategory = await this.$axios.get('/warga/complaints/categories')
      const dataCategoryComplaint = responseDataCategory.data.data
      this.listDataCategoryComplaint = dataCategoryComplaint
      if (this.payloadOtherComplaint.complaint_category_id) {
        const responseDataSubCategory = await this.$axios.get('/warga/complaints/subcategories', { params: { complaint_category_id: this.payloadOtherComplaint.complaint_category_id } })
        const dataSubCategoryComplaint = responseDataSubCategory.data.data
        this.listDataSubCategoryComplaint = dataSubCategoryComplaint
      }
      const responseDataDisposition = await this.$axios.get('/warga/complaints/dispositions', { params: { authority: 'Pemerintah Provinsi Jawa Barat' } })
      const dataDisposition = responseDataDisposition.data.data
      this.listDataDisposition = dataDisposition
    } catch {
      this.listDataCategoryComplaint = []
    }
  },
  computed: {
    listCategoryComplaint () {
      return this.listDataCategoryComplaint.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    listSubCategoryComplaint () {
      return this.listDataSubCategoryComplaint.map((item) => {
        return { label: item.name, value: item.id }
      })
    },
    listDisposition () {
      return this.listDataDisposition.map((item) => {
        return { label: item.name, value: item.name }
      })
    }
  },
  watch: {
    payloadOtherComplaint: {
      deep: true,
      handler () {
        if (this.payloadOtherComplaint.complaint_category_id) {
          this.$fetch()
          this.isChooseDirty = true
        }
        if (this.payloadOtherComplaint.complaint_subcategory_id || this.payloadOtherComplaint.disposition) {
          this.isChooseDirty = true
        }
      }
    }
  },
  methods: {
    async inputDataOtherComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formOtherComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormOtherComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataOtherComplaint', { ...this.payloadOtherComplaint })
        this.isChooseDirty = false
        this.isSubmit = false
      }
    }
  },
  clearFormOtherComplaintHandle () {
    this.payloadOtherComplaint = {
      complaint_category_id: '',
      complaint_subcategory_id: '',
      disposition: '',
      authority: 'Pemerintah Provinsi Jawa Barat'
    }
    this.isChooseDirty = false
    this.isSubmit = false
  }
}
</script>

<style scoped>
 .jds-input-text::v-deep.jds-input-text--disabled .jds-input-text__input-wrapper {
   @apply !bg-gray-200
 }
 .jds-input-text::v-deep.jds-input-text--disabled input:disabled{
   @apply !text-gray-600
 }
</style>
