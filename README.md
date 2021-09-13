# Доставки
## Сервер приложения доставки и расчета стоимость доставки с точки А в точку Б (Nodejs (Express) + MySQL)

### РОУТЫ :
### /api/auth/register - регистрация. 
           Тело запроса:
           {
              "name": "Your name",
              "email" "example@gmail.com",
              "password": "Your password" 
           }
           
### /api/auth/login - Авторизация. 
           Тело запроса:
           {
              "email" "example@gmail.com",
              "password": "Your password" 
           }
           Получаем Bearer токен
           
### /api/transportation/add - Добавление перевозки в базу. 
           Тело запроса:
           {
              "start" "Точка отправления",
              "finish": "Точка назначения",
              "weight": "Вес перевозки"
           }
           В Authorization вставляем Bearer token
           
### /api/transportation/ - Get запрос на получение списка перевозок. 
           Тело запроса:
           {
              "start" "Точка отправления",
              "finish": "Точка назначения",
              "weight": "Вес перевозки"
           }
           В Authorization вставляем Bearer token
