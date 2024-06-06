const buttonInbox = document.querySelector('.button-inbox');
const inboxField = document.querySelector('.inbox-field');
const chatBox = document.querySelector('.chat-box');
const closeButton = document.querySelector('.close-icon');
const backButton = document.querySelector('.back-icon');

buttonInbox.addEventListener('click', () => {
    var currentImage = buttonInbox.style.backgroundImage;            
    chatBox.style.display = 'none';    ;
    if(currentImage.includes("style/images/buttonInboxOpen.png")){
        buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";
        inboxField.style.display = "none";
    } else {        
        buttonInbox.style.backgroundImage = "url('style/images/buttonInboxOpen.png')";    
        inboxField.style.display = "block";
    }    
});