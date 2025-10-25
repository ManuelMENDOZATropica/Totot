document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('fecha');
  if (fechaInput && !fechaInput.value) {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    fechaInput.value = formatted;
  }
});
