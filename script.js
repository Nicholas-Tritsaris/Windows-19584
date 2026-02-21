// Windows 19584 - Vanilla JS Version
// (C) 19584 Quantum Dynamics Inc.

const osContainer = document.getElementById('os-container');

// State Management
const state = {
    stage: 'bios', // bios, boot, login, desktop
    windows: [],
    focusedWindowId: null,
    currentDesktop: 0,
    desktops: [
        { id: 0, name: 'Main Node' },
        { id: 1, name: 'Dev Node' }
    ],
    isStartOpen: false,
    isWidgetsOpen: false,
    isQuickSettingsOpen: false,
    isNotificationsOpen: false,
    isAuraOpen: false,
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

            <!-- Widgets Board -->
            <div id="widgets-board" class="fixed bottom-20 left-4 w-[420px] h-[calc(100vh-120px)] glass-mica rounded-3xl z-[60] p-8 shadow-2xl hidden flex-col animate-in slide-in-from-left-4">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-blue-500/20 rounded-lg text-blue-400"><i data-lucide="layout-grid" class="w-5 h-5"></i></div>
                        <span class="text-lg font-semibold tracking-widest uppercase">Widgets</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <i data-lucide="user" class="w-5 h-5 opacity-60"></i>
                        </div>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between h-40 group hover:bg-white/10 transition-all">
                            <div class="flex justify-between items-start text-blue-400">
                                <i data-lucide="sun" class="w-6 h-6"></i>
                                <span class="text-xl font-bold">24°</span>
                            </div>
                            <div>
                                <div class="text-[10px] opacity-40 uppercase tracking-widest">Tokyo</div>
                                <div class="text-sm font-medium">Mostly Clear</div>
                            </div>
                        </div>
                        <div class="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between h-40 group hover:bg-white/10 transition-all">
                            <div class="text-emerald-400"><i data-lucide="trending-up" class="w-6 h-6"></i></div>
                            <div>
                                <div class="text-[10px] opacity-40 uppercase tracking-widest">Q-NET</div>
                                <div class="text-sm font-bold">4.2M <span class="text-emerald-400 text-[10px]">+1.2%</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                        <div class="text-[10px] opacity-40 uppercase tracking-widest">Top Stories</div>
                        <div class="space-y-3">
                            <div class="flex gap-3 cursor-pointer group">
                                <div class="w-16 h-16 rounded-xl bg-slate-800 flex-shrink-0"></div>
                                <div class="text-xs font-medium group-hover:text-blue-400 transition-colors line-clamp-2">First successful human teleportation across the Lunar Gate reported.</div>
                            </div>
                            <div class="flex gap-3 cursor-pointer group">
                                <div class="w-16 h-16 rounded-xl bg-slate-800 flex-shrink-0"></div>
                                <div class="text-xs font-medium group-hover:text-blue-400 transition-colors line-clamp-2">Mars Rovers uncover ancient data cache from the 21st century.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Start Menu -->
            <div id="start-menu" class="fixed bottom-20 left-1/2 -translate-x-1/2 w-[640px] h-[720px] glass-mica rounded-3xl z-[60] p-8 shadow-2xl hidden flex-col animate-in slide-in-from-bottom-4">
                <div class="flex gap-8 h-full">
                    <!-- Main Start Area -->
                    <div class="flex-1 flex flex-col">
                        <div class="relative mb-8">
                            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"></i>
                            <input type="text" placeholder="Search apps, settings, and documents" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500/40 transition-all">
                        </div>

                        <div class="flex items-center justify-between mb-4 px-2">
                            <span class="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">Pinned Apps</span>
                            <button class="text-[10px] px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors uppercase tracking-widest">All Apps</button>
                        </div>
                        <div id="start-apps" class="grid grid-cols-4 gap-4 mb-10">
                            <!-- Injected -->
                        </div>

                        <div class="mt-auto">
                            <span class="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-4 block px-2">Recommended</span>
                            <div class="grid grid-cols-2 gap-4" id="start-recommended">
                                <div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all">
                                    <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><i data-lucide="file-text" class="w-5 h-5"></i></div>
                                    <div>
                                        <div class="text-xs font-medium">Quantum_Log.txt</div>
                                        <div class="text-[9px] opacity-40 uppercase">2 hours ago</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all">
                                    <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400"><i data-lucide="image" class="w-5 h-5"></i></div>
                                    <div>
                                        <div class="text-xs font-medium">Nebula_Render.png</div>
                                        <div class="text-[9px] opacity-40 uppercase">Yesterday</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Side Tiles (Live Tiles style) -->
                    <div class="w-56 space-y-4">
                        <span class="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] block px-2">Quick Access</span>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="aspect-square bg-blue-600/40 rounded-2xl p-4 flex flex-col justify-between group hover:brightness-110 cursor-pointer">
                                <i data-lucide="mail" class="w-6 h-6"></i>
                                <span class="text-[10px] font-bold">12</span>
                            </div>
                            <div class="aspect-square bg-amber-600/40 rounded-2xl p-4 flex flex-col justify-between group hover:brightness-110 cursor-pointer">
                                <i data-lucide="calendar" class="w-6 h-6"></i>
                                <span class="text-[10px] font-bold">21</span>
                            </div>
                            <div class="col-span-2 h-24 bg-purple-600/40 rounded-2xl p-4 flex flex-col justify-between group hover:brightness-110 cursor-pointer relative overflow-hidden">
                                <div class="z-10 flex justify-between items-center">
                                    <span class="text-[10px] font-bold tracking-widest uppercase">Music</span>
                                    <i data-lucide="play" class="w-4 h-4"></i>
                                </div>
                                <div class="z-10 text-xs font-medium truncate">Hyper-Space Beats</div>
                                <div class="absolute bottom-[-10%] right-[-10%] opacity-20"><i data-lucide="music" class="w-16 h-16"></i></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </div>
                        <span class="text-sm font-medium tracking-widest uppercase">Traveler</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="p-2 hover:bg-white/10 rounded-xl text-white/60"><i data-lucide="settings" class="w-5 h-5"></i></button>
                        <button id="power-btn" class="p-2 hover:bg-red-500/20 rounded-xl text-red-500"><i data-lucide="power" class="w-5 h-5"></i></button>
                    </div>
                </div>
            </div>

            <!-- Quick Settings -->
            <div id="quick-settings" class="fixed bottom-20 right-4 w-[360px] glass-mica rounded-3xl z-[60] p-6 shadow-2xl hidden flex-col animate-in slide-in-from-right-4">
                <div class="grid grid-cols-3 gap-3 mb-6">
                    <button class="qs-tile active flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 rounded-2xl">
                        <i data-lucide="wifi" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">Wi-Fi</span>
                    </button>
                    <button class="qs-tile flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10">
                        <i data-lucide="bluetooth" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">BT</span>
                    </button>
                    <button class="qs-tile flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10">
                        <i data-lucide="moon" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">Focus</span>
                    </button>
                    <button class="qs-tile flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10">
                        <i data-lucide="plane" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">Flight</span>
                    </button>
                    <button class="qs-tile flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10">
                        <i data-lucide="eye-off" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">Eye Care</span>
                    </button>
                    <button class="qs-tile flex flex-col items-center justify-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10">
                        <i data-lucide="cast" class="w-5 h-5"></i>
                        <span class="text-[9px] font-bold uppercase">Cast</span>
                    </button>
                </div>

                <div class="space-y-4 mb-6">
                    <div class="flex items-center gap-4">
                        <i data-lucide="sun" class="w-4 h-4 opacity-40"></i>
                        <input type="range" class="flex-1 accent-blue-500 h-1 rounded-full cursor-pointer" value="85">
                    </div>
                    <div class="flex items-center gap-4">
                        <i data-lucide="volume-2" class="w-4 h-4 opacity-40"></i>
                        <input type="range" class="flex-1 accent-blue-500 h-1 rounded-full cursor-pointer" value="60">
                    </div>
                </div>

                <!-- Media Player -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-purple-400">
                        <i data-lucide="music" class="w-6 h-6"></i>
                    </div>
                    <div class="flex-1 overflow-hidden">
                        <div class="text-xs font-bold truncate">Across the Multiverse</div>
                        <div class="text-[10px] opacity-40 truncate">Lofi-Dimension Radio</div>
                    </div>
                    <div class="flex gap-2">
                        <button class="p-1 hover:text-blue-400"><i data-lucide="play" class="w-4 h-4"></i></button>
                        <button class="p-1 hover:text-blue-400"><i data-lucide="skip-forward" class="w-4 h-4"></i></button>
                    </div>
                </div>
            </div>

            <!-- Notification Center -->
            <div id="notification-center" class="fixed bottom-20 right-4 w-[380px] h-[calc(100vh-400px)] glass-mica rounded-3xl z-[60] p-8 shadow-2xl hidden flex-col animate-in slide-in-from-right-4">
                <div class="flex items-center justify-between mb-8">
                    <span class="text-xs font-bold opacity-40 uppercase tracking-widest">Notifications</span>
                    <button class="text-[10px] text-blue-400 hover:underline">Clear all</button>
                </div>
                <div class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Security</span>
                            <span class="text-[9px] opacity-30">Just now</span>
                        </div>
                        <p class="text-xs leading-relaxed">Neural firewall updated to version 8.2.1. Protection active.</p>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Aura AI</span>
                            <span class="text-[9px] opacity-30">12m ago</span>
                        </div>
                        <p class="text-xs leading-relaxed">I've optimized your quantum core frequency for the current task.</p>
                    </div>
                </div>
            </div>

            <!-- Taskbar -->
            <div id="taskbar" class="fixed bottom-0 left-0 right-0 h-16 bg-slate-950/40 backdrop-blur-3xl border-t border-white/5 flex items-center justify-between px-6 z-[100]">
                <div class="flex items-center gap-2">
                    <button id="widgets-btn" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group" title="Widgets">
                        <i data-lucide="layout-grid" class="w-5 h-5 text-white/40 group-hover:text-blue-400"></i>
                    </button>
                </div>

                <div class="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    <button id="start-btn" aria-label="Start" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group active:scale-90">
                        <i data-lucide="layout-grid" class="w-5 h-5 text-blue-400 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]"></i>
                    </button>
                    <button id="taskview-btn" class="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90" title="Task View">
                        <i data-lucide="layers" class="w-5 h-5 text-emerald-400"></i>
                    </button>
                    <button id="recall-btn" class="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90" title="Recall AI">
                        <i data-lucide="history" class="w-5 h-5 text-amber-400"></i>
                    </button>
                    <div class="w-px h-6 bg-white/10 mx-1.5"></div>
                    <div id="taskbar-apps" class="flex items-center gap-1.5">
                        <!-- Pinned apps injected by JS -->
                    </div>
                </div>

                <div class="flex items-center gap-3">
                    <button id="aura-btn" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group relative" title="Aura AI">
                        <i data-lucide="sparkles" class="w-5 h-5 text-purple-400 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"></i>
                    </button>

                    <div class="flex items-center bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <button id="qs-btn" class="flex items-center gap-3 px-3 py-2 border-r border-white/5 rounded-l-xl">
                            <i data-lucide="wifi" class="w-4 h-4 opacity-40"></i>
                            <i data-lucide="volume-2" class="w-4 h-4 opacity-40"></i>
                            <i data-lucide="battery" class="w-4 h-4 text-emerald-400"></i>
                        </button>
                        <button id="notif-btn" class="flex flex-col items-end px-4 py-1.5 rounded-r-xl">
                            <span id="taskbar-time" class="text-xs font-bold text-white/90">00:00</span>
                            <span id="taskbar-date" class="text-[9px] opacity-40 font-medium">00/00/19584</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Recall Panel -->
            <div id="recall-panel" class="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-3xl hidden flex-col p-12 animate-in fade-in">
                <div class="flex items-center justify-between mb-12">
                    <div class="flex items-center gap-4">
                        <div class="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                            <i data-lucide="history" class="w-8 h-8"></i>
                        </div>
                        <div>
                            <h2 class="text-3xl font-light tracking-[0.2em] uppercase">Recall AI</h2>
                            <p class="text-[10px] text-amber-400/60 uppercase tracking-widest">Temporal Activity Timeline</p>
                        </div>
                    </div>
                    <button id="close-recall" class="p-4 hover:bg-white/10 rounded-full transition-all active:scale-90"><i data-lucide="x" class="w-8 h-8 text-white/40"></i></button>
                </div>
                <div class="flex-1 flex gap-12 overflow-hidden">
                    <div class="w-64 border-r border-white/10 pr-8 space-y-8">
                        <div>
                            <div class="text-amber-400 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Timeline</div>
                            <div class="space-y-4">
                                <div class="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-bold uppercase tracking-widest text-amber-200">Today</div>
                                <div class="p-4 hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer transition-all">Yesterday</div>
                                <div class="p-4 hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer transition-all">Oct 22, 19584</div>
                                <div class="p-4 hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-widest text-white/40 cursor-pointer transition-all">Oct 21, 19584</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="relative mb-10">
                            <i data-lucide="search" class="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20"></i>
                            <input type="text" placeholder="Search your past activities..." class="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg outline-none focus:border-amber-500/40 transition-all font-light tracking-wide">
                        </div>
                        <div class="flex-1 overflow-x-auto pb-12 custom-scrollbar flex gap-10 items-start" id="recall-snapshots">
                            <!-- Snapshots injected -->
                        </div>
                    </div>
                </div>
            </div>

            <!-- Aura Sidebar (existing but integrated) -->
            <div id="aura-sidebar" class="fixed top-4 right-4 bottom-20 w-96 glass-mica rounded-3xl z-[55] translate-x-[450px] transition-transform duration-500 flex flex-col overflow-hidden shadow-2xl">
                <div class="p-8 border-b border-white/5 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-purple-500/20 rounded-lg text-purple-400"><i data-lucide="sparkles" class="w-5 h-5"></i></div>
                        <span class="text-sm font-bold tracking-widest uppercase">Aura AI</span>
                    </div>
                    <button id="close-aura" class="p-2 hover:bg-white/5 rounded-full opacity-40 hover:opacity-100 transition-opacity"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>
                <div id="aura-chat" class="flex-1 p-8 overflow-auto custom-scrollbar space-y-6">
                    <div class="bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/5 text-xs text-white/80 leading-relaxed shadow-sm">
                        Greetings, Traveler. I am Aura. How can I assist your temporal journey today?
                    </div>
                </div>
                <div class="p-6 bg-black/20 border-t border-white/5">
                    <input type="text" id="aura-input" placeholder="Ask Aura anything..." class="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white outline-none focus:border-purple-500/40 transition-all">
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
            <span class="mt-3 text-[9px] font-bold text-white/50 text-center uppercase tracking-[0.2em] group-hover:text-white transition-colors pointer-events-none">${app.name}</span>
        `;
        icon.onclick = () => openWindow(app.id);
        iconContainer.appendChild(icon);

        // Start App
        const startApp = document.createElement('button');
        startApp.setAttribute('aria-label', `Start ${app.name}`);
        startApp.className = 'flex flex-col items-center p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5 outline-none';
        startApp.innerHTML = `
            <div class="text-blue-400 mb-2 group-hover:scale-110 transition-all pointer-events-none">
                <i data-lucide="${app.icon}" class="w-6 h-6"></i>
            </div>
            <span class="text-[9px] text-white/60 uppercase tracking-widest group-hover:text-white transition-colors text-center pointer-events-none">${app.name}</span>
        `;
        startApp.onclick = () => {
            openWindow(app.id);
            closeAllMenus();
        };
        startAppsContainer.appendChild(startApp);
    });

    lucide.createIcons();

    // Start Button
    document.getElementById('start-btn').onclick = (e) => {
        e.stopPropagation();
        toggleMenu('start');
    };

    // Widgets Button
    document.getElementById('widgets-btn').onclick = (e) => {
        e.stopPropagation();
        toggleMenu('widgets');
    };

    // Quick Settings Button
    document.getElementById('qs-btn').onclick = (e) => {
        e.stopPropagation();
        toggleMenu('qs');
    };

    // Notifications Button
    document.getElementById('notif-btn').onclick = (e) => {
        e.stopPropagation();
        toggleMenu('notif');
    };

    // Aura Button
    const auraBtn = document.getElementById('aura-btn');
    const auraSidebar = document.getElementById('aura-sidebar');
    auraBtn.onclick = (e) => {
        e.stopPropagation();
        state.isAuraOpen = !state.isAuraOpen;
        if (state.isAuraOpen) {
            auraSidebar.classList.remove('translate-x-[450px]');
            auraBtn.classList.add('bg-purple-600/20', 'border-purple-500/30');
        } else {
            auraSidebar.classList.add('translate-x-[450px]');
            auraBtn.classList.remove('bg-purple-600/20', 'border-purple-500/30');
        }
    };
    document.getElementById('close-aura').onclick = () => {
        state.isAuraOpen = false;
        auraSidebar.classList.add('translate-x-[450px]');
        auraBtn.classList.remove('bg-purple-600/20', 'border-purple-500/30');
    };

    // Task View Button
    document.getElementById('taskview-btn').onclick = () => {
        const desktop = document.getElementById('desktop');
        desktop.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        desktop.style.transform = 'scale(0.85) translateY(-50px)';

        const overlay = document.createElement('div');
        overlay.id = 'task-view-overlay';
        overlay.className = 'fixed inset-0 z-[150] flex flex-col items-center justify-end pb-12 opacity-0 transition-opacity duration-300';

        let desktopsHtml = '';
        state.desktops.forEach(d => {
            const isActive = state.currentDesktop === d.id;
            desktopsHtml += `
                <div onclick="switchDesktop(${d.id}); event.stopPropagation();" class="w-48 h-28 rounded-xl ${isActive ? 'bg-blue-500/20 border-2 border-blue-400' : 'bg-white/5 border border-white/10 hover:bg-white/10'} flex items-center justify-center cursor-pointer transition-all">
                    <span class="text-xs font-bold uppercase tracking-widest ${isActive ? '' : 'opacity-40'}">${d.name}</span>
                </div>
            `;
        });

        overlay.innerHTML = `
            <div class="flex gap-4 p-4 glass-mica rounded-3xl border border-white/10 scale-90 transition-transform duration-500" id="desktops-container">
                ${desktopsHtml}
                <div class="w-12 h-28 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer">
                    <i data-lucide="plus" class="w-5 h-5 opacity-40"></i>
                </div>
            </div>
        `;
        desktop.appendChild(overlay);
        lucide.createIcons();

        setTimeout(() => {
            overlay.classList.add('opacity-100');
            overlay.querySelector('#desktops-container').classList.remove('scale-90');
        }, 10);

        const closeTaskView = () => {
            overlay.classList.remove('opacity-100');
            desktop.style.transform = 'scale(1) translateY(0)';
            setTimeout(() => overlay.remove(), 300);
            document.removeEventListener('keydown', keyHandler);
        };

        window.switchDesktop = (id) => {
            state.currentDesktop = id;
            showNotification("Workspace Switched", `Now on ${state.desktops[id].name}`);
            closeTaskView();
            // In a real OS we'd filter windows here
            document.querySelectorAll('.window').forEach(winEl => {
                // For demo, just fade them out and back in
                winEl.style.opacity = '0';
                setTimeout(() => winEl.style.opacity = '1', 300);
            });
        };

        const keyHandler = (e) => { if (e.key === 'Escape') closeTaskView(); };
        document.addEventListener('keydown', keyHandler);
        overlay.onclick = closeTaskView;
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

    // Recall AI
    const recallBtn = document.getElementById('recall-btn');
    const recallPanel = document.getElementById('recall-panel');
    const closeRecall = document.getElementById('close-recall');
    const snapshotsContainer = document.getElementById('recall-snapshots');

    recallBtn.onclick = () => {
        recallPanel.classList.remove('hidden');
        renderRecallSnapshots();
    };
    closeRecall.onclick = () => recallPanel.classList.add('hidden');

    function renderRecallSnapshots() {
        const snapshots = [
            { time: '08:42 AM', app: 'OmniExplorer', desc: 'Viewing "Neural Vault > Documents"', img: 'https://picsum.photos/seed/os1/400/225' },
            { time: '08:30 AM', app: 'Galactic Browser', desc: 'Browsing "Nexus Universal"', img: 'https://picsum.photos/seed/os2/400/225' },
            { time: '08:15 AM', app: 'QuantumCalc', desc: 'Performed hyper-dimensional calculation', img: 'https://picsum.photos/seed/os3/400/225' },
            { time: '07:50 AM', app: 'HoloPad', desc: 'Editing "Quantum_Log.txt"', img: 'https://picsum.photos/seed/os4/400/225' },
            { time: '07:20 AM', app: 'Aura AI', desc: 'Query about temporal stability', img: 'https://picsum.photos/seed/os5/400/225' }
        ];

        snapshotsContainer.innerHTML = '';
        snapshots.forEach(s => {
            const div = document.createElement('div');
            div.className = 'w-[320px] shrink-0 space-y-4 group cursor-pointer';
            div.innerHTML = `
                <div class="aspect-video bg-white/5 rounded-3xl border border-white/10 group-hover:border-amber-400/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all overflow-hidden relative">
                    <img src="${s.img}" class="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <button class="w-full py-3 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]">Restore State</button>
                    </div>
                </div>
                <div>
                    <div class="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">${s.time}</div>
                    <div class="text-sm font-medium text-white/80">${s.app}</div>
                    <div class="text-[10px] text-white/30 uppercase tracking-widest mt-1">${s.desc}</div>
                </div>
            `;
            div.onclick = () => {
                showNotification("Recall AI", `Restoring session from ${s.time}...`);
                recallPanel.classList.add('hidden');
                openWindow(s.app.toLowerCase().replace(' ', ''));
            };
            snapshotsContainer.appendChild(div);
        });
        lucide.createIcons();
    }

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
        closeAllMenus();
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
        isMaximized: false,
        activeTabId: 0,
        tabs: []
    };

    if (appId === 'galaxy') {
        winState.tabs = [
            { id: 0, title: 'Nexus Universal', icon: 'globe' },
            { id: 1, title: 'Star Maps', icon: 'map' }
        ];
    } else if (appId === 'explorer') {
        winState.tabs = [
            { id: 0, title: 'Documents', icon: 'file-text' },
            { id: 1, title: 'Holo-Grams', icon: 'image' }
        ];
    }

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
            <div id="tabs-${winId}" class="flex-1 mx-4 h-full flex items-end space-x-1 overflow-hidden">
                <!-- Tabs injected here -->
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
    renderTabs(winId);

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

function snapWindow(id, layout) {
    const win = state.windows.find(w => w.id === id);
    const winEl = document.getElementById(`window-${id}`);
    if (!win || !winEl) return;

    win.isMaximized = false;
    winEl.classList.remove('maximized', 'snap-left', 'snap-right', 'snap-tl', 'snap-tr', 'snap-bl', 'snap-br');
    winEl.classList.add(`snap-${layout}`);
    winEl.querySelector('.maximize-btn i').setAttribute('data-lucide', 'maximize-2');
    lucide.createIcons();
}

function showSnapLayouts(id, btn) {
    const rect = btn.getBoundingClientRect();
    const menu = document.createElement('div');
    menu.className = 'snap-layouts-menu fixed z-[1000] glass p-2 rounded-xl border border-white/10 flex flex-col space-y-2 shadow-2xl';
    menu.style.top = `${rect.bottom + 10}px`;
    menu.style.left = `${rect.left - 80}px`;

    menu.innerHTML = `
        <div class="flex space-x-2">
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer flex" id="snap-l">
                <div class="w-1/2 h-full bg-blue-500/20 border-r border-blue-500/30"></div>
            </div>
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer flex" id="snap-r">
                <div class="w-1/2 h-full ml-auto bg-blue-500/20 border-l border-blue-500/30"></div>
            </div>
        </div>
        <div class="flex space-x-2">
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer grid grid-cols-2 grid-rows-2" id="snap-tl">
                <div class="bg-blue-500/20 border-r border-b border-blue-500/30"></div>
            </div>
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer grid grid-cols-2 grid-rows-2" id="snap-tr">
                <div></div><div class="bg-blue-500/20 border-l border-b border-blue-500/30"></div>
            </div>
        </div>
        <div class="flex space-x-2">
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer grid grid-cols-2 grid-rows-2" id="snap-bl">
                <div></div><div></div><div class="bg-blue-500/20 border-r border-t border-blue-500/30"></div>
            </div>
            <div class="w-12 h-12 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 cursor-pointer grid grid-cols-2 grid-rows-2" id="snap-br">
                <div></div><div></div><div></div><div class="bg-blue-500/20 border-l border-t border-blue-500/30"></div>
            </div>
        </div>
    `;

    document.body.appendChild(menu);

    const preview = document.getElementById('snap-preview');

    const layouts = {
        'l': { left: '0', top: '0', width: '50vw', height: 'calc(100vh - 72px)' },
        'r': { left: '50vw', top: '0', width: '50vw', height: 'calc(100vh - 72px)' },
        'tl': { left: '0', top: '0', width: '50vw', height: 'calc((100vh - 72px)/2)' },
        'tr': { left: '50vw', top: '0', width: '50vw', height: 'calc((100vh - 72px)/2)' },
        'bl': { left: '0', top: 'calc((100vh - 72px)/2)', width: '50vw', height: 'calc((100vh - 72px)/2)' },
        'br': { left: '50vw', top: 'calc((100vh - 72px)/2)', width: '50vw', height: 'calc((100vh - 72px)/2)' }
    };

    Object.keys(layouts).forEach(key => {
        const el = menu.querySelector(`#snap-${key}`);
        el.onmouseenter = () => {
            const l = layouts[key];
            preview.style.opacity = '1';
            preview.style.left = l.left;
            preview.style.top = l.top;
            preview.style.width = l.width;
            preview.style.height = l.height;
        };
        el.onclick = () => {
            snapWindow(id, key === 'l' ? 'left' : (key === 'r' ? 'right' : key));
            menu.remove();
            preview.style.opacity = '0';
        };
    });

    menu.onmouseleave = () => {
        preview.style.opacity = '0';
        menu.remove();
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

function renderTabs(winId) {
    const win = state.windows.find(w => w.id === winId);
    const container = document.getElementById(`tabs-${winId}`);
    if (!container || !win.tabs.length) return;

    container.innerHTML = '';
    win.tabs.forEach(tab => {
        const isActive = win.activeTabId === tab.id;
        const tabEl = document.createElement('div');
        tabEl.className = `h-9 px-4 flex items-center space-x-2 rounded-t-lg transition-all cursor-pointer border-t border-l border-r ${isActive ? 'bg-slate-900 border-white/10 text-white' : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'}`;
        tabEl.innerHTML = `
            <i data-lucide="${tab.icon}" class="w-3 h-3"></i>
            <span class="text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">${tab.title}</span>
            ${win.tabs.length > 1 ? `<i data-lucide="x" class="w-3 h-3 hover:text-red-400 close-tab-btn" data-tab-id="${tab.id}"></i>` : ''}
        `;
        tabEl.onclick = (e) => {
            if (e.target.classList.contains('close-tab-btn')) {
                closeTab(winId, tab.id);
            } else {
                win.activeTabId = tab.id;
                renderTabs(winId);
                renderWindowContent(winId);
            }
        };

        // Tab Dragging Logic
        tabEl.draggable = true;
        tabEl.ondragstart = (e) => {
            e.dataTransfer.setData('tabId', tab.id);
            e.dataTransfer.setData('winId', winId);
            tabEl.classList.add('opacity-50');
        };
        tabEl.ondragend = () => tabEl.classList.remove('opacity-50');
        tabEl.ondragover = (e) => e.preventDefault();
        tabEl.ondrop = (e) => {
            const draggedTabId = parseInt(e.dataTransfer.getData('tabId'));
            const draggedWinId = e.dataTransfer.getData('winId');
            if (draggedWinId === winId) {
                const oldIndex = win.tabs.findIndex(t => t.id === draggedTabId);
                const newIndex = win.tabs.findIndex(t => t.id === tab.id);
                const [movedTab] = win.tabs.splice(oldIndex, 1);
                win.tabs.splice(newIndex, 0, movedTab);
                renderTabs(winId);
            }
        };

        container.appendChild(tabEl);
    });
    lucide.createIcons();
}

function closeTab(winId, tabId) {
    const win = state.windows.find(w => w.id === winId);
    if (!win) return;
    win.tabs = win.tabs.filter(t => t.id !== tabId);
    if (win.activeTabId === tabId && win.tabs.length > 0) {
        win.activeTabId = win.tabs[0].id;
    }
    if (win.tabs.length === 0) {
        closeWindow(winId);
    } else {
        renderTabs(winId);
        renderWindowContent(winId);
    }
}

function renderWindowContent(id) {
    const win = state.windows.find(w => w.id === id);
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
            const activeTab = win.tabs.find(t => t.id === win.activeTabId);
            const url = activeTab ? (activeTab.id === 0 ? 'HTTPS://UNIVERSAL-NET.HUB/NEXUS' : 'HTTPS://MAPS.GALAXY/SOL') : 'HTTPS://UNIVERSAL-NET.HUB/NEXUS';

            container.innerHTML = `
                <div class="flex flex-col h-full -m-6">
                    <div class="flex items-center space-x-3 bg-white/5 p-3 border-b border-white/10">
                        <div class="flex space-x-1.5">
                            <button class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                            <button class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                            <button class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="rotate-cw" class="w-4 h-4"></i></button>
                        </div>
                        <div class="flex-1 mx-4 bg-black/60 rounded-full px-4 py-1.5 text-[10px] text-blue-300/60 tracking-wider flex justify-between items-center border border-blue-500/20">
                            <span>${url}</span>
                            <i data-lucide="shield-check" class="w-3 h-3 text-emerald-400"></i>
                        </div>
                        <button class="p-1 hover:bg-white/10 rounded text-white/40" onclick="addTab('${id}')"><i data-lucide="plus" class="w-4 h-4"></i></button>
                    </div>
                    <div class="flex-1 bg-gradient-to-b from-blue-900/10 to-transparent p-8 flex flex-col items-center justify-center text-center">
                        ${win.activeTabId === 0 ? `
                            <div class="mb-8 animate-spin-slow">
                                <i data-lucide="globe" class="w-24 h-24 text-blue-500/50"></i>
                            </div>
                            <h2 class="text-4xl font-light text-white mb-4 tracking-[0.2em] uppercase">Nexus Universal</h2>
                            <p class="text-white/40 max-w-md text-xs leading-loose uppercase tracking-widest">Connect to any node in the local supercluster. Instant latency via entanglement protocol.</p>
                            <div class="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                                <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest">Neural Net</div>
                                <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest">Star Maps</div>
                                <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest">Time Market</div>
                                <div class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest">Void News</div>
                            </div>
                        ` : `
                            <div class="w-full h-full flex flex-col items-center">
                                <div class="w-full max-w-2xl aspect-video bg-black/40 rounded-3xl border border-white/10 relative overflow-hidden mb-8">
                                    <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#3b82f6 1px, transparent 1px); background-size: 20px 20px;"></div>
                                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]"></div>
                                    <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full"></div>
                                    <div class="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full"></div>
                                    <div class="absolute inset-0 flex items-center justify-center">
                                        <div class="w-[80%] h-[80%] border border-white/5 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <h3 class="text-xl font-bold tracking-widest uppercase mb-2">Solar System Node</h3>
                                <p class="text-xs text-white/40 uppercase tracking-widest">Live telemetry from SOL-01. Stability: Nominal.</p>
                            </div>
                        `}
                    </div>
                </div>
            `;

            window.addTab = (winId) => {
                const w = state.windows.find(win => win.id === winId);
                const newId = Math.max(...w.tabs.map(t => t.id), 0) + 1;
                w.tabs.push({ id: newId, title: 'New Node', icon: 'plus' });
                w.activeTabId = newId;
                renderTabs(winId);
                renderWindowContent(winId);
            };

            lucide.createIcons();
            break;
        case 'explorer':
            const currentPath = win.activeTabId === 0 ? 'Documents' : 'Holo-Grams';
            container.innerHTML = `
                <div class="flex flex-col h-full -m-6">
                    <div class="flex items-center space-x-4 bg-white/5 p-4 border-b border-white/10">
                        <div class="flex space-x-2">
                            <button class="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><i data-lucide="arrow-left" class="w-4 h-4"></i></button>
                            <button class="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"><i data-lucide="arrow-right" class="w-4 h-4"></i></button>
                        </div>
                        <div class="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] text-white/60 flex items-center space-x-2">
                            <i data-lucide="folder" class="w-3 h-3"></i>
                            <span>This Quantum Computer > Neural Vault > ${currentPath}</span>
                        </div>
                        <div class="w-48 bg-black/40 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] text-white/40 flex items-center justify-between">
                            <span>Search ${currentPath}</span>
                            <i data-lucide="search" class="w-3 h-3"></i>
                        </div>
                    </div>
                    <div class="flex flex-1 overflow-hidden">
                        <div class="w-48 border-r border-white/10 p-4 space-y-2 overflow-auto custom-scrollbar">
                            <div class="text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Favorites</div>
                            <div class="flex items-center space-x-3 p-2 ${win.activeTabId === 0 ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-white/60'} rounded-lg text-xs cursor-pointer" onclick="switchExplorerTab('${id}', 0)"><i data-lucide="star" class="w-4 h-4"></i><span>Documents</span></div>
                            <div class="flex items-center space-x-3 p-2 ${win.activeTabId === 1 ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-white/60'} rounded-lg text-xs cursor-pointer" onclick="switchExplorerTab('${id}', 1)"><i data-lucide="image" class="w-4 h-4"></i><span>Holo-Grams</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="clock" class="w-4 h-4"></i><span>Recent</span></div>
                            <div class="mt-8 text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Libraries</div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="music" class="w-4 h-4"></i><span>Neural-Audio</span></div>
                            <div class="flex items-center space-x-3 p-2 hover:bg-white/5 text-white/60 rounded-lg text-xs cursor-pointer"><i data-lucide="video" class="w-4 h-4"></i><span>Temporal-Vids</span></div>
                        </div>
                        <div class="flex-1 p-8 grid grid-cols-4 content-start gap-8 overflow-auto custom-scrollbar" id="explorer-files">
                            <!-- Files -->
                        </div>
                    </div>
                </div>
            `;

            window.switchExplorerTab = (winId, tabId) => {
                const w = state.windows.find(win => win.id === winId);
                w.activeTabId = tabId;
                renderTabs(winId);
                renderWindowContent(winId);
            };

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
            // Sanitize: only allow numbers, operators, and decimals
            const sanitized = state.calcValue.replace(/[^0-9+\-*/.]/g, '');
            // Using Function as a safer alternative to eval for controlled input
            // eslint-disable-next-line no-new-func
            state.calcValue = new Function(`return ${sanitized}`)().toString();
        } catch {
            state.calcValue = 'Error';
        }
    }
    else {
        state.calcValue = state.calcValue === '0' ? val.toString() : state.calcValue + val;
    }
    display.textContent = state.calcValue;
}

function toggleMenu(menuType) {
    const menus = {
        start: { id: 'start-menu', state: 'isStartOpen', btn: 'start-btn' },
        widgets: { id: 'widgets-board', state: 'isWidgetsOpen', btn: 'widgets-btn' },
        qs: { id: 'quick-settings', state: 'isQuickSettingsOpen', btn: 'qs-btn' },
        notif: { id: 'notification-center', state: 'isNotificationsOpen', btn: 'notif-btn' }
    };

    const target = menus[menuType];
    const wasOpen = state[target.state];

    closeAllMenus();

    if (!wasOpen) {
        state[target.state] = true;
        const el = document.getElementById(target.id);
        const btn = document.getElementById(target.btn);
        el.classList.remove('hidden');
        if (btn) btn.classList.add('bg-white/10', 'border-white/20');
    }
}

function closeAllMenus() {
    const menus = [
        { id: 'start-menu', state: 'isStartOpen', btn: 'start-btn' },
        { id: 'widgets-board', state: 'isWidgetsOpen', btn: 'widgets-btn' },
        { id: 'quick-settings', state: 'isQuickSettingsOpen', btn: 'qs-btn' },
        { id: 'notification-center', state: 'isNotificationsOpen', btn: 'notif-btn' }
    ];

    menus.forEach(m => {
        state[m.state] = false;
        const el = document.getElementById(m.id);
        const btn = document.getElementById(m.btn);
        if (el) el.classList.add('hidden');
        if (btn) btn.classList.remove('bg-white/10', 'border-white/20');
    });
}

// Initial call
startBIOS();
