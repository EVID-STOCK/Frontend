import SockJS from 'sockjs-client';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
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

interface SocketMessage<T> {
  type: string;
  message: string;
  data: T;
}

interface StompContextType {
  connectSocket: (roomCode: string | null) => Promise<void>;
  disconnectSocket: () => void;
  isConnect: boolean;
  sendMessage: <T extends object>(destination: string, body: T) => void;
  unsubscribe: (topic: string) => void;
  registerCallback: <T>(type: string, callback: (data: T) => void) => void;
}

const StompContext = createContext<StompContextType | null>(null);

export const StompProvider = ({ children }: { children: ReactNode }) => {
  const url = `${import.meta.env.VITE_BackEndUrl}/ws`;
  const roomCode = useRecoilValue(roomCodeState);
  const client = useRef<Client | null>(null);
  const [isConnect, setIsConnected] = useState(false);
  const subscriptions = useRef<Map<string, StompSubscription>>(new Map());
  const callbackRegistry = useRef(new Map<string, <T>(data: T) => void>());

  const handleCallback = <T,>({ data, type }: SocketMessage<T>) => {
    const callback = callbackRegistry.current.get(type);
    callback?.(data);
  };

  const connectSocket = (tempRoomCode: string | null) => {
    return new Promise<void>((resolve, reject) => {
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
        if (tempRoomCode) {
          setIsConnected(true);
          subscribe(`/topic/room/${tempRoomCode}`, handleCallback);
          subscribe(`/topic/game/${tempRoomCode}`, handleCallback);
        }
        resolve();
      };
      client.current.onDisconnect = () => {
        console.error('Socket Disconnected');
        setIsConnected(false);
      };
      client.current.onStompError = (frame) => {
        console.error('Socket Connect Error:', frame.headers['message']);
        setIsConnected(false);
        reject(new Error(frame.headers['message']));
      };

      client.current.activate();
    });
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

  const subscribe = (
    topic: string,
    callback: <T>(message: SocketMessage<T>) => void
  ) => {
    if (!client.current?.connected) {
      console.warn('subscribe에 실패했습니다. 소켓이 연결되지 않았습니다.');
      return;
    }
    if (!subscriptions.current.has(topic)) {
      const sub = client.current.subscribe(topic, (message: IMessage) => {
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

  const registerCallback = <T,>(type: string, callback: (data: T) => void) => {
    callbackRegistry.current.set(type, callback as (data: unknown) => void);
  };

  useEffect(() => {
    const connect = async () => {
      try {
        await connectSocket(roomCode);
      } catch (err) {
        console.error('자동 소켓 연결 실패:', err);
      }
    };
    connect();

    return disconnectSocket;
  }, []);

  return (
    <StompContext.Provider
      value={{
        connectSocket,
        disconnectSocket,
        isConnect,
        sendMessage,
        unsubscribe,
        registerCallback,
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
