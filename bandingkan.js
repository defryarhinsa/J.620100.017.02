// Fungsi membandingkan 2 array, mengembalikan boolean true jika kedua array sama
// Sama artinya: panjang sama DAN tiap elemen di posisi yang sama juga sama
function arraysSama(a, b) {
  // Jika panjang berbeda, langsung false, tidak perlu cek isi
  if (a.length !== b.length) {
    return false;
  }
  // Cek satu per satu, pakai !== supaya tipe juga harus sama
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  // Lolos semua pengecekan, berarti sama
  return true;
}
console.log(arraysSama([1, 2, 3], [1, 2, 3])); // true
console.log(arraysSama([1, 2, 3], [1, 2, 4])); // false
console.log(arraysSama([1, 2], [1, 2, 3])); // false
console.log(arraysSama([1, 2, 3], [3, 2, 1])); // false, urutan berbeda
