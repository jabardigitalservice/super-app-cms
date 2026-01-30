<template>
  <transition name="fade">
    <div v-if="show" class="fixed h-screen w-screen bg-black bg-opacity-75 z-50 inset-0 flex justify-center items-center">
      <div class="w-[600px] min-h-min rounded-lg bg-white flex flex-col gap-4">
        <h1 class="text-green-700 font-roboto font-medium text-[21px] px-4 pt-4">
          {{ title }}
        </h1>
        <div class="max-h-[calc(100vh-64px-120px)] overflow-scroll flex flex-col gap-4 px-4 text-sm">
          <div>
            <table>
              <tr class="text-gray-600">
                <td>Nama RT</td>
                <td><span class="ml-4">Email</span></td>
              </tr>
              <tr class="text-gray-800">
                <td>{{ dataUser.name }}</td>
                <td><span class="ml-4">{{ dataUser.email }}</span></td>
              </tr>
            </table>
          </div>
          <div>
            <div class="mb-2 text-gray-800 font-bold">
              Alamat Sesuai KTP
            </div>
            <div v-if="loading" class="p-4 flex justify-center items-center">
              <jds-spinner size="24px" />
            </div>
            <KlaimRTAddressTable
              v-else-if="detailData.dataKtp"
              :data-table="detailData.dataKtp"
            />
            <div v-else>
              Tidak ada data
            </div>
          </div>
          <div>
            <div class="mb-2 text-gray-800 font-bold">
              Alamat Sesuai Domisili
            </div>
            <div v-if="loading" class="p-4 flex justify-center items-center">
              <jds-spinner size="24px" />
            </div>
            <KlaimRTAddressTable
              v-else-if="detailData.dataDomicile"
              :data-table="detailData.dataDomicile"
            />
            <div v-else>
              Tidak ada data
            </div>
          </div>
        </div>
        <div class="flex justify-center p-4 bg-gray-50 px-6 rounded-lg">
          <jds-button label="Oke" variant="primary" @click="onClose" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'DetailAddressRT',
  props: {
    /**
     * make modal visible or not
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * title modal
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * loading data
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * data rt
     */
    detailData: {
      type: Object,
      default: () => ({
        dataKtp: {},
        dataDomicile: {}
      })
    },
    dataUser: {
      type: Object,
      default: () => ({
        name: '',
        email: ''
      })
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
