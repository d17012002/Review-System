new Vue({
    el: '#app',
    
    data: {
      message: '',
      messages: [],
      sidebar: false
    },
    
    mounted() {
      this.stubMessages();
    },
    
    watch: {
      'messages': 'scrollToBottom'
    },
    
    methods: {
      // stubMessages() {
      //   var time = null
        
      //   for (var i = 0; i < 50; ++i) {
      //       time = moment().subtract(1, 'days').add(i, 'hours');
  
      //       this.messages.push({
      //         text: Math.random().toString(36).substring(2),
      //         time: time
      //       });
      //   }
      // },
      
      addMessage() {
        this.messages.push({
          text: this.message,
          time: moment()
        });
        
        this.message = '';
      },
      
      scrollToBottom() {      
        this.$nextTick(function () {
          let chat = document.getElementById('chat');
          let shouldScroll = chat.scrollHeight - chat.clientHeight <= chat.scrollTop + 1;
          
          console.log(
            window.getComputedStyle(chat).getPropertyValue("height")
          )
          
          chat.scrollTop = chat.scrollHeight;
        });
      },
    }
  });

function hide() {
  document.querySelector(".chat-sidebar").classList.toggle("hide-bars");
  document.querySelector(".page-sidebar").classList.toggle("hide-bars");
  // document.querySelector(".chat-header").classList.toggle("hide-bars");
}