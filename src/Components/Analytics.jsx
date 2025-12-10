import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics({
  trends = [],
  topCompanies = [],
  summary = {},
}) {

  const monthsData = useMemo(() => {

    const base = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      label: new Date(2000, i).toLocaleString("default", { month: "short" }), 
      count: 0,
    }));

    
    (trends || []).forEach((t) => {
      if (t._id >= 1 && t._id <= 12) {
        base[t._id - 1].count = t.count;
      }
    });

    return base;
  }, [trends]);

  const companiesData = topCompanies.map((c) => ({
    name: c._id,
    value: c.count,
  }));

  const pieData = [
    { name: "Offers", value: summary.offers || 0 },
    { name: "Rejected", value: summary.rejected || 0 },
    {
      name: "Other",
      value:
        (summary.total || 0) -
        ((summary.offers || 0) + (summary.rejected || 0)),
    },
  ];

  const COLORS = ["#00c853", "#ff3b30", "#00d4ff"];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 12 }}>
      {/* Left Column */}
      <div className="panel" style={{ padding: 16 }}>
        <h3 style={{ margin: 0 }}>Applications by month</h3>
        <div style={{ width: "100%", height: 240, marginTop: 12 }}>
          <ResponsiveContainer>
            <LineChart data={monthsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis dataKey="label" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#222",
                  border: "1px solid #333",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="var(--accent)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h4 style={{ marginTop: 18 }}>Top companies</h4>
        <div style={{ width: "100%", height: 140 }}>
          <ResponsiveContainer>
            <BarChart data={companiesData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.03)"
              />
              <XAxis dataKey="name" stroke="var(--muted)" />
              <YAxis stroke="var(--muted)" />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{
                  backgroundColor: "#222",
                  border: "1px solid #333",
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="var(--accent)" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        
        <div className="panel" style={{ padding: 16 }}>
          <h4 style={{ margin: 0 }}>Summary</h4>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "var(--muted)" }}>Total applications</div>
              <div style={{ fontWeight: 700 }}>{summary.total || 0}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "var(--muted)" }}>Offers</div>
              <div style={{ fontWeight: 700 }}>{summary.offers || 0}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ color: "var(--muted)" }}>Rejected</div>
              <div style={{ fontWeight: 700 }}>{summary.rejected || 0}</div>
            </div>
          </div>
        </div>

        
        <div
          className="panel"
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4 style={{ marginTop: 0, alignSelf: "flex-start" }}>
            Status split
          </h4>
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={40} 
                  paddingAngle={5}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    border: "1px solid #333",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
