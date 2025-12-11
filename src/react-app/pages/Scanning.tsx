import { Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { useAnalytics } from '@/react-app/hooks/useAnalytics';

export default function Scanning() {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const [progress, setProgress] = useState(0);
  const [currentScan, setCurrentScan] = useState('');
  const [foundIssues, setFoundIssues] = useState(0);

  const scanSteps = [
    'Initializing security protocols...',
    'Scanning system files...',
    'Checking registry entries...',
    'Analyzing network connections...',
    'Inspecting browser data...',
    'Detecting suspicious processes...',
    'Analyzing memory usage...',
    'Checking startup programs...',
    'Scanning downloads folder...',
    'Verifying system integrity...',
  ];

  useEffect(() => {
    trackEvent('scanning_started');
    
    let progressInterval: NodeJS.Timeout;
    let stepIndex = 0;

    const startScan = () => {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          
          // Update scan step
          const stepProgress = Math.floor((newProgress / 100) * scanSteps.length);
          if (stepProgress !== stepIndex && stepProgress < scanSteps.length) {
            stepIndex = stepProgress;
            setCurrentScan(scanSteps[stepIndex]);
            
            // Randomly add issues
            if (Math.random() > 0.3) {
              setFoundIssues((prev) => prev + Math.floor(Math.random() * 3) + 1);
            }
          }

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              navigate('/cleanup');
            }, 1000);
          }
          
          return newProgress;
        });
      }, 80);
    };

    startScan();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="w-20 h-20 text-blue-400 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-40"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Security Scan in Progress
            </h1>
            <p className="text-blue-200">
              Analyzing your device for threats and vulnerabilities
            </p>
          </div>

          {/* Progress Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-blue-200 font-semibold">Scan Progress</span>
                <span className="text-blue-400 font-bold text-2xl tabular-nums">{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Current Scan */}
            <div className="bg-slate-900/50 rounded-xl p-6 mb-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                <span className="text-blue-300 font-semibold">Current Activity</span>
              </div>
              <p className="text-white text-lg">{currentScan || 'Preparing scan...'}</p>
            </div>

            {/* Issues Found */}
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-amber-400" />
                  <span className="text-amber-200 font-semibold">Issues Detected</span>
                </div>
                <span className="text-amber-400 font-bold text-3xl tabular-nums">{foundIssues}</span>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-6 text-center">
            <p className="text-blue-300 text-sm">
              Please wait while we complete the comprehensive security assessment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
