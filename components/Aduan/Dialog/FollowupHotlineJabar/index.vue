<template>
  <div>
    <BaseDialogFrame :name="nameModal">
      <BaseDialogPanel class="!h-[370px] w-[510px]">
        <BaseDialogHeader title="Tindaklanjuti Aduan" />
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form class="w-full">
            <div class="px-6 pt-4 pb-6">
              <h1 class="font-roboto text-base font-bold">Informasi Aduan</h1>
              <div class="mb-6 grid grid-cols-2 gap-x-2">
                <BaseDialogDescription
                  description="No.Aduan"
                  :sub-description="dataComplaint?.complaint_id"
                />
                <div>
                  <label class="text-sm">Sumber Aduan</label>
                  <div class="mt-1 flex">
                    <div
                      v-if="dataComplaint?.complaint_source?.logo"
                      class="h-[23px] w-[23px] flex-shrink-0 rounded-[4px] bg-[#F6F6F9]"
                      :class="{
                        'py-[3px] px-[5px]':
                          dataComplaint?.complaint_source?.logo,
                      }"
                    >
                      <img
                        :src="
                          require(`~/assets/logo/${dataComplaint?.complaint_source?.logo}`)
                        "
                        alt="logo"
                        width="11"
                        height="15"
                      />
                    </div>
                    <p
                      class="text-sm font-bold"
                      :class="{ 'ml-2': dataComplaint?.complaint_source?.logo }"
                    >
                      {{ dataComplaint?.complaint_source?.name || '-' }}
                    </p>
                  </div>
                </div>
              </div>
              <h1 class="mb-2 font-roboto text-base font-bold">
                Estimasi Tindaklanjut Aduan
              </h1>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Tanggal Deadline"
                class="w-full"
                tag="div"
              >
                <label class="mb-1 text-[15px] text-gray-800"
                  >Tanggal Deadline</label
                ><br />
                <date-picker
                  v-model="payload.deadline_date"
                  format="DD/MM/YYYY"
                  class="!w-full"
                  :class="{ 'mx-datepicker--error': errors[0] }"
                  placeholder="Pilih Tanggal Deadline"
                  name="Tanggal Deadline"
                  :disabled-date="disabledDate"
                  @clear="clearDate"
                >
                  <template #icon-calendar>
                    <jds-icon
                      name="calendar-date-outline"
                      size="sm"
                      fill="#069550"
                    />
                  </template> </date-picker
                ><br />
                <small class="text-red-600">{{ errors[0] }}</small>
              </ValidationProvider>
            </div>
          </form>
          <BaseDialogFooterNew name="followupHotlineJabar">
            <div class="mr-4">
              <jds-button
                label="Kembali"
                type="button"
                variant="secondary"
                class="!text-[14px] !font-bold"
                @click="closePopup()"
              />
            </div>
            <jds-button
              label="Tindaklanjuti"
              type="button"
              variant="primary"
              :disabled="invalid"
              @click="showConfirmationDialog()"
            />
          </BaseDialogFooterNew>
        </ValidationObserver>
      </BaseDialogPanel>
    </BaseDialogFrame>
    <DialogConfirmationBasic
      :dialog-modal="dialogConfirmation"
      @confirmation-button="submitFollowup()"
      @cancel="backToForm()"
    />
    <DialogInformationNew
      :name-modal="dialogInformmation.nameModal"
      :dialog-modal="dialogInformmation.dialogModal"
      :is-success="isSuccess"
      @retry="backToForm()"
    />
    <DialogLoading :show-popup="isLoading" />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ENDPOINT_ADUAN_HOTLINE_JABAR } from '~/constant/endpoint-api'
import { formatDate } from '~/utils'
import { iconPopup } from '~/constant/icon-popup-new'

export default {
  name: 'DialogFollowupHotlineJabar',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      payload: {
        deadline_date: new Date(),
      },
      dialogConfirmation: {},
      dialogInformmation: {},
      isLoading: false,
      isSuccess: false,
      nameModal: '',
    }
  },
  computed: {
    dataComplaint() {
      return { ...this.$store.state['popup-complaint'].dataComplaint }
    },
  },
  mounted() {
    this.nameModal = 'followupHotlineJabar'
  },
  methods: {
    disabledDate: function (date) {
      const currentYear = new Date().getFullYear()
      const nextDate = new Date().setFullYear(currentYear + 1)
      return date < new Date() || date > nextDate
    },
    clearDate() {
      this.payload.deadline_date = ''
    },
    closePopup() {
      this.payload.deadline_date = new Date()
      this.$refs.form.reset()
      this.$store.commit('modals/CLOSEALL')
    },
    async showConfirmationDialog() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.$store.commit('modals/CLOSEALL')
        const dataDialog = {
          title: 'Tindaklanjuti Aduan',
          nameModal: `${this.nameModal}Confirmation`,
          descriptionText:
            'Apakah anda yakin ingin menindaklanjuti aduan tersebut?',
          button: {
            label: 'Ya, lanjutkan',
            variant: 'primary',
          },
        }
        this.dialogConfirmation = dataDialog
        this.$store.commit('modals/OPEN', dataDialog.nameModal)
      }
    },
    backToForm() {
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', 'followupHotlineJabar')
    },
    async submitFollowup() {
      this.$store.commit('modals/CLOSEALL')
      this.isLoading = true
      // SET API
      const dataApi = {
        method: 'patch',
        url: `${ENDPOINT_ADUAN_HOTLINE_JABAR}/5x9-2xe-4x5-bxb-1x31/followup`,
      }

      // SET PAYLOAD
      this.payload = {
        deadline_date: formatDate(
          this.payload?.deadline_date || '',
          'yyyy-MM-dd'
        ),
        user_id: this.$auth?.user?.identifier,
      }
      // SET DIALOG INFORMATION
      const nameModal = `${this.nameModal}Information`
      const dataDialogSuccess = {
        nameModal,
        dialogModal: {
          title: 'Tindaklanjuti Aduan',
          descriptionText: 'Tindaklanjuti Aduan Anda berhasil diproses',
          icon: { ...iconPopup.success },
        },
      }

      const dataDialogFailed = {
        nameModal,
        dialogModal: {
          title: 'Tindaklanjuti Aduan',
          descriptionText: 'Tindaklanjuti Aduan Anda gagal diproses',
          icon: { ...iconPopup.failed },
        },
      }
      try {
        this.$store.commit('popup-complaint/setIsMockApi', true)
        await this.$store.dispatch('popup-complaint/integrationApi', {
          dataApi,
          payload: this.payload,
        })
        this.dialogInformmation = dataDialogSuccess
        this.isSuccess = true
        // this.$store.commit('modals/OPEN', dataDialogSuccess.nameModal)
      } catch {
        this.dialogInformmation = dataDialogFailed
        this.isSuccess = false
        // this.$store.commit('modals/OPEN', dataDialogFailed.nameModal)
      } finally {
        this.isLoading = false
      }
      if (!this.isLoading) {
        this.$store.commit('modals/OPEN', this.dialogInformmation?.nameModal)
      }
    },
  },
}
</script>
