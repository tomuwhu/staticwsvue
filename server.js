const wssc   = require('websocket').server  //  --> npm i websocket
const static = require('node-static')         //  --> npm i node-static
const file = new static.Server('./dist')

const server = require('http')
    .createServer( (request, response) => {
        request.addListener('end', () => {
            file.serve(request, response);
        }).resume()
    })

wsServer = new wssc( { httpServer: server, autoAcceptConnections: false } )

var ct = []

wsServer.on( 'request', r => {
        ct.push( r.accept('echo-protocol',r.origin) )
        ct[ct.length - 1].on( 'message', m => {
            let msg = JSON.parse(m.utf8Data)
            ct.forEach( (v,k) => v.sendUTF(
              (msg.id+msg.color) + ':' + msg.msg
            ) )
        } )
} )

server.listen(3000, () => {
    console.log(`
        ws server elérhető a 3000-es porton
    `)
})
