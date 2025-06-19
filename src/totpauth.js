const speakeasy = require('speakeasy');
const fs = require('fs');

// Test kullanıcısı ve token
const TEST_USER = 'basar.sonmez';
const TEST_TOKEN = '506085';

// users.json dosyasını oku
const getUsers = () => {
  try {
    const data = fs.readFileSync('totpusers.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('totpusers.json okuma hatası:', err);
    return {};
  }
};

// TOTP doğrulama fonksiyonu
const verifyToken = () => {
  const userId = TEST_USER;
  const token = TEST_TOKEN;

  // Kullanıcıları oku
  const users = getUsers();
  const user = users[userId];

  if (!user) {
    console.log(`Kullanıcı ${userId} bulunamadı`);
    return;
  }

  // TOTP kodunu doğrula
  const verified = speakeasy.totp.verify({
    secret: user.secret,
    encoding: 'base32',
    token: token,
    window: 1 // 30 saniyelik zaman toleransı
  });

  if (verified) {
    console.log(`TOTP kodu doğrulandı! Kullanıcı: ${userId}, Token: ${token}`);
  } else {
    console.log(`Geçersiz TOTP kodu. Kullanıcı: ${userId}, Token: ${token}`);
  }
};

// Doğrulamayı çalıştır
verifyToken();