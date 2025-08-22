import React, { useEffect, useState } from "react";
import "./ItemFormModal.css";
import { IItem } from "./InventoryTable";

export interface IItemFormModalProps {
  open: boolean;
  initial?: IItem | null;
  onClose: () => void;
  onSubmit: (data: Omit<IItem, "id">, id?: number) => void;
}

const initialEmpty: Omit<IItem, "id"> = {
  name: "",
  sku: "",
  category: "",
  quantity: 0,
  price: 0,
};

const ItemFormModal: React.FC<IItemFormModalProps> = ({
  open,
  initial,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<Omit<IItem, "id">>(initialEmpty);

  useEffect(() => {
    setForm(
      initial
        ? {
            name: initial.name,
            sku: initial.sku,
            category: initial.category,
            quantity: initial.quantity,
            price: initial.price,
          }
        : initialEmpty
    );
  }, [initial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) =>
      name === "quantity" || name === "price"
        ? { ...prev, [name]: Number(value) }
        : { ...prev, [name]: value }
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form, initial?.id);
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initial ? "Edit Item" : "Add Item"}</h3>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <form className="form" onSubmit={submit}>
          <div className="grid">
            <label>
              {" "}
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              {" "}
              SKU
              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              {" "}
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              {" "}
              Quantity
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min={0}
                required
              />
            </label>
            <label>
              {" "}
              Price
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min={0}
                step="0.01"
                required
              />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {initial ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ItemFormModal;
