<template>
  <div>
    <ValidationObserver ref="formOtherComplaint">
      <!-- START FORM -->
      <div class="form-add-complaint px-6 pb-6 pt-4">
        <h1 class="mb-2 font-roboto text-base font-bold">Kategori Aduan</h1>
        <ValidationProvider
          v-slot="{ errors }"
          name="Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <div>
            <label class="mb-1 text-[15px] text-gray-800">Kategori</label>
          </div>
          <BaseSelectSearch
            v-model="dataOtherComplaint.category_id"
            name="Kategori"
            :options="listCategoryComplaint"
            placeholder="Pilih Kategori"
            width-button="100%"
            width-option="592px"
            filterable
            class="select-search"
            :class="{
              'select-search--error mb-2': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'category_id')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider
          v-if="isOtherCategory"
          v-slot="{ errors }"
          name="Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="otherCategory"
            placeholder="Masukkan Kategori"
            :error-message="errors[0]"
            maxlength="50"
          />
        </ValidationProvider>
        <ValidationProvider
          v-if="!isOtherCategory"
          v-slot="{ errors }"
          name="Sub Kategori"
          rules="requiredSelectForm"
          class="mb-4"
          tag="div"
        >
          <label class="mb-1 text-[15px] text-gray-800">Sub Kategori</label>
          <BaseSelectSearch
            v-model="dataOtherComplaint.sub_category_id"
            :disabled="!dataOtherComplaint.category_id"
            name="Sub Kategori"
            :options="listSubCategoryComplaint"
            placeholder="Pilih Sub Kategori"
            width-button="100%"
            width-option="592px"
            filterable
            class="select-search"
            :class="{
              'select-search--error mb-2': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'sub_category_id')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <ValidationProvider
          v-if="isOtherSubcategory"
          v-slot="{ errors }"
          name="Sub Kategori"
          class="mb-4"
          rules="max:50|min:1|required"
          tag="div"
        >
          <BaseInputText
            v-model="otherSubcategory"
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
          <label class="mb-1 text-[15px] text-gray-800">Disposisi</label>
          <BaseSelectSearch
            v-model="dataOtherComplaint.disposition"
            name="Disposisi"
            :options="listDisposition"
            placeholder="Pilih Dinas Untuk Disposisi"
            width-button="100%"
            width-option="592px"
            fiterable
            class="select-search"
            :class="{
              'select-search--error mb-2': errors.length > 0,
            }"
            @change="(val) => changeSelectForm(val, 'disposition')"
          />
          <small class="text-red-600">{{ errors[0] }}</small>
        </ValidationProvider>
        <jds-input-text
          v-model="dataOtherComplaint.authority"
          name="Kewenangan"
          label="Kewenangan"
          disabled
          class="!w-full"
        />
      </div>
      <!-- END FORM -->
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
      isOtherCategory: false,
      isOtherSubcategory: false,
      otherCategory: '',
      otherSubcategory: '',
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
    changeSelectForm(value, keyObject) {
      this.isOtherCategory = false
      this.isOtherSubcategory = false
      this.dataOtherComplaint[keyObject] = value
      this.$store.commit('add-complaint/setDataOtherComplaint', {
        ...this.dataOtherComplaint,
      })
      if (keyObject === 'category_id') {
        this.isOtherSubcategory = false
        this.$store.commit('add-complaint/setDataOtherComplaint', {
          ...this.dataOtherComplaint,
          sub_category_id: '',
          subcategory_child_id: '',
        })
        this.isOtherCategory =
          this.dataOtherComplaint.category_id?.includes('lainnya')
      }

      if (keyObject === 'sub_category_id') {
        this.isOtherSubcategory =
          this.dataOtherComplaint.sub_category_id?.includes('lainnya-terkait')
      }

      if (!this.isOtherCategory) {
        this.$store.dispatch(
          'utilities-complaint/getDataSubCategory',
          this.dataOtherComplaint.category_id
        )
        this.resetValueChildCategory()
      }

      this.$refs.formOtherComplaint.reset()
    },
    async inputDataOtherComplaintHandle() {
      this.isSubmit = true
      const isValid = await this.$refs.formOtherComplaint.validate()
      this.$store.commit('add-complaint/setIsValidFormOtherComplaint', isValid)
      this.$store.commit('add-complaint/setDataOtherComplaint', {
        ...this.dataOtherComplaint,
        category_child_id: this.otherCategory,
        subcategory_child_id: this.otherSubcategory,
      })
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
      this.resetValueChildCategory()
      this.$refs.formOtherComplaint.reset()
    },
    resetValueChildCategory() {
      this.otherCategory = ''
      this.otherSubcategory = ''
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
