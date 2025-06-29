# 🛡️ RightForge

<div align="center">

**Protect What You Create. Understand What You Agree To.**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-3ecf8e.svg)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff.svg)](https://vitejs.dev/)

[🚀 Live Demo](https://rightforge.netlify.app/) • [🎥 Video](https://youtu.be/OT0p4AdQ9IM) 

</div>

---

## 🌟 Overview

**RightForge** is the world's first voice-controlled legal-tech platform that revolutionizes digital rights management. Combining AI-powered license generation, real-time violation detection, and intelligent Terms of Service analysis, RightForge empowers creators to protect their work and understand their digital rights.

### ✨ Key Features

- 🎤 **Voice Control (OmniDim)** - Navigate and control everything with natural speech
- 🤖 **AI License Generation** - Create custom licenses in seconds using Google Gemini
- 🔍 **Smart Violation Detection** - Real-time monitoring with OmniDimension technology
- 📋 **ToS Analyzer** - AI-powered analysis of Terms of Service documents
- 🔔 **Real-time Notifications** - Stay informed about platform changes and violations
- 🛡️ **Beacon Protection** - Advanced content fingerprinting and tracking
- 📊 **Analytics Dashboard** - Comprehensive insights into your protected content

---

## 🎯 Demo

### Voice Commands
Try these natural voice commands after signing in:

```
"Create a license"          → Opens license creation wizard
"Analyze terms"             → Opens ToS analyzer
"Go to dashboard"           → Navigates to main dashboard
"Show my violations"        → Opens violation reports
"Open notifications"        → Shows ToS notifications
```

### Screenshots

<div align="center">

| Dashboard | License Creation | ToS Analyzer |
|-----------|------------------|--------------|
| ![image](https://github.com/user-attachments/assets/12055aaf-de3b-466a-8745-330c08ddc3d6) | ![image](https://github.com/user-attachments/assets/2ac20805-595a-4087-81c6-72adfa296a20) | ![image](https://github.com/user-attachments/assets/9d3e37a1-bb1b-44da-8b04-63dd7b7a9f80)
 |

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Supabase** account
- **Google Gemini API** key
- **OmniDimension API** key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anik2812/rightforge.git
   cd rightforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_OMNIDIMENSION_API_KEY=your_omnidimension_api_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the migration files in `/supabase/migrations/`
   - Enable Google and GitHub OAuth providers

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 🏗️ Architecture

### Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Modern UI framework |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **State Management** | Zustand | Lightweight state management |
| **Database** | Supabase | Backend-as-a-Service |
| **Authentication** | Supabase Auth | OAuth & email authentication |
| **AI Services** | Google Gemini | License generation & ToS analysis |
| **Voice Recognition** | Web Speech API | Voice command processing |
| **Build Tool** | Vite | Fast development & building |
| **Icons** | Lucide React | Beautiful icon library |

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout
│   └── OmniDim.tsx     # Voice control component
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Authentication
│   ├── CreatorDashboard.tsx
│   ├── ProtectNewWork.tsx
│   ├── MyLicenses.tsx
│   ├── ViolationReports.tsx
│   ├── TosAnalyzer.tsx
│   └── ...
├── lib/                # External service integrations
│   ├── supabase.ts     # Database client
│   ├── auth.ts         # Authentication service
│   ├── gemini.ts       # AI service
│   └── omnidimension.ts # Violation detection
├── store/              # State management
│   └── useStore.ts     # Zustand store
└── styles/             # Global styles
    └── index.css       # Tailwind + custom CSS
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `VITE_GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `VITE_OMNIDIMENSION_API_KEY` | OmniDimension API key | ⚠️ Optional |

### Supabase Setup

1. **Create tables** using the migration files
2. **Enable Row Level Security** (RLS) on all tables
3. **Configure OAuth providers**:
   - Google OAuth
   - GitHub OAuth
4. **Set up storage buckets** for file uploads

### API Keys

- **Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **OmniDimension**: Contact [OmniDimension](https://omnidimension.ai) for API access

---

## 🎮 Usage

### Creating a License

1. **Upload your content** (images, documents, code, etc.)
2. **Define usage rights** (commercial use, remixing, attribution)
3. **Generate AI license** using Google Gemini
4. **Publish and protect** with beacon technology

### Analyzing Terms of Service

1. **Paste ToS text** or provide a URL
2. **AI analysis** identifies risks and concerns
3. **Get recommendations** for safer usage
4. **Track changes** with notification system

### Voice Commands

Activate OmniDim by clicking the microphone button and speak naturally:

- Navigation: *"Go to dashboard"*, *"Open licenses"*
- Actions: *"Create license"*, *"Analyze terms"*
- Help: *"What can you do?"*, *"Help"*

---

## 🔒 Security & Privacy

### Data Protection
- **End-to-end encryption** for sensitive data
- **Row Level Security** (RLS) in Supabase
- **OAuth authentication** with Google/GitHub
- **No data sharing** with third parties

### Content Security
- **Beacon technology** for invisible content tracking
- **Fingerprinting** for violation detection
- **Real-time monitoring** across the web
- **DMCA compliance** tools

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

---

## 📊 Roadmap

### Q1 2024
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Bulk license management
- [ ] API for third-party integrations

### Q2 2024
- [ ] Blockchain integration for immutable licenses
- [ ] Advanced AI violation detection
- [ ] Multi-language support
- [ ] Enterprise features

### Q3 2024
- [ ] Marketplace for licensed content
- [ ] Advanced collaboration tools
- [ ] White-label solutions
- [ ] Advanced reporting

---

## 📈 Performance

### Metrics
- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 500KB gzipped

### Optimizations
- **Code splitting** with React.lazy()
- **Image optimization** with modern formats
- **CDN delivery** for static assets
- **Database indexing** for fast queries

---

## 🌍 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

**Note**: Voice commands require browsers with Web Speech API support.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Supabase** for the amazing backend platform
- **Google** for Gemini AI capabilities
- **Vercel** for hosting and deployment
- **Tailwind CSS** for the beautiful design system
- **Lucide** for the icon library
- **React** team for the incredible framework

---

<div align="center">



[Website](https://rightforge.netlify.app/) 

</div>
