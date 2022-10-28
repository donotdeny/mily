import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function getCookie (name) {
  var nameEQ = encodeURIComponent() + '=';
  var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return decodeURIComponent(c.substring(nameEQ.length, c.length))
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}