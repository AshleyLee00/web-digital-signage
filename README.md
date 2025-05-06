## DigitalSignage

*📺 Simple self-hosted digital signage software for turning screens into beautiful content displays*

![Outdated Dependencies](https://david-dm.org/wassgha/digital-signage.svg) ![Travis Build](https://travis-ci.org/wassgha/digital-signage.svg?branch=master)

### Screenshots

Digital Display Preview

![Screenshot of the display](assets/preview.png?raw=true)

Administrator Panel: Changing the widget layout

![Screenshot of the administrator panel](assets/layout.png?raw=true)

Administrator Panel: Slides inside a slideshow

![Screenshot of the administrator panel](assets/slides.png?raw=true)


### Demo

Use the demo website at [http://digitaldisplay.herokuapp.com](http://digitaldisplay.herokuapp.com) (username: **demo**, password: **demo**)

### How to Run:

1. Set up a MongoDB installation locally (or in the cloud) and create a `digitaldisplay` database

2. Run the setup utility using

```bash
npm run setup
```
and specify the URI to your database.

4. Install dependencies and run the program

```bash
npm install
npm run dev
```

### Updating the software

Assuming the software was cloned from this github repository, it is possible to use the included script

```bash
npm run update
```

which pulls the latest stable version of `digital-signage` from github, installs dependencies and re-builds the software.

### Features

- ✅ Automatic refresh on content change (you should never need to touch a display once set up!)
- ✅ Totally modular, with a comprehensive widget management system (adding a widget is very simple!)
- ✅ Multiple built-in widgets to get you started:
  - ✅ Slideshow widget

    <img src="assets/slideshow.gif?raw=true" height="300" alt="Animated screencast of the slideshow widget" />

  - ✅ Weather widget

    <img src="assets/weather.png?raw=true" height="200" alt="Screenshot of the weather widget" />

  - ✅ "Congratulations" widget

    <img src="assets/congratulations.gif?raw=true" height="200" alt="Animated screencast of the congratulations widget" />

  - ✅ Youtube embed widget
  - ✅ Web (iframe) widget

    <img src="assets/web.png?raw=true" height="200" alt="Screenshot of the web widget" />

  - ✅ Standalone image widget

    <img src="assets/standalone-image.png?raw=true" height="200" alt="Screenshot of the image widget" />

  - ✅ Announcements widget

    <img src="assets/announcements.png?raw=true" height="200" alt="Screenshot of the announcements widget" />

  - ✅ List widget (can be used a directory, time sheet, etc.)

    <img src="assets/list.gif?raw=true" height="200" alt="Animated screencast of the list widget" />

- ✅ Flexible, responsive widget grid that allows you to drag, drop and resize widgets
- ✅ Versatile slideshow system that allows multiple slideshows, multiple slide types (images, videos, youtube, web, etc.) inside the same display with variable durations, titles and descriptions for each slide!
- ✖ Support for multiple displays (in progress)


### Adding a new widget

Given the highly modular structure of this program, implementing a new widget is a simple task! Simply follow these easy steps to get started:
1. Create a new folder inside the `​widgets/​` folder, name it according to your widget's name

```
 /
  actions/
  api/
  assets/
  components/
  helpers/
  pages/
  styles/
  widgets/
    .
    .
    .
    (new) MyWidget/
    widget_list.js
    base_widget.js
    index.js

```
2. Create an index file inside the newly created folder called `index.js` ​(extending the​ `base_widget` ​class) as follows:

```js
import BaseWidget from '../base_widget'

export default class MyWidget extends BaseWidget {
  constructor() {
    super({
      name: 'MyWidget',
      version: '0.1',
      icon: ['my-icon'], // Shown in the admin panel
      defaultData: {
         // Your implementation here
      }
    })
  }
}
```

The widget's icon should come from `FontAwesome`.

3. Implement two `React` components: `Options` (renders the dialog that will allow the administrator to change the widget's configuration) and `Widget` (renders the user-facing side widget that will be displayed on the TV), return them from getter functions that you add to your `index.js` file:

```js
export default class MyWidget extends BaseWidget {
  // ...

  get Widget() {
    return (<div>Your implementation here</div>)
  }

  get Options() {
    return (<div>Your implementation here</div>)
  }

  // ...
}
```

4. Finally, when done implementing the widget, register it by adding its folder's name to the `widgets/widget_list.js​` file

```js
module.exports = ['slideshow', 'weather', 'congrats', 'youtube', 'web',
    'image', 'list', 'announcement', /* new */ 'MyWidget']
```

5. Restart the server to see the new widget appear on the administrator panel

### 계정 생성 및 로그인 안내

#### 1. demo 계정 생성

초기 관리자 계정이 없거나, demo 계정이 필요하다면 아래 주소로 GET 요청을 보내세요:

```
GET /api/v1/user/demo
```

예시:
- http://localhost:3001/api/v1/user/demo

이후 username: `demo`, password: `demo`로 로그인할 수 있습니다.

#### 2. 회원가입(계정 생성) API

웹 UI에서 직접 계정을 만들고 싶다면, 아래 API를 사용할 수 있습니다:

```
POST /api/v1/user/register
Content-Type: application/json
{
  "username": "원하는아이디",
  "password": "원하는비밀번호"
}
```

이 API를 활용해 회원가입 폼을 만들거나, Postman 등으로 직접 계정을 생성할 수 있습니다.

#### 3. 로그인 API

```
POST /api/v1/user/login
Content-Type: application/json
{
  "username": "아이디",
  "password": "비밀번호"
}
```

성공 시 `{ success: true }`를 반환합니다.

### 배포 가이드

#### PM2를 사용한 프로덕션 배포

PM2는 Node.js 애플리케이션을 프로덕션 환경에서 관리하기 위한 프로세스 매니저입니다. 다음 단계를 통해 Digital Signage 애플리케이션을 배포할 수 있습니다.

1. **PM2 설치**
```bash
npm install -g pm2
```

2. **애플리케이션 빌드**
```bash
cd /path/to/digital-signage
npm run build
```

3. **PM2로 애플리케이션 실행**
```bash
pm2 start server.js --name "digital-signage"
```

4. **시스템 시작 시 자동 실행 설정**
```bash
pm2 startup
pm2 save
```

5. **유용한 PM2 명령어**
- 로그 확인: `pm2 logs digital-signage`
- 앱 재시작: `pm2 restart digital-signage`
- 앱 중지: `pm2 stop digital-signage`
- 앱 삭제: `pm2 delete digital-signage`
- 모니터링: `pm2 monit`

#### Nginx를 사용한 프록시 설정

Nginx를 사용하여 도메인을 Digital Signage 애플리케이션으로 연결할 수 있습니다.

1. **Nginx 설치**
```bash
sudo apt update
sudo apt install nginx
```

2. **Nginx 설정 파일 생성**
```bash
sudo nano /etc/nginx/sites-available/digital-signage
```

아래 내용을 파일에 작성하세요 (도메인과 포트를 상황에 맞게 변경):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **설정 활성화 및 Nginx 재시작**
```bash
sudo ln -s /etc/nginx/sites-available/digital-signage /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **HTTPS 설정 (선택사항)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

이제 도메인으로 접속하면 Digital Signage 애플리케이션에 접근할 수 있습니다.
