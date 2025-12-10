import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import { request } from "../api/api";
import Analytics from "../Components/Analytics";
import { toast } from "react-toastify";

export default function AnalyticsPage() {
  const { token } = useContext(AppContext);
  const [trends, setTrends] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [summary, setSummary] = useState({ total: 0, offers: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    let mounted = true;

    const loadAll = async () => {
      setLoading(true);
      try {
        const [t, top, apps] = await Promise.all([
          request("/applications/analytics/trends", { token }),
          request("/applications/analytics/top-companies", { token }),
          request("/applications", { token }),
        ]);

        if (mounted) {
          setTrends(t || []);
          setTopCompanies(top || []);

          const total = (apps || []).length;
          const offers = (apps || []).filter(
            (a) => a.status === "offer"
          ).length;
          const rejected = (apps || []).filter(
            (a) => a.status === "rejected"
          ).length;

          setSummary({ total, offers, rejected });
        }
      } catch (err) {
        if (mounted) {
          toast.error(err?.message || "Failed to load analytics");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAll();

    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="container" style={{ marginTop: 12 }}>
      <h2 style={{ marginTop: 0 }}>Analytics</h2>
      <div style={{ color: "var(--muted)", marginBottom: 12 }}>
        Charts and trends to help you apply smarter
      </div>

      {loading ? (
        <div
          className="panel"
          style={{ padding: 20, textAlign: "center", color: "var(--muted)" }}
        >
          Loading analytics...
        </div>
      ) : (
        <Analytics
          trends={trends}
          topCompanies={topCompanies}
          summary={summary}
        />
      )}
    </div>
  );
}
