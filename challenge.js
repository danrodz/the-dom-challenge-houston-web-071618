(function() {
  const counter = document.getElementById('counter');
  const minus = document.getElementById('-');
  const plus = document.getElementById('+');
  const liked = document.getElementById('<3');
  const pause = document.getElementById('pause');
  const commentInput = document.getElementById('input');
  const submitButton = document.getElementById('submit');
  const commentList = document.getElementById('list');
  const likedList = document.querySelector('.likes');

  let isCounting = true;
  let timer;

  window.addEventListener('DOMContentLoaded', () => counterSetInterval());
  pause.addEventListener('click', () => toggleTimer());
  plus.addEventListener('click', () => incrementTimer());
  minus.addEventListener('click', () => decrementTimer());
  liked.addEventListener('click', () => addLike());
  submitButton.addEventListener('click', e => addComment(e));

  const state = (function() {
    const state = {
      likes: {},
      comments: []
    };

    const obj = {
      addLike: function(num) {
        state.likes.hasOwnProperty(num)
          ? (state.likes[num] += 1)
          : (state.likes[num] = 1);
      },
      addComment: function(comment) {
        state.comments.push(comment);
      },
      getLikes: function() {
        return state.likes;
      },
      getComments: function() {
        return state.comments;
      }
    };

    return obj;
  })();

  function incrementTimer() {
    counter.innerText = parseInt(counter.innerText) + 1;
  }

  function decrementTimer() {
    counter.innerText = parseInt(counter.innerText) - 1;
  }

  function toggleTimer() {
    isCounting = !isCounting;
    counterSetInterval();
  }

  function counterSetInterval() {
    if (isCounting) {
      timer = setInterval(incrementTimer, 1000);
    } else {
      clearInterval(timer);
    }
  }

  function addLike() {
    let num = counter.innerText;
    state.addLike(num);
    displayLikes();
  }

  function addComment(e) {
    e.preventDefault();
    const comment = commentInput.value;
    commentInput.value = '';
    state.addComment(comment);
    displayComments();
  }

  function displayComments() {
    const comments = state.getComments();
    let list;
    comments.forEach(x => {
      list += `<p>${x}</p>`;
    });
    commentList.innerHTML = list;
  }

  function displayLikes() {
    while (likedList.firstChild) {
      likedList.removeChild(likedList.firstChild);
    }
    const likes = state.getLikes();
    for (let second in likes) {
      const li = document.createElement('li');
      li.innerText = `${second} has been liked ${likes[second]} times`;
      likedList.appendChild(li);
    }
  }
})();
