<template>
  <BaseTabList
    class="bg-green-600"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab, indexTab }">
      <button :class="{ 'ml-2': indexTab > 0 }" @click="$emit('button-tab', dataTab.detailPage)">
        <BaseTab
          class="flex items-start text-sm text-green-100"
          :selected="indexTab === selectedTabIndex"
          :title="dataTab.name"
        >
          <div
            class="h-[28px] w-[28px] rounded-full p-1"
            :class="
              indexTab === selectedTabIndex ? 'bg-gray-100' : 'bg-green-800'
            "
          >
            <BaseIconSvg
              class="icon-tab-content !h-[14px] !w-[14px] !shadow-lg"
              :class="{
                'icon-tab-selected': indexTab === selectedTabIndex,
              }"
              :icon="dataTab.icon"
              :fill-color="
                indexTab === selectedTabIndex ? '#16A75C' : '#FFFFFF'
              "
            />
          </div>

          <div
            :class="[
              'ml-2 !font-roboto text-green-100',
              indexTab === selectedTabIndex && '!text-gray-700',
            ]"
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
  name: 'TabBarDetail',
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
