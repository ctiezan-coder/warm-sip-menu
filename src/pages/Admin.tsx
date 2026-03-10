import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, Upload, X, ChevronDown, ChevronRight, Image as ImageIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/neriya-logo.png";
import type { Tables } from "@/integrations/supabase/types";

type MenuItem = Tables<"menu_items">;
type MenuSection = Tables<"menu_sections">;
type MenuCategory = Tables<"menu_categories">;

const Admin = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Dialog states
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [editingSection, setEditingSection] = useState<MenuSection | null>(null);
  const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null);

  // Form states
  const [itemForm, setItemForm] = useState({ name: "", price: "", emoji: "", description: "", section_id: "", sort_order: 0 });
  const [sectionForm, setSectionForm] = useState({ name: "", category_id: "", sort_order: 0 });
  const [categoryForm, setCategoryForm] = useState({ name: "", emoji: "", description: "", sort_order: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) { await supabase.auth.signOut(); navigate("/admin/login"); }
  };

  const fetchData = async () => {
    setLoading(true);
    const [catRes, secRes, itemRes] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order"),
      supabase.from("menu_sections").select("*").order("sort_order"),
      supabase.from("menu_items").select("*").order("sort_order"),
    ]);
    if (catRes.data) setCategories(catRes.data);
    if (secRes.data) setSections(secRes.data);
    if (itemRes.data) setItems(itemRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  // ── Image upload ──
  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from("menu-images").upload(fileName, file);
    if (error) { toast.error("Erreur upload image"); return null; }
    const { data } = supabase.storage.from("menu-images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ── Category CRUD ──
  const openCategoryDialog = (cat?: MenuCategory) => {
    if (cat) {
      setEditingCategory(cat);
      setCategoryForm({ name: cat.name, emoji: cat.emoji || "", description: cat.description || "", sort_order: cat.sort_order });
    } else {
      setEditingCategory(null);
      setCategoryForm({ name: "", emoji: "", description: "", sort_order: categories.length });
    }
    setCategoryDialogOpen(true);
  };

  const saveCategory = async () => {
    if (!categoryForm.name.trim()) { toast.error("Nom requis"); return; }
    if (editingCategory) {
      const { error } = await supabase.from("menu_categories").update(categoryForm).eq("id", editingCategory.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Catégorie modifiée");
    } else {
      const { error } = await supabase.from("menu_categories").insert(categoryForm);
      if (error) { toast.error(error.message); return; }
      toast.success("Catégorie ajoutée");
    }
    setCategoryDialogOpen(false);
    fetchData();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie et tous ses plats ?")) return;
    const { error } = await supabase.from("menu_categories").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Catégorie supprimée");
    fetchData();
  };

  // ── Section CRUD ──
  const openSectionDialog = (catId: string, sec?: MenuSection) => {
    if (sec) {
      setEditingSection(sec);
      setSectionForm({ name: sec.name, category_id: sec.category_id, sort_order: sec.sort_order });
    } else {
      setEditingSection(null);
      setSectionForm({ name: "", category_id: catId, sort_order: sections.filter(s => s.category_id === catId).length });
    }
    setSectionDialogOpen(true);
  };

  const saveSection = async () => {
    if (!sectionForm.name.trim()) { toast.error("Nom requis"); return; }
    if (editingSection) {
      const { error } = await supabase.from("menu_sections").update(sectionForm).eq("id", editingSection.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Section modifiée");
    } else {
      const { error } = await supabase.from("menu_sections").insert(sectionForm);
      if (error) { toast.error(error.message); return; }
      toast.success("Section ajoutée");
    }
    setSectionDialogOpen(false);
    fetchData();
  };

  const deleteSection = async (id: string) => {
    if (!confirm("Supprimer cette section et tous ses plats ?")) return;
    const { error } = await supabase.from("menu_sections").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Section supprimée");
    fetchData();
  };

  // ── Item CRUD ──
  const openItemDialog = (sectionId: string, item?: MenuItem) => {
    setImageFile(null);
    setImagePreview(null);
    if (item) {
      setEditingItem(item);
      setItemForm({ name: item.name, price: item.price, emoji: item.emoji || "", description: item.description || "", section_id: item.section_id, sort_order: item.sort_order });
      if (item.image_url) setImagePreview(item.image_url);
    } else {
      setEditingItem(null);
      setItemForm({ name: "", price: "", emoji: "", description: "", section_id: sectionId, sort_order: items.filter(i => i.section_id === sectionId).length });
    }
    setItemDialogOpen(true);
  };

  const saveItem = async () => {
    if (!itemForm.name.trim() || !itemForm.price.trim()) { toast.error("Nom et prix requis"); return; }
    
    let image_url = editingItem?.image_url || null;
    if (imageFile) {
      image_url = await uploadImage(imageFile);
    }

    const payload = { ...itemForm, image_url };

    if (editingItem) {
      const { error } = await supabase.from("menu_items").update(payload).eq("id", editingItem.id);
      if (error) { toast.error(error.message); return; }
      toast.success("Plat modifié");
    } else {
      const { error } = await supabase.from("menu_items").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Plat ajouté");
    }
    setItemDialogOpen(false);
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Supprimer ce plat ?")) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Plat supprimé");
    fetchData();
  };

  const toggleCat = (id: string) => {
    setExpandedCats(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Chargement...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Neriya" className="w-10 h-10 rounded-full border border-primary/30" />
          <h1 className="font-display text-lg font-bold text-primary">Gestion du Menu</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/")} className="text-foreground border-border">
            Voir le menu
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive">
            <LogOut className="w-4 h-4 mr-1" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Add category button */}
        <div className="flex justify-end">
          <Button onClick={() => openCategoryDialog()} className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-1" /> Nouvelle catégorie
          </Button>
        </div>

        {/* Categories tree */}
        {categories.map(cat => (
          <div key={cat.id} className="glass-card rounded-xl overflow-hidden">
            {/* Category header */}
            <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50" onClick={() => toggleCat(cat.id)}>
              {expandedCats.has(cat.id) ? <ChevronDown className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
              <span className="text-lg">{cat.emoji}</span>
              <span className="font-display font-bold text-foreground flex-1">{cat.name}</span>
              <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                <Button variant="ghost" size="icon" onClick={() => openCategoryDialog(cat)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteCategory(cat.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {expandedCats.has(cat.id) && (
              <div className="px-4 pb-4 space-y-3">
                <Button variant="outline" size="sm" onClick={() => openSectionDialog(cat.id)} className="text-foreground border-border">
                  <Plus className="w-3 h-3 mr-1" /> Nouvelle section
                </Button>

                {sections.filter(s => s.category_id === cat.id).map(sec => (
                  <div key={sec.id} className="border border-border rounded-lg overflow-hidden">
                    {/* Section header */}
                    <div className="flex items-center gap-2 p-3 bg-secondary/30 cursor-pointer" onClick={() => toggleSection(sec.id)}>
                      {expandedSections.has(sec.id) ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                      <span className="font-body font-semibold text-foreground flex-1 text-sm">{sec.name}</span>
                      <span className="text-xs text-muted-foreground mr-2">{items.filter(i => i.section_id === sec.id).length} plats</span>
                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => openSectionDialog(cat.id, sec)} className="h-7 w-7 text-muted-foreground hover:text-primary">
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteSection(sec.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {expandedSections.has(sec.id) && (
                      <div className="p-3 space-y-2">
                        {items.filter(i => i.section_id === sec.id).map(item => (
                          <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors">
                            {item.image_url ? (
                              <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-primary/20" />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="font-body font-semibold text-sm text-foreground">{item.emoji && `${item.emoji} `}{item.name}</span>
                              {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
                            </div>
                            <span className="font-display font-bold text-primary text-sm whitespace-nowrap">{item.price}</span>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openItemDialog(sec.id, item)} className="h-7 w-7 text-muted-foreground hover:text-primary">
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)} className="h-7 w-7 text-muted-foreground hover:text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => openItemDialog(sec.id)} className="w-full text-foreground border-border border-dashed">
                          <Plus className="w-3 h-3 mr-1" /> Ajouter un plat
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">Aucune catégorie</p>
            <p className="text-sm mt-1">Commencez par créer une catégorie de menu</p>
          </div>
        )}
      </main>

      {/* ── Category Dialog ── */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">{editingCategory ? "Modifier la catégorie" : "Nouvelle catégorie"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom</Label><Input value={categoryForm.name} onChange={e => setCategoryForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" /></div>
            <div><Label>Emoji</Label><Input value={categoryForm.emoji} onChange={e => setCategoryForm(p => ({ ...p, emoji: e.target.value }))} placeholder="🍛" className="bg-secondary border-border" /></div>
            <div><Label>Description</Label><Input value={categoryForm.description} onChange={e => setCategoryForm(p => ({ ...p, description: e.target.value }))} className="bg-secondary border-border" /></div>
            <div><Label>Ordre</Label><Input type="number" value={categoryForm.sort_order} onChange={e => setCategoryForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="bg-secondary border-border" /></div>
            <Button onClick={saveCategory} className="w-full bg-primary text-primary-foreground">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Section Dialog ── */}
      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-primary">{editingSection ? "Modifier la section" : "Nouvelle section"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom</Label><Input value={sectionForm.name} onChange={e => setSectionForm(p => ({ ...p, name: e.target.value }))} placeholder="Cafés ☕" className="bg-secondary border-border" /></div>
            <div><Label>Ordre</Label><Input type="number" value={sectionForm.sort_order} onChange={e => setSectionForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="bg-secondary border-border" /></div>
            <Button onClick={saveSection} className="w-full bg-primary text-primary-foreground">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Item Dialog ── */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">{editingItem ? "Modifier le plat" : "Nouveau plat"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Nom *</Label><Input value={itemForm.name} onChange={e => setItemForm(p => ({ ...p, name: e.target.value }))} className="bg-secondary border-border" /></div>
            <div><Label>Prix *</Label><Input value={itemForm.price} onChange={e => setItemForm(p => ({ ...p, price: e.target.value }))} placeholder="2 500 Fr" className="bg-secondary border-border" /></div>
            <div><Label>Emoji</Label><Input value={itemForm.emoji} onChange={e => setItemForm(p => ({ ...p, emoji: e.target.value }))} placeholder="🍗" className="bg-secondary border-border" /></div>
            <div><Label>Description</Label><Input value={itemForm.description} onChange={e => setItemForm(p => ({ ...p, description: e.target.value }))} className="bg-secondary border-border" /></div>
            <div><Label>Ordre</Label><Input type="number" value={itemForm.sort_order} onChange={e => setItemForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="bg-secondary border-border" /></div>
            
            {/* Image upload */}
            <div className="space-y-2">
              <Label>Image</Label>
              {imagePreview && (
                <div className="relative w-20 h-20">
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-primary/30" />
                  <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
                <Upload className="w-4 h-4" />
                {imagePreview ? "Changer l'image" : "Ajouter une image"}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* Section selector */}
            <div>
              <Label>Section</Label>
              <Select value={itemForm.section_id} onValueChange={v => setItemForm(p => ({ ...p, section_id: v }))}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {sections.map(s => (
                    <SelectItem key={s.id} value={s.id}>
                      {categories.find(c => c.id === s.category_id)?.emoji} {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={saveItem} className="w-full bg-primary text-primary-foreground">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
