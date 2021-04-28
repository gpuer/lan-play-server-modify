# lan-play-server-modify
lan-play-server1.0修改版
该版本为spacemeowx2（空格）的lan-play-server 1.0.0-alpha.2的修改版。
## 1.启动方式
```
  git clone https://github.com/gpuer/lan-play-server-modify.git
  cd switch-lan-play/server
  npm install
  npm run build # build ts to js. run it again when code changed.
  npm start
```
## 2.websocket
### 订阅地址:
``` 
  ws://{SERVER_IP}:port/USERNAME
```
没有加username的情况加默认为human
### api:
``` 
  {"type":"xxx","msg":{xxx},"date":"Wed Apr 28 2021"}
  
```
#### login
 用户登录
#### serverNotice
  服主公告,服务器最大人数信息,服务器当前人数(有其他需求可以提)
#### online
  服务器玩家数,出现变动后自动推送
#### players(在建中)
  服务器玩家列表
#### message
  玩家消息(聊天室)
#### logout
  玩家退出
### 修改服务器公告
修改package.json内的serverInfo
```
  "serverInfo":{
        "notice": "测试一下服主公告~",
        "userMax":50
   }
```
### 获取服务器玩家信息(在建中):
``` 
  {"type":"getPlayer"}
  
```
