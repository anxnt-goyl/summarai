import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Globe, History, Zap } from 'lucide-react';

export default function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-32">
      <motion.div 
        className="max-w-4xl text-center space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          <span>AI-powered summarization engine</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Turn long text into <br />
          <span className="neon-text">intelligent summaries</span> instantly
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Multi-language detection, smart keyword extraction, and full history — built for speed and clarity.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 pt-8">
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">Try it free</Link>
          <button className="btn-outline text-lg px-8 py-3">Watch demo</button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full"
      >
        {[
          { icon: Globe, title: "Multi-lingual", desc: "Auto-detects and summarizes text in 50+ languages." },
          { icon: FileText, title: "Smart Extraction", desc: "Pulls out key points, auto-generates titles and keywords." },
          { icon: History, title: "Cloud History", desc: "Your summaries are securely saved and fully searchable." }
        ].map((feature, i) => (
          <div key={i} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
              <feature.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
