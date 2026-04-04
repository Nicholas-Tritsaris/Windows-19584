/**
 * Windows 19584 - Modular OS Simulation
 * (C) 19584 Quantum Dynamics Inc.
 *
 * Features:
 * - Multi-stage boot sequence (BIOS -> Boot -> Login)
 * - Class-based Window Management System
 * - Snap Layouts & Aero transparency
 * - Tabbed productivity apps with persistence
 * - Aura AI & Recall AI integration
 */

class AppManager {
    constructor(os) {
        this.os = os;
        this.apps = [
            { id: 'holopad', name: 'HoloPad', icon: 'file-text' },
            { id: 'calc', name: 'QuantumCalc', icon: 'calculator' },
            { id: 'galaxy', name: 'Galactic Browser', icon: 'globe' },
            { id: 'explorer', name: 'OmniExplorer', icon: 'folder' },
            { id: 'system', name: 'System Core', icon: 'settings' },
            { id: 'legacy', name: 'Legacy Suite', icon: 'history' },
            { id: 'holomaker', name: 'Holo-Maker', icon: 'clapperboard' }
        ];
    }

    getApp(id) {
        return this.apps.find(a => a.id === id);
    }

    renderContent(id, windowObj) {
        switch(id) {
            case 'holopad': return this.getHoloPad();
            case 'calc': return this.getCalc();
            case 'galaxy': return this.getGalaxy(windowObj);
            case 'explorer': return this.getExplorer(windowObj);
            case 'system': return this.getSystem();
            case 'legacy': return this.getLegacy();
            case 'holomaker': return this.getHoloMaker();
            default: return `<div class="p-10 text-center opacity-20 italic">Application content missing in this dimension.</div>`;
        }
    }

    getHoloPad() {
        const content = this.os.state.holoPadContent || `LOG START: STARDATE 19584.23\n--------------------------\nEverything is proceeding as planned in the 4th quadrant.\nTemporal stability at 98.4%.\nNo anomalies detected in the local cluster.`;
        return `
            <div class="flex flex-col h-full">
                <div class="flex space-x-4 mb-4 text-[10px] uppercase tracking-widest text-blue-400/60 border-b border-blue-500/20 pb-2">
                    <span>File</span><span>Edit</span><span>Format</span><span>View</span>
                </div>
                <textarea oninput="window.os.updateHoloPad(this.value)" class="flex-1 bg-transparent border-none outline-none text-blue-100 resize-none font-mono text-sm leading-relaxed custom-scrollbar" placeholder="Type your thoughts across dimensions...">${content}</textarea>
            </div>
        `;
    }

    getCalc() {
        return `
            <div class="flex flex-col h-full">
                <div id="calc-display" class="bg-blue-950/40 p-6 rounded-lg mb-4 text-right text-3xl font-mono text-blue-300 border border-blue-500/20 shadow-inner">0</div>
                <div class="grid grid-cols-4 gap-3 flex-1" id="calc-buttons">
                    ${[7,8,9,'/',4,5,6,'*',1,2,3,'-','C',0,'=','+'].map(btn => `
                        <button onclick="window.os.handleCalc('${btn}')" class="p-4 rounded-lg transition-all font-mono text-lg ${typeof btn === 'number' ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-white/5' : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/20'}">
                            ${btn}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getGalaxy(win) {
        const activeTab = win.tabs.find(t => t.id === win.activeTabId) || win.tabs[0];
        const url = activeTab.url || 'https://www.wikipedia.org';
        return `
            <div class="flex flex-col h-full -m-6">
                <div class="flex items-center space-x-3 bg-white/5 p-3 border-b border-white/10">
                    <div class="flex space-x-1.5">
                        <button onclick="window.os.navigateBrowser('${win.id}', 'back')" class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                        <button onclick="window.os.navigateBrowser('${win.id}', 'forward')" class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                        <button onclick="window.os.navigateBrowser('${win.id}', 'reload')" class="p-1 hover:bg-white/10 rounded text-white/40"><i data-lucide="rotate-cw" class="w-4 h-4"></i></button>
                    </div>
                    <div class="flex-1 mx-4 bg-black/60 rounded-full px-4 py-1.5 text-[10px] text-blue-300 tracking-wider flex items-center border border-blue-500/20">
                        <i data-lucide="shield-check" class="w-3 h-3 text-emerald-400 mr-2"></i>
                        <input type="text" value="${url}"
                               onkeydown="window.os.handleUrlKeydown(event, '${win.id}')"
                               class="bg-transparent border-none outline-none w-full text-blue-300 placeholder-blue-300/30"
                               placeholder="Enter Quantum URL...">
                    </div>
                    <button class="p-1 hover:bg-white/10 rounded text-white/40" onclick="window.os.wm.addTab('${win.id}')"><i data-lucide="plus" class="w-4 h-4"></i></button>
                </div>
                <div class="flex-1 bg-white relative">
                    <iframe id="browser-iframe-${win.id}" src="${url}" class="w-full h-full border-none"></iframe>
                    <div id="browser-overlay-${win.id}" class="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center hidden p-8">
                        <div class="mb-8 animate-spin-slow"><i data-lucide="globe" class="w-24 h-24 text-blue-500/50"></i></div>
                        <h2 class="text-2xl font-light text-white mb-4 tracking-widest uppercase">Connection Restricted</h2>
                        <p class="text-white/40 max-w-md text-[10px] leading-loose uppercase tracking-[0.2em]">Many 21st century portals prevent dimensional embedding (iFrames). Try another node or use the Legacy Suite for restricted archives.</p>
                        <button onclick="window.os.navigateBrowser('${win.id}', 'https://www.wikipedia.org')" class="mt-6 px-6 py-2 border border-blue-500/40 text-blue-400 text-[10px] uppercase tracking-widest hover:bg-blue-500/10 rounded-full">Reset to Wiki-Node</button>
                    </div>
                </div>
            </div>
        `;
    }

    getExplorer(win) {
        const currentPath = win.tabs.find(t => t.id === win.activeTabId)?.title || 'Documents';
        return `
            <div class="flex flex-col h-full -m-6">
                <div class="flex items-center space-x-4 bg-white/5 p-4 border-b border-white/10">
                    <div class="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-1.5 text-[10px] text-white/60 flex items-center space-x-2">
                        <i data-lucide="folder" class="w-3 h-3"></i>
                        <span>This Quantum Computer > Neural Vault > ${currentPath}</span>
                    </div>
                </div>
                <div class="flex flex-1 overflow-hidden">
                    <div class="w-48 border-r border-white/10 p-4 space-y-2">
                        <div class="text-[9px] uppercase tracking-widest text-white/20 mb-4 px-2">Folders</div>
                        ${win.tabs.map(t => `
                            <div onclick="window.os.wm.switchTab('${win.id}', ${t.id})" class="flex items-center space-x-3 p-2 ${win.activeTabId === t.id ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-white/60'} rounded-lg text-xs cursor-pointer">
                                <i data-lucide="${t.icon}" class="w-4 h-4"></i>
                                <span>${t.title}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="flex-1 p-8 grid grid-cols-3 content-start gap-6 overflow-auto custom-scrollbar">
                        ${[1,2,3,4,5].map(i => `
                            <div class="flex flex-col items-center space-y-2 group cursor-pointer" onclick="window.os.showNotification('File Access', 'Reading data stream...')">
                                <div class="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/40 group-hover:bg-blue-600/10 transition-all text-blue-400">
                                    <i data-lucide="file" class="w-8 h-8"></i>
                                </div>
                                <span class="text-[9px] text-white/40 uppercase truncate w-20">Data_Node_${i}.qnt</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getSystem() {
        return `
            <div class="space-y-6">
                <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <i data-lucide="cpu" class="w-8 h-8 text-blue-400"></i>
                        <div>
                            <div class="text-xs font-bold uppercase tracking-widest">Neuro-Core Load</div>
                            <div class="text-[10px] text-white/40">Efficiency: 99.2%</div>
                        </div>
                    </div>
                    <div class="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500 w-[14%] shadow-[0_0_10px_#3b82f6]"></div>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
                        <div class="text-[9px] text-blue-400 uppercase mb-1">Status</div>
                        <div class="font-bold">OPTIMAL</div>
                    </div>
                    <div class="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
                        <div class="text-[9px] text-purple-400 uppercase mb-1">Temporal</div>
                        <div class="font-bold">LOCKED</div>
                    </div>
                </div>
                <div class="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-white/60">Multiverse Sync Status</div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-[8px] uppercase"><span>Alpha Timeline</span><span class="text-emerald-400">Synced</span></div>
                        <div class="w-full h-1 bg-white/5 rounded-full"><div class="h-full bg-emerald-500 w-full opacity-50"></div></div>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-[8px] uppercase"><span>Omega Timeline</span><span class="text-amber-400">Drifting</span></div>
                        <div class="w-full h-1 bg-white/5 rounded-full"><div class="h-full bg-amber-500 w-2/3 opacity-50"></div></div>
                    </div>
                </div>
            </div>
        `;
    }

    getLegacy() {
        return `
            <div class="flex flex-col h-full -m-6 bg-[#c0c0c0] text-black font-sans p-1 border-2 border-white shadow-[inset_-1px_-1px_#808080,inset_1px_1px_#ffffff]">
                <div class="bg-[#000080] p-1 flex justify-between items-center text-white font-bold text-xs">
                    <div class="flex items-center space-x-1"><span>Internet Explorer 584</span></div>
                </div>
                <div class="flex-1 bg-white border-2 border-[#808080] m-1 p-10 flex flex-col items-center justify-center space-y-4">
                    <i data-lucide="construction" class="w-12 h-12 text-yellow-600"></i>
                    <p class="text-sm font-bold">Retro Compatibility Layer Active</p>
                    <p class="text-[10px] text-center">Simulating 21st century web protocols... This may take several nanoseconds.</p>
                </div>
            </div>
        `;
    }

    getHoloMaker() {
        return `
            <div class="flex flex-col h-full space-y-4">
                <div class="h-40 bg-black/60 rounded-2xl border border-white/5 flex items-center justify-center">
                    <div class="w-12 h-12 rounded-full border-2 border-purple-500/50 flex items-center justify-center animate-pulse">
                        <i data-lucide="play" class="w-5 h-5 text-purple-400"></i>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <button class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-[9px] uppercase tracking-[0.2em]">Add Layer</button>
                    <button class="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-[9px] uppercase tracking-[0.2em]">Neural FX</button>
                </div>
            </div>
        `;
    }
}

class WindowManager {
    constructor(os) {
        this.os = os;
        this.dragData = null;
        this.resizeData = null;
        this.setupEvents();
    }

    setupEvents() {
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUp());
    }

    open(appId) {
        console.log('Opening app: ' + appId);
        if (window.logToFirebase) window.logToFirebase('app_open', { appId });
        this.os.playSound('open');
        const existing = this.os.state.windows.find(w => w.id === appId);
        if (existing) {
            this.focus(appId);
            return;
        }

        const app = this.os.am.getApp(appId);
        const winId = appId;
        const offset = this.os.state.windows.length * 30;

        const winState = {
            id: winId,
            x: 250 + offset,
            y: 100 + offset,
            width: 640,
            height: 440,
            isMinimized: false,
            isMaximized: false,
            activeTabId: 0,
            tabs: this.getDefaultTabs(appId)
        };

        this.os.state.windows.push(winState);
        this.renderWindow(winState, app);
        this.focus(winId);
        this.os.updateTaskbar();
        this.os.saveState();
    }

    getDefaultTabs(appId) {
        if (appId === 'galaxy') return [
            { id: 0, title: 'Nexus', icon: 'globe', url: 'https://www.wikipedia.org' },
            { id: 1, title: 'Archive', icon: 'database', url: 'https://archive.org' }
        ];
        if (appId === 'explorer') return [{ id: 0, title: 'Documents', icon: 'file-text' }, { id: 1, title: 'Holo-Grams', icon: 'image' }];
        return [{ id: 0, title: 'Main', icon: 'box' }];
    }

    renderWindow(win, app) {
        console.log('Rendering window: ' + win.id);
        const layer = document.getElementById('windows-layer');
        if (!layer) return;

        const el = document.createElement('div');
        el.id = `window-${win.id}`;
        el.className = 'window absolute bg-slate-900/90 backdrop-blur-3xl border border-blue-500/30 rounded-xl overflow-hidden shadow-2xl flex flex-col pointer-events-auto transition-all duration-300';
        el.style.left = `${win.x}px`;
        el.style.top = `${win.y}px`;
        el.style.width = `${win.width}px`;
        el.style.height = `${win.height}px`;

        el.innerHTML = `
            <div class="window-header h-12 bg-white/5 flex items-center justify-between px-4 cursor-move border-b border-white/10">
                <div class="flex items-center space-x-3 text-blue-400 pointer-events-none">
                    <i data-lucide="${app.icon}" class="w-4 h-4"></i>
                    <span class="text-[10px] font-bold tracking-[0.2em] uppercase">${app.name}</span>
                </div>
                <div class="window-tabs flex-1 mx-4 h-full flex items-end space-x-1 overflow-hidden" id="tabs-${win.id}"></div>
                <div class="flex items-center space-x-1">
                    <button class="win-btn-min w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/40"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
                    <button class="win-btn-max w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/40"><i data-lucide="maximize-2" class="w-3.5 h-3.5"></i></button>
                    <button class="win-btn-close w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-500/80 text-white/40 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>
            </div>
            <div class="window-content flex-1 p-6 text-white overflow-auto custom-scrollbar"></div>
            <div class="resize-handle"></div>
        `;

        layer.appendChild(el);
        this.updateContent(win.id);
        this.updateTabs(win.id);
        lucide.createIcons();

        // Bind Events
        el.addEventListener('mousedown', () => this.focus(win.id));

        const header = el.querySelector('.window-header');
        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('button') || e.target.closest('.window-tabs')) return;
            if (!win.isMaximized) this.startDrag(e, win.id);
        });

        const btnMin = el.querySelector('.win-btn-min');
        const btnMax = el.querySelector('.win-btn-max');
        const btnClose = el.querySelector('.win-btn-close');

        [btnMin, btnMax, btnClose].forEach(btn => {
            btn.addEventListener('mousedown', (e) => e.stopPropagation());
        });

        btnMin.onclick = (e) => { e.stopPropagation(); this.toggleMinimize(win.id); };
        btnMax.onclick = (e) => { e.stopPropagation(); this.toggleMaximize(win.id); };
        btnClose.onclick = (e) => {
            console.log(`Closing window: ${win.id}`);
            e.stopPropagation();
            this.close(win.id);
        };

        el.querySelector('.resize-handle').onmousedown = (e) => { e.stopPropagation(); !win.isMaximized && this.startResize(e, win.id); };

        // Snap Layouts
        const maxBtn = el.querySelector('.win-btn-max');
        maxBtn.onmouseenter = () => this.os.showSnapMenu(win.id, maxBtn);
        maxBtn.onmouseleave = (e) => {
            const menu = document.querySelector('.snap-layouts-menu');
            if (menu && !menu.contains(e.relatedTarget)) menu.remove();
        };
    }

    updateContent(id) {
        const win = this.os.state.windows.find(w => w.id === id);
        const container = document.querySelector(`#window-${id} .window-content`);
        if (container) {
            container.innerHTML = this.os.am.renderContent(id, win);
            lucide.createIcons();
        }
    }

    updateTabs(id) {
        const win = this.os.state.windows.find(w => w.id === id);
        const container = document.getElementById(`tabs-${id}`);
        if (!container) return;

        container.innerHTML = win.tabs.map(tab => {
            const active = win.activeTabId === tab.id;
            return `
                <div onclick="window.os.wm.switchTab('${id}', ${tab.id})"
                     draggable="true" ondragstart="window.os.wm.handleTabDragStart(event, '${id}', ${tab.id})"
                     ondragover="event.preventDefault()" ondrop="window.os.wm.handleTabDrop(event, '${id}', ${tab.id})"
                     class="h-8 px-4 flex items-center space-x-2 rounded-t-lg transition-all cursor-pointer border-t border-l border-r ${active ? 'bg-slate-900 border-white/10 text-white' : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'}">
                    <span class="text-[8px] font-bold uppercase tracking-widest whitespace-nowrap">${tab.title}</span>
                </div>
            `;
        }).join('');
    }

    switchTab(winId, tabId) {
        const win = this.os.state.windows.find(w => w.id === winId);
        if (win) {
            win.activeTabId = tabId;
            this.updateTabs(winId);
            this.updateContent(winId);
            this.os.saveState();
        }
    }

    addTab(winId) {
        const win = this.os.state.windows.find(w => w.id === winId);
        if (win) {
            const newId = Math.max(...win.tabs.map(t => t.id), 0) + 1;
            win.tabs.push({ id: newId, title: 'New Node', icon: 'plus' });
            this.switchTab(winId, newId);
        }
    }

    handleTabDragStart(e, winId, tabId) {
        e.dataTransfer.setData('tabId', tabId);
        e.dataTransfer.setData('winId', winId);
    }

    handleTabDrop(e, winId, targetTabId) {
        const draggedTabId = parseInt(e.dataTransfer.getData('tabId'));
        const sourceWinId = e.dataTransfer.getData('winId');
        if (sourceWinId === winId) {
            const win = this.os.state.windows.find(w => w.id === winId);
            const fromIndex = win.tabs.findIndex(t => t.id === draggedTabId);
            const toIndex = win.tabs.findIndex(t => t.id === targetTabId);
            if (fromIndex !== -1 && toIndex !== -1) {
                const [moved] = win.tabs.splice(fromIndex, 1);
                win.tabs.splice(toIndex, 0, moved);
                this.updateTabs(winId);
                this.os.saveState();
            }
        }
    }

    focus(id) {
        const win = this.os.state.windows.find(w => w.id === id);
        if (id !== this.os.state.focusedWindowId) this.os.playSound('click');
        if (win && win.isMinimized) this.toggleMinimize(id);

        this.os.state.focusedWindowId = id;
        document.querySelectorAll('.window').forEach(el => {
            el.style.zIndex = 30;
            el.classList.remove('border-blue-500/40', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]');
        });

        const winEl = document.getElementById(`window-${id}`);
        if (winEl) {
            winEl.style.zIndex = 100;
            winEl.classList.add('border-blue-500/40', 'shadow-[0_0_30px_rgba(59,130,246,0.2)]');
        }
        this.os.updateTaskbar();
    }

    close(id) {
        const el = document.getElementById(`window-${id}`);
        if (el) {
            this.os.playSound('close');
            el.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
            // Remove from state immediately so UI updates (like taskbar) are instant
            this.os.state.windows = this.os.state.windows.filter(w => w.id !== id);
            this.os.updateTaskbar();
            this.os.saveState();

            setTimeout(() => {
                if (el.parentNode) el.remove();
            }, 200);
        }
    }

    toggleMaximize(id) {
        const win = this.os.state.windows.find(w => w.id === id);
        const el = document.getElementById(`window-${id}`);
        win.isMaximized = !win.isMaximized;
        el.classList.remove('snap-left', 'snap-right', 'snap-tl', 'snap-tr', 'snap-bl', 'snap-br');
        win.isMaximized ? el.classList.add('maximized') : el.classList.remove('maximized');
        this.os.saveState();
    }

    snap(id, layout) {
        const win = this.os.state.windows.find(w => w.id === id);
        const el = document.getElementById(`window-${id}`);
        win.isMaximized = false;
        el.classList.remove('maximized', 'snap-left', 'snap-right', 'snap-tl', 'snap-tr', 'snap-bl', 'snap-br');
        el.classList.add(`snap-${layout}`);
        this.os.saveState();
    }

    toggleMinimize(id) {
        const win = this.os.state.windows.find(w => w.id === id);
        const el = document.getElementById(`window-${id}`);
        win.isMinimized = !win.isMinimized;
        win.isMinimized ? el.classList.add('minimized') : el.classList.remove('minimized');
        if (!win.isMinimized) this.focus(id);
        this.os.updateTaskbar();
    }

    startDrag(e, id) {
        const el = document.getElementById(`window-${id}`);
        if (!el) return;
        el.classList.add('interacting');
        // Ensure initial coordinates are captured correctly
        const initX = parseInt(el.style.left) || 0;
        const initY = parseInt(el.style.top) || 0;
        this.dragData = { id, startX: e.clientX, startY: e.clientY, initX, initY };
    }

    startResize(e, id) {
        const el = document.getElementById(`window-${id}`);
        el.classList.add('interacting');
        this.resizeData = { id, startX: e.clientX, startY: e.clientY, initW: parseInt(el.style.width), initH: parseInt(el.style.height) };
    }

    handleMouseMove(e) {
        if (this.dragData) {
            const win = this.os.state.windows.find(w => w.id === this.dragData.id);
            const el = document.getElementById(`window-${this.dragData.id}`);
            win.x = this.dragData.initX + (e.clientX - this.dragData.startX);
            win.y = this.dragData.initY + (e.clientY - this.dragData.startY);
            el.style.left = `${win.x}px`;
            el.style.top = `${win.y}px`;
        }
        if (this.resizeData) {
            const win = this.os.state.windows.find(w => w.id === this.resizeData.id);
            const el = document.getElementById(`window-${this.resizeData.id}`);
            win.width = Math.max(300, this.resizeData.initW + (e.clientX - this.resizeData.startX));
            win.height = Math.max(200, this.resizeData.initH + (e.clientY - this.resizeData.startY));
            el.style.width = `${win.width}px`;
            el.style.height = `${win.height}px`;
        }
    }

    handleMouseUp() {
        if (this.dragData || this.resizeData) {
            const id = (this.dragData || this.resizeData).id;
            document.getElementById(`window-${id}`)?.classList.remove('interacting');
            this.os.saveState();
        }
        this.dragData = null;
        this.resizeData = null;
    }
}

class AuraAI {
    constructor(os) {
        this.os = os;
        this.sidebar = null;
        this.chat = null;
        this.input = null;
    }

    init() {
        this.sidebar = document.getElementById('aura-sidebar');
        this.chat = document.getElementById('aura-chat');
        this.input = document.getElementById('aura-input');

        if (this.input) {
            this.input.onkeydown = (e) => {
                if (e.key === 'Enter' && this.input.value.trim()) {
                    this.ask(this.input.value);
                    this.input.value = '';
                }
            };
        }
    }

    ask(text) {
        this.addMessage(text, false);
        setTimeout(() => {
            let response = "I'm processing your temporal query. Stability is 99.9%.";
            const q = text.toLowerCase();
            if (q.includes('who')) response = "I am Aura, your quantum neural assistant, built in 19582.";
            else if (q.includes('weather')) response = "Simulated conditions on Titan: Methane rain, -179°C.";
            else if (q.includes('help')) response = "I can manage your windows, restore past states, or simulate vintage environments.";
            else {
                const responses = [
                    "The quantum fabric suggests a high probability of success in your current timeline.",
                    "Dimension 19584 is currently experiencing minor temporal flux. Adjusting neural buffer.",
                    "I've analyzed your query. The legacy archives from the 21st century are currently being decrypted.",
                    "Neural patterns recognized. Initiating multi-node synchronization.",
                    "Warning: Temporal anomalies detected in the peripheral sectors."
                ];
                response = responses[Math.floor(Math.random() * responses.length)];
            }
            this.addMessage(response, true);
        }, 800);
    }

    addMessage(text, isAI) {
        if (!this.chat) return;
        const msg = document.createElement('div');
        msg.className = `flex flex-col ${!isAI ? 'items-end' : 'items-start'} space-y-1 animate-in slide-in-from-bottom-2 duration-300 mb-4`;
        msg.innerHTML = `
            <span class="text-[8px] uppercase tracking-widest ${!isAI ? 'text-blue-400' : 'text-purple-400'} font-bold">${!isAI ? 'User' : 'Aura'}</span>
            <div class="p-3 rounded-2xl text-[10px] leading-relaxed ${!isAI ? 'bg-blue-500/10 text-blue-100 rounded-tr-none' : 'bg-purple-500/10 text-purple-100 rounded-tl-none'} border border-white/5 max-w-[90%] shadow-lg">
                ${text}
            </div>
        `;
        this.chat.appendChild(msg);
        this.chat.scrollTop = this.chat.scrollHeight;
        this.os.playSound('click');
    }
}

class OS {
    constructor() {
        this.audioCtx = null;
        this.container = document.getElementById('os-container');
        this.state = {
            stage: 'bios',
            windows: [],
            focusedWindowId: null,
            isStartOpen: false,
            calcValue: '0',
            holoPadContent: null,
            iconPositions: {},
            isAuthenticated: false,
            user: null
        };
        this.am = new AppManager(this);
        this.wm = new WindowManager(this);
        this.aura = new AuraAI(this);
        this.loadState();
    }

    async start() {
        if (window.logToFirebase) window.logToFirebase('system_boot_start');
        this.showBIOS();
    }

    playSound(type) {
        if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = this.audioCtx.currentTime;

        const playTone = (freq, type, duration, volume, ramp = true) => {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(volume, now);
            if (ramp) gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            osc.start(now);
            osc.stop(now + duration);
        };

        switch(type) {
            case 'boot':
                playTone(220, 'sine', 1.5, 0.1);
                setTimeout(() => playTone(440, 'sine', 1.0, 0.1), 200);
                setTimeout(() => playTone(880, 'sine', 0.8, 0.05), 400);
                break;
            case 'click':
                playTone(1200, 'square', 0.05, 0.02);
                break;
            case 'open':
                playTone(400, 'sine', 0.3, 0.1);
                setTimeout(() => playTone(600, 'sine', 0.3, 0.1), 100);
                break;
            case 'close':
                playTone(600, 'sine', 0.3, 0.1);
                setTimeout(() => playTone(400, 'sine', 0.3, 0.1), 100);
                break;
            case 'notif':
                playTone(523.25, 'triangle', 0.4, 0.1);
                setTimeout(() => playTone(659.25, 'triangle', 0.4, 0.1), 150);
                break;
            case 'error':
                playTone(150, 'sawtooth', 0.5, 0.1);
                break;
            case 'shutdown':
                playTone(440, 'sine', 1.0, 0.1);
                setTimeout(() => playTone(220, 'sine', 1.5, 0.1), 300);
                break;
        }
    }

    loadState() {
        const saved = localStorage.getItem('os_19584_state');
        if (saved) {
            const data = JSON.parse(saved);
            this.state.windows = data.windows || [];
            this.state.holoPadContent = data.holoPadContent || null;
            this.state.iconPositions = data.iconPositions || {};
        }
    }

    saveState() {
        localStorage.setItem('os_19584_state', JSON.stringify({
            windows: this.state.windows,
            holoPadContent: this.state.holoPadContent,
            iconPositions: this.state.iconPositions
        }));
    }

    updateHoloPad(val) {
        this.state.holoPadContent = val;
        this.saveState();
    }

    showBIOS() {
        this.container.innerHTML = `
            <div id="bios-screen" class="fixed inset-0 bg-black text-green-500 font-mono p-10 text-xs flex flex-col items-start z-50 overflow-hidden">
                <div id="bios-lines"></div>
                <div class="cursor-blink">_</div>
                <div class="absolute bottom-10 right-10 text-green-900 animate-pulse tracking-widest">[TAB] FOR BIOS SETTINGS</div>
            </div>
        `;
        const lines = ["ASUS-QUANTUM BIOS v195.8.4", "Neuro-Core @ 1.2 THz OK", "Memory Check: 1024 PB OK", "Entanglement Drive: CONNECTED", "Initializing Neural Interface...", "Loading Temporal Kernel..."];
        let i = 0;
        const interval = setInterval(() => {
            const container = document.getElementById('bios-lines');
            if (container && i < lines.length) {
                const div = document.createElement('div');
                div.textContent = lines[i++];
                container.appendChild(div);
            } else {
                clearInterval(interval);
                window.removeEventListener('keydown', handleTab);
                if (container) setTimeout(() => this.showBoot(), 1000);
            }
        }, 150);

        const handleTab = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                clearInterval(interval);
                window.removeEventListener('keydown', handleTab);
                this.showBIOSSettings();
            }
        };
        window.addEventListener('keydown', handleTab);
    }

    showBIOSSettings() {
        this.container.innerHTML = `
            <div class="fixed inset-0 bg-[#0000AA] text-white font-mono p-0 z-50 flex flex-col border-[12px] border-[#AAAAAA] shadow-2xl">
                <div class="bg-[#AAAAAA] text-[#0000AA] p-1 text-center font-bold text-sm">QUANTUM BIOS SETUP UTILITY - COPYRIGHT (C) 19584 AMERICAN MEGATRENDS</div>
                <div class="flex-1 flex overflow-hidden">
                    <div class="w-1/4 border-r-2 border-white p-4 space-y-1 text-sm">
                        <div class="bg-white text-[#0000AA] px-2 font-bold">Main</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Advanced</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Holographics</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Temporal</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Security</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Boot</div>
                        <div class="px-2 hover:bg-white/20 cursor-pointer">Exit</div>
                    </div>
                    <div class="flex-1 p-8 space-y-6 flex flex-col">
                        <div class="space-y-4 flex-1">
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>System Time</span><span class="text-[#FFFF55]">[${new Date().toLocaleTimeString()}]</span></div>
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>System Date</span><span class="text-[#FFFF55]">[${new Date().toLocaleDateString()}]</span></div>
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>Quantum Core</span><span class="text-[#FFFF55]">[Enabled]</span></div>
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>Multiverse Sync</span><span class="text-[#FFFF55]">[Aggressive]</span></div>
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>Neural Buffer</span><span class="text-[#FFFF55]">[1024 PB]</span></div>
                            <div class="flex justify-between border-b border-white/10 pb-2"><span>Temporal Security</span><span class="text-[#FFFF55]">[Level 9]</span></div>
                        </div>
                        <div class="p-4 border-2 border-white bg-black/20 text-[#55FFFF] text-xs leading-relaxed">
                            <p class="font-bold mb-2">Item Help</p>
                            <p>Select the neural link speed. Higher speeds may cause temporal displacement in local cluster. Use with caution.</p>
                        </div>
                    </div>
                </div>
                <div class="bg-[#AAAAAA] text-[#0000AA] p-1 text-[10px] flex justify-around font-bold uppercase">
                    <span>↑↓: Select</span>
                    <span>Enter: Change</span>
                    <span>F1: General Help</span>
                    <span>F9: Setup Defaults</span>
                    <span>F10: Save and Exit</span>
                    <span>ESC: Exit</span>
                </div>
            </div>
        `;
        const handleExit = (e) => {
            if (e.key === 'F10' || e.key === 'Escape' || e.key === 'Enter') {
                e.preventDefault();
                window.removeEventListener('keydown', handleExit);
                this.showBoot();
            }
        };
        window.addEventListener('keydown', handleExit);
    }

    showBoot() {
        this.container.innerHTML = `<div class="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"><div class="w-20 h-20 border-2 border-blue-500/40 rounded flex items-center justify-center animate-pulse"><div class="grid grid-cols-2 gap-1 w-10 h-10"><div class="bg-blue-400"></div><div class="bg-blue-400 opacity-60"></div><div class="bg-blue-400 opacity-40"></div><div class="bg-blue-400 opacity-20"></div></div></div><div class="mt-8 text-blue-300 font-light tracking-[0.5em] text-sm">WINDOWS 19584</div></div>`;
        this.playSound('boot');
        setTimeout(() => this.showLogin(), 3000);
    }

    async login() {
        this.showDesktop();
    }

    async logout() {
        location.reload();
    }

    showLogin() {
        if (window.logToFirebase) window.logToFirebase('login_screen_reached');

        const name = 'Traveler';

        this.container.innerHTML = `
            <div id="login-screen" class="fixed inset-0 bg-slate-950 flex items-center justify-center z-50 transition-opacity duration-1000">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div class="relative z-10 flex flex-col items-center">
                    <div class="w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl overflow-hidden">
                        <i data-lucide="user" class="w-12 h-12 text-white/20"></i>
                    </div>
                    <h1 class="text-2xl text-white font-light mb-10 tracking-[0.3em] uppercase">${name}</h1>
                    <button onclick="window.os.login()" class="px-10 py-3 bg-blue-500/20 border border-blue-500/40 rounded-full text-white text-xs tracking-widest hover:bg-blue-500/30 transition-all uppercase active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">Enter Neural Interface</button>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    initIcons() {
        const desktop = document.getElementById('desktop-icons');
        const start = document.getElementById('start-apps');

        this.am.apps.forEach((app, index) => {
            const pos = this.state.iconPositions[app.id] || { x: 40, y: 40 + index * 100 };
            const btn = document.createElement('button');
            btn.id = `icon-${app.id}`;
            btn.className = 'absolute flex flex-col items-center w-24 group outline-none cursor-grab active:cursor-grabbing';
            btn.style.left = `${pos.x}px`;
            btn.style.top = `${pos.y}px`;
            btn.innerHTML = `
                <div class="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all text-blue-400 pointer-events-none">
                    <i data-lucide="${app.icon}" class="w-8 h-8"></i>
                </div>
                <span class="mt-2 text-[8px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white text-center px-1 pointer-events-none drop-shadow-lg">${app.name}</span>
            `;

            btn.onmousedown = (e) => this.handleIconMouseDown(e, app.id);
            btn.onclick = () => {
                if (!btn.dataset.dragged) this.wm.open(app.id);
                delete btn.dataset.dragged;
            };
            desktop.appendChild(btn);

            const startBtn = document.createElement('button');
            startBtn.className = 'flex flex-col items-center p-4 rounded-2xl hover:bg-white/5 group transition-all outline-none';
            startBtn.innerHTML = `<i data-lucide="${app.icon}" class="w-5 h-5 text-blue-400 mb-2"></i><span class="text-[8px] text-white/40 uppercase tracking-widest">${app.name}</span>`;
            startBtn.onclick = () => { this.wm.open(app.id); this.toggleStart(); };
            start.appendChild(startBtn);
        });
        lucide.createIcons();
    }

    updateTime() {
        const now = new Date();
        const time = document.getElementById('taskbar-time');
        const date = document.getElementById('taskbar-date');
        if (time) time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (date) date.textContent = now.toLocaleDateString([], { day: '2-digit', month: '2-digit' }) + '/19584';
    }

    toggleStart() {
        this.playSound('click');
        const menu = document.getElementById('start-menu');
        this.state.isStartOpen = !this.state.isStartOpen;
        menu.classList.toggle('hidden');
    }

    toggleAura() {
        this.playSound('click');
        const sidebar = document.getElementById('aura-sidebar');
        const isOpen = !sidebar.classList.contains('translate-x-[400px]');
        if (isOpen) sidebar.classList.add('translate-x-[400px]');
        else sidebar.classList.remove('translate-x-[400px]');
    }

    toggleRecall() {
        const panel = document.getElementById('recall-panel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) this.renderRecall();
    }

    renderRecall() {
        const container = document.getElementById('recall-snapshots');
        const snaps = [
            { t: '08:42 AM', d: 'OmniExplorer session' },
            { t: '08:15 AM', d: 'QuantumCalc workspace' },
            { t: '07:30 AM', d: 'HoloPad document edit' }
        ];
        container.innerHTML = snaps.map(s => `
            <div onclick="window.os.showNotification('Recall', 'Restoring temporal state from ${s.t}...')" class="w-64 shrink-0 space-y-3 group cursor-pointer">
                <div class="aspect-video bg-white/5 rounded-2xl border border-white/10 group-hover:border-amber-400/50 transition-all overflow-hidden relative">
                    <div class="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10"></div>
                </div>
                <div class="text-[9px] font-bold text-amber-400 uppercase tracking-widest">${s.t}</div>
                <div class="text-[8px] text-white/40 uppercase">${s.d}</div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    toggleTaskView() {
        const desktop = document.getElementById('desktop');
        const isScaled = desktop.style.transform === 'scale(0.85) translateY(-50px)';
        if (isScaled) {
            desktop.style.transform = 'scale(1) translateY(0)';
            document.getElementById('task-view-overlay')?.remove();
        } else {
            desktop.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            desktop.style.transform = 'scale(0.85) translateY(-50px)';
            const overlay = document.createElement('div');
            overlay.id = 'task-view-overlay';
            overlay.className = 'fixed inset-0 z-[150] flex flex-col items-center justify-end pb-12 bg-black/20 backdrop-blur-sm';
            overlay.innerHTML = `<div class="flex gap-4 p-4 glass rounded-3xl border border-white/10 animate-in slide-in-from-bottom-4">
                <div onclick="window.os.toggleTaskView()" class="w-48 h-28 rounded-xl bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center cursor-pointer">
                    <span class="text-[10px] font-bold uppercase tracking-widest text-blue-400">Main Node</span>
                </div>
                <div onclick="window.os.showNotification('Access Restricted', 'Node sync in progress...')" class="w-48 h-28 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                    <span class="text-[10px] font-bold uppercase tracking-widest opacity-20">Secondary Node</span>
                </div>
            </div>`;
            desktop.appendChild(overlay);
            overlay.onclick = () => this.toggleTaskView();
        }
    }

    handleIconMouseDown(e, appId) {
        if (e.button !== 0) return;
        const btn = document.getElementById(`icon-${appId}`);
        const startX = e.clientX;
        const startY = e.clientY;
        const initX = parseInt(btn.style.left);
        const initY = parseInt(btn.style.top);
        let moved = false;

        const onMouseMove = (mE) => {
            const dx = mE.clientX - startX;
            const dy = mE.clientY - startY;
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
            btn.style.left = `${initX + dx}px`;
            btn.style.top = `${initY + dy}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            if (moved) {
                btn.dataset.dragged = 'true';
                this.state.iconPositions[appId] = {
                    x: parseInt(btn.style.left),
                    y: parseInt(btn.style.top)
                };
                this.saveState();
            }
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    showDesktop() {
        this.container.innerHTML = `
            <div id="desktop" class="relative h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none">
                <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-black"></div>

                <!-- Icons -->
                <div id="desktop-icons" class="absolute inset-0 z-10"></div>

                <!-- Windows -->
                <div id="windows-layer" class="absolute inset-0 pointer-events-none z-20"></div>

                <!-- Recall Panel -->
                <div id="recall-panel" class="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-3xl hidden flex-col p-12 animate-in fade-in">
                    <div class="flex items-center justify-between mb-12">
                        <div class="flex items-center gap-4">
                            <div class="p-3 bg-amber-500/20 rounded-2xl text-amber-400"><i data-lucide="history" class="w-8 h-8"></i></div>
                            <h2 class="text-3xl font-light tracking-[0.2em] uppercase text-white">Recall AI</h2>
                        </div>
                        <button onclick="window.os.toggleRecall()" class="p-4 hover:bg-white/10 rounded-full transition-all"><i data-lucide="x" class="w-8 h-8 text-white/40"></i></button>
                    </div>
                    <div class="flex-1 flex gap-10 overflow-x-auto custom-scrollbar items-start" id="recall-snapshots"></div>
                </div>

                <!-- Sidebar / Aura -->
                <div id="aura-sidebar" class="fixed top-4 right-4 bottom-20 w-80 glass-mica rounded-3xl z-[55] translate-x-[400px] transition-transform duration-500 flex flex-col overflow-hidden shadow-2xl">
                    <div class="p-6 border-b border-white/5 flex items-center justify-between">
                        <span class="text-[10px] font-bold tracking-widest uppercase text-purple-400">Aura AI</span>
                        <button onclick="window.os.toggleAura()" class="text-white/20 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
                    </div>
                    <div id="aura-chat" class="flex-1 p-6 overflow-auto custom-scrollbar space-y-4"></div>
                    <div class="p-4 bg-black/20 border-t border-white/5">
                        <input type="text" id="aura-input" placeholder="Neural query..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white outline-none focus:border-purple-500/40 transition-all">
                    </div>
                </div>

                <!-- Start Menu -->
                <div id="start-menu" class="fixed bottom-20 left-1/2 -translate-x-1/2 w-[540px] h-[600px] glass-mica rounded-3xl z-[60] p-8 shadow-2xl hidden flex-col animate-in slide-in-from-bottom-4 border border-white/10">
                    <div class="flex-1">
                        <div class="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] mb-6 px-2">Pinned Nodes</div>
                        <div id="start-apps" class="grid grid-cols-4 gap-4"></div>
                    </div>
                    <div class="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <div class="flex items-center gap-3 user-display-container">
                            <div class="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400"><i data-lucide="user" class="w-4 h-4"></i></div>
                            <span class="text-[10px] font-bold tracking-widest uppercase">Traveler</span>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.os.logout()" class="p-2 hover:bg-white/10 rounded-xl text-white/40" title="Sign Out"><i data-lucide="log-out" class="w-4 h-4"></i></button>
                            <button onclick="localStorage.clear(); location.reload();" class="p-2 hover:bg-white/10 rounded-xl text-white/40" title="Clear System Cache"><i data-lucide="refresh-cw" class="w-4 h-4"></i></button>
                            <button onclick="window.os.playSound('shutdown'); setTimeout(() => location.reload(), 2000)" class="p-2 hover:bg-red-500/20 rounded-xl text-red-500" title="Shut Down"><i data-lucide="power" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                </div>

                <!-- Taskbar -->
                <div id="taskbar" class="fixed bottom-0 left-0 right-0 h-16 bg-slate-950/40 backdrop-blur-3xl border-t border-white/5 flex items-center justify-between px-6 z-[100]">
                    <div class="flex items-center gap-4">
                        <button onclick="window.os.showNotification('Widgets', 'Fetching real-time data from Mars...')" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group active:scale-90">
                            <i data-lucide="layout-grid" class="w-5 h-5 text-white/40"></i>
                        </button>
                    </div>
                    <div class="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        <button onclick="window.os.toggleStart()" aria-label="Start" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group active:scale-90">
                            <i data-lucide="layout-grid" class="w-5 h-5 text-blue-400"></i>
                        </button>
                        <button onclick="window.os.toggleTaskView()" aria-label="Task View" class="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90">
                            <i data-lucide="layers" class="w-5 h-5 text-emerald-400"></i>
                        </button>
                        <button onclick="window.os.toggleRecall()" aria-label="Recall" class="p-2.5 hover:bg-white/10 rounded-xl transition-all active:scale-90">
                            <i data-lucide="history" class="w-5 h-5 text-amber-400"></i>
                        </button>
                        <div class="w-px h-6 bg-white/10 mx-1"></div>
                        <div id="taskbar-apps" class="flex items-center gap-1.5"></div>
                    </div>
                    <div class="flex items-center gap-4">
                        <button onclick="window.os.toggleAura()" class="p-2.5 hover:bg-white/10 rounded-xl transition-all group active:scale-90">
                            <i data-lucide="sparkles" class="w-5 h-5 text-purple-400"></i>
                        </button>
                        <div class="flex flex-col items-end">
                            <span id="taskbar-time" class="text-xs font-bold text-white/80">00:00</span>
                            <span id="taskbar-date" class="text-[8px] opacity-30">00/00/19584</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.aura.init();
        this.initIcons();
        this.updateTime();

        const desktopEl = document.getElementById('desktop');
        desktopEl.oncontextmenu = (e) => this.showContextMenu(e);
        setInterval(() => this.updateTime(), 1000);

        // Restore windows from state
        const savedWindows = [...this.state.windows];
        this.state.windows = []; // Clear and re-open to render
        savedWindows.forEach(w => {
            this.wm.open(w.id);
            // Re-apply saved coords and tabs
            const opened = this.state.windows.find(win => win.id === w.id);
            Object.assign(opened, w);
            const el = document.getElementById(`window-${w.id}`);
            el.style.left = `${w.x}px`;
            el.style.top = `${w.y}px`;
            el.style.width = `${w.width}px`;
            el.style.height = `${w.height}px`;
            if (w.isMaximized) el.classList.add('maximized');
            if (w.isMinimized) el.classList.add('minimized');
            this.wm.updateTabs(w.id);
            this.wm.updateContent(w.id);
        });
        this.updateTaskbar();
    }

    updateTaskbar() {
        const container = document.getElementById('taskbar-apps');
        if (!container) return;
        container.innerHTML = this.state.windows.map(win => {
            const app = this.am.getApp(win.id);
            const active = this.state.focusedWindowId === win.id;
            return `
                <button onclick="window.os.wm.focus('${win.id}')"
                        class="h-10 px-4 flex items-center space-x-2 rounded-xl transition-all border ${active ? 'bg-blue-600/20 border-blue-500/40' : 'bg-white/5 border-white/5 hover:bg-white/10'}">
                    <i data-lucide="${app.icon}" class="w-4 h-4 text-blue-400"></i>
                    <div class="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_#3b82f6]"></div>
                </button>
            `;
        }).join('');
        lucide.createIcons();
    }

    handleCalc(val) {
        const display = document.getElementById('calc-display');
        if (val === 'C') this.state.calcValue = '0';
        else if (val === '=') {
            try {
                const sanitized = this.state.calcValue.replace(/[^0-9+\-*/.]/g, '');
                this.state.calcValue = new Function(`return ${sanitized}`)().toString();
            } catch {
                this.state.calcValue = 'Error';
                this.playSound('error');
            }
        } else {
            this.state.calcValue = this.state.calcValue === '0' ? val.toString() : this.state.calcValue + val;
        }
        display.textContent = this.state.calcValue;
    }

    handleUrlKeydown(e, winId) {
        if (e.key === 'Enter') {
            let url = e.target.value.trim();
            if (url && !url.startsWith('http')) url = 'https://' + url;
            this.navigateBrowser(winId, url);
        }
    }

    navigateBrowser(winId, action) {
        const win = this.state.windows.find(w => w.id === winId);
        if (!win) return;
        const activeTab = win.tabs.find(t => t.id === win.activeTabId);
        const iframe = document.getElementById(`browser-iframe-${winId}`);
        const overlay = document.getElementById(`browser-overlay-${winId}`);
        const urlInput = document.querySelector(`#window-${winId} input`);

        if (action === 'back') {
            try { iframe.contentWindow.history.back(); } catch(e) {}
        } else if (action === 'forward') {
            try { iframe.contentWindow.history.forward(); } catch(e) {}
        } else if (action === 'reload') {
            iframe.src = iframe.src;
        } else {
            activeTab.url = action;
            activeTab.title = action.split('/')[2] || 'New Node';
            iframe.src = action;
            if (urlInput) urlInput.value = action;
            this.wm.updateTabs(winId);
        }

        this.saveState();

        // Show overlay if common non-iframe sites are detected
        const forbidden = ['google.com', 'facebook.com', 'twitter.com', 'github.com', 'youtube.com'];
        const isForbidden = forbidden.some(site => action.includes(site));
        if (isForbidden) {
            overlay.classList.remove('hidden');
            this.playSound('error');
        } else {
            overlay.classList.add('hidden');
        }
    }

    showNotification(title, text) {
        this.playSound('notif');
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = `<div class="flex items-start space-x-4"><div class="p-2 bg-blue-500/20 rounded-lg text-blue-400"><i data-lucide="info" class="w-4 h-4"></i></div><div class="flex-1"><div class="text-[10px] font-bold text-white mb-1 uppercase tracking-widest">${title}</div><div class="text-[9px] text-white/50 leading-relaxed">${text}</div></div></div>`;
        document.getElementById('desktop').appendChild(toast);
        lucide.createIcons();
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 500); }, 4000);
    }

    showSnapMenu(id, btn) {
        const rect = btn.getBoundingClientRect();
        const menu = document.createElement('div');
        menu.className = 'snap-layouts-menu fixed z-[1000] glass p-2 rounded-xl border border-white/10 flex flex-col space-y-2 shadow-2xl';
        menu.style.top = `${rect.bottom + 10}px`;
        menu.style.left = `${rect.left - 80}px`;
        const layouts = ['left', 'right', 'tl', 'tr', 'bl', 'br'];
        menu.innerHTML = `<div class="grid grid-cols-2 gap-2">${layouts.map(l => `<div onclick="window.os.wm.snap('${id}', '${l}')" class="w-10 h-10 border border-white/20 rounded hover:bg-blue-500/20 cursor-pointer"></div>`).join('')}</div>`;
        document.body.appendChild(menu);
        menu.onmouseleave = () => menu.remove();
    }

    showContextMenu(e) {
        e.preventDefault();
        const existing = document.getElementById('context-menu');
        if (existing) existing.remove();

        const menu = document.createElement('div');
        menu.id = 'context-menu';
        menu.className = 'fixed z-[1000] glass-mica border border-white/10 rounded-xl py-2 w-48 shadow-2xl animate-in fade-in zoom-in-95 duration-100';
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;

        const items = [
            { icon: 'refresh-cw', label: 'Refresh Nexus', action: () => location.reload() },
            { icon: 'plus', label: 'New Node', action: () => this.showNotification('System', 'Creating new neural node...') },
            { icon: 'monitor', label: 'Display Settings', action: () => this.wm.open('system') },
            { icon: 'palette', label: 'Personalize', action: () => this.showNotification('Personalization', 'Neural themes coming soon.') },
            { icon: 'info', label: 'System Info', action: () => this.wm.open('system') }
        ];

        menu.innerHTML = items.map(item => `
            <div class="px-4 py-2 hover:bg-white/10 flex items-center gap-3 cursor-pointer group context-item">
                <i data-lucide="${item.icon}" class="w-4 h-4 text-white/40 group-hover:text-blue-400"></i>
                <span class="text-[10px] uppercase tracking-widest text-white/80">${item.label}</span>
            </div>
        `).join('');

        document.body.appendChild(menu);
        lucide.createIcons();

        const itemDivs = menu.querySelectorAll('.context-item');
        itemDivs.forEach((div, i) => {
            div.onclick = () => {
                items[i].action();
                menu.remove();
            };
        });

        const closeMenu = (clickE) => {
            if (!menu.contains(clickE.target)) {
                menu.remove();
                document.removeEventListener('mousedown', closeMenu);
            }
        };
        setTimeout(() => document.addEventListener('mousedown', closeMenu), 10);
    }
}

// Global instance
window.os = new OS();
window.os.start();
