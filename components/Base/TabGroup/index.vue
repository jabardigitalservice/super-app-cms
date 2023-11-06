<template>
  <div class="rounded-lg border-2 border-green-600 h-fit">
    <slot name="tab-list" />
    <slot name="tab-panel" />
  </div>
</template>

<script>

export default {
  name: 'BaseTabGroup'
}
</script>
