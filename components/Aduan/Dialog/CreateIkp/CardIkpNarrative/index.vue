<template>
  <div class="rounded-lg border border-gray-300">
    <!-- HEADER -->
    <div class="bg-[#FFFAE8] px-3 py-4">
      <div class="flex">
        <BaseIconSvg
          icon="/icon/default/star.svg"
          :size="20"
          fill-color="#FFA600"
          class="mr-2 flex-shrink-0"
        />
        <p class="text-sm">
          Dibawah ini Narasi IKP Usulan yang anda bisa edit atau gunakan
          langsung
        </p>
      </div>
    </div>
    <!-- BODY -->
    <div class="px-3 pt-1 pb-[10px]">
      <div class="flex items-center justify-between">
        <h1 class="text-[15px] font-bold">
          Narasi IKP
        </h1>
        <button
          type="button"
          class="px-2 py-[9px]"
          @click="showPopupEditIkpNarrative()"
        >
          <jds-icon name="pencil" size="xs" fill="#16A75C" class="mr-2" />
          <span class="text-sm font-bold text-green-700">Edit Narasi Ini</span>
        </button>
      </div>
      <div class="text-sm">
        <span class="leading-[18px]">{{ showIkpNarrative() }}</span>
        <button
          v-if="isTruncate"
          type="button"
          class="text-sm font-bold text-green-600"
          @click="$store.commit('create-ikp/setIsTruncate', false)"
        >
          Selengkapnya
        </button>
      </div>
    </div>
    <DialogEditNarrative
      :show-popup="isShowPopupEditIkpNarrative"
      :data-dialog="dataDialog"
      @close="closePopupEditIkpNarrative"
      @submit="submitEditIkpNarrative()"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogEditNarrative from '~/components/Aduan/Dialog/CreateIkp/Dialog/EditNarrative'

export default {
  name: 'CardIkpNarrative',
  components: { DialogEditNarrative },
  data () {
    return {
      dataDialog: {
        title: '',
        labelButtonSubmit: '',
        labelTextArea: '',
        placeholder: ''
      },
      isShowPopupEditIkpNarrative: false
    }
  },
  computed: {
    dataIkpNarrative () {
      return this.$store.getters['create-ikp'].ikpNarrative
    },
    ikpNarrativeTruncate () {
      return this.dataIkpNarrative.substring(0, 125)
    },
    ikpNarrativeNonTruncate () {
      return `${this.dataIkpNarrative.substring(
        125,
        this.dataIkpNarrative.length
      )}`
    },
    ...mapGetters('create-ikp', {
      dataIkpNarrative: 'getIkpNarrative',
      isTruncate: 'getIsTruncate'
    })
  },
  methods: {
    closePopupEditIkpNarrative () {
      this.$store.dispatch('create-ikp/checkTruncate')
      this.isShowPopupEditIkpNarrative = false
    },
    showPopupEditIkpNarrative () {
      this.dataDialog = {
        ...this.dataDialog,
        title: 'Edit Narasi IKP',
        labelButtonSubmit: 'Simpan Perubahan',
        labelTextArea: 'Usulan Narasi IKP',
        placeholder: 'Masukkan Usulan Narasi IKP'
      }
      this.isShowPopupEditIkpNarrative = true
    },
    showIkpNarrative () {
      if (this.dataIkpNarrative.length >= 125) {
        return `${this.ikpNarrativeTruncate} ${
          this.isTruncate ? '...' : this.ikpNarrativeNonTruncate
        }`
      }
      return this.dataIkpNarrative
    },
    submitEditIkpNarrative () {
      this.closePopupEditIkpNarrative()
      this.showIkpNarrative()
    }
  }
}
</script>
