const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const experienceService = {
  async list(sortBy = 'sort_order', limit = 50) {
    const res = await fetch(`${API_BASE}/experiences`);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    return res.json();
  },

  async filter(query = {}, sortBy = 'sort_order', limit = 50) {
    const res = await fetch(`${API_BASE}/experiences`);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    let data = await res.json();
    
    // Client-side filtering
    Object.entries(query).forEach(([key, value]) => {
      if (value) data = data.filter(item => item[key] === value);
    });
    
    return data.slice(0, limit);
  },

  async create(data) {
    const res = await fetch(`${API_BASE}/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create experience');
    return res.json();
  },

  async update(id, data) {
    const res = await fetch(`${API_BASE}/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to update experience');
    return res.json();
  },

  async delete(id) {
    const res = await fetch(`${API_BASE}/experiences/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete experience');
    return res.json();
  }
};