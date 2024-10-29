import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

export async function showErrorToast(message: string) {
  await Toast.fire({
    icon: 'error',
    title: message,
  })
}

export async function showSuccesToast(message: string) {
  await Toast.fire({
    icon: 'success',
    title: message,
  })
}
