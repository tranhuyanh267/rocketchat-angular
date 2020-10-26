import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { RealtimeApi } from "./realtime-api";
import { RestApi } from "./rest-api";
import { Room, User, UserStatus } from "./rocketchat.interface";
import { Message } from './rocketchat.interface'
import { v4 as uuid } from "uuid";

@Injectable()
export class RocketChatService {

    constructor(private restApi: RestApi, private realtimeApi: RealtimeApi) {}

    connectToServerWithToken(token: string) {
        this.realtimeApi.connectToServer()
        this.realtimeApi.keepAlive().subscribe()
        this.realtimeApi.loginWithAuthToken(token).subscribe(data => {
            console.log('loging')
            console.log(data)
        })
    }

    getCurrentUser() {
        return  {
            _id: "jru7W3JqektmC6hi2",
            name: "Admin",
            username: "admin"
        }
    }

    searchUsers(value: string): Observable<User[]> {
        return this.restApi.usersList(value);
    }

    getRooms(): Observable<Room[]> {
        return this.restApi.getRooms()
    }

    listenToRoom(roomId: string): Observable<any> {
        return this.realtimeApi.getSubscription("stream-room-messages", roomId, true)
    }

    listenMyMessage(): Observable<any> {
        return this.realtimeApi.getSubscription("stream-room-messages", "__my_messages__", true)
    }

    listenTyping(roomId: string): Observable<any> {
        return this.realtimeApi.getSubscription("stream-notify-room", `${roomId}/typing`, true)
    }

    listenUserStatus(): Observable<UserStatus> {
        return this.realtimeApi.getSubscription("stream-notify-logged", "user-status", true).pipe(map(data => {
            if (data.msg === 'changed' && data.fields.args) {
                return {
                    userId: data.fields.args[0][0],
                    username: data.fields.args[0][1],
                    status: data.fields.args[0][2]
                }
            }
            return undefined
        }))
    }

    getUserDetails(userId: string): Observable<User> {
        return this.restApi.usersInfo(userId)
    }

    listenToRoomList(userId: string): Observable<any> {
        return this.realtimeApi.getSubscription("stream-notify-user", `${userId}/rooms-changed`, true);
    }

    loadRoomHistories(roomId: string): Observable<Message[]> {
        return this.realtimeApi
                        .callMethod("loadHistory", roomId, null, 50, {"$date": new Date().getTime})
                        .pipe(map(data => {
                            if (data.result) {
                                return data.result.messages
                            }
                            return []
                        }))
    }

    createDirectMessage(username: string): Observable<any> {
        return this.realtimeApi.callMethod("createDirectMessage", username)
    }

    sendMessage(msg: string, rid: string) {
        const messageId = uuid();
        const message = {
            _id: messageId,
            rid, 
            msg
        }
        return this.realtimeApi.callMethod("sendMessage", message)
    }

}