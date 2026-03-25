# SB Studio v2 — Quick Edit Guide

## ★ CHANGE YOUR LINKS (5 minutes setup)

Open `index.html` and search for `★` — every place has a comment telling you exactly what to replace.

### Social Links (search `YOUR_HANDLE`, `YOUR_CHANNEL`, `XXXXXXXXXX`)

| Find | Replace with |
|------|-------------|
| `YOUR_HANDLE` | Your Instagram username e.g. `sbstudio_in` |
| `YOUR_CHANNEL` | Your YouTube channel e.g. `SBStudio` |
| `91XXXXXXXXXX` | Your WhatsApp number with country code e.g. `919998887777` |
| `hello@sbstudio.in` | Your real email |
| `+91 XXXXX XXXXX` | Your phone number to display |

---

## ★ ADD YOUR VIDEOS

### Option A — Local MP4 files
Drop files as:
```
assets/videos/video1.mp4
assets/videos/video2.mp4
assets/videos/video3.mp4
```
They are already linked in index.html.

### Option B — YouTube videos (RECOMMENDED for GitHub Pages)
In `index.html`, find each `film-item` and change `data-yt`:
```html
<!-- BEFORE -->
<div class="film-item film-wide" data-video="assets/videos/video1.mp4" data-yt="">

<!-- AFTER (YouTube) -->
<div class="film-item film-wide" data-video="" data-yt="https://www.youtube.com/embed/VIDEO_ID_HERE">
```
Get VIDEO_ID from your YouTube URL: `youtube.com/watch?v=VIDEO_ID_HERE`

---

## ★ ADD MORE PHOTOS TO GALLERY

Copy your image files to `assets/images/` then add a block in the `gal-grid` div:
```html
<div class="gi" data-cat="event" data-src="assets/images/yourphoto.jpg">
  <img src="assets/images/yourphoto.jpg" alt="Description" loading="lazy"/>
  <div class="gi-hover"><span>View</span></div>
</div>
```
`data-cat` options: `event` | `product` | `sky`  (or add your own category with a new filter button)

---

## ★ CHANGE PROJECT NAMES

In the `#work` section, find `.wg-info` blocks:
```html
<h3>Your Project Name</h3>
<p>Your description here.</p>
```

---

## 🚀 RUN LOCALLY

```bash
cd sbstudio-v2
python3 -m http.server 8080
# Open: http://localhost:8080
```
OR use VS Code Live Server extension.

---

## 🌐 DEPLOY TO GITHUB PAGES

```bash
git init
git add .
git commit -m "SB Studio launch"
git remote add origin https://github.com/YOURUSERNAME/sbstudio.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Source: `main` branch → Save

Your site: `https://YOURUSERNAME.github.io/sbstudio/`

---

## 🎨 CHANGE COLORS

In `css/style.css` line 1, edit `:root`:
```css
--gold:  #c9a155;   ← Main gold accent
--gold2: #e6c27a;   ← Hover gold
--ink:   #0c0b09;   ← Background black
--cream: #f0e8d8;   ← Text color
```

---

## 📱 WHAT'S INCLUDED

- ✅ Real photos: Ganesh festival, sunset sky, Tavanio jewellery
- ✅ Golden ratio layout (61.8% / 38.2% splits)
- ✅ GSAP scroll animations
- ✅ Gallery with category filter (All / Event / Product / Sky)
- ✅ Photo lightbox with keyboard navigation
- ✅ 3 video slots (local MP4 or YouTube)
- ✅ Instagram + YouTube + WhatsApp contact links
- ✅ Custom cursor
- ✅ Mobile responsive
- ✅ No backend needed — runs on GitHub Pages
