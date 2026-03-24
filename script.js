fetch('posts.json')
  .then(res => res.json())
  .then(posts => {
    const container = document.querySelector('.posts');

    posts.reverse().forEach(post => {
      const el = document.createElement('div');
      el.className = 'post';

      el.innerHTML = `
        <div class="post-date">${post.date}</div>
        <div class="post-title">${post.title}</div>
        <p>${post.text}</p>
      `;

      container.appendChild(el);
    });
  });
