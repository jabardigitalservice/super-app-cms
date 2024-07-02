<template>
  <div>
    <CreatePasswordInformation
      :information-type="isSuccess ? 'success' : 'failed'"
      :email="email"
      :link="link"
    />
  </div>
</template>

<script>
export default {
  name: 'PageCreatePasswordInformation',
  auth: false,
  layout: 'Verification',
  data() {
    return {
      email: '',
      link: '#',
      isSuccess: false,
    }
  },
  mounted() {
    const queryToken = this.$route.query?.token
    const dataDecode = Buffer.from(queryToken, 'base64').toString('utf-8')
    this.isSuccess = dataDecode.split(':')[0] === 'true'
    let token = ''
    if (this.isSuccess) {
      this.email = dataDecode.split(':')[1] || ''
    } else {
      token = dataDecode.split(':')[1] || ''
    }
    this.link = this.isSuccess ? '/login' : `/buat-password?token=${token}`
  },
}
</script>
