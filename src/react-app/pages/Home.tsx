import { Shield, AlertTriangle, QrCode, BarChart3, Brain } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Generate QR code URL that points to the malware detection page
    const scanUrl = `${window.location.origin}/scan`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(scanUrl)}`;
    setQrCodeUrl(qrUrl);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="w-20 h-20 text-blue-400" />
              <div className="absolute inset-0 bg-blue-400 blur-xl opacity-30"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            QR-Secure Sense
          </h1>
          <p className="text-xl text-blue-200">
            Interactive Cybersecurity Awareness Training
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-amber-200 mb-2">
                  Educational Simulation
                </h2>
                <p className="text-amber-100 leading-relaxed">
                  This is a safe, educational tool designed to demonstrate how malicious QR codes 
                  and fake security warnings can trick users. No actual malware is involved.
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <QrCode className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Scan to Begin</h3>
              </div>
              <div className="bg-white rounded-xl p-6 mb-4">
                {qrCodeUrl && (
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code to simulate malware detection" 
                    className="w-full h-auto"
                  />
                )}
              </div>
              <p className="text-blue-200 text-center">
                Use your mobile device to scan this QR code
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <p className="text-blue-100">
                    How malicious QR codes can lead to fake security warnings
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <p className="text-blue-100">
                    The anatomy of scareware and social engineering tactics
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <p className="text-blue-100">
                    How to identify and respond to fake security alerts
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  </div>
                  <p className="text-blue-100">
                    Best practices for mobile and device security
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => navigate('/scan')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Start Demo</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-5 h-5" />
                <span>Take Quiz</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>View Analytics</span>
              </div>
            </button>
          </div>
          <p className="text-blue-300 text-center text-sm">
            Or scan the QR code above with your mobile device
          </p>
        </div>
      </div>
    </div>
  );
}
