import { join } from 'path'
import {message} from './entities'
const WebSocket = require('ws');
const pkg = require(join(__dirname, '..', 'package.json'))
import { SLPServer } from './udpserver'



export class ServerMonitor {
  private ws: any

  constructor(private server: SLPServer){

  }

  public start(port: number) {
    this.ws = new WebSocket.Server({ port: port });
    this.ws.sendBroadcast = (str: String) => {
      this.ws.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(str)
        } 
      });
    }
    this.ws.on('connection', (client:any,req:any)=>{
      let username=req.url.replace('/','')
      if(username==='') username='human'
      let p={
        'username':username
      }
      let msg=new message('login',p)
      this.ws.sendBroadcast(msg.toString())

      client.username=username
      let serverInfo=pkg.serverInfo
      serverInfo.online=String(this.server.getClientSize())
      
      msg=new message('serverNotice',serverInfo)
      client.send(msg.toString())
      

      client.on('message', (msg: string) => {
        let msgJs=JSON.parse(msg)
        if(msgJs.type==='getPlayer'){
          let p={
            'message':this.server.getServerPlayer()
          }
          let msgJ=new message('players',p)
          client.send(msgJ.toString())
          return
        }

        let p={
          'username':client.username,
          'message':msg
        }
        let msgJ=new message('message',p)
        this.ws.sendBroadcast(msgJ.toString())
      }); 

      client.on('close', () => {
        let p={
          'username':client.username
        }
        let msgJ=new message('logout',p)
        this.ws.sendBroadcast(msgJ.toString())
      }); 
    })
    console.log(`\nMonitor service started on port ${port}/websocket`)
    console.log(`***************************************`)
  }


  public sendBroadcast(type:String,msg:String){
    let p={
      'message':msg
    }
    let msgJ=new message(type,p)
    this.ws.sendBroadcast(msgJ.toString())
  }
}
