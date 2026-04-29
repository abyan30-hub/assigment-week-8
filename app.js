// Ambil data lama atau buat array kosong
let daftarPengeluaran = JSON.parse(localStorage.getItem("data_expenses")) || [];

function tambahData() {
    const nama = document.getElementById("namaExp").value;
    const nominal = document.getElementById("nominalExp").value;
    const kategori = document.getElementById("kategoriExp").value;

    // Validasi input (Nilai Plus) 
    if (nama === "" || nominal === "" || nominal <= 0) {
        alert("Harap isi nama dan nominal yang benar!");
        return;
    }

    // Buat objek data [cite: 45]
    const dataBaru = {
        id: Date.now(),
        nama: nama,
        nominal: parseInt(nominal),
        kategori: kategori
    };

    daftarPengeluaran.push(dataBaru);
    simpanKeStorage();
    
    // Bersihkan form
    document.getElementById("namaExp").value = "";
    document.getElementById("nominalExp").value = "";
}

function hapusData(id) {
    // Fitur hapus data [cite: 22]
    daftarPengeluaran = daftarPengeluaran.filter(item => item.id !== id);
    simpanKeStorage();
}

function simpanKeStorage() {
    // Simpan ke localStorage sesuai instruksi [cite: 12, 24]
    localStorage.setItem("data_expenses", JSON.stringify(daftarPengeluaran));
    tampilkanData();
}

function tampilkanData() {
    const tabel = document.getElementById("tabelBody");
    const totalTampil = document.getElementById("totalTampil");
    let html = "";
    let total = 0;

    daftarPengeluaran.forEach(item => {
        total += item.nominal;
        html += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp ${item.nominal.toLocaleString()}</td>
                <td>${item.kategori}</td>
                <td><button class="btn-hapus" onclick="hapusData(${item.id})">Hapus</button></td>
            </tr>
        `;
    });

    tabel.innerHTML = html;
    totalTampil.innerText = total.toLocaleString(); // Tampilkan total [cite: 25]
}

// Munculkan data saat pertama kali buka halaman [cite: 16]
tampilkanData();