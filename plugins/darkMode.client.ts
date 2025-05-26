export default defineNuxtPlugin(() => {
  const saved = localStorage.getItem('darkMode')
  const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = saved === 'true' || (saved === null && prefers)
  document.documentElement.classList.toggle('dark', isDark)
})
