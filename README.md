# NexusFlow | Modern SaaS Work OS & Productivity Suite

[![Deploy to GitHub Pages](https://github.com/features/actions/workflows/deploy.yml/badge.svg)](https://github.com)
[![Render Static Site](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)](https://render.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

A modern, high-velocity frontend web application crafted with **React 19**, **Vite**, **Lucide Icons**, and a bespoke **Glassmorphic Design System**. NexusFlow unifies sprint coordination, team velocity telemetry, and automated deployment monitoring into one interface.

---

## 🌟 Pages & Concept Overview (7 Core Pages)

NexusFlow delivers an end-to-end multi-page workflow ready for immediate demonstration and production deployment:

1. **Home / Landing Page (`/`)**:
   - Radiant dark/light hero banner with animated gradient typography.
   - Interactive live terminal window simulating active sprint progress and edge latency.
   - 6 core capability feature cards with glowing badge accents.
   - Transparent 3-tier pricing breakdown (Starter, Pro Workspace, Enterprise).
   - Social proof badges and CTA banners.

2. **Login Page (`/login`)**:
   - Modern glassmorphic dual-column layout with ambient glow.
   - **⚡ Instant 1-Click Demo Login** button (pre-authenticates as Demo Lead).
   - Social OAuth buttons (GitHub & Google).
   - Email/password validation with show/hide password toggle and "Remember Me" option.

3. **Sign Up Page (`/signup`)**:
   - Full Name, Work Email, and dynamic password strength calculator (Weak / Good / Very Strong).
   - Interactive Plan Tier selector (Starter Free vs. Pro Trial).
   - Terms and conditions agreement checkbox and direct redirect to the workspace.

4. **Dashboard Overview (`/dashboard`)**:
   - Personalized user greeting with active role and company.
   - 4 live KPI stat cards (Active Initiatives, Sprint Velocity, Task Completion %, and Edge Deploy Health).
   - Sprint Work Breakdown table with multi-criteria status filtering (All, Active, In Review, Completed) and search.
   - Live activity timeline feed and Render Edge CDN status monitor.

5. **Projects & Tasks Board (`/projects`)**:
   - Interactive Kanban board with 4 workflow lanes: *Backlog*, *In Progress*, *In Review*, and *Done*.
   - Dynamic view switcher between **Board** and **List** views.
   - Real-time status transitions via card selectors.
   - Interactive **"+ New Task"** modal to create deliverables on the fly.

6. **System Telemetry & Analytics (`/analytics`)**:
   - Interactive time-range controls (7 Days, 30 Days, 90 Days).
   - Custom SVG Area Chart visualizing Sprint Delivery Velocity and burndown.
   - Custom SVG Bar Chart comparing daily production deployments vs pull requests.
   - Global Edge CDN table displaying real-time latency across US, Europe, APAC, and Fastly nodes.

7. **Team Directory (`/team`)**:
   - Collaborator roster with online/busy/offline presence indicators.
   - Department filtering (Engineering, Product Design, DevOps, Leadership).
   - Access permission levels (Owner, Admin, Contributor).
   - Interactive **"Invite Teammate"** modal with role assignment.

8. **Settings & Security (`/settings`)**:
   - **Profile Tab**: Edit name, email, company, role, and bio with persistent state.
   - **Theme & Notifications Tab**: Toggle between Dark Slate and Clean Light themes; configure digest toggles.
   - **API Keys & Security**: Copyable bearer API token with one-click regeneration and 2FA status indicator.
   - **Deployment Setup Guide**: In-app step-by-step instructions for Render and GitHub Pages.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler / Dev Server**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (configured with `HashRouter` for zero-configuration, 404-free static hosting on GitHub Pages and Render)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Vector Brand SVGs
- **Typography**: Google Fonts (*Plus Jakarta Sans* & *Outfit*)
- **Styling**: Vanilla CSS Design Tokens (Variables, Glassmorphism, Micro-animations, Custom Scrollbars, Dark/Light Themes)

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install
```bash
git clone https://github.com/your-username/react_project.git
cd react_project
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be output to the `./dist` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🚢 Deploy to Render (Static Site)

NexusFlow is pre-configured for Render. You can deploy it in two ways:

### Method A: Web Dashboard (Fastest)
1. Push your repository to **GitHub**.
2. Go to your [Render Dashboard](https://dashboard.render.com/) and click **New +** &rarr; **Static Site**.
3. Connect your repository.
4. Set the following settings:
   - **Name**: `nexusflow-app` (or your choice)
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**.
6. Render will automatically build and publish your app with a global CDN and automatic SSL!

> **Note**: The repository includes `public/_redirects` and `render.yaml` with the SPA rewrite rule (`/* -> /index.html 200`), ensuring deep links and browser refreshes work flawlessly.

### Method B: Render Blueprint (`render.yaml`)
1. In Render Dashboard, click **New +** &rarr; **Blueprint**.
2. Select your repository. Render will automatically detect `render.yaml` and configure the static site service with zero manual input!

---

## 🐙 Deploy to GitHub Pages

This project includes an automated GitHub Actions CI/CD workflow at `.github/workflows/deploy.yml`.

### Method A: Automated GitHub Actions (Recommended)
1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of NexusFlow"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your repository on GitHub:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
3. Push any commit to `main` (or run the workflow manually under the **Actions** tab).
4. GitHub Actions will build and publish your site at:
   `https://<your-username>.github.io/<your-repo-name>/`

### Why routing works without 404 errors on GitHub Pages:
- `vite.config.js` uses relative base `./`, which automatically resolves CSS and JS assets correctly under any repository subfolder.
- The app uses `HashRouter`, which prevents GitHub Pages from returning 404 errors when refreshing inner pages (e.g. `/#/dashboard`, `/#/projects`).
- `public/404.html` is provided as an additional redirect safety net.

---

## 📁 Project Structure

```text
react_project/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions auto-deployment to Pages
├── public/
│   ├── _redirects              # Render & Netlify SPA routing rewrite rule
│   └── 404.html                # Static hosting fallback redirect
├── src/
│   ├── components/
│   │   ├── AppHeader.jsx       # Top workspace bar (search, notifs, profile)
│   │   ├── Footer.jsx          # Public footer with links & status
│   │   ├── Icons.jsx           # Crisp custom vector brand SVGs
│   │   ├── InviteModal.jsx     # Team collaborator invite modal
│   │   ├── Navbar.jsx          # Public sticky header with theme toggle
│   │   ├── NotificationDropdown.jsx # Real-time notification menu
│   │   ├── Sidebar.jsx         # Workspace navigation sidebar
│   │   └── TaskModal.jsx       # Create task dialog
│   ├── context/
│   │   ├── AuthContext.jsx     # Persistent auth state & user session
│   │   ├── ThemeContext.jsx    # Dark/Light theme toggle & storage
│   │   └── ToastContext.jsx    # Animated toast notifications system
│   ├── pages/
│   │   ├── Home.jsx            # Public landing page with live mock
│   │   ├── Login.jsx           # Sign in page with demo 1-click login
│   │   ├── Signup.jsx          # Sign up with password strength meter
│   │   ├── Dashboard.jsx       # Sprint overview & KPI metrics
│   │   ├── Projects.jsx        # Interactive Kanban & List task board
│   │   ├── Analytics.jsx       # SVG area/bar charts & edge latency
│   │   ├── Team.jsx            # Collaborators matrix & status dots
│   │   ├── Settings.jsx        # Profile, Theme, API keys & deploy guide
│   │   └── NotFound.jsx        # 404 fallback page
│   ├── App.css                 # Layout styles & responsive styling
│   ├── App.jsx                 # Routing & workspace shell
│   ├── index.css               # Design system tokens & base CSS
│   └── main.jsx                # Application root entry point
├── index.html                  # HTML template with Google Fonts & SEO
├── package.json
├── render.yaml                 # Render Blueprint specification
└── vite.config.js              # Vite build configuration (base: './')
```

---

## 📄 License
MIT License. Open source and free to use for personal or commercial projects.
