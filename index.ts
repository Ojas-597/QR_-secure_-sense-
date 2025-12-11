import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// Analytics endpoints
app.post("/api/analytics/track", async (c) => {
  try {
    const { session_id, event_type, page_path, metadata } = await c.req.json();
    
    await c.env.DB.prepare(
      `INSERT INTO analytics_events (session_id, event_type, page_path, metadata) 
       VALUES (?, ?, ?, ?)`
    ).bind(session_id, event_type, page_path, metadata).run();

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to track event" }, 500);
  }
});

app.get("/api/analytics/stats", async (c) => {
  try {
    // Get total sessions
    const sessionsResult = await c.env.DB.prepare(
      `SELECT COUNT(DISTINCT session_id) as total FROM analytics_events`
    ).first<{ total: number }>();

    // Get total page views
    const pageViewsResult = await c.env.DB.prepare(
      `SELECT COUNT(*) as total FROM analytics_events WHERE event_type = 'page_view'`
    ).first<{ total: number }>();

    // Get total quiz attempts
    const quizAttemptsResult = await c.env.DB.prepare(
      `SELECT COUNT(*) as total FROM quiz_sessions`
    ).first<{ total: number }>();

    // Get average quiz score
    const avgScoreResult = await c.env.DB.prepare(
      `SELECT AVG(CAST(score AS REAL) / CAST(total_questions AS REAL) * 100) as avg_score 
       FROM quiz_sessions WHERE score IS NOT NULL`
    ).first<{ avg_score: number | null }>();

    // Get completion rate
    const completionResult = await c.env.DB.prepare(
      `SELECT 
        COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) * 100.0 / COUNT(*) as rate
       FROM quiz_sessions`
    ).first<{ rate: number | null }>();

    // Get event breakdown
    const eventBreakdown = await c.env.DB.prepare(
      `SELECT event_type, COUNT(*) as count 
       FROM analytics_events 
       GROUP BY event_type 
       ORDER BY count DESC 
       LIMIT 10`
    ).all<{ event_type: string; count: number }>();

    // Get top pages
    const topPages = await c.env.DB.prepare(
      `SELECT page_path, COUNT(*) as views 
       FROM analytics_events 
       WHERE event_type = 'page_view' AND page_path IS NOT NULL
       GROUP BY page_path 
       ORDER BY views DESC 
       LIMIT 10`
    ).all<{ page_path: string; views: number }>();

    return c.json({
      total_sessions: sessionsResult?.total || 0,
      total_page_views: pageViewsResult?.total || 0,
      total_quiz_attempts: quizAttemptsResult?.total || 0,
      average_quiz_score: avgScoreResult?.avg_score || 0,
      completion_rate: completionResult?.rate || 0,
      event_breakdown: eventBreakdown.results || [],
      top_pages: topPages.results || []
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

// Quiz endpoints
app.post("/api/quiz/complete", async (c) => {
  try {
    const { session_id, score, total_questions } = await c.req.json();
    
    await c.env.DB.prepare(
      `INSERT INTO quiz_sessions (session_id, score, total_questions, completed_at) 
       VALUES (?, ?, ?, CURRENT_TIMESTAMP)`
    ).bind(session_id, score, total_questions).run();

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to save quiz results" }, 500);
  }
});

// Threat tracking endpoints
app.post("/api/threats/track", async (c) => {
  try {
    const { session_id, threats } = await c.req.json();
    
    // Insert multiple threats
    for (const threat of threats) {
      await c.env.DB.prepare(
        `INSERT INTO threat_removals (session_id, threat_name, threat_type, severity) 
         VALUES (?, ?, ?, ?)`
      ).bind(session_id, threat.name, threat.type, threat.severity).run();
    }

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to track threats" }, 500);
  }
});

app.post("/api/threats/remove", async (c) => {
  try {
    const { session_id } = await c.req.json();
    
    await c.env.DB.prepare(
      `UPDATE threat_removals 
       SET is_removed = 1, removed_at = CURRENT_TIMESTAMP 
       WHERE session_id = ? AND is_removed = 0`
    ).bind(session_id).run();

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to remove threats" }, 500);
  }
});

export default app;
