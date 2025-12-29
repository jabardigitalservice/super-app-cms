# Sapawarga CMS
Sapawarga CMS is a web admin used to manage all features in the Sapawarga application.
<br><br>

## About
Repository Frontend - Sapawarga CMS
<br><br>

## How To Install

- Clone This Repo

```[
https://github.com/jabardigitalservice/super-app-cms.git
```

- Go To Folder Repo

```
cd superapps-cms
```

- Install Module

```
npm install
```

- Copy ```.env.example``` and rename to ```.env``` then fill the data
<table>
  <tr>
      <th>CONFIG</th>
      <th>DESCRPTION</th>
   </tr>
   <tr>
      <td>BASE_URL</td>
      <td>filled with api domain</td>
      <td>example : https://tv-show-admin-service-staging.up.railway.app/ (my api domain) </td>
   </tr>
    <tr>
      <td>BROWSER_BASE_URL</td>
      <td>filled with api domain</td>
      <td>example : https://tv-show-admin-service-staging.up.railway.app/ (my api domain) </td>
   </tr>
  <tr>
    <td>KEYCLOCK_CLIENT_ID</td>
    <td>filled with client id in keycloak</td>
    <td>example: wb-admin</td>
  </tr>
  <tr>
    <td>KEYCLOCK_ENDPOINT</td>
    <td>filled with endpoint configuration keycloak</td>
  </tr>
   <tr>
    <td>KEYCLOCK_BASE_URL</td>
    <td>filled with url keycloak</td>
  </tr>
  <tr>
    <td>VERSION_ENDPOINT</td>
    <td>filled with version endpoint API</td>
    <td>example: v1</td>
  </tr>
  <tr>
    <td>API_KEY</td>
    <td>filled with API Key from backend</td>
  </tr>
  <tr>
    <td>GOOGLE_ANALYTICS_ID</td>
    <td>filled with id from google analytic</td>
  </tr>
  <tr>
    <td>TINYMCE_API_KEY</td>
    <td>filled with qpi key that will be obtained from tinymce</td>
  </tr>
  <tr>
    <td>GOOGLE_MAPS_API_KEY</td>
    <td>filled with apy key from google maps</td>
  </tr>
  <tr>
    <td>UNLEASH_URL</td>
    <td>filled with url unleash</td>
  </tr>
  <tr>
    <td>UNLEASH_TOKEN</td>
    <td>filled with tokens that will be obtained from unleash</td>
    <td>example: *=development.xxxxx</td>
  </tr>
  <tr>
    <td>EXPIRY_FORGOT_PASSWORD_LINK</td>
    <td>contains information about how long the forgot password link will expire in hours</td>
    <td>example : 12</td>
  </tr>
  <tr>
    <td>EXPIRY_INVITATION_LINK</td>
    <td>contains information about how long the invitation link will expire in hours</td>
    <td>example : 12</td>
  </tr>
</table>

- Type ``` npm run dev ``` To Start The Project
<br><br>

## Feature

- Klaim RW: claim & reject user for role RW
- Klaim Camat : claim & reject user for role camat.
- Klaim Lurah : claim & reject user for role lurah.
- Klaim Kepala Desa : claim & reject user for role kepala desa.
- Klaim Posyandu : claim & reject user for role posyandu.
- Message Notification : send message notifications to the Sapawarga application
- Aduan : carry out complaint processing from various complaint sources, especially from the Sapawarga application 
<br><br>

## Build Using

- [CSS Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- [Nuxt JS v.2](https://v2.nuxt.com/)
- jds design system
- [VueX](https://vuex.vuejs.org/)
- [Nuxt Auth](https://auth.nuxtjs.org/)
<br><br>

## Sapawarga CMS - Staging 
<https://superapp-cms.staging.digitalservice.id/>
<br><br>
