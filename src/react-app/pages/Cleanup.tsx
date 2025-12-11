import { CheckCircle, Shield, Trash2, Zap, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useAnalytics } from '@/react-app/hooks/useAnalytics';

export default function Cleanup() {
  const navigate = useNavigate();
  const { sessionId, trackEvent } = useAnalytics();
  const [cleanupProgress, setCleanupProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [detailedThreats] = useState([
    { name: 'Trojan.Generic.KD.12345678', type: 'Trojan', severity: 'Critical' },
    { name: 'Adware.BrowserHelper.v2', type: 'Adware', severity: 'High' },
    { name: 'Spyware.NetworkMonitor', type: 'Spyware', severity: 'Critical' },
    { name: 'PUP.Optional.Toolbar', type: 'PUP', severity: 'Medium' },
    { name: 'Malware.CryptoMiner.XMR', type: 'Malware', severity: 'Critical' },
  ]);

  const cleanupSteps = [
    'Quarantining detected threats...',
    'Removing malicious files...',
    'Clearing browser cache and cookies...',
    'Deleting temporary files...',
    'Optimizing system registry...',
    'Updating security definitions...',
    'Repairing system files...',
    'Strengthening firewall rules...',
    'Finalizing cleanup process...',
    'Verifying system integrity...',
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepIndex = 0;

    const startCleanup = () => {
      progressInterval = setInterval(() => {
        setCleanupProgress((prev) => {
          const newProgress = prev + 1;
          
          const stepProgress = Math.floor((newProgress / 100) * cleanupSteps.length);
          if (stepProgress !== stepIndex && stepProgress < cleanupSteps.length) {
            stepIndex = stepProgress;
            setCurrentAction(cleanupSteps[stepIndex]);
          }

          if (newProgress >= 100) {
            clearInterval(progressInterval);
            setIsComplete(true);
            
            // Track threat removal
            fetch('/api/threats/remove', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ session_id: sessionId }),
            }).catch(console.error);
            
            trackEvent('cleanup_complete');
          }
          
          return newProgress;
        });
      }, 60);
    };

    // Track threats on mount
    fetch('/api/threats/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        threats: detailedThreats,
      }),
    }).catch(console.error);

    startCleanup();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-green-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {!isComplete ? (
            <>
              {/* Cleanup Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Shield className="w-20 h-20 text-green-400 animate-pulse" />
                    <div className="absolute inset-0 bg-green-400 blur-2xl opacity-40"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Removing Threats
                </h1>
                <p className="text-green-200">
                  Cleaning and securing your device
                </p>
              </div>

              {/* Cleanup Progress */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-green-200 font-semibold">Cleanup Progress</span>
                    <span className="text-green-400 font-bold text-2xl tabular-nums">{cleanupProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300 ease-out"
                      style={{ width: `${cleanupProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Trash2 className="w-5 h-5 text-green-400" />
                    <span className="text-green-300 font-semibold">Current Action</span>
                  </div>
                  <p className="text-white text-lg">{currentAction || 'Preparing cleanup...'}</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-green-300 text-sm">
                  Do not close this window while cleanup is in progress...
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Success Header */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <CheckCircle className="w-24 h-24 text-green-400" />
                    <div className="absolute inset-0 bg-green-400 blur-2xl opacity-50"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Device Secured!
                </h1>
                <p className="text-green-200 text-lg">
                  All threats have been removed and your device is protected
                </p>
              </div>

              {/* Results Summary */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Cleanup Summary
                </h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-900/30 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">47</div>
                    <div className="text-green-200">Threats Removed</div>
                  </div>
                  <div className="bg-blue-900/30 rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">1.2GB</div>
                    <div className="text-blue-200">Space Freed</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-green-200">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Malware and viruses removed</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-200">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Privacy-invasive software deleted</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-200">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>System optimized for performance</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-200">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Security definitions updated</span>
                  </div>
                </div>
              </div>

              {/* Detailed Threat Report */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-400" />
                  Detailed Threat Report
                </h2>
                <div className="space-y-3">
                  {detailedThreats.map((threat, index) => (
                    <div
                      key={index}
                      className="bg-slate-900/50 border border-green-500/20 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{threat.name}</p>
                          <p className="text-green-300 text-sm">Type: {threat.type} • Severity: {threat.severity}</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <button
                onClick={() => navigate('/education')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl py-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6" />
                  <span>Learn How to Stay Protected</span>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
