
<br />
<div align="center">
  <a href="https://github.com/SegarKosan">
    <img src="https://raw.githubusercontent.com/SegarKosan/.github/refs/heads/main/assets/SegarKosan.svg" alt="SegarKosan Logo" width="280">
  </a>
  <h1 align="center">SegarKosan</h1>

  <p align="center">
    <strong>Real-time indoor air quality monitoring system for student boarding rooms</strong>
    <br />
    <em>Making healthy living spaces accessible through IoT technology</em>
    <br />
    <br />
    <a href="https://github.com/SegarKosan/.github/blob/main/profile/ABOUT-US.MD"><strong>About Us</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://github.com/SegarKosan/.github/blob/main/profile/ROADMAP.md"><strong>Roadmap</strong></a>
    &nbsp;&nbsp;·&nbsp;&nbsp;
    <a href="https://segarkosan.vercel.app"><strong>Live Demo</strong></a>
    <br />
    <br />
    <a href="https://segarkosan.vercel.app">
      <img alt="Progressive Web App" src="https://raw.githubusercontent.com/SegarKosan/.github/refs/heads/main/assets/pwa-badge.png" height="80px">
    </a>
    <a href="https://github.com/SegarKosan/SegarKosan/releases">
      <img alt="Download from GitHub" src="https://raw.githubusercontent.com/SegarKosan/.github/refs/heads/main/assets/github-badge.png" height="80px">
    </a>
  </p>
  
  <p align="center">
    <a href="https://github.com/SegarKosan/SegarKosan">
      <img src="https://img.shields.io/badge/SegarKosan-Repository-218685?style=for-the-badge&logo=github&logoColor=white" alt="SegarKosan Repo">
    </a>
    <a href="https://github.com/SegarKosan/SegarKosan-FrontEnd">
      <img src="https://img.shields.io/badge/FrontEnd-Repository-7cc48a?style=for-the-badge&logo=github&logoColor=white" alt="FrontEnd Repo">
    </a>
    <a href="https://github.com/SegarKosan/SegarKosan-BackEnd">
      <img src="https://img.shields.io/badge/BackEnd-Repository-000000?style=for-the-badge&logo=github&logoColor=white" alt="BackEnd Repo">
    </a>
  </p>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#features)
- [What It Measures](#what-it-measures)
- [System Architecture](#system-architecture)
- [Hardware Components](#hardware)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Repository Structure](#repository-structure)
- [How It Works](#how-it-works)
- [License](#license)
- [Contact & Support](#contact--support)

## Overview

**SegarKosan** is an intelligent IoT-based air quality monitoring system specifically designed for Indonesian student boarding rooms (kos-kosan). Poor air quality in densely populated living spaces can lead to health issues, reduced focus, and discomfort. SegarKosan addresses this by providing:

- **Real-time monitoring** of critical air quality parameters
- **Instant alerts** when conditions become unhealthy
- **Historical data** to track trends and patterns
- **Easy-to-understand** odor scoring system
- **Accessible dashboard** via Progressive Web App (PWA)

Perfect for students, landlords, and property managers who care about creating healthy living environments.

### Problem Statement

Student boarding rooms often suffer from:
- Poor ventilation leading to CO₂ buildup
- Humidity issues causing mold and discomfort
- Unpleasant odors from cooking, trash, or other sources
- Lack of awareness about indoor air quality

SegarKosan makes invisible air quality visible and actionable.

## What It Measures

| Parameter | Unit | Sensor/Method | Healthy Range |
|-----------|------|---------------|---------------|
| **Temperature** | °C | DHT22 | 20-26°C |
| **Humidity** | % | DHT22 | 40-60% |
| **Heat Index** | °C | Calculated from temp + humidity | <32°C |
| **CO₂ Level** | ppm | MQ-135 | <1000 ppm |
| **Odor Score** | 0-100 | Proprietary algorithm | >70 = Good |

### Odor Score Algorithm

Our proprietary odor scoring system combines multiple factors:

- **40%** - CO₂ concentration (primary indicator)
- **20%** - Temperature deviation from optimal (24°C)
- **20%** - Humidity level
- **20%** - Raw MQ-135 sensor reading

**Score Interpretation:**
- 🟢 **80-100**: Excellent air quality
- 🟡 **60-79**: Good, minor improvements possible
- 🟠 **40-59**: Moderate, ventilation recommended
- 🔴 **0-39**: Poor, immediate action needed

##  Features

### Device Features
- ** Real-time Monitoring**: Sensor readings every ~5 seconds with minimal latency
- ** WiFi Provisioning**: Easy setup via captive portal (WiFiManager)
- ** OLED Display**: 5-page rotating display showing all parameters
- ** Auto-reconnect**: Robust MQTT connection with automatic recovery
- ** Low Power**: Optimized for 24/7 operation on ESP32-C3

### Web Dashboard Features
- ** Progressive Web App (PWA)**: Install on any device like a native app
- ** Real-time Gauges**: Live visualization of all sensor data
- ** JWT Authentication**: Secure user sessions
- ** WebSocket Updates**: Instant data push without polling
- ** Historical Charts**: Track trends over time (coming soon)
- ** Smart Alerts**: Notifications when thresholds are exceeded (coming soon)
- ** Dark Mode**: Easy on the eyes for night-time monitoring

### Technical Features
- **MQTT Protocol**: Industry-standard IoT messaging
- **WebSocket Bridge**: Real-time browser updates
- **RESTful API**: For integration with other services
- **Modular Architecture**: Separate firmware, backend, and frontend
- **Open Hardware**: Complete schematics and BOM available

## Hardware

### Bill of Materials (BOM)

| Component | Model | Specification | Pin Connection | Approx. Cost |
|-----------|-------|---------------|----------------|--------------|
| **Microcontroller** | ESP32-C3 DevKitC-02 | 160MHz RISC-V, WiFi, BLE | — | $5-7 |
| **Temp/Humidity** | DHT22 (AM2302) | ±0.5°C, ±2% RH | GPIO 4 | $3-5 |
| **Gas Sensor** | MQ-135 | Air quality (CO₂, NH₃, NOx) | GPIO 2 (ADC1_CH2) | $2-4 |
| **Display** | SH1106 OLED | 128×64 I2C monochrome | SCL→GPIO8, SDA→GPIO10 | $3-5 |
| **Power** | USB-C Cable | 5V @ 500mA minimum | — | $2-3 |

**Total Cost:** ~$15-24 USD per device

### Important Notes

- **MQ-135 Power**: Requires 5V! Connect to `VIN` or `5V` pin, **NOT** 3.3V, or the sensor won't heat properly.
- **MQ-135 Warm-up**: Needs 24-48 hours of initial burn-in for accurate readings.
- **DHT22 Pullup**: Some modules include built-in resistor; if not, add 10kΩ pullup to data pin.
- **I2C Address**: SH1106 typically uses 0x3C; verify with I2C scanner if display doesn't work.

### Assembly Tips

1. Start with ESP32-C3 and OLED to verify basic functionality
2. Add DHT22 and test temperature/humidity readings
3. Add MQ-135 last (requires calibration and warm-up)
4. Use breadboard for prototyping, then solder to perfboard or design custom PCB
5. 3D-printable enclosure design available in hardware repository

## System Architecture

### Ecosystem Overview
![Ecosystem Architecture](https://raw.githubusercontent.com/SegarKosan/.github/refs/heads/main/assets/ecosystem-architecture.png)

### IoT Device Architecture
![IoT Architecture](https://raw.githubusercontent.com/SegarKosan/.github/refs/heads/main/assets/IOT-architecture.png)

## Data Flow

1. ESP32-C3 reads sensors every 5 seconds
2. Publishes JSON payload to MQTT broker
3. Backend receives MQTT messages
4. Backend broadcasts to authenticated WebSocket clients
5. Dashboard updates gauges in real-time

## Tech Stack

### Firmware (IoT Device)
- **Platform**: ESP32-C3 (RISC-V)
- **Framework**: Arduino Core for ESP32
- **Build System**: PlatformIO
- **Libraries**: WiFiManager, PubSubClient (MQTT), DHT sensor library, Adafruit GFX

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Protocols**: MQTT (Mosquitto), WebSocket (ws)
- **Authentication**: JWT (jsonwebtoken)
- **Database**: (Planned: MongoDB/PostgreSQL for historical data)

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **UI Library**: TailwindCSS + shadcn/ui
- **Charts**: Recharts / Chart.js
- **State Management**: React Context / Zustand
- **PWA**: next-pwa plugin
- **Deployment**: Vercel



### Roadmap

Check out our [Project Roadmap](https://github.com/SegarKosan/.github/blob/main/profile/ROADMAP.md) to see what we're working on next!

---

## Getting Started

### Quick Start (For Users)

1. **Access the Dashboard**: Visit [segarkosan.vercel.app](https://segarkosan.vercel.app)
2. **Install as PWA**: Click "Install" button in your browser
3. **Create Account**: Sign up with email/password
4. **Connect Device**: Follow on-screen instructions to pair your SegarKosan device

### Developer Setup

Each component has its own repository with detailed setup instructions:

#### 1.1️ Firmware (ESP32-C3)
**Repository**: [SegarKosan/SegarKosan](https://github.com/SegarKosan/SegarKosan)

```bash
# Clone and setup
git clone https://github.com/SegarKosan/SegarKosan.git
cd SegarKosan
pio run --target upload
```

**Prerequisites**: PlatformIO IDE, ESP32-C3 board, USB-C cable

#### 2️2. Backend (Node.js)
**Repository**: [SegarKosan/SegarKosan-BackEnd](https://github.com/SegarKosan/SegarKosan-BackEnd)

```bash
# Clone and setup
git clone https://github.com/SegarKosan/SegarKosan-BackEnd.git
cd SegarKosan-BackEnd
npm install
npm run dev
```

**Prerequisites**: Node.js v18+, MQTT broker (Mosquitto)

#### 3️3. Frontend (Next.js)
**Repository**: [SegarKosan/SegarKosan-FrontEnd](https://github.com/SegarKosan/SegarKosan-FrontEnd)

```bash
# Clone and setup
git clone https://github.com/SegarKosan/SegarKosan-FrontEnd.git
cd SegarKosan-FrontEnd
npm install
npm run dev
```

**Prerequisites**: Node.js v18+

### Repository Structure

```
SegarKosan (Organization)
├── SegarKosan/              # 🔧 ESP32-C3 firmware (PlatformIO)
│   ├── src/                 # Source code
│   ├── include/             # Headers
│   ├── platformio.ini       # Build configuration
│   └── README.md
│
├── SegarKosan-BackEnd/      # 🖥️ Node.js server
│   ├── src/
│   │   ├── mqtt/            # MQTT client
│   │   ├── websocket/       # WebSocket server
│   │   ├── auth/            # JWT authentication
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── README.md
│
├── SegarKosan-FrontEnd/     # 🌐 Next.js dashboard
│   ├── app/                 # App router
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   ├── public/              # Static assets
│   ├── package.json
│   └── README.md
│
└── .github/                 # 📚 Organization profile (this repo)
    ├── profile/
    │   ├── README.md        # This file
    │   ├── ABOUT-US.MD
    │   └── ROADMAP.md
    └── assets/              # Diagrams and images
```

## How It Works

### Device Operation Cycle

1. **Initialization** (on boot)
   - Connect to WiFi (or start captive portal)
   - Initialize sensors and OLED
   - Connect to MQTT broker

2. **Main Loop** (every ~5 seconds)
   - Read DHT22 (temperature, humidity)
   - Read MQ-135 (gas sensor ADC value)
   - Calculate heat index
   - Calculate odor score
   - Update OLED display
   - Publish JSON to MQTT topic

3. **Data Format** (MQTT payload)
   ```json
   {
     "deviceId": "ESP32-C3-ABC123",
     "timestamp": 1703596800,
     "temperature": 25.4,
     "humidity": 58.2,
     "heatIndex": 26.1,
     "co2": 687,
     "odorScore": 78,
     "rawGas": 342
   }
   ```

### Backend Processing

1. Subscribe to MQTT topic(s)
2. Validate incoming data
3. (Optional) Store in database
4. Broadcast to authenticated WebSocket clients
5. Apply business logic (alerts, thresholds)

### Frontend Rendering

1. Establish WebSocket connection with JWT
2. Receive real-time sensor updates
3. Update gauge components
4. Show alerts if thresholds exceeded
5. Persist state in localStorage


## License

© 2025 SegarKosan by **Morning Group**. All rights reserved.

This project is proprietary software. Unauthorized copying, distribution, or modification is prohibited without explicit written permission from the copyright holders.

For licensing inquiries, please contact us.

---

<div align="center">
  <p><strong>Made with Passion by Morning Group for healthier student living spaces</strong></p>
  <p>
    <a href="#overview">Back to Top ↑</a>
  </p>
</div>
