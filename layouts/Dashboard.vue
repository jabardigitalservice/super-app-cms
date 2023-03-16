<template>
  <div>
    <div class="bg-[#EDEFF3] flex">
      <Sidebar class="bg-white  fixed left-0 top-0 h-screen z-10" />
      <div class=" p-6 h-screen">
        <div class="container">
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
