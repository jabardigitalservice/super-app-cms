<template>
  <div>
    <BaseDialogFrame :name="modalName">
      <BaseDialogPanel class="w-[510px]">
        <BaseDialogHeader :title="title" />
        <ValidationObserver
          ref="form"
          tag="div"
          class="form-add-account w-full px-6"
        >
          <!-- START CHECK EMAIL -->
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            name="Email"
            tag="div"
          >
            <div class="pb-4" :class="{ '!pb-3': errors.length > 0 }">
              <BaseInputText
                v-model="payload.email"
                name="Email"
                label="Email"
                placeholder="Masukkan Email"
                class="form-input-text"
                :error-message="errors[0]"
                :disabled="typeDialog === 'form'"
              />
            </div>
            <SectionMessage
              v-show="typeDialog === 'sectionMessage'"
              :message="sectionMessage.message"
              :icon="sectionMessage.icon"
              :class="{
                '!border !border-green-800 !bg-green-50':
                  sectionMessage.variant === 'success',
              }"
            />
          </ValidationProvider>
          <!-- END CHECK EMAIL -->
          <div v-show="typeDialog === 'form'">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="Nama"
              tag="div"
            >
              <jds-input-text
                v-model="payload.name"
                name="Nama"
                label="Nama"
                placeholder="Masukkan Nama"
                :error-message="errors[0]"
                class="pb-4"
                :class="{ '!pb-3': errors.length > 0 }"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              class="pb-4"
              rules="requiredSelectForm"
              name="Status Kepegawaian"
            >
              <jds-radio-button-group
                v-model="payload.employee_status"
                :error-message="errors[0]"
                class="full-width"
                label="Pilih Status Kepegawaian"
                :items="[
                  { label: 'ASN', val: 'asn' },
                  { label: 'Non-ASN', val: 'non_asn' },
                ]"
                value-key="val"
                placeholder-key="label"
                name="Status Kepegawaian"
                orientation="horizontal"
                @change="handleChangeRadioButton"
              />
            </ValidationProvider>
            <ValidationProvider
              v-if="payload.employee_status === 'asn'"
              v-slot="{ errors }"
              rules="required|numeric"
              name="Nip"
              tag="div"
            >
              <BaseInputText
                v-model="payload.employee_number"
                name="Nip"
                label="NIP"
                maxlength="18"
                placeholder="Masukkan NIP"
                :error-message="errors[0]"
                class="pb-4"
                :class="{ '!pb-3': errors.length > 0 }"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Role"
              rules="requiredSelectForm"
              tag="div"
            >
              <jds-select
                v-model="payload.role_id"
                name="role"
                label="Role"
                placeholder="Pilih Role"
                :error-message="errors[0]"
                :options="listRole"
                class="pb-4"
                :class="{ '!pb-6': errors.length > 0 }"
                @change="handleChangeSelectRole()"
              />
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              name="Instansi"
              rules="requiredSelectForm"
              tag="div"
            >
              <jds-select
                v-model="payload.organization_id"
                name="instansi"
                label="Instansi"
                placeholder="Pilih Instansi"
                :error-message="errors[0]"
                :options="listOrganization"
              />
            </ValidationProvider>
          </div>
        </ValidationObserver>
        <BaseDialogFooterNew :name="modalName" @cancel="clearForm">
          <div
            v-for="button in listButton"
            :key="button.id"
            class="flex justify-end"
          >
            <div v-show="button.typeDialog.includes(typeDialog)" class="ml-3">
              <jds-button
                type="button"
                :variant="button.variant"
                @click="handleButtonAction(button.id)"
              >
                <div
                  v-if="isLoadingCheck && button.id === 'checkEmail'"
                  class="flex items-center"
                >
                  <jds-spinner size="14" />
                  <p class="ml-2">Loading...</p>
                </div>

                <p v-else class="!text-[14px] !font-bold">{{ button.label }}</p>
              </jds-button>
            </div>
          </div>
        </BaseDialogFooterNew>
      </BaseDialogPanel>
    </BaseDialogFrame>
    <DialogConfirmationNew
      :dialog-modal="dialogConfirmation"
      :detail-item-modal="detailItem"
    >
      <template #footer-custom>
        <div class="mr-4">
          <jds-button
            label="Kembali"
            type="button"
            variant="secondary"
            class="!text-[14px] !font-bold"
            @click="backToForm()"
          />
        </div>
        <jds-button
          label="Konfirmasi"
          type="button"
          variant="primary"
          class="!text-[14px] !font-bold"
          @click="submitAccount()"
        />
      </template>
    </DialogConfirmationNew>
    <DialogInformationNew
      :name-modal="dialogInformation?.nameModal"
      :dialog-modal="dialogInformation"
      :is-success="isSuccess"
      @close-all-modal="$emit('close')"
    >
      <template #button-error>
        <jds-button
          label="Ulangi"
          type="button"
          variant="primary"
          class="!text-[14px] !font-bold"
          @click="backToForm()"
        />
      </template>
    </DialogInformationNew>
    <DialogLoading :show-popup="isLoadingSubmit" />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { iconPopup } from '~/constant/icon-popup-new'

export default {
  name: 'DialogAccount',
  components: { ValidationObserver, ValidationProvider },
  props: {
    title: {
      type: String,
      default: '',
    },
    modalName: {
      type: String,
      default: '',
      required: true,
      validator(value) {
        return ['resendEmail', 'addAccount'].includes(value)
      },
    },
    idAccount: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      listDataRole: [],
      listDataOrganization: [],
      detailItem: {
        title: '',
      },
      addAccount: {
        nameModal: 'add-account',
        methodApi: 'post',
        dialogConfirmation: {
          title: 'Konfirmasi Tambah Akun',
          descriptionText:
            'Apakah Anda yakin ingin menambahkan akun ini? Link verifikasi akan dikirimkan ke email dibawah ini:',
        },
        dialogInformation: {
          success: {
            title: 'Pembuatan Akun berhasil',
            descriptionText:
              'Email telah berhasil dikirimkan, silahkan melakukan konfirmasi kepada pemilik email yang bersangkutan.',
            icon: iconPopup.success,
          },
          error: {
            title: 'Pembuatan Akun Gagal',
            descriptionText:
              'Terjadi kesalahan saat membuat akun baru. Silakan coba lagi',
            icon: iconPopup.failed,
          },
        },
      },
      resendEmail: {
        nameModal: 'resend-email',
        methodApi: 'put',
        dialogConfirmation: {
          title: 'Konfirmasi Kirim Ulang Email Verifikasi',
          descriptionText:
            'Apakah Anda yakin ingin mengirimkan ulang email verifikasi? Link verifikasi akan dikirimkan ke email dibawah ini:',
        },
        dialogInformation: {
          success: {
            title: 'Kirim Ulang Email Verifikasi Berhasil',
            descriptionText:
              'Email verifikasi telah berhasil dikirimkan, silahkan melakukan konfirmasi kepada pemilik email yang bersangkutan.',
            icon: iconPopup.success,
          },
          error: {
            title: 'Kirim Ulang Email Verifikasi Gagal',
            descriptionText:
              'Terjadi kesalahan saat mengirimkan ulang email verifikasi. Silakan coba lagi',
            icon: iconPopup.failed,
          },
        },
      },
      dialogConfirmation: {},
      dialogInformation: {},
      sectionMessage: {},
      listButton: [
        {
          id: 'back',
          label: 'Kembali',
          variant: 'secondary',
          typeDialog: ['sectionMessage'],
        },
        {
          id: 'cancel',
          label: 'Batal',
          variant: 'secondary',
          typeDialog: ['checkEmail', 'form'],
        },
        {
          id: 'checkEmail',
          label: 'Periksa',
          variant: 'primary',
          typeDialog: ['checkEmail'],
        },
        {
          id: 'verified',
          label: 'Verifikasi Akun',
          variant: 'primary',
          typeDialog: ['form'],
        },
        {
          id: 'resendEmail',
          label: 'Kirim Ulang Email Verifikasi',
          variant: 'primary',
          typeDialog: ['resendEmail'],
        },
        {
          id: 'sectionMessage',
          label: 'Ya, Gunakan',
          variant: 'primary',
          typeDialog: ['sectionMessage'],
        },
      ],
      isLoadingSubmit: false,
      isLoadingCheck: false,
      isSuccess: false,
    }
  },
  async fetch() {
    try {
      const responseDataRole = await this.$axios.get(
        '/users/admin/complaint/roles'
      )
      this.listDataRole = responseDataRole.data?.data
      const responseDataOrganization = await this.$axios.get(
        `/users/admin/complaint/organizations`,
        { params: { role_id: this.payload.role_id } }
      )
      this.listDataOrganization = responseDataOrganization.data?.data
    } catch {
      this.listDataRole = []
      this.listDataOrganization = []
    }
  },
  computed: {
    listRole() {
      return this.listDataRole.map((item) => {
        return {
          value: item.id,
          label: item.name,
        }
      })
    },
    listOrganization() {
      return this.listDataOrganization.map((item) => {
        return { value: item.id, label: item.name }
      })
    },
    payload: {
      get() {
        return { ...this.$store.state['management-account'].payload }
      },
      set(value) {
        this.$store.commit('management-account/setPayload', value)
      },
    },
    typeDialog: {
      get() {
        return this.$store.state['management-account'].typeDialog
      },
      set(value) {
        this.$store.commit('management-account/setTypeDialog', value)
      },
    },
  },
  watch: {
    payload: {
      handler() {
        if (this.payload.email) {
          this.errorMessageEmail = ''
        }
      },
      deep: true,
    },
  },
  methods: {
    handleButtonAction(idButton) {
      switch (idButton) {
        case 'checkEmail':
          return this.checkEmail()
        case 'sectionMessage':
          return this.handleSectionMessage()
        case 'verified':
          return this.showPopupConfirmation()
        case 'back':
          return this.$store.commit(
            'management-account/setTypeDialog',
            'checkEmail'
          )
        case 'cancel':
          return this.handleCancelButton()
        default:
          return ''
      }
    },
    async checkEmail() {
      this.isLoadingCheck = true

      try {
        const response = await this.$axios.get(
          `/users/admin/complaint/email/${this.payload.email}`
        )
        this.payload.name = response.data.data.name
        this.setSectionMessage('emailSso')
      } catch (error) {
        this.setSectionMessage('emailNotExist')
      } finally {
        this.isLoadingCheck = false
      }
      this.$store.commit('management-account/setTypeDialog', 'sectionMessage') // show section message
    },
    handleSectionMessage() {
      this.$store.commit('management-account/setTypeDialog', 'form')
    },
    handleCancelButton() {
      this.clearForm()
      this.$store.commit('modals/CLOSEALL')
    },
    async showPopupConfirmation() {
      const isValid = await this.$refs.form.validate()
      if (isValid) {
        this.$store.commit('modals/CLOSE', this.modalName)
        this.detailItem.title = this.payload.email
        this.setDialogConfirmation()
        this.$store.commit('modals/OPEN', this.dialogConfirmation.nameModal)
      }
    },
    setDialogConfirmation() {
      const { dialogConfirmation, nameModal } = this[this.modalName]
      this.dialogConfirmation = {
        title: dialogConfirmation.title,
        descriptionText: dialogConfirmation.descriptionText,
        nameModal: `${nameModal}-confirmation`,
        button: { label: 'Konfirmasi', variant: 'primary' },
      }
    },
    setDialogInformation(typeInformation) {
      const { dialogInformation, nameModal } = this[this.modalName]
      this.dialogInformation = {
        title: dialogInformation[typeInformation].title,
        descriptionText: dialogInformation[typeInformation].descriptionText,
        nameModal: `${nameModal}-${typeInformation}-information`,
        icon: dialogInformation[typeInformation].icon,
      }
    },
    setSectionMessage(typeSection) {
      const sectionMessage = {
        emailSso: {
          variant: 'success',
          message:
            'Email ini sudah terdaftar dalam database Sapawarga. Apakah Anda ingin menggunakannya sebagai akun admin untuk aduan?',
          icon: {
            path: '/icon/default/success-icon.svg',
            fill: '#069550',
          },
        },
        emailNotExist: {
          variant: 'info',
          message:
            'Email belum terdaftar dalam database Sapawarga. Apakah Anda ingin menggunakannya sebagai akun admin untuk aduan?',
        },
      }
      this.sectionMessage = sectionMessage[typeSection]
    },
    handleChangeRadioButton(value) {
      this.$store.commit('management-account/setPayload', {
        ...this.payload,
        employeeStatus: value,
      })
    },
    handleChangeSelectRole() {
      this.$store.commit('management-account/setPayload', {
        ...this.payload,
        organizationId: '',
      })
      this.$fetch()
    },
    async submitAccount() {
      this.$store.commit('modals/CLOSEALL')
      this.isLoadingSubmit = true
      const methodApi = this[this.modalName].methodApi
      try {
        const idAccount = `/${this.idAccount}` || ''
        await this.$axios[methodApi](`/users/admin/complaint${idAccount}`, {
          ...this.payload,
        })
        this.isSuccess = true
        this.setDialogInformation('success')
        this.clearForm()
      } catch (error) {
        this.isSuccess = false
        this.setDialogInformation('error')
      } finally {
        this.isLoadingSubmit = false
      }
      this.$store.commit('modals/OPEN', this.dialogInformation.nameModal)
    },
    backToForm() {
      this.$store.commit('modals/CLOSEALL')
      this.$store.commit('modals/OPEN', this.modalName)
    },

    clearForm() {
      this.payload = {
        name: '',
        email: '',
        role_id: '',
        organization_id: '',
      }
      this.$store.commit('management-account/setTypeDialog', '')
    },
  },
}
</script>

<style>
.form-add-account .jds-select {
  @apply !w-[462px];
}

.form-add-account .jds-radio-button-group__list--horizontal {
  @apply !grid grid-cols-2;
}

.form-add-account .form-input-text input {
  @apply !bg-white;
}

.form-add-account .form-input-text input:disabled {
  @apply !cursor-not-allowed !border !border-gray-300 !bg-gray-200;
}
</style>
