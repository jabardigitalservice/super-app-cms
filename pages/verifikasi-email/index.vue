<template>
  <EmailVerification
    :title="verificationType.title"
    :description="verificationType.description"
    :detail-item="verificationType?.detailItem"
    :icon="verificationType.icon"
    :button="verificationType.button"
  />
</template>

<script>
import { formatDate } from '~/utils'
export default {
  name: 'PageEmailVerification',
  auth: false, // the page will be executed without logging in first
  layout: 'Verification',
  async asyncData({ $axios, query, store }) {
    const queryToken = query.token
    const dataDecode = Buffer.from(queryToken, 'base64').toString('utf-8')
    const token = dataDecode.split(':')[0]
    const userId = dataDecode.split(':')[1]
    const isAuthed = dataDecode.split(':')[2] === 'true'
    const email = dataDecode.split(':')[3]
    const linkPage = isAuthed
      ? '/login'
      : Buffer.from(dataDecode.split(':')[4], 'base64').toString('utf-8')
    const timestamp = dataDecode.split(':').slice(5).join(':')
    store.commit('axios/setAuthorizationHeader', { 'X-Timestamp': timestamp })
    let verificationType = { title: 'Halo Admin!' }
    try {
      await $axios.post('/users/admin/complaint/verify-invitation', {
        token,
        user_id: userId,
      })
      if (isAuthed) {
        verificationType = {
          description: 'Email Anda sudah terdaftar sebagai akun Sapawarga.',
          button: { label: 'Silahkan Login', linkPage },
          icon: 'email-verification-success',
        }
      } else {
        verificationType = {
          description:
            'Email Anda belum terdaftar sebagai akun Sapawarga. Silahkan melakukan pembuatan kata sandi terlebih dahulu dengan email dibawah!',
          button: { label: 'Buat Kata Sandi Sekarang', linkPage },
          icon: 'email-verification-failed',
          detailItem: email,
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        verificationType = {
          title: 'Link Verifikasi Sudah Tidak Valid',
          description:
            'Link verifikasi yang Anda gunakan sudah tidak berlaku atau kadaluarsa. Silakan minta link verifikasi baru melalui tim Sapawarga.',
          icon: 'email-verification-invalid',
        }
      }
    }
    store.commit('axios/setAuthorizationHeader', {
      'X-Timestamp': formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
    })
    return { verificationType }
  },
}
</script>
