import { useState, useEffect, useRef, useMemo } from "react";
import { getToken } from "../../../lib/auth"; // Pastikan path ini benar
import { SensorData } from "../utils";

export const useSensorMonitoring = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  // 1. Fetch Initial Data (HTTP)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Uncomment jika ingin fetch history data
        // const res = await axios.get("/sensors", {
        //   headers: { Authorization: `Bearer ${getToken()}` },
        // });
        // setSensors(res.data);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // 2. WebSocket Connection (Realtime) dengan reconnect otomatis
  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.log("⛔ [FE-WS] No token found, skipping connection.");
      return;
    }

    const WS_URL = "wss://segarkosan-v2.testingfothink.my.id";

    const connectWS = () => {
      ws.current = new WebSocket(`${WS_URL}?token=${token}`);

      ws.current.onopen = () => {
        console.log("✅ [FE-WS] Connected to WebSocket");
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "sensor_data") {
            const newData: SensorData = {
              temperature: message.payload.temperature,
              humidity: message.payload.humidity,
              heat_index: message.payload.heat_index,
              co2: message.payload.co2,
              odor_score: message.payload.odor_score,
              odor_status: message.payload.odor_status,
              odor_level: message.payload.odor_level,
              timestamp: Date.now(),
            };
            setSensors((prev) => [newData, ...prev]);
          }
        } catch (error) {
          console.error("Error parsing WS message:", error);
        }
      };

      ws.current.onclose = (event) => {
        console.log("⚠️ [FE-WS] WebSocket Disconnected");
        setIsConnected(false);

        if (event.code === 1008) {
          console.error(
            "⛔ [FE-WS] Connection rejected: Invalid Token / Expired"
          );
          return; // Jangan reconnect jika token expired
        }

        // Auto reconnect setelah 3 detik
        reconnectTimeout.current = setTimeout(connectWS, 3000);
      };

      ws.current.onerror = (error) => {
        console.error("❌ [FE-WS] WebSocket Error", error);
      };
    };

    // Mulai koneksi pertama
    connectWS();

    // Cleanup saat component unmount
    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (ws.current) ws.current.close();
    };
  }, []); // jalan sekali saat mount

  const latest = useMemo(() => sensors[0] || null, [sensors]);

  return { sensors, latest, loading, isConnected };
};
