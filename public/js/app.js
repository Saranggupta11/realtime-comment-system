

let socket = io()
const username = document.getElementById('username')
const button = document.getElementById('post-btn')
const textarea = document.getElementById("textarea")
const commentbox = document.querySelector('.comment-box')



button.addEventListener('click', (e) => {
  e.preventDefault()
  if (username.value && textarea.value) {
    console.log(username.value);
    console.log(textarea.value);

    postcomment(username.value, textarea.value)
    username.value = ""
    textarea.value = ""
  }
  else {
    alert("please fill all the fields to continue")
  }

})

function postcomment(username, comment) {
  let data = {
    username,
    comment
  }
  //add to dom
  appendToDom(data)

  //broadcast

  broadcastComment(data)
  //sync with mongodb
  syncWithDb(data)
}

function appendToDom(data) {
  ltag = document.createElement('li')
  ltag.classList.add('comment', 'mb-3')

  let markup = `<div class="card border-light mb-3">
  <div class="card-body">
    <h6>${data.username}</h6>
    <p>
     ${data.comment}
    </p>
    <div>
      <img src="./img/clock.png" alt="clock" />
      <small>${moment(data.time).format('LT')}</small>
    </div>
  </div>
</div>`
  ltag.innerHTML = markup;
  commentbox.prepend(ltag)


}

function broadcastComment(data) {
  //socket
  socket.emit('comment', data)

}

socket.on('comment', (data) => {
  appendToDom(data)
})

function syncWithDb(data) {
  const headers = {
    'Content-Type': 'application/json'
  }
  fetch('/api/comments', { method: 'post', body: JSON.stringify(data), headers })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
}
function fetchComments() {
  fetch('/api/comments')
    .then(res => res.json())
    .then(result => {
      result.forEach((comment) => {
        comment.time = comment.createdAt
        appendToDom(comment)
      })

      console.log(result);
    })
}

window.onload = fetchComments