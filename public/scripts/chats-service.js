class ChatService {
  getLoginDetails(onResponse) {
    fetch('/login-details', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  getChatHeads(onResponse) {
    fetch('/chat-heads', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  isUserExists(username, onResponse) {
    fetch(`/user-exists/${username}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  getChatHistory(connectedTo, onResponse) {
    fetch(`/chat-history/${connectedTo}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => onResponse(data))
      .catch((err) => console.log(err));
  }

  requestLogout() {
    fetch('/logout', { method: 'POST' })
      .then((res) => {
        if (res.redirected) window.location.replace(res.url);
      })
      .catch((err) => console.log(err));
  }
}
