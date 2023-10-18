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
              v-model="dataOtherComplaint.complaint_category_id.value"
              name="Kategori"
              label="Kategori"
              placeholder="Pilih Kategori"
              :error-message="(dataOtherComplaint.complaint_category_id.isChooseDirty || isSubmit) ? errors[0] : ''"
              :options="listCategoryComplaint"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <ValidationProvider v-slot="{ errors }" name="Sub Kategori" rules="requiredSelectForm">
            <jds-select
              v-model="dataOtherComplaint.complaint_subcategory_id.value"
              name="Sub Kategori"
              label="Kategori"
              placeholder="Pilih Sub Kategori"
              :error-message="(dataOtherComplaint.complaint_subcategory_id.isChooseDirty || isSubmit) ? errors[0] : '' "
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
              v-model="dataOtherComplaint.disposition.value"
              name="Disposisi"
              label="Disposisi"
              placeholder="Pilih Dinas Untuk Disposisi"
              :error-message="(dataOtherComplaint.disposition.isChooseDirty || isSubmit) ? errors[0] : '' "
              :options="listDisposition"
            />
          </ValidationProvider>
        </div>
        <div class="mb-4">
          <jds-input-text v-model="dataOtherComplaint.authority" name="Kewenangan" label="Kewenangan" disabled class="!w-full" />
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
      dataOtherComplaint: {
        complaint_category_id: {
          value: '',
          isChooseDirty: false
        },
        complaint_subcategory_id: {
          value: '',
          isChooseDirty: false
        },
        disposition: {
          value: '',
          isChooseDirty: false
        },
        authority: 'Pemerintah Provinsi Jawa Barat'
      },
      payloadOtherComplaint: {},
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
    dataOtherComplaint: {
      deep: true,
      handler () {
        this.changeDataOtherComplaint('choose')
        this.$fetch()
      }
    }
  },
  methods: {
    changeDataOtherComplaint (typeChange) {
      Object.keys(this.dataOtherComplaint).forEach((item) => {
        switch (typeChange) {
          case 'choose': // this type for change when user choose data
            if (this.dataOtherComplaint[item].value && item !== 'authority') {
              this.dataOtherComplaint[item].isChooseDirty = true
              this.payloadOtherComplaint[item] = this.dataOtherComplaint[item].value
            } else {
              this.payloadOtherComplaint[item] = this.dataOtherComplaint[item]
            }

            break
          case 'clear': // this type for clear form
            if (item !== 'authority') {
              this.dataOtherComplaint[item].isChooseDirty = false
              this.dataOtherComplaint[item].value = ''
            }
            break
          default:
            if (item !== 'authority') {
              this.dataOtherComplaint[item].isChooseDirty = false
            }
        }
      })
    },
    async inputDataOtherComplaintHandle () {
      this.isSubmit = true
      const isValid = await this.$refs.formOtherComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormOtherComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataOtherComplaint', { ...this.payloadOtherComplaint })
        this.changeDataOtherComplaint('submit')
        this.isSubmit = false
      }
    },
    clearFormOtherComplaintHandle () {
      this.changeDataOtherComplaint('clear')
      this.payloadOtherComplaint = {}
      this.isSubmit = false
    }
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
