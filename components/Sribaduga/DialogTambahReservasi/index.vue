<template>
  <transition name="fade">
    <div
      v-if="isOpenForm"
      class="opacity-1 fixed inset-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-75 transition-opacity"
      @click.self="handleCloseDialogTambahReservasi()"
    >
      <div
        class="content absolute top-0 right-0 z-50 h-screen w-[510px] transition-all duration-700 ease-in-out"
      >
        <BaseDialogPanel>
          <div class="flex h-screen flex-col">
            <BaseDialogHeader class="sticky top-0 z-50">
              <div class="flex items-center justify-between">
                <h1 class="font-roboto text-[21px] font-bold text-green-jds">
                  {{ isNewReservation ? 'Tambah' : 'Ubah' }} Reservasi
                </h1>
              </div>
            </BaseDialogHeader>
            <div class="flex-1 overflow-y-auto px-6 py-2">
              <div v-if="isNewReservation" class="font-lato">
                <p class="text-[14px] font-[500]">
                  {{
                    `${dateValue?.dateName} - ${
                      dateValue?.dateNumber
                    } ${getMonthName(dateValue?.rawDateData)}`
                  }}
                </p>
                <p class="text-[16px] font-[700]">{{ getSessionName }}</p>
              </div>
              <div
                v-else
                class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4"
              >
                <div class="py-2">
                  <p class="mb-4 font-lato text-[16px] font-[700]">
                    Tanggal & Sesi Reservasi
                  </p>
                  <date-picker
                    v-model="reservationDateValue"
                    format="DD/MM/YYYY"
                    :clearable="false"
                    class="date-picker"
                  />
                  <jds-select
                    v-model="sessionValue"
                    placeholder="Pilih sesi"
                    class="add-reservation-select mt-3"
                    :options="sessionDataListForReschedule"
                  />
                </div>
              </div>
              <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
                <div class="flex items-center justify-between font-lato">
                  <p class="text-[16px] font-[700]">Kategori Tiket</p>
                  <div class="flex">
                    <BaseIconSvg
                      icon="/icon/info.svg"
                      mode="image"
                      :width="16"
                      :height="16"
                    />
                    <p class="ml-2 text-[12px] font-[400]">
                      Maksimal 700 Tiket
                    </p>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between font-lato">
                  <div>
                    <p class="text-[15px] font-[400]">Anak-anak</p>
                    <p class="text-[13px] font-[400] text-[#757575]">
                      TK, SD, SMP/MTS
                    </p>
                  </div>
                  <div class="flex items-center">
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleSubtractChildrenCatagory()"
                    >
                      <jds-icon
                        name="minus"
                        class="h-[2.26px] w-[12px]"
                        fill="#BDBDBD"
                      />
                    </BaseButton>
                    <div
                      class="ml-2 mr-2 flex h-[38px] w-[60px] items-center justify-center rounded-lg border border-gray-300"
                    >
                      <p>{{ childrenCatagory }}</p>
                    </div>
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleAddChildrenCatagory()"
                    >
                      <jds-icon
                        name="plus"
                        class="h-[2.26px] w-[12px]"
                        fill="#069550"
                      />
                    </BaseButton>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between font-lato">
                  <div>
                    <p class="text-[15px] font-[400]">Dewasa</p>
                    <p class="text-[13px] font-[400] text-[#757575]">
                      SMA/SMK/MA, Mahasiswa, Umum
                    </p>
                  </div>
                  <div class="flex items-center">
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleSubtractMatureCatagory()"
                    >
                      <jds-icon
                        name="minus"
                        class="h-[2.26px] w-[12px]"
                        fill="#BDBDBD"
                      />
                    </BaseButton>
                    <div
                      class="ml-2 mr-2 flex h-[38px] w-[60px] items-center justify-center rounded-lg border border-gray-300"
                    >
                      <p>{{ matureCatagory }}</p>
                    </div>
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleAddMatureCatagory()"
                    >
                      <jds-icon
                        name="plus"
                        class="h-[2.26px] w-[12px]"
                        fill="#069550"
                      />
                    </BaseButton>
                  </div>
                </div>

                <div class="mt-4 flex items-center justify-between font-lato">
                  <div>
                    <p class="text-[15px] font-[400]">Wisatawan Mancanegara</p>
                    <p class="text-[13px] font-[400] text-[#757575]">
                      Wisatawan dari luar negeri
                    </p>
                  </div>
                  <div class="flex items-center">
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleSubtractForeignerCatagory()"
                    >
                      <jds-icon
                        name="minus"
                        class="h-[2.26px] w-[12px]"
                        fill="#BDBDBD"
                      />
                    </BaseButton>
                    <div
                      class="ml-2 mr-2 flex h-[38px] w-[60px] items-center justify-center rounded-lg border border-gray-300"
                    >
                      <p>{{ foreignerCatagory }}</p>
                    </div>
                    <BaseButton
                      class="flex h-[38px] w-[38px] items-center justify-center overflow-x-auto rounded-lg border border-gray-300"
                      @click="handleAddForeignerCatagory()"
                    >
                      <jds-icon
                        name="plus"
                        class="h-[2.26px] w-[12px]"
                        fill="#069550"
                      />
                    </BaseButton>
                  </div>
                </div>
                <div class="mt-4 flex items-center justify-between font-lato">
                  <div>
                    <p class="text-[14px] font-[400]">Total Tiket Dipesan</p>
                    <small class="text-red-600">{{ errorTicket }}</small>
                  </div>

                  <p class="mr-5 pr-[38px] text-[14px] font-[700]">
                    {{ getTotalTicket }} Tiket
                  </p>
                </div>
              </div>

              <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
                <ValidationObserver ref="form_informasi_pemesan" tag="div">
                  <p class="mb-4 font-lato text-[16px] font-[700]">
                    Informasi Pemesan
                  </p>

                  <label
                    for="nama-lengkap"
                    class="mb-1 font-lato text-[14px] font-[400]"
                    >Nama lengkap
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Nama lengkap"
                    tag="div"
                  >
                    <jds-input-text
                      id="nama-lengkap"
                      v-model="fullName"
                      class="mb-4"
                      name="Nama lengkap"
                      :error-message="errors[0]"
                    />
                  </ValidationProvider>
                  <label
                    for="no-tlp"
                    class="mb-1 font-lato text-[14px] font-[400]"
                    >No. Tlp
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|numeric"
                    name="Telepon"
                    tag="div"
                    class="mb-4"
                  >
                    <div
                      class="relative block text-gray-400 focus-within:text-gray-600"
                    >
                      <div
                        class="pointer-events-none absolute top-1/2 flex h-[35px] w-10 -translate-y-1/2 transform items-center justify-center rounded-l-lg bg-[#F5F5F5]"
                        :class="
                          errors[0]
                            ? 'border border-red-600'
                            : 'border-2 border-gray-300'
                        "
                      >
                        <p
                          class="font-lato text-[14px] font-[400] text-[#424242]"
                        >
                          +62
                        </p>
                      </div>

                      <input
                        id="no-tlp"
                        v-model="phoneNumber"
                        name="Telepon"
                        class="form-input block h-[35px] w-full appearance-none rounded-lg bg-white px-4 pl-12 text-gray-500 placeholder-gray-400 focus:outline-none"
                        :class="
                          errors[0]
                            ? 'border border-red-600'
                            : 'border-2 border-gray-300'
                        "
                      />
                    </div>
                    <small class="text-red-600">{{ errors[0] }}</small>
                  </ValidationProvider>

                  <label
                    for="kategori-instansi"
                    class="mb-1 font-lato text-[14px] font-[400]"
                  >
                    Kategori Instansi
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="requiredSelectForm"
                    name="Kategori instansi"
                    tag="div"
                    class="mb-4"
                  >
                    <jds-select
                      id="kategori-instansi"
                      v-model="instanceCatagory"
                      name="Kategori instansi"
                      placeholder="Pilih Kategori Instansi"
                      class="add-reservation-select mb-4"
                      :error-message="errors[0]"
                    />
                  </ValidationProvider>

                  <label
                    for="nama-instansi"
                    class="mb-1 font-lato text-[14px] font-[400]"
                  >
                    Nama Instansi
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Nama instansi"
                    tag="div"
                  >
                    <jds-input-text
                      id="nama-instansi"
                      v-model="instanceName"
                      name="Nama instansi"
                      class="mb-4"
                      :error-message="errors[0]"
                    />
                  </ValidationProvider>

                  <p class="mb-4 font-lato text-[16px] font-[700]">
                    Alamat Pemesan
                  </p>
                  <label
                    for="provinsi"
                    class="mb-1 font-lato text-[14px] font-[400]"
                  >
                    Provinsi
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="requiredSelectForm"
                    name="Provinsi"
                    tag="div"
                    class="mb-4"
                  >
                    <jds-select
                      id="provinsi"
                      v-model="provinsiValue"
                      name="Provinsi"
                      placeholder="Pilih Provinsi"
                      class="add-reservation-select mb-4"
                      :error-message="errors[0]"
                    />
                  </ValidationProvider>

                  <label
                    for="kabupaten"
                    class="mb-1 font-lato text-[14px] font-[400]"
                  >
                    Kota/Kabupaten
                  </label>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="requiredSelectForm"
                    name="Kota/kabupaten"
                    tag="div"
                    class="mb-4"
                  >
                    <jds-select
                      id="kabupaten"
                      v-model="cityValue"
                      name="Kota/kabupaten"
                      placeholder="Pilih Kota/Kabupaten"
                      class="add-reservation-select mb-4"
                      :error-message="errors[0]"
                    />
                  </ValidationProvider>
                  <label
                    for="alamat-instansi"
                    class="mb-1 font-lato text-[14px] font-[400]"
                  >
                    Detail Alamat Instansi
                  </label>
                  <p class="mb-1 text-[13px] font-[400] text-[#757575]">
                    Masukan informasi jalan, dusun atau gang
                  </p>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="Alamat instansi"
                    tag="div"
                  >
                    <textarea
                      id="alamat-instansi"
                      v-model="instanceAddress"
                      name="Alamat instansi"
                      class="w-full rounded-lg"
                      :class="
                        errors[0]
                          ? 'border border-red-600'
                          : 'border-2 border-gray-300'
                      "
                    />
                    <small class="text-red-600">{{ errors[0] }}</small>
                  </ValidationProvider>
                </ValidationObserver>
              </div>
            </div>
            <BaseDialogFooter class="sticky bottom-0 z-50">
              <div class="flex justify-end">
                <div>
                  <jds-button
                    label="Batal"
                    variant="secondary"
                    class="font-lato text-sm font-bold"
                    @click="handleCloseDialogTambahReservasi()"
                  />
                  <jds-button
                    label="Simpan"
                    variant="primary"
                    class="ml-3 font-lato text-sm font-bold"
                    @click="handleSave()"
                  />
                </div>
              </div>
            </BaseDialogFooter>
          </div>
        </BaseDialogPanel>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'DialogTambahReservasi',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    dateValue: {
      type: Object,
      default: () => {},
    },
    orderAndSessionValue: {
      type: Object,
      default: () => {},
    },
    isNewReservation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fullName: '',
      phoneNumber: '',
      instanceCatagory: '',
      instanceName: '',
      provinsiValue: '',
      cityValue: '',
      instanceAddress: '',
      errorTicket: '',
      sessionDataList: [],
    }
  },
  computed: {
    ...mapState({
      childrenCatagory: (state) => state.add_reservation.childrenCatagory,
      matureCatagory: (state) => state.add_reservation.matureCatagory,
      foreignerCatagory: (state) => state.add_reservation.foreignerCatagory,
      isOpenForm: (state) => state.add_reservation.isOpenForm,
    }),
    reservationDateValue: {
      set(value) {
        this.$store.commit('add_reservation/setReservationDateValue', value)
      },
      get() {
        return this.$store.state.add_reservation.reservationDateValue
      },
    },
    sessionValue: {
      set(value) {
        this.$store.commit('add_reservation/setSessionValue', value)
      },
      get() {
        return this.$store.state.add_reservation.sessionValue
      },
    },
    getSessionName() {
      return `${this.orderAndSessionValue?.session.name} (${this.orderAndSessionValue?.session.startTime} - ${this.orderAndSessionValue?.session.endTime})`
    },
    getTotalTicket() {
      return (
        this.childrenCatagory + this.matureCatagory + this.foreignerCatagory
      )
    },
    sessionDataListForReschedule() {
      return this.sessionDataList.map((sessionData) => {
        return {
          label: `${sessionData.session.name}  (${sessionData.session.startTime} - ${sessionData.session.endTime})`,
          value: sessionData.session.id,
        }
      })
    },
  },

  watch: {
    getTotalTicket: {
      handler(val) {
        if (val > 700) {
          this.errorTicket = 'Maksimal tiket yang dipesan adalah 700'
        } else {
          this.errorTicket = ''
        }
      },
    },
  },
  mounted() {
    this.fetchSessionList()
  },

  methods: {
    getMonthName(date) {
      return date?.toLocaleString('default', { month: 'long' })
    },
    handleAddChildrenCatagory() {
      this.$store.commit(
        'add_reservation/setChildrenCatagory',
        this.childrenCatagory + 1
      )
    },
    handleSubtractChildrenCatagory() {
      if (this.childrenCatagory > 0) {
        this.$store.commit(
          'add_reservation/setChildrenCatagory',
          this.childrenCatagory - 1
        )
      }
    },
    handleAddMatureCatagory() {
      this.$store.commit(
        'add_reservation/setMatureCatagory',
        this.matureCatagory + 1
      )
    },
    handleSubtractMatureCatagory() {
      if (this.matureCatagory > 0) {
        this.$store.commit(
          'add_reservation/setMatureCatagory',
          this.matureCatagory - 1
        )
      }
    },
    handleAddForeignerCatagory() {
      this.$store.commit(
        'add_reservation/setForeignerCatagory',
        this.foreignerCatagory + 1
      )
    },
    handleSubtractForeignerCatagory() {
      if (this.foreignerCatagory > 0) {
        this.$store.commit(
          'add_reservation/setForeignerCatagory',
          this.foreignerCatagory - 1
        )
      }
    },
    clearForm() {
      this.fullName = ''
      this.phoneNumber = ''
      this.instanceCatagory = ''
      this.instanceName = ''
      this.provinsiValue = ''
      this.cityValue = ''
      this.instanceAddress = ''
      this.$store.commit('add_reservation/setChildrenCatagory', 0)
      this.$store.commit('add_reservation/setMatureCatagory', 0)
      this.$store.commit('add_reservation/setForeignerCatagory', 0)
    },
    handleCloseDialogTambahReservasi() {
      this.$store.commit('add_reservation/setIsOpenForm', false)
      this.clearForm()
    },
    async handleSave() {
      const formInformasiIsValid =
        await this.$refs.form_informasi_pemesan.validate()
      if (this.getTotalTicket === 0) {
        this.errorTicket = 'Tiket tidak boleh kosong'
      }

      if (
        formInformasiIsValid &&
        this.getTotalTicket > 0 &&
        this.errorTicket === ''
      ) {
        this.$store.commit('add_reservation/setIsOpenForm', false)
        this.$store.commit('add_reservation/setRefetchCalendar', true)
        this.errorTicket = ''
        this.clearForm()
      }
    },
    async fetchSessionList() {
      this.loading = true

      try {
        const calendarResponse = await this.$axios.get(
          '/ticket/tms/admin/orders/calendar'
        )

        const { data } = calendarResponse.data
        this.sessionDataList = data
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
<style scoped>
.add-reservation-select :deep(.jds-select),
.add-reservation-select :deep(.jds-input-text) {
  width: 430px !important;
  border-radius: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter .content,
.fade-leave-to .content {
  @apply right-[-700px];
}
.date-picker {
  width: 430px !important;
}
</style>
