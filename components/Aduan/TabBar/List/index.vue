<template>
  <BaseTabList
    class="bg-green-600"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab, indexTab }">
      <BaseTab
        v-if="
          dataTab.typeAduan.includes(typeAduan) ||
            dataTab.typeAduan.includes('all')
        "
        :class="{ 'ml-2': indexTab > 0 }"
        :selected="indexTab === selectedTabIndex"
        :title="dataTab.name"
      >
        <button class="flex items-start text-sm text-green-100" @click="$emit('button-tab',dataTab.id)">
          <div
            class="h-[28px] w-[28px] p-1 rounded-full"
            :class="
              indexTab === selectedTabIndex ? 'bg-gray-100' : 'bg-green-800'
            "
          >
            <BaseIconSvg
              :icon="dataTab.icon"
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
            {{ dataTab.name }}
            <p
              class="text-left !font-roboto text-xl font-medium text-white"
              :class="{
                '!text-blue-gray-800': indexTab === selectedTabIndex,
              }"
            >
              {{ dataTab.value }}
              <span
                class="!font-roboto text-sm font-medium capitalize text-white"
                :class="{
                  '!text-blue-gray-800': indexTab === selectedTabIndex,
                }"
              >{{ dataTab.unit }}</span>
            </p>
          </div>
        </button>
      </BaseTab>
    </template>
  </BaseTabList>
</template>

<script>

export default {
  name: 'TabBarList',
  props: {
    listTab: {
      type: Array,
      default: () => []
    },
    typeAduan: {
      type: String,
      default: ''
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
