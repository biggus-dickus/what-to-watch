# Личный проект «Что посмотреть» [![Build status][travis-image]][travis-url]

* Студент: [Макс Масленко](https://up.htmlacademy.ru/react/1/user/107049).
* Наставник: [Вадим Шевяков](https://htmlacademy.ru/profile/id574589).
* Сборка: https://biggus-dickus.github.io/what-to-watch.

---

_Поскольку `gh-pages` не умеет отдавать приложения с клиентским роутингом, а также ввиду того, что проект задумывался под отдельный домен, обходные манипуляции с `HTML5 history API` приводят к непредусмотренному редиректу на страницу логина при загрузке._

_Это проблема `gh-pages`, при локальной сборке (`npm run build`) всё будет работать нормально._

_Для авторизации достаточно ввести ЛЮБУЮ почту и пароль._

---

### О проекте

«Что посмотреть» — онлайн-кинотеатр нового поколения. Смотрите новинки абсолютно бесплатно и в лучшем качестве. Оставляйте отзывы, ставьте оценки и выбирайте только лучшее из мира большого кино.

## Техническое задание

### Описание функциональности

#### Страницы приложения

Приложение состоит из нескольких страниц:

* `Main (/)`,
* `Sign In (/login)`,
* `My List (/mylist)`,
* `Film (/film:id)`,
* `Add review (/film/:id/review)`.

Страницы `My List`, `Add review` доступны только авторизованным пользователям. Если пользователь не авторизован, при переходе к этим страницам выполняется редирект на страницу `Sign In`.

Если пользователь не авторизирован или сессия истекла, то при попытке перехода к приватной странице выполняется редирект на страницу `Sign In`.

В правом углу шапки отображается аватар пользователя (если пользователь авторизован) или ссылка «Sign In» (если пользователь не авторизован).

Клик по аватарке пользователя выполняет переход на страницу `My List`.

#### Главная страница

На главной странице представлены жанры и превью фильмов. В шапке отображается постер и обложка фильма. Этот фильм можно сразу посмотреть, нажав кнопку «Play» или добавить в список «Watch List». Получение фильма для главной страницы выполняется отдельным запросом к серверу (см. «Взаимодействие с сервером»).

После загрузки приложения отображаются фильмы произвольных жанров. В списке жанров выделен «All genres».

Список жанров строится на основании полученной с сервера информации о фильмах.

В списке жанров отображается не более 9 жанров + All genres (выводит в список фильмы любых жанров).

#### Список фильмов

При смене жанра или получении информации о фильмах с сервера в списке фильмов отображается не больше 20 фильмов.

Показ дополнительных фильмов выполняется нажатием на кнопку «Show more».

Нажатие на кнопку «Show more» добавляет в список очередные 20 фильмов или оставшиеся фильмы.

После отображения всех фильмов, соответствующих выбранному жанру, кнопка «Show more» скрывается.

#### Карточка фильма

В карточке фильма выводится следующая информация:

* изображение (превью фильма);
* название фильма.

При клике на изображение или заголовок фильма выполняется переход на страницу «Film» (`/film/:id`).

При наведении и удержании курсора мыши на изображении фильма, вместо изображения начинает воспроизводиться видеопревью фильма.

#### Страница с описанием фильма

Страница с детальным описанием фильма доступна по адресу `/film/:id`, где id — идентификатор фильма, полученный с сервера. Например: `/film/123`.

Страница с детальным описанием фильма доступна всем пользователям.

В шапке страницы приведён следующий набор информации:

* большой постер;
* обложка фильма;
* название фильма;
* жанр;
* год выхода на экраны;
* кнопка запуска просмотра;
* кнопка добавления в список «К просмотру».

Более детальная информация о фильме представлена на трёх вкладках:

* Overview. Общая информация.
* Details. Расширенная информация.
* Reviews. Отзывы.

#### Вкладки

Overview. Общая информация о фильме:

* Описание фильма.
* Оценка. Например, `8.9` (всегда один знак после запятой).
* Описание оценки (`bad`, `normal`, `good`, `very good`, `awesome`).
* Количество голосов.
* Режиссёр.
* Список актёров.

Details. Расширенная информация:
* Режиссёр.
* Актёрский состав.
* Продолжительность (часы, минуты).
* Жанр.
* Год выхода на экраны.

Reviews. Список отзывов пользователей.

#### Оценка фильма

Текстовое представление оценки фильма формируется по следующим правилам:

* от 0 до 3 — `bad`,
* от 3 до 5 — `normal`,
* от 5 до 8 — `good`,
* от 8 до 10 — `very good`,
* 10 — `awesome`.

#### Похожие фильмы

Блок «More like this» показывает похожие фильмы. В нем отображается до 4-х карточек схожих фильмов. Похожие фильмы определяются по жанру. Карточки содержат тот же набор информации, что и карточки на главной странице.

Клик по карточке из блока «More like this» выполняет переход на страницу «Film» соответствующего фильма.

#### Отзывы

Каждый отзыв содержит:

* текст отзыва;
* оценку пользователя;
* имя пользователя.

Дата отзыва в формате: `месяц, число, года`. Например: `December 24, 2018`.

Отзывы должны быть отсортированы от новых к старым (новые сверху).

Добавление нового отзыва выполняется по кнопке «Add review».

#### Форма отправки отзыва

При нажатии на кнопку «Add review» выполняется переход на страницу `Add review` (`/films/:id/review`).

Страница доступна только авторизованным пользователям. Неавторизованные пользователи перенаправляются на страницу `Sign In`.

Пользователь выставляет оценку фильму от 1 до 5. Оценка выставляется путём выделения определённого количества звёзд.

Текст отзыва должен быть не меньше 50 и не больше 400 символов.

Пока пользователь не поставил оценку и не ввёл допустимый объём текста, кнопка отправки отзыва неактивна.

При нажатии кнопки «Post» форма должна блокироваться. Разблокировка формы происходит при возникновении ошибки.

В случае успешной отправки формы пользователь перенаправляется в карточку текущего фильма.

#### Страница My List

Страница содержит информацию о фильмах, добавленных в список к просмотру.

Добавление в список к просмотру осуществляется нажатием на кнопку «+ MyList» на странице «Film» или на главной (для фильма в шапке).

Страница «My List» доступна только авторизованным пользователям. Неавторизованные пользователи перенаправляются на страницу «Sign In».

Клик по карточке фильма (изображение, заголовок) выполняет переход на страницу «Film» с детальным описанием фильма.

#### Страница Sign In

Страница «Sign in» доступна по адресу `/login`.

Для входа в сервис пользователь вводит логин (email) и пароль.

Поскольку у сервиса отсутствует возможность регистрации, логин и пароль могут быть любыми.

В поле «логин» должен вводиться корректный email.

Страница доступна только неавторизованным пользователям.

Информация об ошибках выводится в блок ошибок.

#### Просмотр фильмов

При нажатии на кнопку «Play» отрисовывается плеер и начинается показ выбранного фильма.

Функциональность плеера:

* «Play/Pause». Запуск/остановка видео.
* «Exit». Остановка просмотра. Плеер скрывается.
* «Fullscreen». Перевод в полноэкранный режим.
* «Time elapsed». Оставшееся время.

Плеер реализуется с помощью `<video>`.

### Взаимодействие с сервером

Все необходимые данные загружаются с сервера.

Сервер доступен по адресу: `https://es31-server.appspot.com/wtw`.

В случае недоступности сервера отображается информационное сообщение. Дизайн сообщения остаётся на усмотрение разработчика.

Сервер принимает данные в виде JSON-объекта.

Запросы должны предоставлять доступ к кукам. В случае если запросы отправляются через `axios`, должен быть проставлен параметр `withCredentials: true`.

#### Ресурсы

##### GET /films

Коды ответов:

* 200 ОК

*Пример:*

**Request:** `GET /films`

**Response:** `200 OK`

```
[
  {
    id: 1,
    name: "The Grand Budapest Hotel",
    poster_image: "img/the-grand-budapest-hotel-poster.jpg",
    preview_image: "img/the-grand-budapest-hotel.jpg",
    background_image: "img/the-grand-budapest-hotel-bg.jpg",
    background_color: "#ffffff",
    video_link: "https://some-link",
    preview_video_link: "https://some-link",
    description: "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
    rating: 8.9,
    scores_count: 240,
    director: "Wes Andreson",
    starring: ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
    run_time: 99,
    genre: "Comedy",
    released: 2014,
    is_favorite: false
  }
]
```

##### GET /films/promo

Коды ответов:

* 200 OK

*Пример:*

**Request:** `GET /films/promo`

**Response:** `200 OK`

В ответ приходит объект с описанием фильма.

```
{
    id: 1,
    name: "The Grand Budapest Hotel",
    poster_image: "img/the-grand-budapest-hotel-poster.jpg",
    preview_image: "img/the-grand-budapest-hotel.jpg",
    background_image: "img/the-grand-budapest-hotel-bg.jpg",
    background_color: "#ffffff",
    video_link: "https://some-link",
    preview_video_link: "https://some-link",
    description: "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
    rating: 8.9,
    scores_count: 240,
    director: "Wes Andreson",
    starring: ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
    run_time: 99,
    genre: "Comedy",
    released: 2014,
    is_favorite: false
}
```

##### GET /favorite

Коды ответов:

* 200 ОК
* 403 Forbidden (в случае если не пройдена авторизация)

*Пример:*

**Request:** `GET /favorite`

**Response:** `200 OK`

В ответ приходит массив фильмов по аналогии с GET `/films`.

##### POST /favorite/:film_id/:status

Параметры:

* `:film_id` — ID фильма, который нужно добавить в избранное
* `:status` — значения могут быть 1 или 0. 1 добавляет фильм в избранное, 0 удаляет

Коды ответов:

* 200 ОК
* 403 Forbidden (в случае если не пройдена авторизация)

*Пример:*

**Request:** `POST /favorite/20/1`

**Response:** `200 OK`

В теле ответа приходят данные по фильму с актуальным состоянием поля `is_favorite`.

##### GET /comments/:film_id

Коды ответов:

* 200 ОК
* 400 Bad request

*Пример:*

**Request:** `GET /comments/20`

**Response:** `200 OK`

```
[
  {
    id: 1,
    user: {
      id: 4,
      name: "Kate Muir",
    },
    rating: 8.9,
    comment: "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
    date: "2019-05-08T14:13:56.569Z"
  }
]
```

##### POST /comments/:film_id

Коды ответов:
* 200 ОК
* 400 Bad Request
* 403 Forbidden (в случае если не пройдена авторизация)

*Пример:*

**Request:** `POST /comments/20`

```
{
  rating: 8.9,
  comment: "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years."
}
```

**Response:** `200 OK`

В ответ приходит массив комментариев к фильму.

##### POST /login

Коды ответов:

* 200 ОК
* 400 Bad Request

*Пример:*

**Request:** `POST /login`

```
{
  email: "Oliver.conner@gmail.com",
  password: "12345678"
}
```

**Response:** `200 OK`

```
{
  id: 1,
  email: "Oliver.conner@gmail.com",
  name: "Oliver.conner",
  avatar_url: "img/1.png"
}
```

##### GET /login

Коды ответов:

* 200 ОК
* 403 Forbidden (в случае если не пройдена авторизация)

*Пример:*

**Request:** `GET /login`

Response: `200 OK`

```
{
  email: "Oliver.conner@gmail.com",
  name: "Oliver.conner",
  avatar_url: "img/1.png"
}
```

В случае успешного запроса в куку записывается токен, по которому в дальнейшем происходит авторизация.

Если авторизация на сервере не проходит, возвращается 403-я ошибка при запросах на приватные части сайта.


---

<a href="https://htmlacademy.ru/intensive/react"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/react/logo-for-github.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[JavaScript, уровень 3](https://htmlacademy.ru/intensive/react)» от [HTML Academy](https://htmlacademy.ru).

[travis-image]: https://travis-ci.com/htmlacademy-react/107049-what-to-watch-1.svg?branch=master
[travis-url]: https://travis-ci.com/htmlacademy-react/107049-what-to-watch-1