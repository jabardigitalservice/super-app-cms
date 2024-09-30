<template>
  <div>
    <ValidationObserver ref="formOtherComplaint">
      <form class="form-add-complaint px-6 pb-6 pt-4">
        <h1 class="mb-2 font-roboto text-base font-bold">Kategori Aduan</h1>
        <ValidationProvider
          v-slot="{ errors, dirty }"
          name="Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="payloadOtherComplaint.complaint_category_id"
            name="Kategori"
            label="Kategori"
            placeholder="Pilih Kategori"
            :error-message="dirty || isSubmit ? errors[0] : ''"
            :options="listCategoryComplaint"
            @change="resectValueChildCategory"
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="payloadOtherComplaint.complaint_category_id === 'lainnya'"
          v-slot="{ errors, dirty }"
          name="Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="payloadOtherComplaint.complaint_subcategory_id"
            placeholder="Masukkan Kategori"
            :error-message="dirty || isSubmit ? errors[0] : ''"
            maxlength="50"
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="payloadOtherComplaint.complaint_category_id !== 'lainnya'"
          v-slot="{ errors, dirty }"
          name="Sub Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="payloadOtherComplaint.complaint_subcategory_id"
            :disabled="!payloadOtherComplaint.complaint_category_id"
            name="Sub Kategori"
            label="Sub Kategori"
            placeholder="Pilih Sub Kategori"
            :error-message="dirty || isSubmit ? errors[0] : ''"
            :options="listSubCategoryComplaint"
            @change="complaint_subcategory_child_id = ''"
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="
            payloadOtherComplaint.complaint_subcategory_id.includes(
              'lainnya-terkait'
            )
          "
          v-slot="{ errors, dirty }"
          name="Sub Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="payloadOtherComplaint.complaint_subcategory_child_id"
            type="text"
            placeholder="Masukkan Sub Kategori"
            :error-message="dirty || isSubmit ? errors[0] : ''"
            maxlength="50"
          />
        </ValidationProvider>

        <h1 class="mb-2 font-roboto text-base font-bold">
          Disposisi & Kewenangan
        </h1>
        <ValidationProvider
          v-slot="{ errors, dirty }"
          name="Disposisi"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="payloadOtherComplaint.disposition"
            name="Disposisi"
            label="Disposisi"
            placeholder="Pilih Dinas Untuk Disposisi"
            :error-message="dirty || isSubmit ? errors[0] : ''"
            :options="listDisposition"
          />
        </ValidationProvider>
        <jds-input-text
          v-model="payloadOtherComplaint.authority"
          name="Kewenangan"
          label="Kewenangan"
          disabled
          class="!w-full"
        />
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ENDPOINT_ADUAN } from '~/constant/endpoint-api'

export default {
  name: 'FormLocationComplaint',
  components: { ValidationProvider, ValidationObserver },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      listDataCategoryComplaint: [],
      listDataSubCategoryComplaint: [],
      listDataDisposition: [],
      payloadOtherComplaint: {
        complaint_category_id: '',
        complaint_subcategory_id: '',
        disposition: '',
        complaint_subcategory_child_id: '',
        authority: 'Pemerintah Provinsi Jawa Barat',
      },
      isSubmit: false,
    }
  },
  async fetch() {
    try {
      const responseDataCategory = await this.$axios.get(
        `${ENDPOINT_ADUAN}/categories`
      )
      const dataCategoryComplaint = responseDataCategory.data.data
      this.listDataCategoryComplaint = dataCategoryComplaint
      if (this.payloadOtherComplaint.complaint_category_id) {
        const responseDataSubCategory = await this.$axios.get(
          `${ENDPOINT_ADUAN}/subcategories`,
          {
            params: {
              complaint_category_id:
                this.payloadOtherComplaint.complaint_category_id,
            },
          }
        )
        const dataSubCategoryComplaint = responseDataSubCategory.data.data
        this.listDataSubCategoryComplaint = dataSubCategoryComplaint
      }
      const responseDataDisposition = await this.$axios.get(
        `${ENDPOINT_ADUAN}/dispositions`,
        { params: { authority: 'Pemerintah Provinsi Jawa Barat' } }
      )
      const dataDisposition = responseDataDisposition.data.data
      this.listDataDisposition = dataDisposition
    } catch {
      this.listDataCategoryComplaint = []
    }
  },
  computed: {
    listCategoryComplaint() {
      return this.listDataCategoryComplaint.map((category) => {
        return { label: category.name, value: category.id }
      })
    },
    listSubCategoryComplaint() {
      return this.listDataSubCategoryComplaint.map((subcategory) => {
        return { label: subcategory.name, value: subcategory.id }
      })
    },
    listDisposition() {
      return this.listDataDisposition.map((disposition) => {
        return { label: disposition.name, value: disposition.name }
      })
    },
  },
  watch: {
    payloadOtherComplaint: {
      deep: true,
      handler() {
        this.$fetch()
      },
    },
  },
  methods: {
    async inputDataOtherComplaintHandle() {
      this.isSubmit = true
      const isValid = await this.$refs.formOtherComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormOtherComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataOtherComplaint', {
          ...this.payloadOtherComplaint,
        })
        this.isSubmit = false
      }
    },
    clearFormOtherComplaintHandle() {
      this.payloadOtherComplaint = {
        complaint_category_id: '',
        complaint_subcategory_id: '',
        disposition: '',
        complaint_subcategory_child_id: '',
        authority: 'Pemerintah Provinsi Jawa Barat',
      }
      this.isSubmit = false
      this.$refs.formOtherComplaint.reset()
    },
    resectValueChildCategory() {
      this.payloadOtherComplaint.complaint_subcategory_id = ''
      this.payloadOtherComplaint.complaint_subcategory_child_id = ''
    },
  },
}
</script>

<style scoped>
.jds-input-text::v-deep.jds-input-text--disabled
  .jds-input-text__input-wrapper {
  @apply !bg-gray-200;
}
.jds-input-text::v-deep.jds-input-text--disabled input:disabled {
  @apply !text-gray-600;
}
</style>
