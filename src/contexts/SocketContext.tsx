/* eslint-disable @typescript-eslint/no-explicit-any */
import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';

interface StompContextType {
  socket: Client | null;
  sendMessage: <T extends object>(destination: string, body: T) => void;
  subscribe: (topic: string, callback: (message: any) => void) => void;
  unsubscribe: (topic: string) => void;
  isConnect: boolean;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompProvider = ({ children }: { children: ReactNode }) => {
  const url = `${import.meta.env.VITE_BackEndUrl}/ws`;
  const roomCode = useRecoilValue(roomCodeState);
  const client = useRef<Client | null>(null);
  const [isConnect, setIsConnected] = useState(false);
  const subscriptions = useRef<Map<string, StompSubscription>>(new Map());

  const connectSocket = () => {
    client.current = new Client({
      webSocketFactory: () => {
        return new SockJS(url);
      },
      reconnectDelay: 4000,
      heartbeatIncoming: 3000,
      heartbeatOutgoing: 3000,
    });

    client.current.onConnect = () => {
      console.log('Socket Connected');
      // 새로고침 대비
      if (roomCode) {
        subscribe(`/topic/room/connect/complete/${roomCode}`, () => {
          setIsConnected(true);
        });
        sendMessage('/app/room/connect', { roomCode });
      }
    };
    client.current.onDisconnect = () => {
      console.error('Socket Disconnected');
      setIsConnected(false);
    };
    client.current.onStompError = (frame) => {
      console.error('Socket Connect Error:', frame.headers['message']);
      setIsConnected(false);
    };

    client.current.activate();
  };

  const disconnectSocket = () => {
    client.current?.deactivate();
    client.current = null;
  };

  const sendMessage = <T extends object>(destination: string, body: T) => {
    if (client.current?.connected) {
      client.current.publish({ destination, body: JSON.stringify(body) });
    } else {
      console.warn('메시지를 보낼 수 없습니다. 소켓이 연결되지 않았습니다.');
    }
  };

  const subscribe = (topic: string, callback: (message: any) => void) => {
    if (!client.current?.connected) return;
    if (!subscriptions.current.has(topic)) {
      const sub = client.current.subscribe(topic, (message: any) => {
        try {
          const parsed = JSON.parse(message.body);
          callback(parsed);
        } catch (err) {
          console.error('파싱 에러:', err);
        }
      });
      subscriptions.current.set(topic, sub);
    }
  };

  const unsubscribe = (topic: string) => {
    const sub = subscriptions.current.get(topic);
    if (sub) {
      sub.unsubscribe();
      subscriptions.current.delete(topic);
    }
  };

  useEffect(() => {
    connectSocket();
    return disconnectSocket;
  }, []);

  return (
    <StompContext.Provider
      value={{
        socket: client.current,
        sendMessage,
        subscribe,
        unsubscribe,
        isConnect,
      }}
    >
      {children}
    </StompContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(StompContext);
  if (!context) {
    throw new Error('useSocket must be used within a StompProvider');
  }
  return context;
};
