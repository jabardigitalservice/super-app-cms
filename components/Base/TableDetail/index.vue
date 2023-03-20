<template>
  <div class="border border-gray-200 rounded-lg">
    <jds-simple-table>
      <thead class="h-[42px] py-[6px]">
        <tr>
          <th colspan="3" class="rounded-t-lg !bg-green-600">
            <h1 class="text-white text-[10px] font-roboto font-bold">
              {{ header }}
            </h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </jds-simple-table>
  </div>
</template>

<script>
export default {
  name: 'DetailTableComponent',
  props: {
    header: {
      type: String,
      default: ''
    }
  }
}
</script>
