<template>
  <BaseDialog :show-popup="showPopup">
    <BaseDialogPanel>
      <BaseDialogHeader :title="dataDialog.title" />
      <div class="px-6 pb-6">
        <ValidationObserver ref="form">
          <form>
            <BaseDialogDescription :description="dataDialog.description" :sub-description="dataDialog.subDescription" />
            <div class="mt-4">
              <ValidationProvider v-slot="{errors}" name="Catatan Aduan" rules="required">
                <label class="text-[15px] text-gray-800 font-lato">Catatan Aduan Gagal Diverifikasi</label><br>
                <div class="mt-1">
                  <textarea
                    v-model="fieldTextArea"
                    :class="{ 'border border-red-600': isInputTextArea && errors.length>0 }"
                    placeholder="Catatan Aduan"
                    maxlength="255"
                    class="w-[462px] h-[83px] border border-gray-300 rounded-lg focus:outline-none px-2 py-[10px] placeholder:text-[14px] placeholder:font-lato"
                    @input="checkInputtextArea()"
                  />
                </div>

                <small v-show="isInputTextArea" class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
              <p class="text-xs text-gray-600">
                Tersisa {{ 255 - fieldTextArea.length }} Karakter
              </p>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <BaseDialogFooter :label-button=" dataDialog.labelButton" @close="$emit('close')" @submit="submitConfirmationFaileComplaintdHandle()" />
    </BaseDialogPanel>
  </BaseDialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'DialogInputTextArea',
  components: { ValidationProvider, ValidationObserver },
  props: {
    showPopup: {
      type: Boolean,
      default: false
    },
    dataDialog: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      fieldTextArea: '',
      isInputTextArea: false // for check if user has typing something or no
    }
  },
  methods: {
    checkInputtextArea () {
      this.isInputTextArea = true
    },
    async submitConfirmationFaileComplaintdHandle () {
      const isDataValid = await this.$refs.form.validate()
      if (isDataValid) {
        this.$emit('submit', { ...this.dataDialog, note: this.fieldTextArea, status: 'failed' })
      }
      this.fieldTextArea = ''
      this.isInputTextArea = false
    }
  }
}
</script>
