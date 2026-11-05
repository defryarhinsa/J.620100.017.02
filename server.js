// Modul bawaan NodeJS, tidak perlu npm install
const http = require("http");
const fs = require("fs");
const path = require("path");

// Folder yang boleh diakses sebagai file statis
const folderPublic = path.join(__dirname, "public");

// Menentukan Content-Type dari ekstensi file, supaya browser menampilkannya dengan benar
function dapatkanContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html";
  if (ext === ".css") return "text/css";
  if (ext === ".js") return "text/javascript";
  if (ext === ".json") return "application/json";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "text/plain";
}

const server = http.createServer((req, res) => {
  // Hanya layani method GET, method lain ditolak 405 supaya tidak diproses sembarangan
  if (req.method !== "GET") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method tidak diizinkan");
    return;
  }

  // Endpoint utama dari soal: GET / mengembalikan hello world
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("hello world");
    return;
  }

  // Selain itu, jalankan sebagai static file server dari folder public
  // path.normalize mencegah akses keluar folder public lewat titik-titik
  const filePath = path.normalize(path.join(folderPublic, req.url));
  if (!filePath.startsWith(folderPublic)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Akses ditolak");
    return;
  }

  // Baca file, error ditangani di callback, bukan dilempar, supaya server tidak crash
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // File tidak ada
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File tidak ditemukan");
      } else {
        // Error lain, misal izin baca
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Terjadi kesalahan server");
      }
      return;
    }
    res.writeHead(200, { "Content-Type": dapatkanContentType(filePath) });
    res.end(data);
  });
});

// Tangani error server, misal port 8000 sudah dipakai, supaya tidak crash tanpa pesan
server.on("error", (err) => {
  console.log("Server error:", err.message);
});

// Jalankan di port 8000
server.listen(8000, () => {
  console.log("Server berjalan di http://localhost:8000");
});
