<template>
  <div id="app">
    <h2 class="text-center">Chat By Tambá</h2>
    <hr>
    <b-input v-model="message"
             @keyup.native.enter="send"></b-input>
    <br>
    <div class="text-center">
    <b-btn v-for="(sc,i) in vlist"
           :variant="sc"
           @click="color=i"
           size="sm"> select </b-btn>
    - - >
    <b-btn :variant="vlist[color]">My color</b-btn>
    </div>

    <hr>
    <b-btn v-for="text in chatarea"
             :variant="vlist[text.split(':')[0]%11]">{{text.split(':')[1]}}</b-btn>
  </div>
</template>

<script>
const client_id=Math.round(Math.random()*1000000)*11
const socket = new WebSocket('ws://whome.inf.u-szeged.hu:3005','echo-protocol')
export default {
  name: 'app',
  data() {
    return {
        vlist:[
          'success', 'danger', 'warning', 'primary', 'secondary', 'info', 'dark',
          'outline-success', 'outline-danger', 'outline-warning','outline-primary'
        ], message: '', color:0, chatarea: []
    }
  },
  mounted() {
        socket.addEventListener( 'message', event =>
            this.chatarea.push(event.data)
        )
  },
  methods: {
    send() {
        socket.send( (client_id+this.color) + ":" + this.message)
        this.message=''
    }
  }
}
</script>

<style>
#app {
  background-color: #fffafd;
  border-radius: 15px;
  margin:30px;
  padding:20px;
  box-shadow: 1px 1px 5px;
}
</style>
