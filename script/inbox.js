var tempSenderId = 0;
const chatHistory = chatBox.querySelector('.chat-history');  
var tempItem;
const buttonSend = document.querySelector('.send-button');
let message = document.querySelector('.message-input');

closeButton.addEventListener('click', () => {
    chatBox.style.display = 'none';  
    buttonInbox.style.backgroundImage = "url('style/images/buttonInbox.png')";
});
backButton.addEventListener('click', () => {
    chatBox.style.display = 'none';
    inboxField.style.display = "block";  
});
document.addEventListener('DOMContentLoaded', () => {    
    const inboxList = document.querySelector('.inbox-list');

    const fetchInboxData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/inboxes');
            const data = await response.json();
            
            data.forEach(item => {                
                const inboxItem = document.createElement('div');
                inboxItem.classList.add('inbox-item');
                inboxItem.dataset.id = item.id;
                
                
                
                    const initial = item.name.charAt(0).toUpperCase();
                    let profileElement = document.createElement('div');
                    profileElement.classList.add('direct-profile');
                    profileElement.textContent = initial;
                
                
                inboxItem.innerHTML = `
                    <div class="inbox-details">
                        <div class="inbox-header">
                            <div class="inbox-title">${item.name}</div>                            
                        </div>                      
                    </div>
                `;
                            
                inboxItem.prepend(profileElement);

                if (item.status === 'unread') {
                    const unreadIndicator = document.createElement('div');
                    unreadIndicator.classList.add('unread-indicator');
                    inboxItem.appendChild(unreadIndicator);
                }

                inboxItem.addEventListener('click', () => {                    
                    showChatBox(item);
                    
                });

                inboxList.appendChild(inboxItem);                
            });
        } catch (error) {
            console.error('Error fetching inbox data:', error);
        }
    };

    fetchInboxData();
});      
const showChatBox = async (item) => {    
    tempItem = item;
    const chatTitle = chatBox.querySelector('.chat-title');
    const chatMembers = chatBox.querySelector('.chat-members');    
    
    chatTitle.textContent = item.title;
    if(item.inboxType == "group"){        
        chatMembers.textContent = `${item.member || 1} Participants`; 
    }    
    
    chatHistory.innerHTML = '';   
    try {
        const response = await fetch('http://localhost:3000/api/v1/chats/sender/' + item.id); 
        const data = await response.json();
        
        data.forEach(chat => {      
            const senderElement = document.createElement('div');
            senderElement.classList.add('sender');
            senderElement.textContent = chat.sender;

            const messageElement = document.createElement('div');
            messageElement.classList.add('message-chat');
            messageElement.textContent = chat.message;                                     

            const messageText = document.createElement('div');
            messageText.classList.add('chat-bubble');                                

            if (chat.sender === 'You') {
                messageText.classList.add('you');
                senderElement.classList.add('you');                                            
            }          
            messageText.appendChild(messageElement);            
            chatHistory.appendChild(messageText);                                                
        });         
        tempSenderId = item.id;
        
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }    
    chatBox.style.display = 'block';
    
    document.querySelector('.inbox-field').style.display = 'none';   
       
};

buttonSend.addEventListener('click', () => {                       
    console.log(message.value)
    if(message.value != null && message.value != ""){
        sendMessage(tempSenderId, message.value);        
    }   
}); 

const sendMessage = async (id, message) => {   
    data = {
        "sender": "You",
        "message": message,
        "sender_id": id
    } 
    try{
        const response = await fetch('http://localhost:3000/api/v1/chats', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        });        
        message.value = null;
        chatHistory.innerHTML = '';
        showChatBox(tempItem);
    } catch (error) {
        console.error('Error send message:', error);
    }   
};