import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, LayoutDashboard, History, Settings, Upload } from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    
    // In a real app, you would use actual API endpoints with Axios
    // setTimeout simulates the network request to our FastAPI backend
    setTimeout(() => {
      setResult({
        title: "The Future of AI Storage",
        summary: "Artificial intelligence requires massive amounts of storage and compute power to operate efficiently. As models grow larger, researchers are developing new compression techniques to reduce hardware requirements without sacrificing performance.",
        keywords: ["AI", "Storage", "Compute", "Compression"],
        language: "English"
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex gap-8 max-w-6xl mx-auto h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-64 glass-panel rounded-2xl p-6 hidden md:flex flex-col gap-2">
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Menu</h2>
        </div>
        {[
          { icon: LayoutDashboard, label: 'Dashboard', active: true },
          { icon: History, label: 'History' },
          { icon: Settings, label: 'Settings' }
        ].map((item, i) => (
          <button key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}>
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        <header className="glass-panel p-6 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, User 👋</h1>
            <p className="text-gray-400 text-sm">Here's what's happening with your summaries</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface px-4 py-2 rounded-lg border border-gray-800 text-center">
              <span className="block text-xs text-gray-500">Total</span>
              <span className="font-bold text-lg neon-text">128</span>
            </div>
            <div className="bg-surface px-4 py-2 rounded-lg border border-gray-800 text-center">
              <span className="block text-xs text-gray-500">Languages</span>
              <span className="font-bold text-lg neon-text">5</span>
            </div>
          </div>
        </header>

        <div className="glass-panel p-6 rounded-2xl flex-1 flex flex-col relative">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your long text here..."
            className="w-full h-48 bg-surface/50 border border-gray-800 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-primary/50 resize-none transition-colors"
          />
          
          <div className="mt-4 flex justify-between items-center">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Upload className="w-4 h-4" />
              Upload file
            </button>
            <button 
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {loading ? 'Processing...' : 'Summarize'}
            </button>
          </div>
          
          <AnimatePresence>
            {result && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 pt-8 border-t border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-semibold text-primary/80 bg-primary/10 px-2 py-1 rounded border border-primary/20 mb-2 inline-block">
                      {result.language}
                    </span>
                    <h2 className="text-2xl font-bold mt-1">{result.title}</h2>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white bg-surface rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {result.summary}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-surface border border-gray-800 rounded-full text-xs text-gray-400">
                      {kw}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
