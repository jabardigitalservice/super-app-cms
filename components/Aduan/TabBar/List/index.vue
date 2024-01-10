<template>
  <BaseTabList
    class="bg-green-600"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab, indexTab }">
      <button
        :class="{ 'ml-2': indexTab > 0 }"
        @click="$emit('button-tab', dataTab.id)"
      >
        <BaseTab
          class="flex items-start text-sm text-green-100"
          :selected="indexTab === tabIndex"
          :title="dataTab.name"
        >
          <div
            class="h-[28px] w-[28px] rounded-full p-1"
            :class="
              indexTab === tabIndex ? 'bg-gray-100' : 'bg-green-800'
            "
          >
            <BaseIconSvg
              :icon="dataTab.icon"
              class="icon-tab-content !h-[14px] !w-[14px] !shadow-lg"
              :fill-color="
                indexTab === tabIndex ? '#16A75C' : '#FFFFFF'
              "
              :class="{
                'icon-tab-selected': indexTab === tabIndex,
              }"
            />
          </div>

          <div
            class="ml-2 !font-roboto text-green-100"
            :class="{ '!text-gray-700': indexTab === tabIndex }"
          >
            {{ dataTab.name }}
            <p
              class="text-left !font-roboto text-xl font-medium text-white"
              :class="{
                '!text-blue-gray-800': indexTab === tabIndex,
              }"
            >
              {{ dataTab.value }}
              <span
                class="!font-roboto text-sm font-medium capitalize text-white"
                :class="{
                  '!text-blue-gray-800': indexTab === tabIndex,
                }"
              >{{ dataTab.unit }}</span>
            </p>
          </div>
        </BaseTab>
      </button>
    </template>
  </BaseTabList>
</template>

<script>
export default {
  name: 'TabBarList',
  props: {
    listTab: {
      type: Array,
      default: () => ([])
    },
    typeAduan: {
      type: String,
      default: ''
    },
    tabIndex: {
      type: Number,
      default: 0
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
      this.$emit('selected', index)
    }
  }
}
</script>
