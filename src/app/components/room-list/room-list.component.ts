import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { RocketChatService, Room } from 'src/app/rocketchat';

@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css']
  })
export class RoomListComponent implements OnInit {

    @Input() rooms: Room[]
    @Output() onSelectRoom = new EventEmitter<number>();

    constructor(private rocketChatService: RocketChatService) {}

    ngOnInit() {
        this.rocketChatService.listenUserStatus().subscribe(data => {
            console.log("User Status", data)
        })
    }

    click(room) {
        this.onSelectRoom.emit(room._id)
    }

}