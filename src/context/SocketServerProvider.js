import React from 'react';
import { io } from 'socket.io-client'
export const socket = io('http://127.0.0.1:8000/', { path: '/testing', extraHeaders: { Authorization: '1b00f905-8b5d-4e52-995f-83865ea074bb' }})
export const SocketServerContext = React.createContext()
export const SocketServerProvider = SocketServerContext.Provider
