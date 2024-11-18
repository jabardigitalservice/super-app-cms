<template>
  <div>
    <ValidationObserver ref="formOtherComplaint">
      <form class="form-add-complaint px-6 pb-6 pt-4">
        <h1 class="mb-2 font-roboto text-base font-bold">Kategori Aduan</h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataOtherComplaint.complaint_category_id"
            name="Kategori"
            label="Kategori"
            placeholder="Pilih Kategori"
            :error-message="errors[0]"
            :options="listCategoryComplaint"
            @change="
              changeSelectForm(
                dataOtherComplaint.complaint_category_id,
                'category'
              )
            "
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="dataOtherComplaint.complaint_category_id === 'lainnya'"
          v-slot="{ errors }"
          name="Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="dataOtherComplaint.complaint_subcategory_id"
            placeholder="Masukkan Kategori"
            :error-message="errors[0]"
            maxlength="50"
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="dataOtherComplaint.complaint_category_id !== 'lainnya'"
          v-slot="{ errors }"
          name="Sub Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataOtherComplaint.complaint_subcategory_id"
            :disabled="!dataOtherComplaint.complaint_category_id"
            name="Sub Kategori"
            label="Sub Kategori"
            placeholder="Pilih Sub Kategori"
            :error-message="errors[0]"
            :options="listSubCategoryComplaint"
            @change="
              changeSelectForm(
                dataOtherComplaint.complaint_subcategory_id,
                'subcategory'
              )
            "
          />
        </ValidationProvider>

        <ValidationProvider
          v-if="dataOtherComplaint.subcategory_id.includes('lainnya-terkait')"
          v-slot="{ errors }"
          name="Sub Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="dataOtherComplaint.subcategory_child_id"
            type="text"
            placeholder="Masukkan Sub Kategori"
            :error-message="errors[0]"
            maxlength="50"
          />
        </ValidationProvider>

        <h1 class="mb-2 font-roboto text-base font-bold">
          Disposisi & Kewenangan
        </h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="Disposisi"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <jds-select
            v-model="dataOtherComplaint.disposition"
            name="Disposisi"
            label="Disposisi"
            placeholder="Pilih Dinas Untuk Disposisi"
            :error-message="errors[0]"
            :options="listDisposition"
            @change="
              changeSelectForm(dataOtherComplaint.disposition, 'disposition')
            "
          />
        </ValidationProvider>
        <jds-input-text
          v-model="dataOtherComplaint.authority"
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
      isSubmit: false,
    }
  },
  computed: {
    listCategoryComplaint() {
      return this.$store.state['utilities-complaint'].listCategory.map(
        (category) => {
          return { label: category.name, value: category.id }
        }
      )
    },
    listSubCategoryComplaint() {
      return this.$store.state['utilities-complaint'].listSubCategory.map(
        (subcategory) => {
          return { label: subcategory.name, value: subcategory.id }
        }
      )
    },
    listDisposition() {
      return this.$store.state['utilities-complaint'].listDisposition.map(
        (disposition) => {
          return { label: disposition.name, value: disposition.name }
        }
      )
    },
    dataOtherComplaint: {
      get() {
        return { ...this.$store.state['add-complaint'].dataOtherComplaint }
      },
      set(value) {
        this.$store.commit('add-complaint/setDataOtherComplaint', value)
      },
    },
  },
  mounted() {
    this.$store.dispatch('utilities-complaint/getDataCategory')
    this.$store.dispatch(
      'utilities-complaint/getDataDispositions',
      'Pemerintah Provinsi Jawa Barat'
    )
  },
  methods: {
    changeSelectForm(value, typeSelect) {
      if (typeSelect === 'category') {
        if (this.dataOtherComplaint.category_id !== 'lainnya') {
          this.$store.dispatch('utilities-complaint/getDataSubCategory', value)
        }
        this.resetValueChildCategory()
      } else if (typeSelect === 'subcategory') {
        this.$store.commit('add-complaint/setDataOtherComplaint', {
          ...this.dataOtherComplaint,
          subcategory_child_id: '',
        })
      }
    },
    async inputDataOtherComplaintHandle() {
      this.isSubmit = true
      const isValid = await this.$refs.formOtherComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormOtherComplaint', isValid)
      if (isValid) {
        this.$store.commit('add-complaint/setDataOtherComplaint', {
          ...this.dataOtherComplaint,
        })
        this.isSubmit = false
      }
    },
    clearFormOtherComplaintHandle() {
      this.$store.dispatch('add-complaint/clearDataOtherComplaint')
      this.isSubmit = false
      this.$refs.formOtherComplaint.reset()
    },
    resetValueChildCategory() {
      this.$store.dispatch('add-complaint/setDataOtherComplaint', {
        ...this.dataOtherComplaint,
        subcategory_id: '',
        subcategory_child_id: '',
      })
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
