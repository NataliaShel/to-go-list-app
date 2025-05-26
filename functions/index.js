// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

// ОНОВЛЕНО: Ініціалізуємо Firebase Admin SDK з обліковими даними сервісного облікового запису
// Шлях до вашого файлу serviceAccountKey.json
// Переконайтеся, що to-go-fec0c-firebase-adminsdk-fbsvc-2c2aee0863.json знаходиться в папці functions/
admin.initializeApp({
  credential: admin.credential.cert(require('./to-go-fec0c-firebase-adminsdk-fbsvc-2c2aee0863.json'))
});

exports.generateCustomToken = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== 'POST') {
            console.warn('Отримано не-POST запит до generateCustomToken. Метод:', req.method);
            return res.status(405).send('Метод не дозволено! Дозволено лише POST.');
        }

        const { uid } = req.body;

        if (!uid) {
            console.error('generateCustomToken: UID відсутній у тілі запиту.');
            return res.status(400).send('UID є обов\'язковим параметром у тілі запиту.');
        }

        try {
            const customToken = await admin.auth().createCustomToken(uid);
            console.log(`Успішно згенеровано Custom Token для UID: ${uid}`);
            return res.status(200).json({ token: customToken });
        } catch (error) {
            console.error(`Помилка при генерації Custom Token для UID ${uid}:`, error);
            return res.status(500).send(`Помилка сервера при генерації токена: ${error.message}`);
        }
    });
});