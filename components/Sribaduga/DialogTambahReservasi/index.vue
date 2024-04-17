<template>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="opacity-1 fixed inset-0 z-10 flex w-full items-center justify-center bg-black bg-opacity-75 transition-opacity"
    >
      <div
        class="content absolute top-0 right-0 z-50 h-screen w-[510px] transition-all duration-700 ease-in-out"
      >
        <BaseDialogPanel>
          <div class="flex h-screen flex-col">
            <BaseDialogHeader class="sticky top-0 z-50">
              <div class="flex items-center justify-between">
                <h1 class="font-roboto text-[21px] font-bold text-green-jds">
                  Tambah Reservasi
                </h1>
              </div>
            </BaseDialogHeader>
            <div class="flex-1 overflow-y-auto px-6 py-2">
              <div class="font-lato">
                <p class="text-[14px] font-[500]">
                  {{
                    `${dateValue?.dateName} - ${
                      dateValue?.dateNumber
                    } ${getMonthName(dateValue?.rawDateData)}`
                  }}
                </p>
                <p class="text-[16px] font-[700]">{{ getSessionName }}</p>
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
                  <p class="text-[14px] font-[400]">Total Tiket Dipesan</p>

                  <p class="mr-5 pr-[38px] text-[14px] font-[700]">
                    {{ getTotalTicket }} Tiket
                  </p>
                </div>
              </div>

              <div class="mt-4 rounded-[12px] border border-[#EEEEEE] p-4">
                <p class="mb-4 font-lato text-[16px] font-[700]">
                  Informasi Pemesan
                </p>
                <label
                  for="nama-pemesan"
                  class="mb-1 font-lato text-[14px] font-[400]"
                  >Nama lengkap
                </label>
                <jds-input-text id="nama-pemesan" class="mb-4" />
                <label
                  for="no-tlp"
                  class="mb-1 font-lato text-[14px] font-[400]"
                  >No. Tlp
                </label>
                <div
                  class="relative mb-4 block text-gray-400 focus-within:text-gray-600"
                >
                  <div
                    class="pointer-events-none absolute top-1/2 flex h-[35px] w-10 -translate-y-1/2 transform items-center justify-center rounded-l-lg border-2 bg-[#F5F5F5]"
                  >
                    <p class="font-lato text-[14px] font-[400] text-[#424242]">
                      +62
                    </p>
                  </div>

                  <input
                    id="no-tlp"
                    type="number"
                    class="form-input block h-[35px] w-full appearance-none rounded-lg border-2 border-gray-300 bg-white px-4 pl-12 text-gray-500 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <label
                  for="kategori-instansi"
                  class="mb-1 font-lato text-[14px] font-[400]"
                  >Kategori Instansi
                </label>
                <div>
                  <jds-select
                    id="kategori-instansi"
                    placeholder="Pilih Kategori Instansi"
                    class="kategori-instansi mb-4"
                  />
                </div>
                <label
                  for="nama-instansi"
                  class="mb-1 font-lato text-[14px] font-[400]"
                  >Nama Instansi
                </label>
                <jds-input-text id="nama-instansi" class="mb-4" />
              </div>
            </div>
            <BaseDialogFooter class="sticky bottom-0 z-50">
              <div class="flex justify-end">
                <div>
                  <jds-button
                    label="Batal"
                    variant="secondary"
                    class="font-lato text-sm font-bold"
                    @click="$emit('close')"
                  />
                  <jds-button
                    label="Simpan"
                    variant="primary"
                    class="ml-3 font-lato text-sm font-bold"
                    @click="$emit('save')"
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
export default {
  name: 'DialogTambahReservasi',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    dateValue: {
      type: Object,
      default: () => {},
    },
    orderAndSessionValue: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      childrenCatagory: (state) => state.add_reservation.childrenCatagory,
      matureCatagory: (state) => state.add_reservation.matureCatagory,
      foreignerCatagory: (state) => state.add_reservation.foreignerCatagory,
    }),
    getSessionName() {
      return `${this.orderAndSessionValue?.session.name} (${this.orderAndSessionValue?.session.startTime} - ${this.orderAndSessionValue?.session.endTime})`
    },
    getTotalTicket() {
      return (
        this.childrenCatagory + this.matureCatagory + this.foreignerCatagory
      )
    },
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
  },
}
</script>
<style scoped>
.kategori-instansi .jds-select,
.kategori-instansi .jds-input-text {
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
</style>
