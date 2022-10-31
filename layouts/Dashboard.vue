<template>
  <div class="bg-[#EDEFF3]">
    <Sidebar class="bg-white w-min-[260px] fixed left-0 top-0 h-screen" />
    <div class="ml-[260px] p-6 h-screen">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDashboard'
}
</script>
