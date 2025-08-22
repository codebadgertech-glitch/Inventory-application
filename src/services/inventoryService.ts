// @EFE right here we can use both the db.json file or Local storage to store and manipuate our data - Make sure to follow the read me to start up "db.json". If db.json is not running, the app automatcally uses localStorage

import axios from "axios";
import { IItem } from "../components/InventoryTable";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_API = !!API_BASE;
const LS_KEY = "inventory_items_v1";

async function seedIfNeeded(): Promise<void> {
  if (USE_API) return;
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    const res = await fetch("/data/db.json");
    const data = await res.json();
    const items: IItem[] = Array.isArray(data) ? data : data.inventory || [];
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }
}
function readLocal(): IItem[] {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : [];
}
function writeLocal(items: IItem[]): void {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export async function getItems(): Promise<IItem[]> {
  if (USE_API) {
    const { data } = await axios.get<IItem[]>(`${API_BASE}/items`);
    return data;
  }
  await seedIfNeeded();
  return readLocal();
}
export async function addItem(payload: Omit<IItem, "id">): Promise<IItem> {
  if (USE_API) {
    const { data } = await axios.post<IItem>(`${API_BASE}/items`, payload);
    return data;
  }
  const items = readLocal();
  const next: IItem = {
    id: items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    ...payload,
  };
  items.push(next);
  writeLocal(items);
  return next;
}
export async function updateItem(
  id: number,
  payload: Omit<IItem, "id">
): Promise<IItem> {
  if (USE_API) {
    const { data } = await axios.put<IItem>(`${API_BASE}/items/${id}`, {
      id,
      ...payload,
    });
    return data;
  }
  const items = readLocal();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Item not found");
  items[idx] = { id, ...payload };
  writeLocal(items);
  return items[idx];
}
export async function deleteItem(id: number): Promise<void> {
  if (USE_API) {
    await axios.delete(`${API_BASE}/items/${id}`);
    return;
  }
  const items = readLocal().filter((i) => i.id !== id);
  writeLocal(items);
}
