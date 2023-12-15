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
        <button class="px-2 py-[9px]">
          <jds-icon name="pencil" size="xs" fill="#16A75C" class="mr-2" /><span
            class="text-sm font-bold text-green-700"
          >Edit Narasi Ini</span>
        </button>
      </div>
      <div class="text-sm">
        <span class="leading-[18px]">{{ ikpNarrativeTruncate }}{{ isTruncate?'...':ikpNarrativeNonTruncate }}</span>
        <button v-if="isTruncate" class="text-sm font-bold text-green-600" @click="$emit('detail-narrative')">
          Selengkapnya
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardIkpNarrative',
  props: {
    ikpNarrative: {
      type: String,
      default: ''
    },
    isTruncate: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dataIkpNarrative: this.ikpNarrative
    }
  },
  computed: {
    ikpNarrativeTruncate () {
      return this.ikpNarrative.substring(0, 125)
    },
    ikpNarrativeNonTruncate () {
      return `${this.ikpNarrative.substring(125, this.ikpNarrative.length)}`
    }
  }
}
</script>
