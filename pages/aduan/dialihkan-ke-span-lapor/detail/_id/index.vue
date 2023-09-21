<template>
  <div>
    <div class="flex justify-between mt-4 mb-8">
      <jds-button variant="secondary" class="!w-[126px] !h-[38px] !py-1 !text-[14px] !font-bold" @click="goToBackHandle">
        <div class="flex items-center">
          <ArrowLeft class="mr-[10px] h-[12px] w-[14px]" />
          Kembali
        </div>
      </jds-button>
      <jds-button
        v-show="!detailComplaintDiverted?.sp4n_id"
        label="Tambahkan ID SP4N Lapor"
        variant="primary"
        class="!h-[38px] !py-1 !text-[14px] !font-bold"
      />
    </div>
    <AduanDetail :type-aduan-page="typeAduan.aduanDialihkanSpanLapor.id" />
  </div>
</template>

<script>
import ArrowLeft from '~/assets/icon/arrow-left.svg?inline'
import { typeAduan } from '~/constant/aduan-masuk'

export default {
  name: 'PageDetailAduanDialihkanKeSpan',
  components: { ArrowLeft },
  layout: 'Dashboard',
  data () {
    return {
      navigations: [
        {
          label: 'Dialihkan ke SP4N',
          link: typeAduan.aduanDialihkanSpanLapor.link
        },
        {
          label: 'Detail Aduan',
          link: `/aduan/dialihkan-ke-span-lapor/detail/${this.$route.params.id}`
        }
      ],
      descriptionPage: 'Berisi detail aduan yang dialihkan ke SP4N Lapor',
      typeAduan
    }
  },
  mounted () {
    this.$store.commit('setActivePage', 'Dialihkan ke SP4N')
    this.$store.commit('setHeader', {
      navigations: this.navigations,
      descriptionPage: this.descriptionPage
    })
  },
  methods: {
    goToBackHandle () {
      this.$router.push('/aduan/dialihkan-ke-span-lapor')
    }
  }
}
</script>
