<template>
  <BaseTabList :list-tab="listTab" @selectd="selectedTabIndexHandle">
    <template #default="{dataTab,indexTab}">
      <BaseTab class="!h-11 !p-[6px]" :selected="(indexTab===selectedTabIndex)">
        <button class="flex items-center text-sm text-green-100">
          <div class="rounded-full px-[6px] py-1" :class="{'bg-gray-100':indexTab===selectedTabIndex}">
            <BaseIconSvg :icon="dataTab.icon" :size="14" :fill-color="indexTab===selectedTabIndex ? '#069550' : '#0000'" />
          </div>

          <div class="ml-2 text-green-100 !font-roboto" :class="{'!text-gray-700':(indexTab===selectedTabIndex)}">
            {{ dataTab.name }}
          </div>
        </button>
      </BaseTab>
    </template>
  </BaseTabList>
</template>

<script>
export default {
  name: 'TabBarDetail',
  props: {
    listTab: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedTabIndex: 0
    }
  },
  methods: {
    selectedTabIndexHandle (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>
