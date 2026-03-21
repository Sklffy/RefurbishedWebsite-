import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44Local } from '@/lib/localBackend';
import { Plus, Trash2, Save, X, Upload, ArrowUp, ArrowDown, LogOut, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import MatrixRain from '../components/portfolio/MatrixRain';

const emptyExp = { title: '', company: '', date: '', logo: '', logo_bg: 'bg-white', points: [''], sort_order: 0 };

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newExp, setNewExp] = useState({ ...emptyExp });
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') {
      navigate('/admin-login');
      return;
    }
    loadExperiences();
  }, [navigate]);

  const loadExperiences = async () => {
    setLoading(true);
    const data = await base44Local.entities.Experience.list('sort_order', 50);
    setExperiences(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await base44Local.entities.Experience.delete(id);
    toast.success('Entry deleted');
    loadExperiences();
  };

  const handleSave = async (id) => {
    const data = { ...editData, points: editData.points.filter(p => p.trim()) };
    await base44Local.entities.Experience.update(id, data);
    toast.success('Entry updated');
    setEditingId(null);
    loadExperiences();
  };

  const handleCreate = async () => {
    const data = { ...newExp, points: newExp.points.filter(p => p.trim()) };
    await base44Local.entities.Experience.create(data);
    toast.success('Entry created');
    setAddingNew(false);
    setNewExp({ ...emptyExp });
    loadExperiences();
  };

  const handleLogoUpload = async (file, target) => {
    setUploadingLogo(true);
    // For local backend, convert file to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result;
      if (target === 'new') setNewExp(p => ({ ...p, logo: base64 }));
      else setEditData(p => ({ ...p, logo: base64 }));
      setUploadingLogo(false);
      toast.success('Logo uploaded');
    };
    reader.readAsDataURL(file);
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 opacity-30 pointer-events-none z-0">
        <MatrixRain />
      </div>

      {/* Cyber grid background */}
      <div className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage: 'linear-gradient(hsl(187 92% 52%) 1px, transparent 1px), linear-gradient(90deg, hsl(187 92% 52%) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Neon glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 p-6 border border-primary/30 rounded-lg bg-card/50 backdrop-blur-sm"
          style={{ boxShadow: '0 0 20px rgba(0,200,255,0.1) inset' }}>
          <div>
            <div className="font-mono text-xs text-primary/60 mb-2 tracking-widest">root@portfolio:~/shell$</div>
            <h1 className="font-mono font-bold text-3xl text-foreground" style={{ textShadow: '0 0 20px hsl(187 92% 52% / 0.3)' }}>
              &gt; EXPERIENCE EDITOR
            </h1>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/')} variant="outline" className="font-mono text-sm gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60">
              ← portfolio.sh
            </Button>
            <Button onClick={logout} variant="outline" className="font-mono text-sm gap-2 border-red-500/40 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4" /> logout
            </Button>
          </div>
        </div>

        {/* Add new button */}
        {!addingNew && (
          <Button onClick={() => setAddingNew(true)} className="mb-8 font-mono gap-2 bg-primary text-primary-foreground hover:bg-primary/90 relative"
            style={{ boxShadow: '0 0 15px rgba(0,200,255,0.4)' }}>
            <Plus className="w-4 h-4" /> ./add_experience.sh
          </Button>
        )}

        {/* New entry form */}
        {addingNew && (
          <ExpForm
            data={newExp}
            setData={setNewExp}
            onSave={handleCreate}
            onCancel={() => { setAddingNew(false); setNewExp({ ...emptyExp }); }}
            onLogoUpload={(f) => handleLogoUpload(f, 'new')}
            uploadingLogo={uploadingLogo}
            isNew
          />
        )}

        {/* Experience list */}
        {loading ? (
          <div className="font-mono text-sm text-muted-foreground animate-pulse">$ loading entries...</div>
        ) : experiences.length === 0 ? (
          <div className="font-mono text-sm text-muted-foreground">$ No entries yet. Add your first experience above.</div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-card/70 border border-primary/20 rounded overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur-sm"
                style={{ boxShadow: '0 0 0 0 transparent' }}>
                {editingId === exp.id ? (
                  <div className="p-6">
                    <ExpForm
                      data={editData}
                      setData={setEditData}
                      onSave={() => handleSave(exp.id)}
                      onCancel={() => setEditingId(null)}
                      onLogoUpload={(f) => handleLogoUpload(f, 'edit')}
                      uploadingLogo={uploadingLogo}
                    />
                  </div>
                ) : (
                   <div className="p-6 flex items-start gap-4 relative group">
                     {/* Scan line */}
                     <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                     {/* Logo preview */}
                     <div className={`w-14 h-14 rounded-full border-2 border-primary/50 flex items-center justify-center flex-shrink-0 overflow-hidden ${exp.logo_bg || 'bg-card'}`}
                       style={{ boxShadow: '0 0 12px rgba(0,200,255,0.3)' }}>
                       {exp.logo ? <img src={exp.logo} alt={exp.company} className="w-10 h-10 object-contain" /> : <Terminal className="w-5 h-5 text-primary" />}
                     </div>
                     <div className="flex-1 min-w-0">
                       <p className="font-mono text-xs text-primary/70 tracking-widest">[{exp.date}]</p>
                       <h3 className="font-mono font-bold text-base text-foreground group-hover:text-primary transition-colors">{exp.title}</h3>
                       <p className="font-mono text-xs text-primary/60 mt-0.5">@ {exp.company}</p>
                     </div>
                     <div className="flex gap-2 flex-shrink-0">
                       <Button size="sm" variant="outline" className="font-mono text-xs border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
                         onClick={() => { setEditingId(exp.id); setEditData({ ...exp, points: exp.points || [''] }); }}>
                         edit
                       </Button>
                       <Button size="sm" variant="outline" className="font-mono text-xs border-red-500/40 text-red-400 hover:bg-red-500/10"
                         onClick={() => handleDelete(exp.id)}>
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExpForm({ data, setData, onSave, onCancel, onLogoUpload, uploadingLogo, isNew }) {
  const updatePoint = (i, val) => {
    const pts = [...data.points];
    pts[i] = val;
    setData(p => ({ ...p, points: pts }));
  };
  const addPoint = () => setData(p => ({ ...p, points: [...p.points, ''] }));
  const removePoint = (i) => setData(p => ({ ...p, points: p.points.filter((_, idx) => idx !== i) }));

  return (
    <div className="space-y-4 p-6 bg-secondary/30 rounded-xl border border-primary/20">
      <div className="font-mono text-xs text-primary mb-2">{isNew ? '// new entry' : '// editing entry'}</div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="font-mono text-xs text-muted-foreground mb-1 block">Title</label>
          <Input value={data.title} onChange={e => setData(p => ({ ...p, title: e.target.value }))} className="bg-background border-border font-mono text-sm" placeholder="Job Title" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted-foreground mb-1 block">Company</label>
          <Input value={data.company} onChange={e => setData(p => ({ ...p, company: e.target.value }))} className="bg-background border-border font-mono text-sm" placeholder="Company Name" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted-foreground mb-1 block">Date Range</label>
          <Input value={data.date} onChange={e => setData(p => ({ ...p, date: e.target.value }))} className="bg-background border-border font-mono text-sm" placeholder="Jan 2025 – May 2025" />
        </div>
        <div>
          <label className="font-mono text-xs text-muted-foreground mb-1 block">Sort Order (lower = first)</label>
          <Input type="number" value={data.sort_order} onChange={e => setData(p => ({ ...p, sort_order: Number(e.target.value) }))} className="bg-background border-border font-mono text-sm" />
        </div>
      </div>

      {/* Logo upload */}
      <div>
        <label className="font-mono text-xs text-muted-foreground mb-2 block">Logo</label>
        <div className="flex items-center gap-3">
          {data.logo && (
            <div className={`w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center overflow-hidden ${data.logo_bg || 'bg-white'}`}>
              <img src={data.logo} alt="logo" className="w-8 h-8 object-contain" />
            </div>
          )}
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files[0] && onLogoUpload(e.target.files[0])} />
            <div className="flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-lg text-primary text-xs font-mono hover:bg-primary/10 transition-colors">
              <Upload className="w-3 h-3" />
              {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
            </div>
          </label>
          <div>
            <label className="font-mono text-xs text-muted-foreground mb-1 block">Logo BG (Tailwind class)</label>
            <Input value={data.logo_bg} onChange={e => setData(p => ({ ...p, logo_bg: e.target.value }))} className="bg-background border-border font-mono text-xs w-36" placeholder="bg-white" />
          </div>
        </div>
      </div>

      {/* Bullet points */}
      <div>
        <label className="font-mono text-xs text-muted-foreground mb-2 block">Bullet Points</label>
        <div className="space-y-2">
          {data.points.map((pt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-primary text-xs font-mono flex-shrink-0">•</span>
              <Input value={pt} onChange={e => updatePoint(i, e.target.value)} className="bg-background border-border font-mono text-sm flex-1" placeholder="Bullet point..." />
              <button onClick={() => removePoint(i)} className="text-muted-foreground hover:text-red-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={addPoint} className="font-mono text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 mt-1">
            <Plus className="w-3 h-3" /> Add point
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={onSave} className="bg-primary text-primary-foreground font-mono text-sm gap-2">
          <Save className="w-4 h-4" /> Save
        </Button>
        <Button onClick={onCancel} variant="outline" className="font-mono text-sm border-border">
          Cancel
        </Button>
      </div>
    </div>
  );
}