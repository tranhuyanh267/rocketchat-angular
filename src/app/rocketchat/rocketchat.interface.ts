export interface User {
    _id: string
    name: string
    username: string
    avatar?: string
    roles: string[]
    isOnline: boolean
    lastLogin: Date
    status: string
    user: User
    locations?: string[]
    specialties?: string[]
    memberDate?: Date
}

export interface Message {
    _id: string
    msg: string
    ts: Date
    u: User
}

export interface Room {
    _id: string
    lastMessage: Message
    uids: string[]
    usernames: string[]
}

export interface UserStatus {
    userId: string
    username: string
    status: number
}