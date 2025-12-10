import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext"; // Use centralized Appcontext
import { request } from "../api/api";
import { toast } from "react-toastify";
import ApplicationCard from "../Components/ApplicationCard";
import ApplicationForm from "../Components/ApplicationForm";
import LogoCarousel from "../Components/LogoCarousel";
import TimelineView from "../Components/TimelineView";
import ConfirmModalFun from "../Components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import {
  DashboardContainer,
  DashboardHeader,
  HeaderTitle,
  ControlsContainer,
  MainLayout,
  ContentColumn,
  CardGrid,
  SidebarColumn,
  Panel,
  EmptyState,
  ModalOverlay,
  ModalContent,
} from "../Style/Dashboardcss";

export default function Dashboard() {
  const { token, applications, setApplications } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("appliedAt");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, app: null });

  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, [token]);

  async function fetchApps() {
    if (!token) return;
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (filterStatus) qs.set("status", filterStatus);
      if (sortBy) qs.set("sortBy", sortBy);
      if (query) qs.set("q", query);

      const path = `/applications${qs.toString() ? `?${qs.toString()}` : ""}`;
      const res = await request(path, { token });
      setApplications(res);
    } catch (err) {
      toast.error(err?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSaved = (saved) => {
    setApplications((prev) => {
      if (saved._id && prev.some((p) => p._id === saved._id)) {
        return prev.map((p) => (p._id === saved._id ? saved : p));
      }

      return [saved, ...prev];
    });
  };

  const handleEdit = (app) => {
    setEditing(app);
    setShowForm(true);
  };

  const handleOpen = (app) => {
    navigate(`/applications/${app._id}`);
  };

  const handleDelete = (app) => {
    setConfirm({ open: true, app });
  };

  const confirmDelete = async () => {
    const app = confirm.app;
    if (!app) return;
    try {
      setLoading(true);
      await request(`/applications/${app._id}`, { method: "DELETE", token });
      setApplications((prev) => prev.filter((p) => p._id !== app._id));
      toast.success("Application deleted");
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setConfirm({ open: false, app: null });
      setLoading(false);
    }
  };

  const clearAll = async () => {
    if (!window.confirm("Clear ALL applications? This cannot be undone."))
      return;

    try {
      setLoading(true);
      await request("/applications", { method: "DELETE", token });
      setApplications([]);
      toast.success("All applications cleared");
    } catch (err) {
      toast.error(err?.message || "Failed to clear");
    } finally {
      setLoading(false);
    }
  };

  const logos = Array.from(
    new Set((applications || []).flatMap((a) => a.logos || []))
  ).slice(0, 20);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <HeaderTitle>
          <h2>Dashboard</h2>
          <div>Your internship applications</div>
        </HeaderTitle>

        <ControlsContainer>
          <input
            className="input"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All statuses</option>
            <option value="applied">applied</option>
            <option value="phone">phone</option>
            <option value="interview">interview</option>
            <option value="offer">offer</option>
            <option value="rejected">rejected</option>
          </select>
          <select
            className="input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="appliedAt">Date</option>
            <option value="position">Position</option>
            <option value="company">Company</option>
          </select>

          <button className="btn" onClick={fetchApps}>
            Apply
          </button>
          <button
            className="btn"
            onClick={openCreate}
            style={{
              background: "var(--accent)",
              color: "#000",
              fontWeight: 700,
            }}
          >
            + Add
          </button>
          {applications.length > 0 && (
            <button className="btn" onClick={clearAll} title="Delete All">
              Clear
            </button>
          )}
        </ControlsContainer>
      </DashboardHeader>

      <MainLayout>
        <ContentColumn>
          {loading && <EmptyState>Loading applications...</EmptyState>}

          {!loading && (!applications || applications.length === 0) && (
            <EmptyState>
              No applications found. Click <b>+ Add</b> to track your first
              internship.
            </EmptyState>
          )}

          <CardGrid>
            {(applications || []).map((app) => (
              <ApplicationCard
                key={app._id}
                app={app}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onOpen={handleOpen}
              />
            ))}
          </CardGrid>
        </ContentColumn>

        <SidebarColumn>
          <Panel>
            <h4>Top companies</h4>
            <LogoCarousel logos={logos} slidesPerView={3} />
          </Panel>

          <Panel>
            <h4>Timeline</h4>
            <TimelineView applications={applications.slice(0, 6)} />
          </Panel>
        </SidebarColumn>
      </MainLayout>

      {showForm && (
        <ModalOverlay
          onClick={() => {
            setShowForm(false);
            setEditing(null);
          }}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ApplicationForm
              initial={editing}
              onSaved={handleSaved}
              onClose={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      <ConfirmModalFun
        open={confirm.open}
        title="Delete application"
        message={`Delete ${confirm.app?.company} — ${confirm.app?.position}?`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, app: null })}
      />
    </DashboardContainer>
  );
}
