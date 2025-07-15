<template>
  <div class="flex h-fit w-full items-center bg-green-600">
    <div
      v-for="(tab, index) in listTab"
      :key="index"
      @click="setSelectedTab(tab)"
    >
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
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dataTab: {},
    }
  },
  methods: {
    setSelectedTab(data) {
      this.$emit('selected', data)
    },
  },
}
</script>
