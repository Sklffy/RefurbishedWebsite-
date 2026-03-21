```
                                                    
▄▄▄▄▄▄▄                       ▄▄       ▄▄           
███▀▀███▄              ██    ██        ██ ▀▀        
███▄▄███▀ ▄███▄ ████▄ ▀██▀▀ ▀██▀ ▄███▄ ██ ██  ▄███▄ 
███▀▀▀▀   ██ ██ ██ ▀▀  ██    ██  ██ ██ ██ ██  ██ ██ 
███       ▀███▀ ██     ██    ██  ▀███▀ ██ ██▄ ▀███▀ 
                                                    
                                                    
```

> `$ whoami` → **jonathan_geisler** | Cybersecurity Student @ Liberty University  
> `$ status` → 🟢 **AVAILABLE FOR OPPORTUNITIES**

---

```
root@portfolio:~$ cat README.md
```

# `./geisler-cyber-folio`

**A complete rebuild of my old portfolio — refurbished with the help of agentic AI.**

My original website was functional but outdated. Using an agentic AI development workflow, I collaborated with an AI agent to redesign the entire experience from scratch — resulting in a faster, more polished, and far more visually engaging portfolio.

```
$ diff old-portfolio/ new-portfolio/
- static HTML, minimal design, no animations
- no admin panel, hard-coded content
- generic layout, no personal branding

+ terminal-inspired cyber UI with matrix rain & glitch effects
+ agentic AI-assisted component architecture (React + Vite)
+ live admin dashboard to manage experience entries
+ physics-based interactive skills canvas
+ animated preloader, section transitions, custom cursor
+ fully responsive — mobile & desktop
```

> The AI didn't just write code — it architected, refactored, and iterated alongside me to craft a user experience that actually reflects who I am as a cybersecurity professional.

---

## `$ ls ./stack/`

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express, SQLite |
| Styling | shadcn/ui, Lucide Icons |
| Email | EmailJS |

---

## `$ ./quick-start.sh`

### 1. Clone & Install

```bash
git clone https://github.com/Sklffy/RefurbishedWebsite-.git
cd RefurbishedWebsite-
npm install
```

### 2. Start Backend

```bash
cd backend
npm install
npm start
# > server running on http://localhost:5000
```

### 3. Start Frontend

```bash
# In a new terminal, from root:
npm run dev
# > preview at http://localhost:5173
```

---

## `$ cat ./api/endpoints.txt`

All endpoints prefixed with `/api/experiences`:

```
GET    /          → list all entries
GET    /:id       → get single entry
POST   /          → create entry
PUT    /:id       → update entry
DELETE /:id       → delete entry
```

---

## `$ cat ./admin/access.txt`

> Navigate to `/admin-login` to access the experience editor.  
> Credentials are set in `pages/AdminLogin.jsx`.

---

## `$ ls ./features/`

```
[+] Terminal-themed UI with cyber aesthetics
[+] Animated matrix rain background
[+] Interactive physics-based skills canvas
[+] Timeline experience / education sections
[+] Admin dashboard for editing experience entries
[+] EmailJS contact form with encryption styling
[+] Responsive -- mobile & desktop
[+] Preloader boot sequence animation
```

---

## `$ ./troubleshoot.sh`

**Port conflict?**
```bash
# Edit backend/server.js:
const PORT = process.env.PORT || 5001;
```

**Database corrupted?**
```bash
rm backend/portfolio.db && npm run dev
```

**CORS errors?**
```
Verify VITE_API_URL matches your backend port.
Backend has CORS enabled by default.
```

---

## `$ cat ./contact.txt`

```
email:    jdgeisler@liberty.edu
linkedin: /in/jonathan-geisler
github:   github.com/Sklffy
```

---

```
// EOF -- end-to-end encrypted -- built by jonathan geisler
