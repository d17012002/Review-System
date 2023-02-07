new Vue({
  el: '#app',

  data: {
    message: '',
    messages: [],
    sidebar: false,
  },

  mounted() {
    this.stubMessages();
  },

  watch: {
    messages: 'scrollToBottom',
  },

  methods: {
    addMessage() {
      this.messages.push({
        text: this.message,
        time: moment(),
      });

      this.message = '';
    },

    scrollToBottom() {
      this.$nextTick(function () {
        let chat = document.getElementById('chat');
        let shouldScroll =
          chat.scrollHeight - chat.clientHeight <= chat.scrollTop + 1;

        console.log(window.getComputedStyle(chat).getPropertyValue('height'));

        chat.scrollTop = chat.scrollHeight;
      });
    },
  },
});

function hide() {
  document.querySelector('.chat-sidebar').classList.toggle('hide-bars');
  document.querySelector('.page-sidebar').classList.toggle('hide-bars');
  // document.querySelector(".chat-header").classList.toggle("hide-bars");
}

function search() {
  const searchbar = document.querySelector('.feature-search');
  const features = document.querySelectorAll('.feature');
  const text = searchbar.value.toLowerCase();

  for (var i = 0; i < features.length; i++) {
    const option = features[i].innerHTML.toLowerCase();
    if (!option.includes(text)) {
      console.log(features[i]);
      features[i].style.visibility = 'hidden';
    } else {
      features[i].style.visibility = 'visible';
    }
  }
}
