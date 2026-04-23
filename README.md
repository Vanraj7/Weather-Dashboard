<div align="center">

<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/-Open--Meteo-00B4D8?style=for-the-badge&logo=cloud&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/API_Key-Not_Required-brightgreen?style=for-the-badge" />

<br/><br/>

# ⛅ Nimbus — Weather Dashboard

**A stunning real-time weather dashboard built with React + Vite.**
Live forecasts, 7-day outlook, hourly charts, sunrise/sunset arc — powered entirely by the **free Open-Meteo API** with no API key required.

[🚀 Live Demo](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **City Search** | Real-time autocomplete search for any city worldwide |
| 📍 **Auto-detect Location** | One-click GPS-based weather detection |
| 🌡️ **Current Conditions** | Temperature, feels like, humidity, wind, pressure, UV index, visibility |
| 📈 **24-Hour Forecast** | Scrollable hourly icon row + canvas temperature/rain chart |
| 📅 **7-Day Forecast** | Daily high/low with animated gradient range bars |
| 🌅 **Sunrise & Sunset** | Animated SVG arc showing sun position in real time |
| 🔁 **Recent Cities** | Quick-access chips for your last 5 searched cities |
| 🌡️ **°C / °F Toggle** | Instant unit switching throughout the entire dashboard |
| 🎨 **Dynamic Theming** | Background colors shift based on weather condition (sunny, rainy, stormy, snowy…) |
| 💾 **Persistent Prefs** | Unit preference and recent cities saved to localStorage |
| 📱 **Fully Responsive** | Works beautifully on mobile, tablet, and desktop |
| 🆓 **No API Key Needed** | Uses Open-Meteo — completely free, no registration |

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI components and state management |
| **Vite 5** | Fast dev server and build tool |
| **Open-Meteo API** | Free weather data (no key needed) |
| **Canvas API** | Hourly temperature and rain chart |
| **CSS Variables** | Dynamic theming based on weather condition |
| **localStorage** | Persistent user preferences |

---

## 📁 Project Structure

```
weather-dashboard/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx         # City search with autocomplete dropdown
│   │   ├── RecentCities.jsx      # Last 5 searched cities as quick chips
│   │   ├── HeroCard.jsx          # Main current weather display
│   │   ├── HourlyChart.jsx       # 24h scrollable icons + canvas chart
│   │   ├── SevenDayForecast.jsx  # 7-day forecast with range bars
│   │   ├── SunriseSunset.jsx     # Animated SVG sunrise/sunset arc
│   │   └── UnitToggle.jsx        # °C / °F switcher
│   │
│   ├── hooks/
│   │   ├── useWeather.js         # Fetches current, hourly, daily weather
│   │   └── useLocalStorage.js    # Persistent React state hook
│   │
│   ├── utils/
│   │   ├── weatherCodes.js       # WMO code → icon, label, theme mapping
│   │   └── formatters.js         # Temperature, date, time formatters
│   │
│   ├── styles/
│   │   └── globals.css           # Full design system and all component styles
│   │
│   ├── App.jsx                   # Root component, layout, state management
│   └── main.jsx                  # React entry point
│
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/weather-dashboard.git

# 2. Go into the project
cd weather-dashboard

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Visit **http://localhost:5173** — no API key required, works immediately! 🎉

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub, then import on vercel.com
# Vercel auto-detects Vite — just click Deploy
```

### Build for production
```bash
npm run build
# Output goes to dist/ — deploy anywhere
```

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**⭐ Star this repo if you found it useful!**

Made with ❤️ and React · Weather by [Open-Meteo](https://open-meteo.com)

</div>
