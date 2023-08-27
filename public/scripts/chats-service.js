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

  sendDirectMessage(connectedTo, message, onResponse) {
    fetch(`/direct-message/${connectedTo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => {
        if (res.status === 204) return onResponse();
      })
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
