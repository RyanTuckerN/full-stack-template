let API_URL = ''

switch(window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    API_URL = 'http://localhost:3333'
    break;
  case '<app-url-here>.com':
    API_URL = 'https://<app-url-here>'
}

export default API_URL