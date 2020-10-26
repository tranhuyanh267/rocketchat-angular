import { Component, OnInit } from '@angular/core';
import { RocketChatService } from './rocketchat';
import { Room, User } from './rocketchat'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  rooms: Room[]
  selectedRoomId: string

  constructor(private rocketChatService: RocketChatService) { }

  ngOnInit() {
    this.testRealtimeAPI()
    this.rocketChatService.getRooms().pipe(map(rooms => {
      rooms.map(room => {
        this.rocketChatService.getUserDetails(room.uids[0]).subscribe(user => {
          room[`huyanh`] = user
          return room
        })
      })
      return rooms
    })).subscribe(rooms => {
      this.rooms = rooms
      console.log("Rooooom", this.rooms)
      this.selectedRoomId = this.rooms[0]._id
    })
  }

  handleOnSelectRoom(value) {
    this.selectedRoomId = value
  }

  testRealtimeAPI() {
    this.rocketChatService.connectToServerWithToken("CBYtuflLgWcodT35MgGwYB3NJ--I_uDR-9NNT_7_ZZS")

    // this.rocketChatService.listenToRoom("jru7W3JqektmC6hi2pNstB5NbBRyBhuGan").subscribe(data => {
    //     if (data.fields.args) {
    //         // message ne
    //         console.log("Message Id: ", data.fields.args[0]._id)
    //         console.log("Message Content: ", data.fields.args[0].msg)
    //         console.log("Message Time: ", new Date(data.fields.args[0].ts[`$date`]))
    //     }
    // })

    // this.rocketChatService.getUserDetails("yXJ96g3DrJTKmTdNr").subscribe(user => {
    //     console.log('huyanhkute', user)
    // })

    // this.rocketChatService.searchUsers("twitter").subscribe(users => {
    //     console.log("USER NE", users)
    // })

    // this.rocketChatService.listenUserStatus().subscribe(data => {
    //     if (data.fields.args) {
    //         console.log('user status')
    //         const userId = data.fields.args[0][0]
    //         const username = data.fields.args[0][1]
    //         const status = data.fields.args[0][2]

    //         const isOnline = status === 1

    //         console.log(`${userId} ${username} ${ isOnline ? 'is Online': 'is Office'}`)
    //     }
    // })

    // this.rocketChatService.listenTyping("jru7W3JqektmC6hi2pNstB5NbBRyBhuGan").subscribe(data => {
    //     if (data.fields.args) {
    //         const name = data.fields.args[0]
    //         const isTyping = data.fields.args[1]
    //         if (isTyping) {
    //             console.log(`${name} is typing`)
    //         } else {
    //             console.log(`${name} stop typing`)
    //         }
    //     }
    // })

    // this.rocketChatService.listenMyMessage().subscribe(data => {
    //     console.log("My message: ", data)
    // })
  }

}
