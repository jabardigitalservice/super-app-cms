import { extend } from 'vee-validate'
import { required, min, max, numeric } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: (_, values) => `${values._field_} wajib diisi`
})

extend('requiredSelectForm', {
  ...required,
  message: (_, values) => `${values._field_} wajib dipilih`
})

extend('min', {
  ...min,
  message: (_, values) => `${values._field_} minimal ${values.length} karakter`
})

extend('max', {
  ...max,
  message: (_, values) => `${values._field_} maksimal ${values.length} karakter`
})

extend('url', {
  validate: value => value.startsWith('http://') || value.startsWith('https://'),
  message: (_, values) => `${values._field_} tidak valid`
})

extend('numeric', {
  ...numeric,
  message: (_, values) => `${values._field_} harus diisi angka`
})

extend('maxTenDigitsInt', {
  validate: value => /^\d{1,10}$/.test(value),
  message: (_, values) => `${values._field_} harus diisi angka & maksimal 10 karakter`
})
