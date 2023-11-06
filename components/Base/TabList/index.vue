<template>
  <div class="w-full bg-green-600 h-fit flex items-center">
    <div v-for="(tab,index) in listTab" :key="index" @click="setSelectedTab(index)">
      <slot :data-tab="tab" :index-tab="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTabList',
  props: {
    listTab: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dataTab: {},
      indexTab: 0
    }
  },
  methods: {
    setSelectedTab (index) {
      this.$emit('selected', index)
    }
  }
}
</script>
