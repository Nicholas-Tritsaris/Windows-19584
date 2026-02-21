import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import {
  Monitor,
  Cpu,
  Database,
  Wifi,
  Battery,
  Clock,
  Search,
  Layout,
  FileText,
  Globe,
  Calculator,
  X,
  Minus,
  Maximize2,
  Settings,
  Folder,
  Terminal,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// --- BIOS Component ---
const BIOS = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const fullText = [
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

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullText.length) {
        setLines(prev => [...prev, fullText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono p-10 text-lg flex flex-col items-start justify-start z-50 overflow-hidden">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};

// --- Boot Screen Component ---
const BootScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        <div className="w-32 h-32 border-4 border-blue-500 rounded-lg flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500 opacity-20 blur-xl animate-pulse"></div>
             <div className="grid grid-cols-2 gap-1 w-20 h-20">
                <div className="bg-blue-400"></div>
                <div className="bg-blue-400 opacity-80"></div>
                <div className="bg-blue-400 opacity-60"></div>
                <div className="bg-blue-400 opacity-40"></div>
             </div>
        </div>
      </motion.div>
      <div className="mt-10 flex space-x-2">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="w-2 h-2 bg-blue-400 rounded-full"
          />
        ))}
      </div>
      <div className="mt-10 text-blue-300 font-light tracking-[0.5em] text-xl">WINDOWS 19584</div>
    </div>
  );
};

// --- Login Screen Component ---
const LoginScreen = ({ onLogin }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-40 h-40 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.5)]">
           <User size={80} className="text-white/40" />
        </div>
        <h1 className="text-4xl text-white font-light mb-8 tracking-widest uppercase">Quantum Traveler</h1>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onLogin}
          className="px-12 py-3 bg-white/10 border border-white/20 backdrop-blur-lg rounded-full text-white text-xl hover:bg-white/20 transition-all"
        >
          Sign In
        </motion.button>
      </motion.div>

      <div className="absolute bottom-10 left-10 text-white/60 font-light">
          <div className="text-6xl mb-2 font-mono">08:42</div>
          <div className="text-xl">Friday, October 24, 19584</div>
      </div>
    </div>
  );
};

// --- Window Component ---
const Window = ({ app, onClose, onFocus, zIndex }) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: app.x, y: app.y }}
      animate={{ scale: 1, opacity: 1, x: app.x, y: app.y }}
      exit={{ scale: 0.9, opacity: 0 }}
      onMouseDown={onFocus}
      style={{ zIndex, position: 'absolute', top: 0, left: 0 }}
      className="w-[640px] h-[440px] bg-slate-900/90 backdrop-blur-3xl border border-blue-500/30 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-12 bg-white/5 flex items-center justify-between px-4 cursor-move border-b border-white/10"
      >
        <div className="flex items-center space-x-3 text-blue-400">
          {app.icon}
          <span className="text-xs font-semibold tracking-widest uppercase">{app.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 cursor-pointer text-white/60">
            <Minus size={16} />
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 cursor-pointer text-white/60">
            <Maximize2 size={16} />
          </div>
          <div
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500/80 cursor-pointer text-white/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 text-white overflow-auto">
        {app.content}
      </div>
    </motion.div>
  );
};

// --- Main App Component ---
export default function App() {
  const [stage, setStage] = useState('bios');
  const [windows, setWindows] = useState([]);
  const [focusedWindow, setFocusedWindow] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [calcValue, setCalcValue] = useState('0');

  const handleCalc = (val) => {
    if (val === 'C') setCalcValue('0');
    else if (val === '=') {
        try {
            // eslint-disable-next-line no-eval
            setCalcValue(eval(calcValue).toString());
        } catch {
            setCalcValue('Error');
        }
    }
    else {
        setCalcValue(prev => prev === '0' ? val.toString() : prev + val);
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  const apps = [
    {
      id: 'holopad',
      name: 'HoloPad',
      icon: <FileText size={20} />,
      content: (
        <div className="flex flex-col h-full">
            <div className="flex space-x-4 mb-4 text-[10px] uppercase tracking-widest text-blue-400/60 border-b border-blue-500/20 pb-2">
                <span>File</span><span>Edit</span><span>Format</span><span>View</span>
            </div>
            <textarea
                className="flex-1 bg-transparent border-none outline-none text-blue-100 resize-none font-mono text-sm leading-relaxed"
                placeholder="Type your thoughts across dimensions..."
                defaultValue={`LOG START: STARDATE 19584.23
--------------------------
Everything is proceeding as planned in the 4th quadrant.
Temporal stability at 98.4%.
No anomalies detected in the local cluster.`}
            />
        </div>
      )
    },
    {
      id: 'calc',
      name: 'QuantumCalc',
      icon: <Calculator size={20} />,
      content: (
        <div className="flex flex-col h-full">
           <div className="bg-blue-950/40 p-6 rounded-lg mb-4 text-right text-3xl font-mono text-blue-300 border border-blue-500/20 shadow-inner">
               {calcValue}
           </div>
           <div className="grid grid-cols-4 gap-3 flex-1">
                {[7,8,9,'/',4,5,6,'*',1,2,3,'-','C',0,'=','+'].map(btn => (
                    <button
                        key={btn}
                        onClick={() => handleCalc(btn)}
                        className={`p-4 rounded-lg transition-all font-mono text-lg ${typeof btn === 'number' ? 'bg-slate-800/50 hover:bg-slate-700/50 border border-white/5' : 'bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/20'}`}
                    >
                    {btn}
                    </button>
                ))}
           </div>
        </div>
      )
    },
    {
      id: 'galaxy',
      name: 'Galactic Browser',
      icon: <Globe size={20} />,
      content: (
        <div className="flex flex-col h-full">
            <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-t-xl border-b border-white/10">
                <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <div className="flex-1 mx-4 bg-black/60 rounded-full px-4 py-1.5 text-[10px] text-blue-300/60 tracking-wider flex justify-between items-center border border-blue-500/20">
                    <span>HTTPS://UNIVERSAL-NET.HUB/NEXUS</span>
                    <Search size={12} />
                </div>
            </div>
            <div className="flex-1 bg-gradient-to-b from-blue-900/10 to-transparent p-8 flex flex-col items-center justify-center text-center">
                <motion.div
                    animate={{ rotateY: 360, filter: ["drop-shadow(0 0 10px #3b82f6)", "drop-shadow(0 0 20px #3b82f6)", "drop-shadow(0 0 10px #3b82f6)"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <Globe size={100} className="text-blue-500/50" />
                </motion.div>
                <h2 className="text-4xl font-light text-white mb-4 tracking-[0.2em] uppercase">Nexus Universal</h2>
                <p className="text-white/40 max-w-md text-xs leading-loose uppercase tracking-widest">Connect to any node in the local supercluster. Instant latency via entanglement protocol.</p>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                    {['Neural Net', 'Star Maps', 'Time Market', 'Void News'].map(link => (
                        <div key={link} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/20 cursor-pointer transition-all text-[10px] uppercase tracking-widest hover:border-blue-500/40">
                            {link}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )
    },
    {
        id: 'explorer',
        name: 'OmniExplorer',
        icon: <Folder size={20} />,
        content: (
            <div className="flex flex-col h-full">
                <div className="flex items-center space-x-6 mb-8 text-[10px] uppercase tracking-widest text-white/40">
                    <span className="text-blue-400 border-b-2 border-blue-400 pb-1 cursor-pointer">Quick Access</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Neural Vault</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Star-Drive</span>
                </div>
                <div className="grid grid-cols-4 gap-8">
                    {[
                        { name: 'Neural-Vault', type: 'folder' },
                        { name: 'Time-Logs', type: 'folder' },
                        { name: 'Space-Cuts', type: 'folder' },
                        { name: 'Core-Data', type: 'folder' },
                        { name: 'Manifest.ion', type: 'file' },
                        { name: 'Reality.cfg', type: 'file' },
                        { name: 'Echoes.wav', type: 'file' },
                        { name: 'System.bin', type: 'file' },
                    ].map(item => (
                        <div key={item.name} className="flex flex-col items-center space-y-3 group cursor-pointer">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="p-5 bg-white/5 rounded-2xl group-hover:bg-blue-600/20 border border-white/5 group-hover:border-blue-500/40 transition-all shadow-lg"
                            >
                                {item.type === 'folder' ?
                                    <Folder size={48} className="text-blue-400/80" /> :
                                    <FileText size={48} className="text-purple-400/80" />
                                }
                            </motion.div>
                            <span className="text-[10px] text-white/70 text-center uppercase tracking-tighter">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 'system',
        name: 'System Core',
        icon: <Settings size={20} />,
        content: (
            <div className="space-y-8">
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex items-center space-x-5">
                        <div className="p-3 bg-blue-500/10 rounded-xl"><Cpu className="text-blue-400" /></div>
                        <div>
                            <div className="text-xs font-semibold tracking-widest uppercase mb-1">Neuro-Processor</div>
                            <div className="text-[10px] text-white/40 uppercase">Load: 14.2% | Temp: 32.1 K</div>
                        </div>
                    </div>
                    <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '14.2%' }}
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_#3b82f6]"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/10 shadow-xl">
                    <div className="flex items-center space-x-5">
                        <div className="p-3 bg-purple-500/10 rounded-xl"><Database className="text-purple-400" /></div>
                        <div>
                            <div className="text-xs font-semibold tracking-widest uppercase mb-1">Quantum Storage</div>
                            <div className="text-[10px] text-white/40 uppercase">Used: 4.8 / 1024 PB</div>
                        </div>
                    </div>
                    <div className="w-40 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '0.4%' }}
                            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_#a855f7]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center group hover:bg-blue-500/20 transition-all">
                        <div className="text-[10px] text-blue-400 uppercase tracking-[0.3em] mb-3">System Health</div>
                        <div className="text-2xl font-light tracking-widest text-blue-100">OPTIMAL</div>
                    </div>
                    <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20 text-center group hover:bg-green-500/20 transition-all">
                        <div className="text-[10px] text-green-400 uppercase tracking-[0.3em] mb-3">Temporal Sync</div>
                        <div className="text-2xl font-light tracking-widest text-green-100">LOCKED</div>
                    </div>
                </div>
            </div>
        )
    }
  ];

  const openApp = (app) => {
    if (!windows.find(w => w.id === app.id)) {
      const offset = windows.length * 40;
      setWindows([...windows, { ...app, x: 250 + offset, y: 100 + offset }]);
    }
    setFocusedWindow(app.id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  if (stage === 'bios') return <BIOS onComplete={() => setStage('boot')} />;
  if (stage === 'boot') return <BootScreen onComplete={() => setStage('login')} />;
  if (stage === 'login') return <LoginScreen onLogin={() => setStage('desktop')} />;

  return (
    <div
        className="relative h-screen w-screen overflow-hidden bg-slate-950 font-sans select-none"
        onContextMenu={handleContextMenu}
        onClick={closeContextMenu}
    >
      {/* Desktop Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black"></div>
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse delay-700"></div>

          {/* Grid effect */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 p-10 flex flex-col gap-10 items-start">
        {apps.map(app => (
          <motion.div
            key={app.id}
            onDoubleClick={() => openApp(app)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center w-24 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/10"
          >
            <div className="p-4 bg-blue-500/10 border border-white/5 rounded-2xl group-hover:border-blue-500/40 transition-all text-blue-400 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                {React.cloneElement(app.icon, { size: 36 })}
            </div>
            <span className="mt-3 text-[10px] font-medium text-white/70 text-center uppercase tracking-[0.2em] group-hover:text-white transition-colors">{app.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {windows.map((app, index) => (
            <div key={app.id} className="pointer-events-auto">
              <Window
                app={app}
                onClose={() => closeWindow(app.id)}
                onFocus={() => setFocusedWindow(app.id)}
                zIndex={focusedWindow === app.id ? 100 : index + 30}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute z-[1000] bg-slate-900/95 border border-blue-500/40 p-2 rounded-xl shadow-2xl min-w-[200px] backdrop-blur-xl"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                {['Refresh Neural Link', 'Personalize HUD', 'System Diagnostic', 'New Holo-Node'].map(item => (
                    <div key={item} className="px-4 py-2.5 hover:bg-blue-600/30 cursor-pointer text-[10px] uppercase tracking-widest rounded-lg transition-colors flex items-center justify-between group">
                        {item}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </motion.div>
        )}
      </AnimatePresence>

      {/* Start Menu */}
      <AnimatePresence>
        {isStartOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="absolute bottom-16 left-4 w-[480px] h-[600px] bg-slate-900/90 backdrop-blur-3xl border border-blue-500/20 rounded-3xl z-[60] p-8 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col"
          >
            <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-white/5">
               <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-400/30 shadow-lg">
                  <User size={32} className="text-blue-400" />
               </div>
               <div>
                  <div className="text-white text-lg font-light tracking-widest uppercase">Quantum Traveler</div>
                  <div className="text-blue-400/50 text-[10px] uppercase tracking-[0.3em] mt-1">Dimension 7-A | Node 04</div>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-6 flex-1 overflow-auto pr-2 custom-scrollbar">
              {apps.map(app => (
                <div
                  key={app.id}
                  onClick={() => { openApp(app); setIsStartOpen(false); }}
                  className="flex flex-col items-center p-5 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group border border-transparent hover:border-white/5"
                >
                  <div className="text-blue-400 mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all">{app.icon}</div>
                  <span className="text-[10px] text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">{app.name}</span>
                </div>
              ))}
              {/* Extra placeholder apps */}
              {['Void-Terminal', 'Neural-Sync', 'Time-Flux'].map(name => (
                 <div
                 key={name}
                 className="flex flex-col items-center p-5 rounded-2xl opacity-40 grayscale cursor-not-allowed group border border-transparent"
               >
                 <div className="text-slate-500 mb-3"><Monitor size={20} /></div>
                 <span className="text-[10px] text-slate-500 uppercase tracking-widest">{name}</span>
               </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
               <div className="flex space-x-6">
                  <div className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer group">
                    <Settings size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer group">
                    <Folder size={20} className="text-white/40 group-hover:text-white transition-colors" />
                  </div>
               </div>
               <div
                    className="flex items-center space-x-3 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all cursor-pointer group"
                    onClick={() => setStage('login')}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-red-500/80 group-hover:text-red-500">Power Off</span>
                  <X size={16} className="text-red-500/80 group-hover:text-red-500" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center h-full space-x-2">
          <motion.button
            aria-label="Start"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all shadow-lg ${isStartOpen ? 'bg-blue-600/30 border border-blue-500/50' : 'bg-white/5 border border-white/5 hover:bg-white/10'} text-blue-400`}
          >
             <Layout size={24} />
          </motion.button>

          <div className="h-8 w-px bg-white/10 mx-4"></div>

          <div className="flex items-center space-x-2">
            {windows.map(w => (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    key={w.id}
                    onClick={() => setFocusedWindow(w.id)}
                    className={`h-11 px-4 flex items-center space-x-3 rounded-xl transition-all cursor-pointer border ${focusedWindow === w.id ? 'bg-blue-600/20 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                >
                    <div className="text-blue-400">{w.icon}</div>
                    <div className="w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_5px_#3b82f6]"></div>
                </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-5 text-white/40">
             <div className="relative cursor-help hover:text-blue-400 transition-colors">
                <Wifi size={18} />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
             </div>
             <div className="relative cursor-help hover:text-green-400 transition-colors">
                <Battery size={18} className="rotate-90" />
             </div>
             <Search size={18} className="cursor-pointer hover:text-white transition-colors" />
          </div>

          <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
              <div className="flex flex-col items-end font-mono">
                <span className="text-xs text-blue-100 font-bold tracking-widest">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                <span className="text-[9px] text-white/30 uppercase tracking-tighter">{time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })}/19584</span>
              </div>
              <div className="w-1 h-10 bg-blue-500/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
