import React from 'react';
import { io } from 'socket.io-client'
export const socket = io('http://localhost:8000/')
export const SocketServerContext = React.createContext()
export const SocketServerProvider = SocketServerContext.Provider
