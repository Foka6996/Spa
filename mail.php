<?php
// Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем параметры, посланные с javascript
    $name = $_POST['name'];
    $number = $_POST['number'];
    $ritual = $_POST['ritual'];
    $date = $_POST['date'];

    // создаем переменную с содержанием письма
    $content = $name . ' оставил заявку на массаж ' . $ritual . ' Выбрал дату  ' . $date . '. Его телефон: ' . $number;

    // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("admin@whitelotus.com", 'Запрос на бронирование время на массаж', $content);

    if ($success) {
        // Отдаем 200 код ответа на http запрос
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}