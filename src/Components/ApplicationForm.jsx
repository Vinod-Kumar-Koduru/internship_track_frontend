import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../api/api";
import {
  WrapperForm,
  ShowRow,
  ActionGroup, 
  HelperText,
} from "../Style/ApplicationFormcss";
import { AppContext } from "../context/Appcontext";

export default function ApplicationForm({
  initial = null,
  onClose = () => {},
  onSaved = () => {},
}) {
  const { token } = useContext(AppContext);

  const [form, setForm] = useState({
    company: "",
    position: "",
    appliedAt: "",
    status: "applied",
    source: "",
    location: "",
    salaryRange: "",
    notes: "",
    logos: [],
    tags: [],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!initial) return;

    const copy = { ...initial };

    
    if (copy.appliedAt) {
      const d = new Date(copy.appliedAt);
      if (!isNaN(d)) {
        copy.appliedAt = d.toISOString().slice(0, 10);
      }
    }

    
    if (!copy.logos) copy.logos = [];
    if (!copy.tags) copy.tags = [];

    setForm((prev) => ({ ...prev, ...copy }));
  }, [initial]);

  const update = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleLogoAdd = () => {
    const url = prompt("Paste company logo URL:");
    if (!url || !url.trim()) return;
    update("logos", [...form.logos, url.trim()]);
  };

  const handleTagAdd = () => {
    const value = prompt("Add tag (e.g. summer2025):");
    if (!value || !value.trim()) return;
    update("tags", [...form.tags, value.trim()]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.company.trim() || !form.position.trim()) {
      toast.error("Company and position are required");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
        appliedAt: form.appliedAt
          ? new Date(form.appliedAt).toISOString()
          : undefined,
      };

      let response;
      if (form._id) {
        
        response = await request(`/applications/${form._id}`, {
          method: "PUT",
          body: payload,
          token,
        });
      } else {
    
        response = await request(`/applications`, {
          method: "POST",
          body: payload,
          token,
        });
      }

      toast.success("Saved");
      onSaved(response);
      onClose();
    } catch (err) {
      const message =
        err?.message ||
        (err?.errors
          ? err.errors.map((x) => x.msg).join(", ")
          : "Error saving");
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit} className="panel">
      <ShowRow>
        <input
          className="input"
          placeholder="Company"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <input
          className="input"
          placeholder="Position"
          value={form.position}
          onChange={(e) => update("position", e.target.value)}
          required
          style={{ flex: 1 }}
        />
      </ShowRow>

      <ShowRow>
        <input
          type="date"
          className="input"
          value={form.appliedAt || ""}
          onChange={(e) => update("appliedAt", e.target.value)}
          style={{ flex: 1 }}
        />

        <select
          className="input"
          value={form.status}
          onChange={(e) => update("status", e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="applied">applied</option>
          <option value="phone">phone</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
          <option value="ghosted">ghosted</option>
        </select>

        <input
          className="input"
          placeholder="Source (LinkedIn, Campus Portal...)"
          value={form.source}
          onChange={(e) => update("source", e.target.value)}
          style={{ flex: 1 }}
        />
      </ShowRow>

      <input
        className="input"
        placeholder="Location (City)"
        value={form.location}
        onChange={(e) => update("location", e.target.value)}
      />

      <input
        className="input"
        placeholder="Salary range (optional)"
        value={form.salaryRange}
        onChange={(e) => update("salaryRange", e.target.value)}
      />

      <textarea
        className="input"
        rows={4}
        placeholder="Notes"
        value={form.notes || ""}
        onChange={(e) => update("notes", e.target.value)}
      />

      <ShowRow>
        <button type="button" className="btn" onClick={handleLogoAdd}>
          Add Logo
        </button>

        <button type="button" className="btn" onClick={handleTagAdd}>
          Add Tag
        </button>

        <HelperText>
          {(form.logos || []).length} logo(s) • {(form.tags || []).length}{" "}
          tag(s)
        </HelperText>
      </ShowRow>

      <ActionGroup>
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Saving..." : form._id ? "Update" : "Create"}
        </button>
      </ActionGroup>
    </WrapperForm>
  );
}
