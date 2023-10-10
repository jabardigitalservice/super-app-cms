<template>
  <div class="font-serif my-5">
    <div class="w-full rounded-lg bg-white">
      <div class="container">
        <div class="mb-6">
          <h1 class="text-3xl font-bold">
            <slot name="title" />
          </h1>
          <slot name="header" />
        </div>

        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*eslint-disable*/
  name: "BasePreviewPdf",
};
</script>
