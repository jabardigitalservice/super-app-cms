<template>
  <BaseTabListString
    class="h-12 bg-white"
    :list-tab="listTab"
    @selected="selectedTabHandle"
  >
    <template #default="{ dataTab }">
      <button
        class="!ml-4 !mr-2 !w-fit"
        :class="{
          'border-b-[3px] border-green-700': dataTab.id === selectedTabId,
        }"
        @click="$emit('button-tab', dataTab.id)"
      >
        <BaseTab
          class="!h-[45px] !min-w-[102px] rounded-none !bg-white !py-[10px] !px-2"
          :selected="dataTab.id === selectedTabId"
          :title="dataTab.name"
        >
          <div
            class="text-sm font-medium text-gray-700"
            :class="{
              '!font-bold !text-green-700': dataTab.id === selectedTabId,
            }"
          >
            {{ dataTab.name }}
          </div>
        </BaseTab>
      </button>
    </template>
  </BaseTabListString>
</template>

<script>
export default {
  name: 'TabBarMenu',
  props: {
    listTab: {
      type: Array,
      default: () => [],
    },
    idTab: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedTabId: this.idTab,
    }
  },
  methods: {
    selectedTabHandle(dataTab) {
      this.selectedTabId = dataTab.id
    },
  },
}
</script>
