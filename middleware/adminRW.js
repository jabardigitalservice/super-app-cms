export default function ({ $role, redirect }) {
  console.log($role)
  if ($role !== 'tiket') {
    // jika user bukan admin, redirect ke halaman yang sesuai
    return redirect('/not-authorized')
  }
}
