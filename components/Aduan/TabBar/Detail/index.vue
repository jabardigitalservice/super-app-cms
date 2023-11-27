<template>
  <BaseTabList :list-tab="listTab" @selected="selectedTabIndexHandle">
    <template #default="{ dataTab, indexTab }">
      <button
        class="!mr-2 !w-fit !rounded-t-lg"
        :class="{
          'bg-white': indexTab === selectedTabIndex,
        }"
        @click="$emit('button-tab', dataTab.id)"
      >
        <BaseTab
          class="!h-11 !min-w-[156px] !px-3 !py-2"
          :selected="indexTab === selectedTabIndex"
          :title="dataTab.name"
        >
          <div class="flex items-center text-sm text-green-100">
            <div
              :class="[
                'rounded-full px-[6px] py-1',
                indexTab === selectedTabIndex ? 'bg-gray-100' : 'bg-green-800',
              ]"
            >
              <BaseIconSvg
                :icon="dataTab.icon"
                :size="14"
                :fill-color="
                  indexTab === selectedTabIndex ? '#069550' : '#FFFFFF'
                "
              />
            </div>

            <div
              :class="[
                '! ml-2 text-green-100',
                indexTab === selectedTabIndex && '!text-gray-700',
              ]"
            >
              {{ dataTab.name }}
            </div>
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
    selectedTabIndexHandle (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>
