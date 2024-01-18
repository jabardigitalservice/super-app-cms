<template>
  <BaseTabList
    class="h-12 bg-white"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab, indexTab }">
      <button
        class="!ml-4 !mr-2 !w-fit"
        :class="{
          'border-b-[3px] border-green-700':
            indexTab === selectedTabIndex,
        }"
        @click="$emit('button-tab',dataTab.id)"
      >
        <BaseTab
          class="!h-[45px] !min-w-[102px] rounded-none !bg-white !py-[10px] !px-2"
          :selected="indexTab === selectedTabIndex"
          :title="dataTab.name"
        >
          <div
            class="text-sm font-medium text-gray-700"
            :class="{
              '!font-bold !text-green-700': indexTab === selectedTabIndex,
            }"
          >
            {{ dataTab.name }}
          </div>
        </BaseTab>
      </button>
    </template>
  </BaseTabList>
</template>

<script>
export default {
  name: 'TabBarMenu',
  props: {
    listTab: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      selectedTabIndex: 0
    }
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>
