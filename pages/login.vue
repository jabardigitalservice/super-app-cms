<template>
  <div class="min-h-screen bg-[#E5E5E5]">
    <div class="flex h-screen items-center justify-center">
      <div
        class="h-fit w-[470px] rounded-lg border border-[#EAEAEF] bg-white py-[40px] px-[24px] drop-shadow-md"
      >
        <div class="container mx-auto">
          <HeaderLogin />
          <div class="mt-[44px]">
            <BaseButton
              class="bg-green-600 text-white hover:bg-green-700"
              data-cy="login__button--direct-login-account"
              @click="loginKeyclock"
            >
              <template #icon-right>
                <div
                  class="flex items-center justify-between font-lato text-[14px] font-bold"
                >
                  Login Akun
                  <jds-icon
                    name="arrow-right"
                    class="h-[12px] w-[15px]"
                    fill="#FFFFFF"
                  />
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

export default {
  components: {
    HeaderLogin,
  },
  methods: {
    loginKeyclock() {
      this.$auth.loginWith('keyclock')
    },
  },
}
</script>
