import { useCallback, useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'UPDATE_NEEDED';
  topicId: number;
}

export const useWebSocket = (
  topicId: number,
  type: 'VISIT' | 'CALL',
  onMessageReceived: (message: WebSocketMessage) => void
) => {
  const BASE_URL = import.meta.env.VITE_SOCKET_URL;
  const webSocket = useRef<WebSocket | null>(null);
  const isConnecting = useRef<boolean>(false);
  const reconnectTimeoutRef = useRef<number>();

  const connect = useCallback(() => {
    try {
      if (isConnecting.current) {
        console.debug('연결 시도 중입니다...');
        return;
      }

      if (webSocket.current?.readyState === WebSocket.OPEN) {
        console.debug('이미 연결된 웹소켓이 있습니다.');
        return;
      }

      isConnecting.current = true;
      console.debug(`웹소켓 연결 시도... topicId: ${topicId}`);
      webSocket.current = new WebSocket(`${BASE_URL}/ws/test`);

      webSocket.current.onopen = () => {
        console.debug('웹소켓 연결 성공!');
        isConnecting.current = false;

        // 연결 직후 바로 구독 메시지 전송
        if (webSocket.current?.readyState === WebSocket.OPEN) {
          try {
            const subscribeMessage = JSON.stringify({
              action: 'subscribe',
              topicId: String(topicId),
            });
            console.debug('구독 메시지 전송:', subscribeMessage);
            webSocket.current.send(subscribeMessage);
          } catch (error) {
            console.error('구독 메시지 전송 실패:', error);
          }
        }
      };

      webSocket.current.onmessage = (event: MessageEvent) => {
        console.debug('웹소켓 메시지 원본:', event.data);

        try {
          if (
            event.data === '웹소켓 연결 성공' ||
            event.data.includes('구독 완료')
          ) {
            console.debug('시스템 메시지:', event.data);
            return;
          }

          if (
            typeof event.data === 'string' &&
            event.data.startsWith(`${type}_UPDATE:`)
          ) {
            const sectionId = parseInt(event.data.split(':')[1], 10);

            onMessageReceived({
              type: 'UPDATE_NEEDED',
              topicId: sectionId,
            });
          } else {
            console.debug('알 수 없는 메시지 형식:', event.data);
          }
        } catch (error) {
          console.error('메시지 처리 중 에러:', error);
        }
      };

      webSocket.current.onclose = (event) => {
        console.debug('웹소켓 연결 종료:', {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
        });

        isConnecting.current = false;

        if (!event.wasClean) {
          console.debug('비정상 종료로 인한 재연결 시도 예정...');
          if (reconnectTimeoutRef.current) {
            window.clearTimeout(reconnectTimeoutRef.current);
          }
          reconnectTimeoutRef.current = window.setTimeout(() => {
            console.debug('웹소켓 재연결 시도...');
            connect();
          }, 3000);
        }
      };

      webSocket.current.onerror = (error) => {
        console.error('웹소켓 에러:', error);
        isConnecting.current = false;
      };
    } catch (error) {
      console.error('웹소켓 연결 실패:', error);
      isConnecting.current = false;
    }
  }, [topicId, BASE_URL, type, onMessageReceived]);

  useEffect(() => {
    connect();

    // cleanup function
    return () => {
      isConnecting.current = false;
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
      if (webSocket.current) {
        console.debug('웹소켓 연결 정리 중...');
        webSocket.current.close(1000, '정상 종료');
        webSocket.current = null;
      }
    };
  }, [connect]);

  return {
    webSocket: webSocket.current,
    isConnected: webSocket.current?.readyState === WebSocket.OPEN,
  };
};
