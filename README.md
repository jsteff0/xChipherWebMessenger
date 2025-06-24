# xChipherWebMessenger

Интерактивный веб-интерфейс для демонстрации работы алгоритма шифрования **xCipher**.  
Проект включает чат с автоматической отправкой ссылок, шифратор/дешифратор и страницу Playground.

## 🧠 Описание

Этот сайт — часть презентации проекта **xCipher**, кастомной интерпретации AES с авторскими модификациями.  
Сервис включает:

- 💬 Чат-бот, который присылает ссылки на GitHub, Telegram и Playground
- 🔐 Визуальный интерфейс шифрования и дешифрования
- 🧪 Отдельную страницу Playground для тестирования шифра
- 📁 Структурированную архитектуру сайта с разделением логики и UI

## 🧩 API

Проект предоставляет простое HTTP API для шифрования и дешифрования текста с помощью алгоритма **xCipher**.

### 🔐 `POST /api/encrypt`

**Описание:** Зашифровать текст с указанным ключом.

**Тело запроса (JSON):**
```json
{
  "text": "Hello",
  "key": "abcdef0123456789abcdef0123456789"
}
```
**Ответ (JSON):**
```json
{
  "result": "ciphertext_here"
}
```
### 🔓 `POST /api/decrypt`

**Описание:** Расшифровать текст с указанным ключом.

**Тело запроса (JSON):**
```json
{
  "text": "ciphertext_here",
  "key": "abcdef0123456789abcdef0123456789"
}
```
**Ответ (JSON):**
```json
{
  "result": "Hello"
}
```

### 📌 Пример использования с `fetch`:
```ts
const res = await fetch("/api/decrypt", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: "ciphertext_here",
    key: "abcdef0123456789abcdef0123456789"
  })
});

const data = await res.json();
console.log(data.result);
```

## 📂 Структура проекта

```
src/
├── lib/ # Основная логика шифрования (xCipher)
├── routes/
│ ├── +page.svelte # Главная страница (чат)
│ ├── playground/ # Страница тестирования
│ └── euromath2025/ # Старая главная страница, перенесена сюда
```


## 🚀 Запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите проект:
```bash
npm run dev
```

3. Перейдите на [http://localhost:5173](http://localhost:5173)

## 🔗 Ссылки

🔒 [Репозиторий xCipher (логика)](https://github.com/jsteff0/xCipher)

🧠 [Euromath страница](https://www.xcipher.link/euromath2025)

🧪 [Playground](https://www.xcipher.link/playground)

👤 [Автор](https://t.me/jsteff0)