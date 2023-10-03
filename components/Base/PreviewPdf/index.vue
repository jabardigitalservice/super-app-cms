<template>
  <div class="bg-gray-100 font-serif">
    <div class="w-full rounded-lg bg-white p-6 shadow-md">
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
