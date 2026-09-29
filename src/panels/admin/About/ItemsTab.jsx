import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import FormField from "./FormField";
import Modal from "./Modal";

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";

/**
 * One repeatable section of the About page (achievements, leadership, pillars or
 * team). Every collection has the same shape — create, edit, reorder, hide,
 * delete — so one component drives all four.
 */
export default function ItemsTab({ config, items, onChanged }) {
  const { api, fields } = config;

  const [editing, setEditing] = useState(null); // null = closed, {} = new
  const [form, setForm] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const isNew = editing !== null && editing.id === undefined;
  const imageField = fields.find((field) => field.type === "image");

  const pickImage = (file) => {
    // Hold the preview URL in state so it is only created once per selection.
    setNewImage((previous) => {
      if (previous?.preview) URL.revokeObjectURL(previous.preview);
      return file ? { file, preview: URL.createObjectURL(file) } : null;
    });
    setRemoveImage(false);
    setForm((previous) => ({ ...previous, [imageField.name]: file }));
  };

  const resetImage = () => {
    setNewImage((previous) => {
      if (previous?.preview) URL.revokeObjectURL(previous.preview);
      return null;
    });
    setRemoveImage(false);
  };

  const openCreate = () => {
    const blank = { is_active: true };
    fields.forEach((field) => {
      if (field.type !== "image") blank[field.name] = "";
    });
    setForm(blank);
    resetImage();
    setEditing({});
  };

  const openEdit = (item) => {
    const next = { is_active: item.is_active, order: item.order };
    fields.forEach((field) => {
      if (field.type === "image") {
        // Never echo the existing file back; a blank field means "keep it".
        next[field.name] = null;
      } else {
        next[field.name] = item[field.name] ?? "";
      }
    });
    setForm(next);
    resetImage();
    setEditing(item);
  };

  const closeModal = () => {
    setEditing(null);
    setForm({});
    resetImage();
    setRemoveImage(false);
  };

  const setField = (name, value) =>
    setForm((previous) => ({ ...previous, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    fields.forEach((field) => {
      if (field.type === "image") return;
      data.append(field.name, form[field.name] ?? "");
    });
    data.append("is_active", form.is_active ? "true" : "false");
    data.append("order", form.order ?? 0);

    if (newImage) {
      data.append(imageField.name, newImage.file);
    } else if (removeImage) {
      data.append("remove_image", "true");
    }

    try {
      setSaving(true);
      if (isNew) {
        await api.create(data);
      } else {
        await api.update(editing.id, data);
      }
      closeModal();
      await onChanged();
    } catch (error) {
      console.error(error);
      alert(`Could not save this ${config.singular}.`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (item) => {
    try {
      setBusyId(item.id);
      await api.patch(item.id, { is_active: !item.is_active });
      await onChanged();
    } catch (error) {
      console.error(error);
      alert("Could not update visibility.");
    } finally {
      setBusyId(null);
    }
  };

  const handleMove = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];

    // Renumber the whole list so positions stay contiguous and deterministic.
    const changes = reordered
      .map((item, position) => ({ id: item.id, order: position + 1 }))
      .filter((change) => items.find((item) => item.id === change.id)?.order !== change.order);

    if (!changes.length) return;

    try {
      setBusyId("reorder");
      await Promise.all(changes.map((change) => api.patch(change.id, { order: change.order })));
      await onChanged();
    } catch (error) {
      console.error(error);
      alert("Could not reorder.");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (item) => {
    const label = config.primary(item);
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;

    try {
      setBusyId(item.id);
      await api.remove(item.id);
      await onChanged();
    } catch (error) {
      console.error(error);
      alert(`Could not delete this ${config.singular}.`);
    } finally {
      setBusyId(null);
    }
  };

  const columns = [
    ...config.columns,
    {
      key: "is_active",
      label: "Status",
      render: (item) => (
        <StatusBadge status={item.is_active ? "active" : "inactive"} />
      ),
    },
  ];

  const imagePreview = imageField
    ? newImage?.preview || editing?.image_url || null
    : null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">{config.blurb}</p>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add {config.singular}
        </button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        emptyMessage={`No ${config.label.toLowerCase()} yet. Add the first one.`}
        actions={(item) => {
          const index = items.findIndex((entry) => entry.id === item.id);
          const busy = busyId === item.id;

          return (
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                title="Move up"
                aria-label="Move up"
                disabled={index === 0 || busyId === "reorder"}
                onClick={() => handleMove(index, -1)}
                className={`${iconButton} text-gray-600`}
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                title="Move down"
                aria-label="Move down"
                disabled={index === items.length - 1 || busyId === "reorder"}
                onClick={() => handleMove(index, 1)}
                className={`${iconButton} text-gray-600`}
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                title={item.is_active ? "Hide from public page" : "Show on public page"}
                aria-label="Toggle visibility"
                disabled={busy}
                onClick={() => handleToggle(item)}
                className={`${iconButton} ${item.is_active ? "text-amber-600" : "text-gray-400"}`}
              >
                {item.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                type="button"
                title="Edit"
                aria-label="Edit"
                disabled={busy}
                onClick={() => openEdit(item)}
                className={`${iconButton} text-blue-600`}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                title="Delete"
                aria-label="Delete"
                disabled={busy}
                onClick={() => handleDelete(item)}
                className={`${iconButton} text-red-600`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        }}
      />

      <Modal
        open={editing !== null}
        onClose={closeModal}
        title={
          editing
            ? isNew
              ? `Add ${config.singular}`
              : `Edit ${config.primary(editing)}`
            : ""
        }
        footer={
          <>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="about-item-form"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving..." : isNew ? "Add" : "Save changes"}
            </button>
          </>
        }
      >
        <form id="about-item-form" onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={form[field.name]}
              onChange={(value) =>
                field.type === "image"
                  ? pickImage(value)
                  : setField(field.name, value)
              }
              imagePreview={imagePreview}
            />
          ))}

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:gap-6">
            <FormField
              field={{
                name: "is_active",
                label: "Visible on the public page",
                type: "checkbox",
              }}
              value={form.is_active}
              onChange={(value) => setField("is_active", value)}
            />

            <div className="w-32">
              <FormField
                field={{ name: "order", label: "Position", type: "text" }}
                value={form.order}
                onChange={(value) => setField("order", Number(value) || 0)}
              />
            </div>
          </div>

          {editing?.image_url && !newImage && (
            <label className="flex items-center gap-2.5 text-sm font-medium text-red-700">
              <input
                type="checkbox"
                checked={removeImage}
                onChange={(event) => {
                  setRemoveImage(event.target.checked);
                  setField("image", null);
                }}
                className="h-4 w-4 rounded border-gray-300"
              />
              Remove the current image
            </label>
          )}
        </form>
      </Modal>
    </div>
  );
}
