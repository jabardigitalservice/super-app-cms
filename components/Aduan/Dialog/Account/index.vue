<template>
  <div>
    <BaseDialogFrame :name="modalName">
      <BaseDialogPanel class="w-[510px]">
        <BaseDialogHeader :title="title" />
        <ValidationObserver
          ref="form"
          tag="div"
          class="form-add-account w-full px-6 pb-6"
        >
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
              v-model="payload.employeeStatus"
              :error-message="errors[0]"
              class="full-width"
              label="Pilih Status Kepegawaian"
              :items="[
                { label: 'ASN', val: 'asn' },
                { label: 'Non-ASN', val: 'non-asn' },
              ]"
              value-key="val"
              placeholder-key="label"
              name="Status Kepegawaian"
              orientation="horizontal"
              @change="handleChangeRadioButton"
            />
          </ValidationProvider>
          <ValidationProvider
            v-if="payload.employeeStatus === 'asn'"
            v-slot="{ errors }"
            rules="required"
            name="Nip"
            tag="div"
          >
            <jds-input-text
              v-model="payload.employeeNumber"
              name="Nip"
              label="NIP"
              placeholder="Masukkan NIP"
              :error-message="errors[0]"
              class="pb-4"
              :class="{ '!pb-3': errors.length > 0 }"
            />
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            name="Email"
            tag="div"
          >
            <div class="pb-4" :class="{ '!pb-3': errors.length > 0 }">
              <jds-input-text
                v-model="payload.email"
                name="Email"
                label="Email"
                placeholder="Masukkan Email"
                :error-message="errors[0]"
              />
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            name="Role"
            rules="requiredSelectForm"
            tag="div"
          >
            <jds-select
              v-model="payload.roleId"
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
              v-model="payload.organizationId"
              name="instansi"
              label="Instansi"
              placeholder="Pilih Instansi"
              :error-message="errors[0]"
              :options="listOrganization"
            />
          </ValidationProvider>
        </ValidationObserver>
        <BaseDialogFooterNew :name="modalName" @cancel="clearForm">
          <template #button-right>
            <jds-button
              label="Simpan"
              type="button"
              variant="primary"
              class="!text-[14px] !font-bold"
              @click="showPopupConfirmation()"
            />
          </template>
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
    <DialogLoading :show-popup="isLoading" />
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
      isLoading: false,
      isSuccess: false,
    }
  },
  async fetch() {
    try {
      const responseDataRole = await this.$mockApi.get(
        '/users/admin/complaints/roles'
      )
      this.listDataRole = responseDataRole.data?.data

      const responseDataOrganization = await this.$mockApi.get(
        `/users/admin/complaints/organizations?roleId=${this.roleId}`
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
          label: item.name,
          value: item.id,
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
      this.isLoading = true
      const methodApi = this[this.modalName].methodApi
      try {
        const idAccount = `/${this.idAccount}` || ''
        await this.$mockApi[methodApi](`/users/admin/complaints${idAccount}`, {
          ...this.payload,
        })
        this.isSuccess = true
        this.setDialogInformation('success')
        this.clearForm()
      } catch (error) {
        this.isSuccess = false
        this.setDialogInformation('error')
      } finally {
        this.isLoading = false
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
        roleId: '',
        organizationId: '',
      }
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
</style>
