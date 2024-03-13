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
              v-model="payload.employmentStatus"
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
            />
          </ValidationProvider>
          <ValidationProvider
            v-if="payload.employmentStatus === 'asn'"
            v-slot="{ errors }"
            rules="required"
            name="Nip"
            tag="div"
          >
            <jds-input-text
              v-model="payload.employmentNumber"
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
          @click="showPopupInformation()"
        />
      </template>
    </DialogConfirmationNew>
    <DialogInformationNew
      :name-modal="dialogInformationSuccess.nameModal"
      :dialog-modal="dialogInformationSuccess"
      :is-success="true"
    />
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
        return ['kirim-ulang-email', 'tambah-akun'].includes(value)
      },
    },
  },
  data() {
    return {
      payload: {
        name: '',
        email: '',
        roleId: '',
        organizationId: '',
        employmentStatus: '',
        employmentNumber: '',
      },
      listDataRole: [
        {
          id: 'role1',
          name: 'Tim Respon dan Verifikator',
        },
        {
          id: 'role2',
          name: 'Tim Penentu Kewenangan',
        },
        {
          id: 'role3',
          name: 'Tim Pengendali Aduan',
        },
        {
          id: 'role4',
          name: 'Perangkat Daerah',
        },
      ],
      listDataOrganization: [
        {
          id: 'organization1',
          name: 'Diskominfo - JDS',
        },
        {
          id: 'organization2',
          name: 'Diskominfo - Bidang IKP',
        },
        {
          id: 'organization3',
          name: 'Tim Sekretariat Daerah',
        },
        {
          id: 'organization4',
          name: 'Tim Administrasi Pimpinan',
        },
        {
          id: 'organization5',
          name: 'Tim Badan Kepegawaian Daerah',
        },
        {
          id: 'organization6',
          name: 'Dinas Komunikasi dan Informatika Provinsi Jawa Barat',
        },
        {
          id: 'organization7',
          name: 'Dinas Pendidikan Provinsi Jawa Barat',
        },
        {
          id: 'organization8',
          name: 'Dinas Kesehatan Provinsi Jawa Barat',
        },
      ],
      detailItem: {
        title: '',
      },
      dialogConfirmation: {
        title: 'Konfirmasi Tambah Akun',
        descriptionText:
          'Apakah Anda yakin ingin menambahkan akun ini? Link verifikasi akan dikirimkan ke email dibawah ini:',
        nameModal: `${this.nameModal}-confirmation`,
        button: {
          label: 'Simpan',
          variant: 'primary',
        },
      },
      isSuccessInformation: true,
      dialogInformationSuccess: {
        title: 'Pembuatan Akun Berhasil',
        descriptionText:
          'Email telah berhasil dikirimkan, silahkan melakukan konfirmasi kepada pemilik email yang bersangkutan.',
        nameModal: 'add-account-information-success',
        icon: { name: 'check-mark-circle', fill: '#069550' },
      },
      employmentStatus: '',
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
        this.$store.commit('modals/OPEN', this.dialogConfirmation.nameModal)
      }
    },
    backToForm() {
      this.$store.commit('modals/CLOSE', this.dialogConfirmation.nameModal)
      this.$store.commit('modals/OPEN', this.modalName)
    },
    clearForm() {
      this.payload = {
        name: '',
        email: '',
        roleId: '',
        opdId: '',
      }
    },
    showPopupInformation() {
      this.$store.commit('modals/CLOSE', this.dialogConfirmation.nameModal)
      this.clearForm()
      this.$store.commit('modals/OPEN', this.dialogInformationSuccess.nameModal)
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
