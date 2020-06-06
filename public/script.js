const socket = io('http://localhost:3000')
const chat = document.querySelector('#chat')

chat.addEventListener('submit', sendMessage)

socket.on('receivedMessage', message => renderMessage(message))
socket.on('previousMessages', messages => {
  messages.forEach(message => renderMessage(message))
})

function sendMessage(event) {
  event.preventDefault()
  const author = chat.username.value
  const message = chat.message.value

  if(author && message) {
    const messageToSend = {
      author,
      message
    }

    renderMessage(messageToSend)
    socket.emit('sendMessage', messageToSend)
  }
}

function renderMessage(message) {
  const messagesDiv = document.querySelector('.message')
  const messageElement = document.createElement('div')
  messageElement.className = 'message-container'
  messageElement.innerHTML = `<strong>${message.author}:</strong> ${message.message}`

  messagesDiv.appendChild(messageElement)
}