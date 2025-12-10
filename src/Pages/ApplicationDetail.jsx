import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext"; 
import { request } from "../api/api";
import ApplicationForm from "../Components/ApplicationForm";
import ConfirmModalFun from "../Components/ConfirmModal";
import { toast } from "react-toastify";
import {
  DetailContainer,
  DetailPanel,
  HeaderRow,
  TitleGroup,
  ButtonGroup,
  InfoGrid,
  SectionTitle,
  ContentValue,
  NotesContent,
  LogoContainer,
  LogoImage,
  ModalOverlay,
  ModalContent,
} from "../Style/ApplicationDetailcss";

export default function ApplicationDetail() {
  const { id } = useParams();
  const { token, setApplications } = useContext(AppContext);


  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    fetchApp();
    
  }, [token, id]);

  const fetchApp = async () => {
    setLoading(true);
    try {
      const res = await request(`/applications/${id}`, { token });
      setApp(res);
    } catch (err) {
      toast.error(err?.message || "Failed to load application");
      navigate("/"); 
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updated) => {
    setApp(updated);
    
    setApplications((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await request(`/applications/${id}`, { method: "DELETE", token });
      setApplications((prev) => prev.filter((p) => p._id !== id));
      toast.success("Application deleted");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Delete failed");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <DetailContainer>
        <DetailPanel
          style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}
        >
          Loading details...
        </DetailPanel>
      </DetailContainer>
    );

  if (!app) return null;

  return (
    <DetailContainer>
      <DetailPanel>
        <HeaderRow>
          <TitleGroup>
            <h2>{app.position}</h2>
            <div style={{ color: "var(--muted)" }}>
              {app.company} •{" "}
              {app.appliedAt
                ? new Date(app.appliedAt).toLocaleDateString()
                : "No Date"}
            </div>
          </TitleGroup>

          <ButtonGroup>
            <button className="btn" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className="btn" onClick={() => setConfirmOpen(true)}>
              Delete
            </button>
            <button className="btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </ButtonGroup>
        </HeaderRow>

        <InfoGrid>
          <div>
            <SectionTitle>Status</SectionTitle>
            <ContentValue className="capitalize">{app.status}</ContentValue>
          </div>

          <div>
            <SectionTitle>Location</SectionTitle>
            <ContentValue>{app.location || "—"}</ContentValue>
          </div>

          <div>
            <SectionTitle>Source</SectionTitle>
            <ContentValue>{app.source || "—"}</ContentValue>
          </div>

          <div>
            <SectionTitle>Salary range</SectionTitle>
            <ContentValue>{app.salaryRange || "—"}</ContentValue>
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <SectionTitle>Notes</SectionTitle>
            <NotesContent>{app.notes || "No notes added."}</NotesContent>
          </div>

          {app.logos?.length > 0 && (
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionTitle>Logos</SectionTitle>
              <LogoContainer>
                {app.logos.map((l, i) => (
                  <LogoImage
                    key={i}
                    src={l}
                    alt={`logo-${i}`}
                    onError={(e) => {
                      e.target.src = "/default-logo.svg";
                    }}
                  />
                ))}
              </LogoContainer>
            </div>
          )}
        </InfoGrid>
      </DetailPanel>

    
      {editing && (
        <ModalOverlay onClick={() => setEditing(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ApplicationForm
              initial={app}
              onClose={() => setEditing(false)}
              onSaved={handleUpdate}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      <ConfirmModalFun
        open={confirmOpen}
        title="Delete application"
        message={`Are you sure you want to delete ${app.company} — ${app.position}?`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </DetailContainer>
  );
}
