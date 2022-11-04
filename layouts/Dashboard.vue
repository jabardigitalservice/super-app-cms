<template>
  <div>
    <div class="bg-[#EDEFF3]">
      <Sidebar class="bg-white w-min-[260px] fixed left-0 top-0 h-screen z-10" />
      <div class="ml-[260px] p-6 h-screen">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutDashboard'
}
</script>
