<template>
  <div>
    <div class="flex bg-[#EDEFF3]">
      <Sidebar class="fixed left-0 top-0 z-10 h-screen bg-green-600" />
      <div class="h-full w-full py-6">
        <div class="mx-10">
          <BaseHeader
            :navigations="$store.state.header.navigations"
            :description-page="$store.state.header.descriptionPage"
          />
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDashboard'
}
</script>
