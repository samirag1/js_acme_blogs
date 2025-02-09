//Samira Gure Final Project INF 651
// Function 1: 

function createElemWithText(element = "p", text = "", className) {
    const elem = document.createElement(element);
    elem.textContent = text;
    if (className) {
      elem.className = className;
    }
    return elem;
  }
  
  /*Function 2: */
  
  function createSelectOptions(usersData) {
   if (typeof usersData === 'undefined') {
      return undefined;
     console.log(options);
    }
  
    const options = [];
  
    for (const user of usersData) {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      options.push(option);
    }
    
  
    return options;
  }
  
  
  // Function 3: 
  
  function toggleCommentSection(postId) {
    if (typeof postId === 'undefined') {
      return undefined;
     console.log(section);
    }
  
    const section = document.querySelector(`section[data-post-id="${postId}"]`);
  
    if (!section) {
      return null;
    }
  
    section.classList.toggle('hide');
    return section;
  }
  
  
  // Function 4:
  
  function toggleCommentButton(postId) {
     if (typeof postId === 'null') {
      return null;
     console.log(button);
    }
  
    const button = document.querySelector(`button[data-post-id="${postId}"]`);
  
    if (!button) {
      return null;
    }
  
    button.textContent = button.textContent === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
  
    return button;
  }
  
  
  
  // Function 5: 
  function deleteChildElements(parentElement){ 
    if(!(parentElement instanceof HTMLElement)) {
      return undefined;
    }
    let child = parentElement.lastElementChild;
    while (child) {
      parentElement.removeChild(child);
      child = parentElement.lastElementChild;
    }
    return parentElement;
  }
  
  
  
  
  
  // Function 6: 
  function addButtonListeners() {
    const buttons = document.querySelectorAll('main button');
  
    if (buttons.length > 0) {
      buttons.forEach(button => {
        const postId = button.dataset.postId;
        button.addEventListener('click', event => {
          toggleComments(event, postId);
        });
      });
    }
  
    return buttons;
  }
  
  
  // Function 7: 
  function removeButtonListeners() {
    const buttons = document.querySelectorAll("main button");
    buttons.forEach((button) => {
      const postId = button.dataset.postId;
      button.removeEventListener("click", (event) => {
        toggleComments(event, postId);
      });
    });
  
    return buttons;
  }
  
  // Function 8: 
  function createComments(commentsData) {
    const fragment = document.createDocumentFragment();
     if (!commentsData) {
      return undefined;
     }
  
    for (const comment of commentsData) {
      const article = document.createElement("article");
      const h3 = createElemWithText("h3", comment.name);
      const bodyParagraph = createElemWithText("p", comment.body);
      const emailParagraph = createElemWithText("p", `From: ${comment.email}`);
  
      article.appendChild(h3);
      article.appendChild(bodyParagraph);
      article.appendChild(emailParagraph);
      fragment.appendChild(article);
    }
  
    return fragment;
  }
  
  // Function 9: 
  function populateSelectMenu(users) {
    if (!users) {
      return undefined;
    }
  
    const selectMenu = document.querySelector('#selectMenu');
    const options = createSelectOptions(users);
  
    for (const option of options) {
      selectMenu.appendChild(option);
    }
  
    return selectMenu;
  }
  
  
  
  
  // Function 10: 
  async function getUsers() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  // Function 11: 
  async function getUserPosts(userId) {
    if (!userId) {
      return undefined;
    }
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching user posts:', error);
      return undefined;
    }
  }
  
  
  // Function 12: 
  
  async function getUser(userId) {
    if (!userId) {
      return undefined;
    }
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching user:', error);
      return undefined;
    }
  }
  
  
  // Function 13: 
  async function getPostComments(postId) {
    if (!postId) {
      return undefined;
    }
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching comments:', error);
      return undefined;
    }
  }
  
  
  
  // Function 14:
  
  async function displayComments(postId) {
    if (!postId) {
      return undefined;
    }
  
    const section = document.createElement('section');
    section.dataset.postId = postId;
    section.classList.add('comments', 'hide');
  
    try {
      const comments = await getPostComments(postId);
      const fragment = createComments(comments);
  
      section.appendChild(fragment);
      return section;
    } catch (error) {
      console.log('Error displaying comments:', error);
      return undefined;
    }
  }
  
  
  
  // Function 15:
  async function createPosts(posts) {
      if (!posts) {
      return undefined;
    }
    
    const fragment = document.createDocumentFragment();
  
    for (const post of posts) {
      const article = document.createElement('article');
      const h2 = createElemWithText('h2', post.title);
      const p1 = createElemWithText('p', post.body);
      const p2 = createElemWithText('p', `Post ID: ${post.id}`);
  
      const author = await getUser(post.userId);
      const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
      const p4 = createElemWithText('p', author.company.catchPhrase);
  
      const button = document.createElement('button');
      button.textContent = 'Show Comments';
      button.dataset.postId = post.id;
  
      const section = await displayComments(post.id);
  
      article.appendChild(h2);
      article.appendChild(p1);
      article.appendChild(p2);
      article.appendChild(p3);
      article.appendChild(p4);
      article.appendChild(button);
      article.appendChild(section);
  
      fragment.appendChild(article);
    }
  
    return fragment;
  }
  
  
  // Function 16:
  
  async function displayPosts(posts) {
    if (!posts) {
      const defaultParagraph = document.createElement('p');
      defaultParagraph.textContent = 'No posts data available.';
      return defaultParagraph;
    }
  
    const mainElement = document.querySelector('main');
    const element = posts ? await createPosts(posts) : document.createElement('p');
    mainElement.appendChild(element);
    return element;
  }
  
  
  
  // Function 17:
  
  function toggleComments(event, postId) {
    if (!event || !postId) {
      return undefined;
    }
  
    event.target.listener = true;
  
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);
  
    return [section, button];
  }
  
  
  
  // Function 18:
  async function refreshPosts(posts) {
     if (!posts) {
      return undefined;
    }
  
    const removeButtons = removeButtonListeners();
    const main = deleteChildElements(document.querySelector('main'));
  
    const fragment = await displayPosts(posts);
  
    const addButtons = addButtonListeners();
  
    return [removeButtons, main, fragment, addButtons];
  }
  
  
  // Function 19:
  
  async function selectMenuChangeEventHandler(event) {
    if (!event) {
      return undefined;
    }
  
    const selectMenu = event.target;
    selectMenu.disabled = true;
  
    const userId = selectMenu.value || 1;
    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);
  
    selectMenu.disabled = false;
  
    return [userId, posts, refreshPostsArray];
  }
  
  
  
  /*Function 20*/
  async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    return [users, select];
  }
  
  /*Function 21*/
  function initApp() {
    const selectMenu = document.getElementById('selectMenu');
    selectMenu.addEventListener('change', selectMenuChangeEventHandler);
  }
  
  
  

  
  
  document.addEventListener('DOMContentLoaded', initApp);
  
  initApp();
    