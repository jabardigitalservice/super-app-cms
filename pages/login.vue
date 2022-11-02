<template>
  <div class="bg-[#E5E5E5] min-h-screen">
    <div class="flex justify-center items-center h-screen">
      <div class="h-fit w-[470px] bg-white border border-[#EAEAEF] rounded-lg drop-shadow-md py-[40px] px-[24px]">
        <div class="container mx-auto">
          <HeaderLogin />
          <div class="mt-[44px]">
            <BaseButton class="bg-green-600 text-white hover:bg-green-700" @click="loginKeyclock">
              <template #icon-right>
                <div class="flex justify-between items-center text-[14px] font-lato font-bold">
                  Login Akun
                  <jds-icon name="arrow-right" class="w-[15px] h-[12px]" fill="#FFFFFF" />
                </div>
              </template>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogin from '~/components/Login/Header.vue'
import BaseButton from '~/components/Base/Button/BaseButton.vue'

export default {
  components: {
    HeaderLogin,
    BaseButton
  },
  methods: {
    loginKeyclock () {
      this.$auth.loginWith('keyclock')
    }
  }
}
</script>
