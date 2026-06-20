import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Summar<span className="text-primary">AI</span></span>
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="btn-outline">Log in</Link>
          <Link to="/dashboard" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </nav>
  );
}
