<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-75"
    >
      <div class="flex min-h-min w-[600px] flex-col gap-4 rounded-lg bg-white">
        <h1
          class="px-4 pt-4 font-roboto text-[21px] font-medium text-green-700"
        >
          {{ title }}
        </h1>
        <div
          class="flex max-h-[calc(100vh-64px-120px)] flex-col gap-4 overflow-scroll px-4 text-sm"
        >
          <div>
            <table>
              <tr class="text-gray-600">
                <td>{{ checkLabelName() }}</td>
                <td><span class="ml-4">Email</span></td>
              </tr>
              <tr class="text-gray-800">
                <td>{{ dataUser.name }}</td>
                <td>
                  <span class="ml-4">{{ dataUser.email }}</span>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <div class="mb-2 font-bold text-gray-800">Alamat Sesuai KTP</div>
            <div v-if="loading" class="flex items-center justify-center p-4">
              <jds-spinner size="24px" />
            </div>
            <KlaimRWAddressTable
              v-else-if="detailData.dataKtp"
              :data-table="detailData.dataKtp"
            />
            <div v-else>Tidak ada data</div>
          </div>
          <div>
            <div class="mb-2 font-bold text-gray-800">
              Alamat Sesuai Domisili
            </div>
            <div v-if="loading" class="flex items-center justify-center p-4">
              <jds-spinner size="24px" />
            </div>
            <KlaimRWAddressTable
              v-else-if="detailData.dataDomicile"
              :data-table="detailData.dataDomicile"
            />
            <div v-else>Tidak ada data</div>
          </div>
        </div>
        <div class="flex justify-center rounded-lg bg-gray-50 p-4 px-6">
          <jds-button label="Oke" variant="primary" @click="onClose" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { typeClaim } from '~/constant/klaim-rw'

export default {
  name: 'DetailAddress',
  props: {
    /**
     * make modal visible or not
     */
    show: {
      type: Boolean,
      default: false,
    },
    /**
     * title modal
     */
    title: {
      type: String,
      default: '',
    },
    typeClaimPage: {
      type: Object,
      default: () => ({}),
    },
    /**
     * loading data
     */
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * data rw
     */
    detailData: {
      type: Object,
      default: () => ({
        dataKtp: {},
        dataDomicile: {},
      }),
    },
    dataUser: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
      }),
    },
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    checkLabelName() {
      return this.typeClaimPage.name === typeClaim.klaimPosyandu.name
        ? 'Nama'
        : `Nama ${this.typeClaimPage.name}`
    },
  },
}
</script>
