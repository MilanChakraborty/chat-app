class ChatService {
  getLoginDetails(onResponse) {
    fetch('/login-details', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  getChatHeads(onResponse) {
    fetch('/chat-heads', { method: 'GET' })
      .then((response) => response.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  requestLogout() {
    fetch('/logout', { method: 'POST' })
      .then((response) => {
        if (response.redirected) window.location.replace(response.url);
      })
      .catch((err) => console.log(err));
  }
}
