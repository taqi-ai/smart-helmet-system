import re
import os

html_path = r"C:\Users\af261\OneDrive\Desktop\ui ux\smart_helmet_final.html"
dest_path = r"C:\Users\af261\OneDrive\Desktop\ui ux\smart-helmet-web-app\frontend\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update helmet image src
content = content.replace('src="helmet.png"', 'src="/src/assets/helmet-logo.png"')
content = content.replace('src="hero.png"', 'src="/src/assets/helmet-logo.png"')

# 2. Add IDs for stats
content = content.replace('<div class="scard-val val-green">94%</div>', '<div class="scard-val val-green" id="compliance-rate">100%</div>')
content = content.replace('<div class="scard-val val-amber">12</div>', '<div class="scard-val val-amber" id="violations-count">0</div>')

# 3. Insert video feed
video_panel = """
        <!-- NEW PANEL FOR VIDEO FEED -->
        <div class="panel glass">
          <div class="panel-header">
            <div class="panel-title">Live Camera Feed</div>
            <div class="panel-tag" style="background:var(--ok-bg);color:var(--ok);border-color:var(--ok);">Active</div>
          </div>
          <div style="width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; position: relative;">
             <img src="http://localhost:5000/video_feed" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
             <div style="display: none; position: absolute; inset: 0; align-items: center; justify-content: center; color: var(--text-muted); flex-direction: column;">
                <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                <div>Camera Offline</div>
             </div>
          </div>
        </div>
"""
content = content.replace('<!-- Feed -->', video_panel + '\n        <!-- Feed -->')

# 4. Insert API polling logic in the <script>
api_script = """
// ── API Fetch
window.lastAlertActive = false;
setInterval(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/stats');
    const data = await res.json();
    
    document.getElementById('count').textContent = data.helmets;
    document.getElementById('violations-count').textContent = data.no_helmets;
    
    let compliance = "100%";
    if (data.total_detected > 0) {
      compliance = Math.round((data.helmets / data.total_detected) * 100) + "%";
    }
    document.getElementById('compliance-rate').textContent = compliance;
    
    // Add real-time log if violation happens
    if (data.alert_active && !window.lastAlertActive) {
      const feedItems = document.querySelectorAll('.feed-item');
      if (feedItems.length > 0) {
        const feedContainer = feedItems[0].parentElement;
        const newItem = document.createElement('div');
        newItem.className = 'feed-item';
        const timeString = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
        newItem.innerHTML = `<div class="fdot r"></div><div class="ftext">No helmet detected — Live Camera</div><div class="ftag warn">Alert</div><div class="ftime">${timeString}</div>`;
        feedContainer.insertBefore(newItem, feedContainer.children[1]); // after header
        if (feedContainer.children.length > 6) {
          feedContainer.removeChild(feedContainer.lastElementChild);
        }
      }
    }
    window.lastAlertActive = data.alert_active;
    
  } catch(e) {
    console.log("API Error:", e);
  }
}, 1000);
"""
content = content.replace('</script>', api_script + '\n</script>')

# 5. Make the helmet image rotate in the splash screen
rotate_style = """
.helmet-img {
  animation: helmet-rotate 4s infinite ease-in-out;
}
@keyframes helmet-rotate {
  0% { transform: rotate(-10deg) scale(1); }
  50% { transform: rotate(10deg) scale(1.05); }
  100% { transform: rotate(-10deg) scale(1); }
}
"""
content = content.replace('/* Text */', rotate_style + '\n/* Text */')

with open(dest_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html successfully!")
