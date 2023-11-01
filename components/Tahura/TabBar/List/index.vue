<template>
  <BaseTabList
    class="bg-green-600"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab, indexTab }">
      <button
        :class="{ 'ml-2': indexTab > 0 }"
        @click="$emit('button-tab', dataTab.statusCode)"
      >
        <BaseTab
          class="flex items-start text-sm text-green-100"
          :selected="indexTab === selectedTabIndex"
          :title="statusTahura[dataTab.statusCode]?.label"
        >
          <div
            class="h-[28px] w-[28px] rounded-full p-1"
            :class="
              indexTab === selectedTabIndex ? 'bg-gray-100' : 'bg-green-800'
            "
          >
            <BaseIconSvg
              :icon="statusTahura[dataTab.statusCode]?.icon"
              class="icon-tab-content !h-[14px] !w-[14px] !shadow-lg"
              :fill-color="
                indexTab === selectedTabIndex ? '#16A75C' : '#FFFFFF'
              "
              :class="{
                'icon-tab-selected': indexTab === selectedTabIndex,
              }"
            />
          </div>

          <div
            class="ml-2 !font-roboto text-green-100"
            :class="{ '!text-gray-700': indexTab === selectedTabIndex }"
          >
            {{ statusTahura[dataTab.statusCode]?.label }}
            <p
              class="text-left !font-roboto text-xl font-medium text-white"
              :class="{
                '!text-blue-gray-800': indexTab === selectedTabIndex,
              }"
            >
              {{ dataTab.quantity }}
            </p>
          </div>
        </BaseTab>
      </button>
    </template>
  </BaseTabList>
</template>

<script>
import { statusTahura } from '@/constant/tahura.js'
export default {
  name: 'TabBarListTahura',
  props: {
    listTab: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedTabIndex: 0,
      statusTahura
    }
  },
  methods: {
    selectedTabHandle (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>
