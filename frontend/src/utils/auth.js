export const baseUrl = 'http://localhost:3000';

function getResponseData(res) {
  if(res.ok) {
    return res.json(); 
  }
  else {
    return res.json()
    .then(data => {
      throw new Error(data.error || data.message);
    });
  }
}

export function register(password, email) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password, email })
  })
  .then(res => getResponseData(res))
}

export function authorize(password, email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email })
  })
  .then(res => getResponseData(res))
}

export function getContent() {
  return fetch(`${baseUrl}/users/me`, {
    credentials: 'include',
    method: 'GET',
    headers: { "Content-Type": "application/json" }
  })
  .then(res => getResponseData(res)) 
}

export function logout(email) {
  return fetch(`${baseUrl}/signout`, {
    credentials: 'include',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
}
