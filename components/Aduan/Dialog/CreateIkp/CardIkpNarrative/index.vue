<template>
  <div class="rounded-lg border border-gray-300">
    <!-- HEADER -->
    <div class="bg-[#FFFAE8] px-2 py-4">
      <div class="flex w-full">
        <BaseIconSvg
          icon="/icon/default/star.svg"
          :size="20"
          fill-color="#FFA600"
          class="mr-2 flex-shrink-0"
        />
        <p class="text-sm">
          Dibawah ini Narasi Instruksi Aduan Usulan yang anda bisa edit atau
          gunakan langsung
        </p>
      </div>
    </div>
    <!-- BODY -->
    <div class="px-3 pt-1 pb-[10px]">
      <div class="flex items-center justify-between">
        <h1 class="text-[15px] font-bold">Narasi Instruksi</h1>
        <button
          type="button"
          class="px-2 py-[9px] disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="nameModal === 'update-ikp'"
          @click="showPopupEditIkpNarrative()"
        >
          <jds-icon name="pencil" size="xs" fill="#16A75C" class="mr-2" />
          <span class="text-sm font-bold text-green-700">Edit Narasi Ini</span>
        </button>
      </div>
      <div class="text-sm">
        <p class="break-words leading-[18px] line-clamp-2">
          {{ dataIkpNarrative }}
        </p>
        <button
          type="button"
          class="mt-[6px] text-sm font-bold text-green-600"
          @click="isShowIkpNarrative = true"
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
    <DialogIkpNarrative
      :show-popup="isShowIkpNarrative"
      :data-ikp="dataIkp"
      @close="isShowIkpNarrative = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DialogEditNarrative from '~/components/Aduan/Dialog/CreateIkp/Dialog/EditNarrative'
import DialogIkpNarrative from '~/components/Aduan/Dialog/IkpNarrative'

export default {
  name: 'CardIkpNarrative',
  components: { DialogEditNarrative, DialogIkpNarrative },
  props: {
    nameModal: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dataDialog: {
        title: '',
        labelButtonSubmit: '',
        labelTextArea: '',
        placeholder: '',
      },
      isShowPopupEditIkpNarrative: false,
      isShowIkpNarrative: false,
    }
  },
  computed: {
    ikpNarrativeTruncate() {
      return this.dataIkpNarrative.substring(0, 125)
    },
    ikpNarrativeNonTruncate() {
      return `${this.dataIkpNarrative.substring(
        125,
        this.dataIkpNarrative.length
      )}`
    },
    ...mapGetters('create-ikp', {
      dataIkpNarrative: 'getIkpNarrative',
      isTruncate: 'getIsTruncate',
    }),
    dataIkp() {
      return { narrative: this.dataIkpNarrative }
    },
  },
  methods: {
    closePopupEditIkpNarrative() {
      this.$store.dispatch('create-ikp/checkTruncate')
      this.isShowPopupEditIkpNarrative = false
    },
    showPopupEditIkpNarrative() {
      this.dataDialog = {
        ...this.dataDialog,
        title: 'Narasi Instruksi',
        labelButtonSubmit: 'Simpan Perubahan',
        labelTextArea: 'Usulan Narasi Instruksi',
        placeholder: 'Masukkan Usulan Narasi Instruksi',
      }
      this.$store.commit(
        'edit-ikp-narrative/setFieldEditIkpNarrative',
        this.dataIkpNarrative
      )
      this.isShowPopupEditIkpNarrative = true
    },
    submitEditIkpNarrative() {
      this.closePopupEditIkpNarrative()
      this.$store.commit('create-ikp/setIsTruncate', true)
    },
  },
}
</script>
