<template>
  <div class="w-full bg-green-600 h-fit flex items-center">
    <div v-for="(tab,index) in listTab" :key="index" @click="setSelectedTab(tab)">
      <slot :data-tab="tab" :index-tab="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTabList',
  props: {
    listTab: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      dataTab: {}
    }
  },
  methods: {
    setSelectedTab (data) {
      this.$emit('selected', data)
    }
  }
}
</script>
