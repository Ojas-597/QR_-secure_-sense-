import { useEffect, useState } from 'react';
import { BarChart3, Users, TrendingUp, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AnalyticsData {
  total_sessions: number;
  total_page_views: number;
  total_quiz_attempts: number;
  average_quiz_score: number;
  completion_rate: number;
  event_breakdown: { event_type: string; count: number }[];
  top_pages: { page_path: string; views: number }[];
}

export default function Analytics() {
  const navigate = useNavigate();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/stats');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-purple-200">QR-Secure Sense usage statistics and insights</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Total Sessions</h3>
              </div>
              <div className="text-4xl font-bold text-blue-400">
                {data?.total_sessions || 0}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Page Views</h3>
              </div>
              <div className="text-4xl font-bold text-green-400">
                {data?.total_page_views || 0}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-8 h-8 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Quiz Attempts</h3>
              </div>
              <div className="text-4xl font-bold text-purple-400">
                {data?.total_quiz_attempts || 0}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-8 h-8 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Avg Quiz Score</h3>
              </div>
              <div className="text-4xl font-bold text-yellow-400">
                {data?.average_quiz_score ? `${Math.round(data.average_quiz_score)}%` : 'N/A'}
              </div>
            </div>
          </div>

          {/* Charts and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Most Visited Pages
              </h2>
              <div className="space-y-4">
                {data?.top_pages && data.top_pages.length > 0 ? (
                  data.top_pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-white font-medium">{page.page_path}</span>
                      <span className="text-blue-400 font-bold">{page.views} views</span>
                    </div>
                  ))
                ) : (
                  <p className="text-purple-300">No page view data available</p>
                )}
              </div>
            </div>

            {/* Event Breakdown */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Event Breakdown
              </h2>
              <div className="space-y-4">
                {data?.event_breakdown && data.event_breakdown.length > 0 ? (
                  data.event_breakdown.map((event, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium capitalize">
                          {event.event_type.replace(/_/g, ' ')}
                        </span>
                        <span className="text-purple-400 font-bold">{event.count}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          style={{
                            width: `${(event.count / (data.total_page_views || 1)) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-purple-300">No event data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          {data?.completion_rate !== undefined && (
            <div className="mt-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">Quiz Completion Rate</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full bg-slate-800 rounded-full h-6">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                      style={{ width: `${data.completion_rate}%` }}
                    >
                      <span className="text-white font-bold text-sm">
                        {Math.round(data.completion_rate)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
