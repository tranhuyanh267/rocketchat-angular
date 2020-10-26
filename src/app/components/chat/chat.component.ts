import { OnDestroy, OnInit, Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RocketChatService } from 'src/app/rocketchat';
import { Message } from '../../rocketchat'
import { RoomListComponent } from '../room-list/room-list.component';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
  })
export class ChatComponent implements OnInit, OnChanges {

    @Input() roomId: string

    messages: Message[]

    message: string

    constructor(private rocketChatService: RocketChatService, private route: ActivatedRoute) {}

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const { previousValue, currentValue } = changes.roomId
        
        if (previousValue !== currentValue) {
            this.roomId = currentValue
            this.rocketChatService.loadRoomHistories(this.roomId).subscribe(messages => {
                this.messages = messages
            })
        }
    }

    sendMessage() {
        this.rocketChatService.sendMessage(this.message, this.roomId).subscribe(data => {
            console.log("Sent")
        })
        console.log("send")
        this.message = ""
    }

}