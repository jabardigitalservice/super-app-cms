<template>
  <div class="bg-[#EDEFF3]">
    <Sidebar class="bg-white w-min-[260px] fixed left-0 top-0 h-screen" />
    <div class="ml-[260px] px-6 py-[26px] h-max">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDashboard'
}
</script>
