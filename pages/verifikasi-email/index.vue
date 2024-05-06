<template>
  <EmailVerification verification-type="failed" email="test@mail.com" />
</template>

<script>
import EmailVerification from '~/components/aduan/EmailVerification'

export default {
  name: 'PageEmailVerification',
  components: {
    EmailVerification,
  },
  layout: 'Verification',
}
</script>
