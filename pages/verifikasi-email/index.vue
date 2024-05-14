<template>
  <EmailVerification
    :verification-type="isAuthed ? 'success' : 'failed'"
    :email="email"
    :link-page="link"
  />
</template>

<script>
export default {
  name: 'PageEmailVerification',
  auth: false, // the page will be executed without logging in first
  layout: 'Verification',
  async asyncData({ $axios, query }) {
    const queryToken = query.token
    const dataDecode = Buffer.from(queryToken, 'base64').toString('utf-8')
    const token = dataDecode.split(':')[0]
    const userId = dataDecode.split(':')[1]
    const isAuthed = dataDecode.split(':')[2] === 'true'
    const email = dataDecode.split(':')[3]
    const link = isAuthed
      ? '/login'
      : Buffer.from(dataDecode.split(':')[4], 'base64').toString('utf-8')
    await $axios.post('/users/admin/complaint/verify-invitation', {
      token,
      user_id: userId,
    })
    return { isAuthed, email, link }
  },
}
</script>
