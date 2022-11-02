<template>
  <transition name="fade">
    <div v-if="show" class="fixed h-screen w-screen bg-black bg-opacity-75 z-100 inset-0 flex justify-center items-center">
      <div class="w-[600px] min-h-min rounded-lg bg-white flex flex-col gap-4">
        <h6 class="text-green-700 font-roboto font-medium text-[21px] px-4 pt-4">
          {{ title }}
        </h6>
        <div class="max-h-[calc(100vh-64px-120px)] overflow-scroll flex flex-col gap-4 px-4 text-sm">
          <div>
            <table>
              <tr class="text-gray-600">
                <td>Nama RW</td>
                <td><span class="ml-4">Email</span></td>
              </tr>
              <tr class="text-gray-800">
                <td>Asep Kumaha</td>
                <td><span class="ml-4">asepkumaha@gmail.com</span></td>
              </tr>
            </table>
          </div>
          <div>
            <div class="mb-2 text-gray-800 font-bold">
              Alamat Sesuai KTP
            </div>
            <KlaimRWAddressTable />
          </div>
          <div>
            <div class="mb-2 text-gray-800 font-bold">
              Alamat Sesuai Domisili
            </div>
            <KlaimRWAddressTable />
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
  name: 'DetailAddress',
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
     * data rw
     */
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
