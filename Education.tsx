import { Shield, AlertTriangle, Eye, Lock, Smartphone, CheckCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Education() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Shield className="w-20 h-20 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-40"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              What You Just Experienced
            </h1>
            <p className="text-xl text-blue-200">
              Understanding scareware and how to protect yourself
            </p>
          </div>

          {/* What Happened Section */}
          <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 border border-amber-500/50 rounded-2xl p-8 mb-8 backdrop-blur-sm">
            <div className="flex items-start gap-4 mb-6">
              <Eye className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-amber-200 mb-3">
                  What Just Happened?
                </h2>
                <p className="text-amber-100 leading-relaxed mb-4">
                  You just experienced a simulated <strong>scareware attack</strong>. This is a common social engineering 
                  tactic used by cybercriminals to trick users into downloading malicious software or paying for 
                  fake security services.
                </p>
                <p className="text-amber-100 leading-relaxed">
                  The fake malware alerts, urgent warnings, and "security scan" you saw are all classic scareware 
                  techniques designed to create panic and manipulate users into taking harmful actions.
                </p>
              </div>
            </div>
          </div>

          {/* Red Flags Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              Red Flags to Watch For
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Urgent Language and Scare Tactics',
                  description: 'Messages claiming immediate danger, data theft, or system compromise to create panic'
                },
                {
                  title: 'Random QR Codes',
                  description: 'Unexpected QR codes in public places, emails, or websites asking you to scan them'
                },
                {
                  title: 'Unsolicited Security Warnings',
                  description: 'Pop-ups or alerts claiming to detect threats when you haven\'t run any security software'
                },
                {
                  title: 'Pressure to Act Immediately',
                  description: 'Claims that you must "act now" or "click here immediately" to prevent disaster'
                },
                {
                  title: 'Requests for Payment',
                  description: 'Demands for payment to "remove" threats or "unlock" your device'
                },
                {
                  title: 'Suspicious URLs',
                  description: 'Web addresses that don\'t match legitimate security companies or services'
                }
              ].map((flag, index) => (
                <div key={index} className="bg-red-900/20 border border-red-500/30 rounded-lg p-5">
                  <h3 className="text-white font-semibold mb-2">{flag.title}</h3>
                  <p className="text-red-200">{flag.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Protection Tips */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-8 h-8 text-green-400" />
              How to Protect Yourself
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  title: 'Think Before You Scan',
                  description: 'Only scan QR codes from trusted sources. Avoid scanning codes in public places or unsolicited messages.'
                },
                {
                  icon: Shield,
                  title: 'Use Legitimate Security Software',
                  description: 'Install reputable antivirus software from known companies and keep it updated. Ignore random security warnings.'
                },
                {
                  icon: AlertTriangle,
                  title: 'Verify Security Alerts',
                  description: 'If you get a security warning, close the browser/app and run a scan with your installed security software.'
                },
                {
                  icon: Smartphone,
                  title: 'Be Cautious with Downloads',
                  description: 'Only download apps from official stores. Never install software from pop-up warnings.'
                },
                {
                  icon: Lock,
                  title: 'Keep Systems Updated',
                  description: 'Regularly update your operating system, browsers, and apps to patch security vulnerabilities.'
                },
                {
                  icon: Eye,
                  title: 'Stay Informed',
                  description: 'Learn about common scam tactics and share this knowledge with friends and family.'
                }
              ].map((tip, index) => (
                <div key={index} className="bg-green-900/20 border border-green-500/30 rounded-lg p-5 flex items-start gap-4">
                  <tip.icon className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
                    <p className="text-green-200">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real vs Fake */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">
              Real Security Software vs. Scareware
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Legitimate Security Software
                </h3>
                <ul className="space-y-2 text-green-200">
                  <li>• Runs silently in background</li>
                  <li>• Shows calm, clear notifications</li>
                  <li>• From known, verified publishers</li>
                  <li>• Offers free basic protection</li>
                  <li>• No urgent countdown timers</li>
                  <li>• Professional interface</li>
                </ul>
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-red-400 font-bold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Scareware Characteristics
                </h3>
                <ul className="space-y-2 text-red-200">
                  <li>• Aggressive pop-up alerts</li>
                  <li>• Uses fear and urgency</li>
                  <li>• Unknown or suspicious source</li>
                  <li>• Demands immediate payment</li>
                  <li>• Countdown timers and threats</li>
                  <li>• Unprofessional appearance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/quiz')}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xl py-5 px-12 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6" />
                <span>Test Your Knowledge - Take the Quiz</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-xl py-5 px-12 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-3">
                <Home className="w-6 h-6" />
                <span>Return to Home</span>
              </div>
            </button>
            <p className="text-blue-300 text-center mt-4">
              Share this educational tool to help others recognize and avoid scareware attacks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
