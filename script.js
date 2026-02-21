// Windows 19584 - Vanilla JS Version
// (C) 19584 Quantum Dynamics Inc.

const osContainer = document.getElementById('os-container');

// State Management
const state = {
    stage: 'bios', // bios, boot, login, desktop
    windows: [],
    focusedWindowId: null,
    isStartOpen: false,
    calcValue: '0'
};

// --- Utilities ---
function render() {
    // This vanilla version will use DOM manipulation instead of a full re-render
    // But we'll call specific initialization functions for each stage
}

// --- BIOS Stage ---
function startBIOS() {
    osContainer.innerHTML = `
        <div id="bios-screen" class="fixed inset-0 bg-black text-green-500 font-mono p-10 text-lg flex flex-col items-start justify-start z-50 overflow-hidden">
            <div id="bios-lines"></div>
            <div class="cursor-blink">_</div>
        </div>
    `;

    const lines = [
        "ASUS-QUANTUM BIOS v195.8.4",
        "Copyright (C) 19584 Quantum Dynamics Inc.",
        "",
        "CPU: Hyper-Threaded Neuro-Core @ 1.2 THz",
        "Memory: 1024 PB Quantum-RAM",
        "Storage: Infinite-State Entanglement Drive",
        "",
        "Initializing Neural Interface...",
        "Checking Hyper-Dimensional Connectivity... OK",
        "Loading Temporal Kernel...",
        "Scanning for User Imprints...",
        "Authenticating Bios-Signature...",
        "Booting Windows 19584 Core..."
    ];

    const linesContainer = document.getElementById('bios-lines');
    let currentLine = 0;

    const interval = setInterval(() => {
        if (currentLine < lines.length) {
            const div = document.createElement('div');
            div.textContent = lines[currentLine];
            linesContainer.appendChild(div);
            currentLine++;
        } else {
            clearInterval(interval);
            setTimeout(startBoot, 1000);
        }
    }, 100);
}

// --- Boot Stage ---
function startBoot() {
    state.stage = 'boot';
    osContainer.innerHTML = `
        <div id="boot-screen" class="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            <div id="boot-logo" class="relative opacity-0 transition-all duration-1000 transform scale-75">
                <div class="w-32 h-32 border-4 border-blue-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div class="absolute inset-0 bg-blue-500 opacity-20 blur-xl animate-pulse"></div>
                    <div class="grid grid-cols-2 gap-1 w-20 h-20">
                        <div class="bg-blue-400"></div>
                        <div class="bg-blue-400 opacity-80"></div>
                        <div class="bg-blue-400 opacity-60"></div>
                        <div class="bg-blue-400 opacity-40"></div>
                    </div>
                </div>
            </div>
            <div class="mt-10 flex space-x-2">
                <div class="boot-dot w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
                <div class="boot-dot w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
                <div class="boot-dot w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
                <div class="boot-dot w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
                <div class="boot-dot w-2 h-2 bg-blue-400 rounded-full opacity-30"></div>
            </div>
            <div class="mt-10 text-blue-300 font-light tracking-[0.5em] text-xl opacity-0 transition-opacity duration-1000" id="boot-text">WINDOWS 19584</div>
        </div>
    `;

    // Animations
    setTimeout(() => {
        const logo = document.getElementById('boot-logo');
        logo.classList.remove('opacity-0', 'scale-75');
        logo.classList.add('opacity-100', 'scale-100');
    }, 100);

    setTimeout(() => {
        document.getElementById('boot-text').classList.remove('opacity-0');
    }, 1000);

    // Dot animation
    const dots = document.querySelectorAll('.boot-dot');
    let dotIndex = 0;
    const dotInterval = setInterval(() => {
        dots.forEach(d => d.style.opacity = '0.3');
        dots[dotIndex].style.opacity = '1';
        dots[dotIndex].style.transform = 'scale(1.5)';
        setTimeout(() => {
            dots[dotIndex].style.transform = 'scale(1)';
        }, 500);
        dotIndex = (dotIndex + 1) % dots.length;
    }, 200);

    setTimeout(() => {
        clearInterval(dotInterval);
        startLogin();
    }, 4000);
}

// --- Login Stage ---
function startLogin() {
    state.stage = 'login';
    osContainer.innerHTML = `
        <div id="login-screen" class="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center z-50 opacity-0 transition-opacity duration-1000">
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full"></div>
                <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full"></div>
            </div>
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-40 h-40 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                   <i data-lucide="user" class="w-20 h-20 text-white/40"></i>
                </div>
                <h1 class="text-4xl text-white font-light mb-8 tracking-widest uppercase">Quantum Traveler</h1>
                <button id="signin-btn" class="px-12 py-3 bg-white/10 border border-white/20 backdrop-blur-lg rounded-full text-white text-xl hover:bg-white/20 transition-all active:scale-95">
                  Sign In
                </button>
            </div>

            <div class="absolute bottom-10 left-10 text-white/60 font-light">
                <div class="text-6xl mb-2 font-mono" id="login-time">08:42</div>
                <div class="text-xl" id="login-date">Friday, October 24, 19584</div>
            </div>
        </div>
    `;

    lucide.createIcons();

    setTimeout(() => {
        document.getElementById('login-screen').classList.remove('opacity-0');
    }, 100);

    // Update time
    const updateTime = () => {
        const now = new Date();
        const timeEl = document.getElementById('login-time');
        const dateEl = document.getElementById('login-date');
        if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (dateEl) {
            const dayName = now.toLocaleDateString([], { weekday: 'long' });
            const monthName = now.toLocaleDateString([], { month: 'long' });
            const day = now.getDate();
            dateEl.textContent = `${dayName}, ${monthName} ${day}, 19584`;
        }
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    document.getElementById('signin-btn').onclick = () => {
        clearInterval(timeInterval);
        document.getElementById('login-screen').classList.add('opacity-0');
        setTimeout(startDesktop, 1000);
    };
}

// --- Desktop Stage ---
function startDesktop() {
    state.stage = 'desktop';
    osContainer.innerHTML = `
        <div id="desktop" class="relative h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
            <!-- Desktop Background -->
            <div class="absolute inset-0 z-0 overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black"></div>
                <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse-soft"></div>
                <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse-soft" style="animation-delay: 2s;"></div>
                <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#3b82f6 1px, transparent 1px); background-size: 40px 40px;"></div>
            </div>

            <!-- Desktop Icons -->
            <div id="desktop-icons" class="relative z-10 p-10 flex flex-col gap-10 items-start">
                <!-- Icons injected here -->
            </div>

            <!-- Windows Layer -->
            <div id="windows-layer" class="absolute inset-0 pointer-events-none z-20"></div>

            <!-- Start Menu -->
            <div id="start-menu" class="absolute bottom-16 left-4 w-[480px] h-[600px] glass backdrop-blur-3xl border border-blue-500/20 rounded-3xl z-[60] p-8 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col hidden transition-all duration-300 transform translate-y-10 opacity-0">
                <div class="flex items-center space-x-5 mb-10 pb-6 border-b border-white/5">
                    <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-400/30 shadow-lg">
                        <i data-lucide="user" class="text-blue-400 w-8 h-8"></i>
                    </div>
                    <div>
                        <div class="text-white text-lg font-light tracking-widest uppercase">Quantum Traveler</div>
                        <div class="text-blue-400/50 text-[10px] uppercase tracking-[0.3em] mt-1">Dimension 7-A | Node 04</div>
                    </div>
                </div>

                <div id="start-apps" class="grid grid-cols-3 gap-6 flex-1 overflow-auto pr-2 custom-scrollbar">
                    <!-- Start apps injected here -->
                </div>

                <div class="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div class="flex space-x-6">
                        <div class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/40 hover:text-white">
                            <i data-lucide="settings" class="w-5 h-5"></i>
                        </div>
                        <div class="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white/40 hover:text-white">
                            <i data-lucide="folder" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div id="power-btn" class="flex items-center space-x-3 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all cursor-pointer group">
                        <span class="text-[10px] uppercase tracking-[0.2em] text-red-500/80 group-hover:text-red-500">Power Off</span>
                        <i data-lucide="power" class="w-4 h-4 text-red-500/80 group-hover:text-red-500"></i>
                    </div>
                </div>
            </div>

            <!-- Taskbar -->
            <div class="absolute bottom-0 left-0 right-0 h-18 flex items-end justify-center pb-2 z-50">
                <div class="taskbar-glass taskbar-centered h-16 flex items-center justify-between px-4">
                    <div class="flex items-center space-x-1">
                        <button id="start-btn" class="h-12 w-12 flex items-center justify-center rounded-xl transition-all hover:bg-white/10 text-blue-400 group">
                            <i data-lucide="layout" class="w-6 h-6 group-hover:scale-110"></i>
                        </button>
                        <button id="aura-btn" class="h-12 w-12 flex items-center justify-center rounded-xl transition-all hover:bg-white/10 text-purple-400 group">
                            <i data-lucide="sparkles" class="w-6 h-6 group-hover:scale-110"></i>
                        </button>
                        <button id="taskview-btn" class="h-12 w-12 flex items-center justify-center rounded-xl transition-all hover:bg-white/10 text-green-400 group">
                            <i data-lucide="layers" class="w-6 h-6 group-hover:scale-110"></i>
                        </button>
                        <button id="biolink-btn" class="h-12 w-12 flex items-center justify-center rounded-xl transition-all hover:bg-white/10 text-red-400 group">
                            <i data-lucide="fingerprint" class="w-6 h-6 group-hover:scale-110"></i>
                        </button>
                        <div class="h-8 w-px bg-white/10 mx-2"></div>
                        <div id="taskbar-apps" class="flex items-center space-x-1"></div>
                    </div>

                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-3 text-white/40">
                            <i data-lucide="wifi" class="w-4 h-4 cursor-pointer hover:text-white" onclick="showNotification('Entanglement Status', 'Connected to Universal-Net Node 04. Signal: 1.2 Petabit/s')"></i>
                            <i data-lucide="volume-2" class="w-4 h-4 cursor-pointer hover:text-white" onclick="showNotification('Neural Audio', 'Output: Direct Cortical Interface. Volume: 40%')"></i>
                        </div>
                        <div class="flex flex-col items-center font-mono cursor-pointer hover:bg-white/5 px-2 py-1 rounded-lg transition-all" id="tray-clock" onclick="showNotification('Temporal Calendar', 'No anomalies scheduled for the next 24 solar cycles.')">
                            <span id="taskbar-time" class="text-[11px] text-blue-100 font-bold">00:00</span>
                            <span id="taskbar-date" class="text-[8px] text-white/30 uppercase tracking-tighter">00/00/19584</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Aura Sidebar -->
            <div id="aura-sidebar" class="fixed top-4 right-4 bottom-24 w-80 glass border border-purple-500/20 rounded-3xl z-[55] translate-x-[400px] transition-transform duration-500 flex flex-col overflow-hidden shadow-2xl">
                <div class="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                    <div class="flex items-center space-x-3">
                        <div class="p-2 bg-purple-500/20 rounded-lg text-purple-400"><i data-lucide="sparkles" class="w-5 h-5"></i></div>
                        <span class="text-sm font-semibold tracking-widest uppercase text-white">Aura AI</span>
                    </div>
                    <button id="close-aura" class="text-white/40 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>
                <div id="aura-chat" class="flex-1 p-6 overflow-auto custom-scrollbar space-y-4">
                    <div class="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-xs text-white/80 leading-relaxed">
                        Greetings, Quantum Traveler. I am Aura, your temporal intelligence. How can I assist your journey through the 196th century today?
                    </div>
                </div>
                <div class="p-4 bg-white/5 border-t border-white/5">
                    <input type="text" id="aura-input" placeholder="Ask Aura anything..." class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-purple-500/50 outline-none transition-all">
                </div>
            </div>
        </div>
    `;

    lucide.createIcons();
    initDesktop();
}

const appDefinitions = [
    { id: 'holopad', name: 'HoloPad', icon: 'file-text' },
    { id: 'calc', name: 'QuantumCalc', icon: 'calculator' },
    { id: 'galaxy', name: 'Galactic Browser', icon: 'globe' },
    { id: 'explorer', name: 'OmniExplorer', icon: 'folder' },
    { id: 'system', name: 'System Core', icon: 'settings' },
    { id: 'legacy', name: 'Legacy Suite', icon: 'history' },
    { id: 'holomaker', name: 'Holo-Maker', icon: 'clapperboard' }
];

function initDesktop() {
    const iconContainer = document.getElementById('desktop-icons');
    const startAppsContainer = document.getElementById('start-apps');

    appDefinitions.forEach(app => {
        // Desktop Icon
        const icon = document.createElement('button');
        icon.setAttribute('aria-label', app.name);
        icon.className = 'flex flex-col items-center w-24 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/10 outline-none';
        icon.innerHTML = `
            <div class="p-4 bg-blue-500/10 border border-white/5 rounded-2xl group-hover:border-blue-500/40 transition-all text-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] pointer-events-none">
                <i data-lucide="${app.icon}" class="w-9 h-9"></i>
            </div>
            <span class="mt-3 text-[10px] font-medium text-white/70 text-center uppercase tracking-[0.2em] group-hover:text-white transition-colors pointer-events-none">${app.name}</span>
        `;
        icon.onclick = () => openWindow(app.id); // Changed to single click for easier interaction
        iconContainer.appendChild(icon);

        // Start App
        const startApp = document.createElement('button');
        startApp.setAttribute('aria-label', `Start ${app.name}`);
        startApp.className = 'flex flex-col items-center p-5 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5 outline-none';
        startApp.innerHTML = `
            <div class="text-blue-400 mb-3 group-hover:scale-110 transition-all pointer-events-none">
                <i data-lucide="${app.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-[10px] text-white/60 uppercase tracking-widest group-hover:text-white transition-colors text-center pointer-events-none">${app.name}</span>
        `;
        startApp.onclick = () => {
            openWindow(app.id);
            toggleStartMenu();
        };
        startAppsContainer.appendChild(startApp);
    });

    lucide.createIcons();

    // Start Button
    document.getElementById('start-btn').onclick = toggleStartMenu;

    // Aura Button
    const auraBtn = document.getElementById('aura-btn');
    const auraSidebar = document.getElementById('aura-sidebar');
    auraBtn.onclick = () => {
        const isClosed = auraSidebar.classList.contains('translate-x-[400px]');
        if (isClosed) {
            auraSidebar.classList.remove('translate-x-[400px]');
            auraBtn.classList.add('bg-purple-600/30', 'border-purple-500/50');
        } else {
            auraSidebar.classList.add('translate-x-[400px]');
            auraBtn.classList.remove('bg-purple-600/30', 'border-purple-500/50');
        }
    };
    document.getElementById('close-aura').onclick = () => {
        auraSidebar.classList.add('translate-x-[400px]');
        auraBtn.classList.remove('bg-purple-600/30', 'border-purple-500/50');
    };

    // Task View Button
    document.getElementById('biolink-btn').onclick = () => {
        showNotification("Bio-Link", "Biometric signature verified. Neural interface synchronized.");
        const btn = document.getElementById('biolink-btn');
        btn.classList.add('animate-pulse', 'text-red-500');
        setTimeout(() => btn.classList.remove('animate-pulse', 'text-red-500'), 2000);
    };

    document.getElementById('taskview-btn').onclick = () => {
        showNotification("Task View", "Switching to multi-dimensional workspace overview.");
        // Visual effect: zoom out windows?
        const desktop = document.getElementById('desktop');
        desktop.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        desktop.style.transform = 'scale(0.9) perspective(1000px) rotateX(5deg)';
        setTimeout(() => {
            desktop.style.transform = 'scale(1) rotateX(0)';
        }, 1000);
    };

    // Aura Input
    const auraInput = document.getElementById('aura-input');
    auraInput.onkeydown = (e) => {
        if (e.key === 'Enter' && auraInput.value.trim()) {
            addAuraMessage(auraInput.value);
            const userVal = auraInput.value.toLowerCase();
            auraInput.value = '';

            setTimeout(() => {
                let response = "I have analyzed your request. Processing temporal data...";
                if (userVal.includes('time')) response = "Current stardate is 19584. Temporal stability is holding at 99.9%.";
                if (userVal.includes('hello')) response = "Greetings. How may I optimize your workflow today?";
                if (userVal.includes('weather')) response = "Atmospheric conditions on Mars: Clear, -45°C. Earth: Hyper-storm in sector 4.";
                if (userVal.includes('shutdown')) response = "Power cycles are reserved for high-priority maintenance. Use the start menu for local termination.";
                addAuraMessage(response, true);
            }, 1000);
        }
    };

    // Time & Date in Taskbar
    const updateTaskbarTime = () => {
        const now = new Date();
        document.getElementById('taskbar-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('taskbar-date').textContent = now.toLocaleDateString([], { day: '2-digit', month: '2-digit' }) + '/19584';
    };
    updateTaskbarTime();
    setInterval(updateTaskbarTime, 1000);

    // Power off
    document.getElementById('power-btn').onclick = () => {
        osContainer.innerHTML = '';
        setTimeout(startLogin, 500);
    };

    // Context Menu
    document.getElementById('desktop').oncontextmenu = (e) => {
        e.preventDefault();
        showContextMenu(e.clientX, e.clientY, [
            { label: 'View', icon: 'eye' },
            { label: 'Sort by', icon: 'list-filter' },
            { label: 'Refresh', icon: 'refresh-cw', action: () => showNotification("System Refreshed", "Temporal cache cleared.") },
            { label: 'Temporal Rollback', icon: 'rotate-ccw', action: () => {
                showNotification("System Restore", "Initiating temporal rollback to previous stable state...");
                document.getElementById('desktop').style.filter = 'grayscale(1) brightness(0.5)';
                setTimeout(() => {
                    document.getElementById('desktop').style.filter = 'none';
                    showNotification("Restore Complete", "System restored to 19584-10-23 04:00.");
                }, 2000);
            }},
            { label: 'New', icon: 'plus' },
            { label: 'Personalize', icon: 'palette' },
            { label: 'Open Terminal', icon: 'terminal', action: () => showNotification("Access Denied", "Neural link required.") }
        ]);
    };

    document.onclick = () => {
        const menu = document.querySelector('.context-menu');
        if (menu) menu.remove();
    };

    // Random PnP Event
    setTimeout(() => {
        showNotification("Plug & Play", "New Quantum Drive detected. Driver 'Q-DRV-9000' installed successfully.");
    }, 15000);
}

function addAuraMessage(text, isAI = false) {
    const chat = document.getElementById('aura-chat');
    const msg = document.createElement('div');
    msg.className = isAI
        ? "bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 text-xs text-white/80 leading-relaxed"
        : "bg-purple-600/20 p-4 rounded-2xl rounded-tr-none border border-purple-500/20 text-xs text-white/80 leading-relaxed ml-8";
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function showNotification(title, text) {
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.innerHTML = `
        <div class="flex items-start space-x-4">
            <div class="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <i data-lucide="info" class="w-5 h-5"></i>
            </div>
            <div class="flex-1">
                <div class="text-xs font-bold text-white mb-1">${title}</div>
                <div class="text-[10px] text-white/60 leading-relaxed">${text}</div>
            </div>
        </div>
    `;
    document.getElementById('desktop').appendChild(toast);
    lucide.createIcons();
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

function showContextMenu(x, y, items) {
    const existing = document.querySelector('.context-menu');
    if (existing) existing.remove();

    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.left = `${x}px`;
    menu.style.top = `${y}px`;

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'context-menu-item';
        el.innerHTML = `
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            <span>${item.label}</span>
        `;
        el.onclick = (e) => {
            e.stopPropagation();
            if (item.action) item.action();
            menu.remove();
        };
        menu.appendChild(el);
    });

    document.getElementById('desktop').appendChild(menu);
    lucide.createIcons();
}

function openWindow(appId) {
    const existing = state.windows.find(w => w.id === appId);
    if (existing) {
        if (existing.isMinimized) {
            toggleMinimize(appId);
        } else {
            focusWindow(appId);
        }
        return;
    }

    const app = appDefinitions.find(a => a.id === appId);
    const winId = appId;
    const offset = state.windows.length * 30;
    const winState = {
        id: winId,
        x: 250 + offset,
        y: 100 + offset,
        width: 640,
        height: 440,
        isMinimized: false,
        isMaximized: false
    };
    state.windows.push(winState);

    const winEl = document.createElement('div');
    winEl.id = `window-${winId}`;
    winEl.className = 'window absolute bg-slate-900/90 backdrop-blur-3xl border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col pointer-events-auto transition-all duration-300';
    winEl.style.left = `${winState.x}px`;
    winEl.style.top = `${winState.y}px`;
    winEl.style.width = `${winState.width}px`;
    winEl.style.height = `${winState.height}px`;
    winEl.style.zIndex = 100;

    winEl.innerHTML = `
        <div class="window-header h-12 bg-white/5 flex items-center justify-between px-4 cursor-move border-b border-white/10">
            <div class="flex items-center space-x-3 text-blue-400 pointer-events-none">
                <i data-lucide="${app.icon}" class="w-5 h-5"></i>
                <span class="text-xs font-semibold tracking-widest uppercase">${app.name}</span>
            </div>
            <div class="flex items-center space-x-1">
                <button class="minimize-btn w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer text-white/60 transition-colors">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                </button>
                <button class="maximize-btn w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 cursor-pointer text-white/60 transition-colors">
                    <i data-lucide="maximize-2" class="w-4 h-4"></i>
                </button>
                <button class="close-btn w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-500/80 cursor-pointer text-white/60 hover:text-white transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
        <div class="window-content flex-1 p-6 text-white overflow-auto custom-scrollbar">
            <!-- Content will be injected here -->
        </div>
        <div class="resize-handle"></div>
    `;

    document.getElementById('windows-layer').appendChild(winEl);
    lucide.createIcons();

    // Inject content
    renderWindowContent(winId);

    // Event Listeners
    winEl.onmousedown = () => focusWindow(winId);

    const header = winEl.querySelector('.window-header');
    header.onmousedown = (e) => {
        if (winState.isMaximized) return;
        startDrag(e, winId);
    };

    const stopProps = (e) => e.stopPropagation();

    const closeBtn = winEl.querySelector('.close-btn');
    closeBtn.onmousedown = stopProps;
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeWindow(winId);
    };

    const maxBtn = winEl.querySelector('.maximize-btn');
    maxBtn.onmousedown = stopProps;
    maxBtn.onclick = (e) => {
        e.stopPropagation();
        toggleMaximize(winId);
    };

    maxBtn.onmouseenter = () => showSnapLayouts(winId, maxBtn);
    maxBtn.onmouseleave = (e) => {
        const menu = document.querySelector('.snap-layouts-menu');
        if (menu && !menu.contains(e.relatedTarget)) {
            menu.remove();
        }
    };

    const minBtn = winEl.querySelector('.minimize-btn');
    minBtn.onmousedown = stopProps;
    minBtn.onclick = (e) => {
        e.stopPropagation();
        toggleMinimize(winId);
    };

    const resizeHandle = winEl.querySelector('.resize-handle');
    resizeHandle.onmousedown = (e) => {
        e.stopPropagation();
        if (winState.isMaximized) return;
        startResize(e, winId);
    };

    updateTaskbarApps();
    focusWindow(winId);
}

function closeWindow(id) {
    const winEl = document.getElementById(`window-${id}`);
    if (winEl) {
        winEl.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            winEl.remove();
            state.windows = state.windows.filter(w => w.id !== id);
            updateTaskbarApps();
        }, 300);
    }
}

function toggleMaximize(id) {
    const win = state.windows.find(w => w.id === id);
    const winEl = document.getElementById(`window-${id}`);
    if (!win || !winEl) return;

    win.isMaximized = !win.isMaximized;
    winEl.classList.remove('snap-left', 'snap-right');

    if (win.isMaximized) {
        winEl.classList.add('maximized');
        winEl.querySelector('.maximize-btn i').setAttribute('data-lucide', 'minimize-2');
    } else {
        winEl.classList.remove('maximized');
        winEl.querySelector('.maximize-btn i').setAttribute('data-lucide', 'maximize-2');
    }
    lucide.createIcons();
}

function snapWindow(id, side) {
    const win = state.windows.find(w => w.id === id);
    const winEl = document.getElementById(`window-${id}`);
    if (!win || !winEl) return;

    win.isMaximized = false;
    winEl.classList.remove('maximized', 'snap-left', 'snap-right');
    winEl.classList.add(`snap-${side}`);
    winEl.querySelector('.maximize-btn i').setAttribute('data-lucide', 'maximize-2');
    lucide.createIcons();
}

function showSnapLayouts(id, btn) {
    const rect = btn.getBoundingClientRect();
    const menu = document.createElement('div');
    menu.className = 'snap-layouts-menu fixed z-[1000] glass p-2 rounded-xl border border-white/10 flex space-x-2 shadow-2xl';
    menu.style.top = `${rect.bottom + 10}px`;
    menu.style.left = `${rect.left - 40}px`;

    menu.innerHTML = `
        <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer flex" id="snap-l">
            <div class="w-1/2 h-full bg-blue-500/20 border-r border-blue-500/30"></div>
        </div>
        <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer flex" id="snap-r">
            <div class="w-1/2 h-full ml-auto bg-blue-500/20 border-l border-blue-500/30"></div>
        </div>
    `;

    document.body.appendChild(menu);

    const preview = document.getElementById('snap-preview');

    menu.querySelector('#snap-l').onmouseenter = () => {
        preview.style.opacity = '1';
        preview.style.left = '0';
        preview.style.top = '0';
        preview.style.width = '50vw';
        preview.style.height = 'calc(100vh - 72px)';
    };
    menu.querySelector('#snap-r').onmouseenter = () => {
        preview.style.opacity = '1';
        preview.style.left = '50vw';
        preview.style.top = '0';
        preview.style.width = '50vw';
        preview.style.height = 'calc(100vh - 72px)';
    };
    menu.onmouseleave = () => {
        preview.style.opacity = '0';
        menu.remove();
    };

    menu.querySelector('#snap-l').onclick = () => {
        snapWindow(id, 'left');
        menu.remove();
        preview.style.opacity = '0';
    };
    menu.querySelector('#snap-r').onclick = () => {
        snapWindow(id, 'right');
        menu.remove();
        preview.style.opacity = '0';
    };
}

function toggleMinimize(id) {
    const win = state.windows.find(w => w.id === id);
    const winEl = document.getElementById(`window-${id}`);
    if (!win || !winEl) return;

    win.isMinimized = !win.isMinimized;
    if (win.isMinimized) {
        winEl.classList.add('minimized');
        state.focusedWindowId = null;
    } else {
        winEl.classList.remove('minimized');
        focusWindow(id);
    }
    updateTaskbarApps();
}

function focusWindow(id) {
    const win = state.windows.find(w => w.id === id);
    if (win && win.isMinimized) {
        toggleMinimize(id);
        return;
    }

    state.focusedWindowId = id;
    document.querySelectorAll('.window').forEach(el => {
        el.style.zIndex = 30;
        el.classList.add('border-blue-500/10');
        el.classList.remove('border-blue-500/40', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]');
    });

    const winEl = document.getElementById(`window-${id}`);
    if (winEl) {
        winEl.style.zIndex = 100;
        winEl.classList.remove('border-blue-500/10');
        winEl.classList.add('border-blue-500/40', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]');
    }
    updateTaskbarApps();
}

let dragData = null;
let resizeData = null;

function startDrag(e, id) {
    const winEl = document.getElementById(`window-${id}`);
    winEl.classList.add('interacting');
    dragData = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        initialX: parseInt(winEl.style.left),
        initialY: parseInt(winEl.style.top)
    };

    document.onmousemove = doInteraction;
    document.onmouseup = stopInteraction;
}

function startResize(e, id) {
    const winEl = document.getElementById(`window-${id}`);
    winEl.classList.add('interacting');
    resizeData = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        initialWidth: parseInt(winEl.style.width),
        initialHeight: parseInt(winEl.style.height)
    };

    document.onmousemove = doInteraction;
    document.onmouseup = stopInteraction;
}

function doInteraction(e) {
    if (dragData) {
        const win = state.windows.find(w => w.id === dragData.id);
        const winEl = document.getElementById(`window-${dragData.id}`);
        const dx = e.clientX - dragData.startX;
        const dy = e.clientY - dragData.startY;

        win.x = dragData.initialX + dx;
        win.y = dragData.initialY + dy;
        winEl.style.left = `${win.x}px`;
        winEl.style.top = `${win.y}px`;
    }

    if (resizeData) {
        const win = state.windows.find(w => w.id === resizeData.id);
        const winEl = document.getElementById(`window-${resizeData.id}`);
        const dx = e.clientX - resizeData.startX;
        const dy = e.clientY - resizeData.startY;

        win.width = Math.max(300, resizeData.initialWidth + dx);
        win.height = Math.max(200, resizeData.initialHeight + dy);
        winEl.style.width = `${win.width}px`;
        winEl.style.height = `${win.height}px`;
    }
}

function stopInteraction() {
    if (dragData) {
        const winEl = document.getElementById(`window-${dragData.id}`);
        if (winEl) winEl.classList.remove('interacting');
    }
    if (resizeData) {
        const winEl = document.getElementById(`window-${resizeData.id}`);
        if (winEl) winEl.classList.remove('interacting');
    }
    dragData = null;
    resizeData = null;
    document.onmousemove = null;
    document.onmouseup = null;
}

function updateTaskbarApps() {
    const container = document.getElementById('taskbar-apps');
    container.innerHTML = '';

    state.windows.forEach(win => {
        const app = appDefinitions.find(a => a.id === win.id);
        const item = document.createElement('button');
        const isFocused = state.focusedWindowId === win.id;
        item.className = `h-11 px-4 flex items-center space-x-3 rounded-xl transition-all cursor-pointer border outline-none ${isFocused ? 'bg-blue-600/20 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`;
        item.innerHTML = `
            <div class="text-blue-400 pointer-events-none"><i data-lucide="${app.icon}" class="w-5 h-5"></i></div>
            <div class="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_#3b82f6] pointer-events-none"></div>
        `;
        item.onclick = () => {
            if (isFocused) {
                toggleMinimize(win.id);
            } else {
                focusWindow(win.id);
            }
        };

        item.onmouseenter = () => {
            document.querySelectorAll('.window').forEach(w => {
                if (w.id !== `window-${win.id}`) w.style.opacity = '0.2';
            });
        };
        item.onmouseleave = () => {
            document.querySelectorAll('.window').forEach(w => {
                w.style.opacity = '1';
            });
        };

        container.appendChild(item);
    });
    lucide.createIcons();
}

function renderWindowContent(id) {
    const container = document.querySelector(`#window-${id} .window-content`);
    if (!container) return;

    switch(id) {
        case 'holopad':
            container.innerHTML = `
                <div class="flex flex-col h-full">
                    <div class="flex space-x-4 mb-4 text-[10px] uppercase tracking-widest text-blue-400/60 border-b border-blue-500/20 pb-2">
                        <span>File</span><span>Edit</span><span>Format</span><span>View</span>
                    </div>
                    <textarea class="flex-1 bg-transparent border-none outline-none text-blue-100 resize-none font-mono text-sm leading-relaxed" placeholder="Type your thoughts across dimensions...">LOG START: STARDATE 19584.23\n--------------------------\nEverything is proceeding as planned in the 4th quadrant.\nTemporal stability at 98.4%.\nNo anomalies detected in the local cluster.</textarea>
                </div>
            `;
            break;
        case 'calc':
            container.innerHTML = `
                <div class="flex flex-col h-full">
                    <div id="calc-display" class="bg-blue-950/40 p-6 rounded-lg mb-4 text-right text-3xl font-mono text-blue-300 border border-blue-500/20 shadow-inner">0</div>
                    <div class="grid grid-cols-4 gap-3 flex-1" id="calc-buttons"></div>
                </div>
            `;
            const btns = [7,8,9,'/',4,5,6,'*',1,2,3,'-','C',0,'=','+'];
            const btnContainer = container.querySelector('#calc-buttons');
            btns.forEach(btn => {
                const b = document.createElement('button');
                b.className = `p-4 rounded-lg transition-all font-mono text-lg ${typeof btn === 'number' ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-white/5' : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/20'}`;
                b.textContent = btn;
                b.onclick = () => handleCalc(btn);
                btnContainer.appendChild(b);
            });
            break;
        case 'galaxy':
            container.innerHTML = `
                <div class="flex flex-col h-full -m-6">
                    <div class="flex items-center space-x-3 bg-white/5 p-3 rounded-t-xl border-b border-white/10">
                        <div class="flex space-x-1.5">
                            <div class="w-3 h-3 rounded-full bg-red-500/40"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500/40"></div>
                        </div>
                        <div class="flex-1 mx-4 bg-black/60 rounded-full px-4 py-1.5 text-[10px] text-blue-300/60 tracking-wider flex justify-between items-center border border-blue-500/20">
                            <span>HTTPS://UNIVERSAL-NET.HUB/NEXUS</span>
                            <i data-lucide="search" class="w-3 h-3"></i>
                        </div>
                    </div>
                    <div class="flex-1 bg-gradient-to-b from-blue-900/10 to-transparent p-8 flex flex-col items-center justify-center text-center">
                        <div class="mb-8 animate-spin-slow">
                            <i data-lucide="globe" class="w-24 h-24 text-blue-500/50"></i>
                        </div>
                        <h2 class="text-4xl font-light text-white mb-4 tracking-[0.2em] uppercase">Nexus Universal</h2>
                        <p class="text-white/40 max-w-md text-xs leading-loose uppercase tracking-widest">Connect to any node in the local supercluster. Instant latency via entanglement protocol.</p>
                        <div class="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest hover:border-blue-500/40">Neural Net</div>
                            <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest hover:border-blue-500/40">Star Maps</div>
                            <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest hover:border-blue-500/40">Time Market</div>
                            <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest hover:border-blue-500/40">Void News</div>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            break;
        case 'explorer':
            container.innerHTML = `
                <div class="flex flex-col h-full -m-6">
                    <div class="flex items-center space-x-4 bg-white/5 p-4 border-b border-white/10">
                        <div class="flex space-x-2">
                            <button class="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
                            <button class="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><i data-lucide="arrow-right" class="w-4 h-4"></i></button>
                        </div>
                        <div class="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] text-white/60 flex items-center space-x-2">
                            <i data-lucide="folder" class="w-3 h-3"></i>
                            <span>This Quantum Computer > Neural Vault > Documents</span>
                        </div>
                        <div class="w-48 bg-black/40 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] text-white/40 flex items-center justify-between">
                            <span>Search Documents</span>
                            <i data-lucide="search" class="w-3 h-3"></i>
                        </div>
                    </div>
                    <div class="flex flex-1 overflow-hidden">
                        <div class="w-48 border-r border-white/10 p-4 space-y-2 overflow-auto custom-scrollbar">
                            <div class="text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Favorites</div>
                            <div class="flex items-center space-x-3 p-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs cursor-pointer"><i data-lucide="star" class="w-4 h-4"></i><span>Quick Access</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="clock" class="w-4 h-4"></i><span>Recent</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="download" class="w-4 h-4"></i><span>Downloads</span></div>
                            <div class="mt-8 text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Libraries</div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="image" class="w-4 h-4"></i><span>Holo-Grams</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="music" class="w-4 h-4"></i><span>Neural-Audio</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="video" class="w-4 h-4"></i><span>Temporal-Vids</span></div>
                        </div>
                        <div class="flex-1 p-8 grid grid-cols-4 content-start gap-8 overflow-auto custom-scrollbar" id="explorer-files">
                            <!-- Files -->
                        </div>
                    </div>
                </div>
            `;
            const files = [
                { name: 'Quantum_Physics_Final_Project_Revised_v42.holo', icon: 'file-text', color: 'text-blue-400' },
                { name: 'Stargate_Coordinates_Sector_7G.map', icon: 'map', color: 'text-green-400' },
                { name: 'Grand_Canyon_Mars_Vacation_2104.pic', icon: 'image', color: 'text-purple-400' },
                { name: 'Encrypted_Neural_Key.vault', icon: 'lock', color: 'text-red-400' },
                { name: 'Legacy_Windows_11_Simulator_Source.zip', icon: 'archive', color: 'text-yellow-400' },
                { name: 'Universal_Universal_Universal_Universal_Long_Filename_Test.txt', icon: 'file', color: 'text-white/40' }
            ];
            const fileContainer = container.querySelector('#explorer-files');
            files.forEach(file => {
                const div = document.createElement('div');
                div.className = 'flex flex-col items-center space-y-2 group cursor-pointer text-center';
                div.innerHTML = `
                    <div class="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/40 group-hover:bg-blue-600/10 transition-all ${file.color}">
                        <i data-lucide="${file.icon}" class="w-10 h-10"></i>
                    </div>
                    <span class="text-[10px] text-white/60 group-hover:text-white truncate w-24">${file.name}</span>
                `;
                div.onclick = () => showNotification("File Opened", `Successfully synchronized ${file.name} with neural link.`);
                fileContainer.appendChild(div);
            });
            lucide.createIcons();
            break;
        case 'holomaker':
            container.innerHTML = `
                <div class="flex flex-col h-full space-y-4">
                    <div class="h-48 bg-black/60 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                        <div class="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                        <i data-lucide="play" class="w-12 h-12 text-white/20"></i>
                        <div class="absolute bottom-4 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div class="h-full bg-purple-500 w-1/3"></div>
                        </div>
                    </div>
                    <div class="flex-1 grid grid-cols-2 gap-4">
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 cursor-pointer transition-all">
                            <div class="text-xs font-bold mb-1 uppercase tracking-widest text-purple-400">Generative Erase</div>
                            <p class="text-[10px] text-white/40">Remove temporal anomalies from your holos.</p>
                        </div>
                        <div class="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 cursor-pointer transition-all">
                            <div class="text-xs font-bold mb-1 uppercase tracking-widest text-blue-400">Neural Sync</div>
                            <p class="text-[10px] text-white/40">Overlay neural imprints on the timeline.</p>
                        </div>
                    </div>
                    <div class="p-4 border-t border-white/5 flex items-center justify-between">
                        <div class="flex space-x-2">
                            <i data-lucide="video" class="w-4 h-4 text-white/40"></i>
                            <span class="text-[10px] text-white/40 uppercase tracking-widest">Temporal-Stream-01.hvx</span>
                        </div>
                        <button class="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-[10px] uppercase tracking-widest text-white transition-all">Render</button>
                    </div>
                </div>
            `;
            lucide.createIcons();
            break;
        case 'legacy':
            container.innerHTML = `
                <div class="flex flex-col h-full -m-6 bg-[#c0c0c0] text-black font-sans p-1 border-2 border-white shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#ffffff]">
                    <div class="bg-[#000080] p-1 flex justify-between items-center text-white font-bold text-xs">
                        <div class="flex items-center space-x-1"><i data-lucide="globe" class="w-3 h-3"></i><span>Internet Explorer 584</span></div>
                    </div>
                    <div class="flex-1 bg-white border-2 border-[#808080] m-1 p-4 space-y-4 overflow-auto text-sm">
                        <div class="flex items-center space-x-4 border-b pb-2">
                            <i data-lucide="user-plus" class="w-8 h-8 text-blue-800"></i>
                            <div>
                                <h3 class="font-bold">NetMeeting v19.5</h3>
                                <p class="text-[10px]">Connected to: 127.0.0.1 (Quantum Loopback)</p>
                            </div>
                        </div>
                        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded">
                            <h4 class="font-bold mb-2">Welcome to the Universal-Net</h4>
                            <p class="text-xs">Your connection is shared via Internet Connection Sharing (ICS). Multi-monitor support is active.</p>
                        </div>
                        <div class="space-y-2">
                            <p class="font-bold">Retro Search:</p>
                            <div class="flex space-x-2">
                                <input type="text" class="border p-1 flex-1 text-xs" value="altavista.com">
                                <button class="bg-[#c0c0c0] border-2 border-white shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#ffffff] px-4 text-xs">Go</button>
                            </div>
                        </div>
                        <div class="flex justify-center p-10">
                            <i data-lucide="construction" class="w-12 h-12 text-yellow-600"></i>
                        </div>
                        <p class="text-center text-[10px] text-gray-500 italic">"It's like the 1990s, but with more qubits."</p>
                    </div>
                </div>
            `;
            lucide.createIcons();
            break;
        case 'system':
            container.innerHTML = `
                <div class="space-y-8">
                    <div class="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                        <div class="flex items-center space-x-5">
                            <div class="p-3 bg-blue-500/10 rounded-xl"><i data-lucide="cpu" class="text-blue-400 w-6 h-6"></i></div>
                            <div>
                                <div class="text-xs font-semibold tracking-widest uppercase mb-1">Neuro-Processor</div>
                                <div class="text-[10px] text-white/40 uppercase">Load: 14.2% | Temp: 32.1 K</div>
                            </div>
                        </div>
                        <div class="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_100px_#3b82f6]" style="width: 14.2%"></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center group hover:bg-blue-500/20 transition-all">
                            <div class="text-[10px] text-blue-400 uppercase tracking-[0.3em] mb-3">System Health</div>
                            <div class="text-2xl font-light tracking-widest text-blue-100">OPTIMAL</div>
                        </div>
                        <div class="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 text-center group hover:bg-green-500/20 transition-all">
                            <div class="text-[10px] text-green-400 uppercase tracking-[0.3em] mb-3">Temporal Sync</div>
                            <div class="text-2xl font-light tracking-widest text-green-100">LOCKED</div>
                        </div>
                    </div>
                </div>
            `;
            lucide.createIcons();
            break;
    }
}

function handleCalc(val) {
    const display = document.getElementById('calc-display');
    if (!display) return;

    if (val === 'C') state.calcValue = '0';
    else if (val === '=') {
        try {
            // eslint-disable-next-line no-eval
            state.calcValue = eval(state.calcValue).toString();
        } catch {
            state.calcValue = 'Error';
        }
    }
    else {
        state.calcValue = state.calcValue === '0' ? val.toString() : state.calcValue + val;
    }
    display.textContent = state.calcValue;
}

function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    const btn = document.getElementById('start-btn');
    state.isStartOpen = !state.isStartOpen;

    if (state.isStartOpen) {
        menu.classList.remove('hidden');
        setTimeout(() => {
            menu.classList.remove('translate-y-10', 'opacity-0');
        }, 10);
        btn.classList.add('bg-blue-600/30', 'border-blue-500/50');
    } else {
        menu.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 300);
        btn.classList.remove('bg-blue-600/30', 'border-blue-500/50');
    }
}

// Initial call
startBIOS();
