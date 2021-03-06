import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { REST_URL_TOKEN } from './config'
import { User } from "./rocketchat.interface";

@Injectable()
export class RestApi {
    constructor(@Inject(REST_URL_TOKEN) restUrl: string, private httpClient: HttpClient) {}

    getRooms(): Observable<any> {
        return this.httpClient.get("http://192.168.10.116:3000/api/v1/rooms.get", {
            headers: {
                "X-Auth-Token": "CBYtuflLgWcodT35MgGwYB3NJ--I_uDR-9NNT_7_ZZS",
                "X-User-Id": "bSeDvqRCqdbgvy7ya"
            },

            observe: 'body',
            responseType: 'json'
        })
        .pipe(map(data => data[`update`].filter(room => room[`t`] === 'd')))
    }

    usersList(search: string): Observable<User[]> {
        const query = { "username": { "$regex": search } }
        return this.httpClient.get(`http://192.168.10.116:3000/api/v1/users.list?query=${JSON.stringify(query)}`, {
            headers: {
                "X-Auth-Token": "CBYtuflLgWcodT35MgGwYB3NJ--I_uDR-9NNT_7_ZZS",
                "X-User-Id": "bSeDvqRCqdbgvy7ya"
            },

            observe: 'body',
            responseType: 'json'
        }).pipe(map(data => {
            console.log("hello user list", data)
            if (data[`users`]) {
                const users = data[`users`]
                return users.map(user => {
                    const { _id, name, username, lastLogin, status, roles } = user
                    return {  _id, name, username, lastLogin, status, roles, avatar: `avatar/${username}` } as User
                }) 
            } else {
                return []
            }
        }))
    }

    usersInfo(userId: string): Observable<User> {
        return this.httpClient.get(`http://192.168.10.116:3000/api/v1/users.info?userId=${userId}`, {
            headers: {
                "X-Auth-Token": "CBYtuflLgWcodT35MgGwYB3NJ--I_uDR-9NNT_7_ZZS",
                "X-User-Id": "bSeDvqRCqdbgvy7ya"
            },

            observe: 'body',
            responseType: 'json'
        }).pipe(map(data => {
            const user = data[`user`]
            const { _id, name, username, lastLogin, status, roles } = user
            return {  _id, name, username, lastLogin, status, roles, avatar: `avatar/${username}` } as User
        }))
    }

}