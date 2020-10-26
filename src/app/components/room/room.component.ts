import { OnDestroy, OnInit, Component, Input } from '@angular/core';
import { RocketChatService, Room, Message, User } from '../../rocketchat';

@Component({
    selector: 'room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    @Input() room: Room
    userStatus: boolean = false
    message: Message
    user: User

    constructor(private rocketChatService: RocketChatService) { }

    ngOnInit() {
        this.message = this.room.lastMessage
        this.rocketChatService.listenToRoom(this.room._id).subscribe(data => {
            if (data.msg === 'changed') {
                console.log(`Room ${this.room._id} receive message `, data)
                this.message = data.fields.args[0]
            }
        })
    }

}