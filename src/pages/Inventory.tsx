import React, { useEffect, useMemo, useState } from "react";
import InventoryTable, { IItem } from "../components/InventoryTable";
import StatsCards from "../components/StatsCards";
import ItemFormModal from "../components/ItemFormModal";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../services/inventoryService";

const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<IItem | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  const filtered = useMemo<IItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) =>
      [i.name, i.sku, i.category].some((v) => v.toLowerCase().includes(q))
    );
  }, [items, query]);

  const stats = useMemo(() => {
    const totalItems = items.length;
    const totalQty = items.reduce((s, i) => s + i.quantity, 0);
    const stockValue = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const lowStock = items.filter((i) => i.quantity < 10).length;
    return { totalItems, totalQty, stockValue, lowStock };
  }, [items]);

  function openAdd(): void {
    setEditing(null);
    setModalOpen(true);
  }
  function openEdit(it: IItem): void {
    setEditing(it);
    setModalOpen(true);
  }

  async function handleSubmit(data: Omit<IItem, "id">, id?: number) {
    if (id) {
      const updated = await updateItem(id, data);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } else {
      const created = await addItem(data);
      setItems((prev) => [...prev, created]);
    }
    setModalOpen(false);
  }

  async function handleDelete(id: number) {
    await deleteItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          alignItems: "center",
          marginBottom: ".5rem",
        }}
      >
        <button className="btn primary" onClick={openAdd}>
          + Add Item
        </button>
        <input
          placeholder="Search name, SKU, category…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search"
          style={{ maxWidth: 320 }}
        />
      </div>

      <StatsCards {...stats} />

      <InventoryTable
        items={filtered}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <ItemFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default InventoryPage;
