import { useState, useEffect, useRef, useMemo } from "react";
import axios from "../../../lib/api";
import { getToken } from "../../../lib/auth"; // Pastikan path ini benar
import { SensorData } from "../utils";

export const useSensorMonitoring = () => {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  // 1. Fetch Initial Data (HTTP)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Logika fetch awal (Opsional, jika ingin data history saat load pertama)
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

  // 2. WebSocket Connection (Realtime) - DENGAN AUTH
  useEffect(() => {
    const token = getToken(); // 1. Ambil token dari storage/auth lib

    // Jika tidak ada token (User belum login), jangan lakukan koneksi
    if (!token) {
      console.log("⛔ [FE-WS] No token found, skipping connection.");
      return;
    }

    const WS_URL =
      process.env.NEXT_PUBLIC_WS_URL || "wss://64f5ed0bc73a.ngrok-free.app/";

    // 2. Tempel token di URL sebagai query param
    // Hasilnya: ws://localhost:5000?token=eyJhbGci...
    ws.current = new WebSocket(`${WS_URL}?token=${token}`);

    ws.current.onopen = () => {
      console.log("✅ [FE-WS] Connected to WebSocket");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "sensor_data") {
          // UPDATE: Mapping data baru dari payload backend
          const newData: SensorData = {
            temperature: message.payload.temperature,
            humidity: message.payload.humidity,
            heat_index: message.payload.heat_index,
            co2: message.payload.co2,
            // Field baru untuk Odor monitoring
            odor_score: message.payload.odor_score,
            odor_status: message.payload.odor_status,
            odor_level: message.payload.odor_level,

            // Gunakan Date.now() (ms) agar kompatibel dengan new Date() di UI
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

      // 3. (Opsional) Cek jika ditolak server karena Auth (Code 1008 dari Backend)
      if (event.code === 1008) {
        console.error(
          "⛔ [FE-WS] Connection rejected: Invalid Token / Expired"
        );
        // Di sini Anda bisa menambahkan logic logout otomatis jika token expired
      }
    };

    ws.current.onerror = (error) => {
      console.error("❌ [FE-WS] WebSocket Error", error);
    };

    // Cleanup saat component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []); // Dependency array kosong: jalan sekali saat mount

  const latest = useMemo(() => sensors[0] || null, [sensors]);

  return { sensors, latest, loading, isConnected };
};
