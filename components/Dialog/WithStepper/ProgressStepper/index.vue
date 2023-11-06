<template>
  <nav>
    <ol class="flex items-center w-full">
      <li v-for="(item,index) in listProgressStepper" :key="index" :class="['flex w-full items-center',index === listProgressStepper.length-1 && 'w-fit']">
        <button class="w-fit z-10 text-base text-gray-600 font-roboto" :class="{'!text-white font-medium':index<indexCurrentActive}">
          <div class="flex items-center">
            <div class="h-8 w-8 bg-gray-200 flex justify-center flex-shrink-0 rounded-full items-center" :class="{'!bg-green-700':index<indexCurrentActive}">
              {{ index+1 }}
            </div>
            <span class="flex-shrink-0 pl-2 pr-4 bg-white" :class="{'!text-green-800 !font-semibold':index < indexCurrentActive}">{{ item }}</span>
          </div>
        </button>
        <div v-show="index<listProgressStepper.length-1" class="h-[2px] bg-gray-300 w-full mr-2" :class="{'!bg-green-700':index<indexCurrentActive}" />
      </li>
    </ol>
  </nav>
</template>

<script>

export default {
  name: 'ProgressStepper',
  props: {
    indexCurrentActive: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      listProgressStepper: ['Informasi Aduan', 'Lokasi Aduan', 'Lainnya']
    }
  }
}
</script>
