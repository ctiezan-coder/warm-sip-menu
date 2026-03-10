import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, Upload, X, ChevronDown, ChevronRight, Sparkles, ArrowUp, ArrowDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import logo from "@/assets/neriya-logo.png";
import type { Tables } from "@/integrations/supabase/types";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSearchBar from "@/components/admin/AdminSearchBar";
import AdminItemCard from "@/components/admin/AdminItemCard";

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
  const [search, setSearch] = useState("");

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
  const [generatingImage, setGeneratingImage] = useState(false);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await fetchData();
    };
    init();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (!isAdmin) { await supabase.auth.signOut(); navigate("/admin/login"); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catRes, secRes, itemRes] = await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order"),
        supabase.from("menu_sections").select("*").order("sort_order"),
        supabase.from("menu_items").select("*").order("sort_order"),
      ]);
      if (catRes.error) throw catRes.error;
      if (secRes.error) throw secRes.error;
      if (itemRes.error) throw itemRes.error;
      setCategories(catRes.data);
      setSections(secRes.data);
      setItems(itemRes.data);
    } catch (error: any) {
      toast.error(error.message || "Erreur de chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  // ── Search filtering ──
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(i => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q));
  }, [items, search]);

  const filteredSectionIds = useMemo(() => {
    if (!search.trim()) return null; // null = show all
    const sectionIds = new Set(filteredItems.map(i => i.section_id));
    // Also match section names
    const q = search.toLowerCase();
    sections.forEach(s => { if (s.name.toLowerCase().includes(q)) sectionIds.add(s.id); });
    return sectionIds;
  }, [filteredItems, sections, search]);

  const filteredCatIds = useMemo(() => {
    if (!filteredSectionIds) return null;
    const catIds = new Set<string>();
    sections.forEach(s => { if (filteredSectionIds.has(s.id)) catIds.add(s.category_id); });
    return catIds;
  }, [filteredSectionIds, sections]);

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
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ── AI Image generation ──
  const generateAIImage = async () => {
    if (!itemForm.name.trim()) { toast.error("Entrez d'abord le nom du plat"); return; }
    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-dish-image", {
        body: { dishName: itemForm.name, dishDescription: itemForm.description },
      });
      if (error) throw error;
      if (data?.error) { toast.error(data.error); return; }
      if (data?.imageUrl) {
        setImagePreview(data.imageUrl);
        setImageFile(null); // already uploaded by edge function
        toast.success("Image générée par IA !");
      }
    } catch (e: any) {
      toast.error(e.message || "Erreur génération image");
    } finally {
      setGeneratingImage(false);
    }
  };

  // ── Reorder helpers ──
  const swapOrder = async (table: "menu_categories" | "menu_sections" | "menu_items", a: { id: string; sort_order: number }, b: { id: string; sort_order: number }) => {
    await Promise.all([
      supabase.from(table).update({ sort_order: b.sort_order }).eq("id", a.id),
      supabase.from(table).update({ sort_order: a.sort_order }).eq("id", b.id),
    ]);
    fetchData();
  };

  const moveItem = (list: { id: string; sort_order: number }[], index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    return { a: list[index], b: list[target] };
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
    
    // If AI generated (imagePreview is a URL, not blob), use it directly
    if (imagePreview && !imageFile && imagePreview.startsWith("http")) {
      image_url = imagePreview;
    } else if (imageFile) {
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
    setExpandedCats(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const toggleSection = (id: string) => {
    setExpandedSections(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  // Auto-expand when searching
  useEffect(() => {
    if (search.trim()) {
      setExpandedCats(new Set(categories.map(c => c.id)));
      setExpandedSections(new Set(sections.map(s => s.id)));
    }
  }, [search, categories, sections]);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Chargement...</div>;

  const visibleCategories = filteredCatIds ? categories.filter(c => filteredCatIds.has(c.id)) : categories;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Neriya" className="w-10 h-10 rounded-full border border-primary/30" />
          <h1 className="font-display text-lg font-bold text-primary">Gestion du Menu</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" onClick={() => navigate("/")} className="text-foreground border-border">
            Voir le menu
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive">
            <LogOut className="w-4 h-4 mr-1" /> Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Dashboard stats */}
        <AdminDashboard categories={categories} sections={sections} items={items} />

        {/* Search + Add */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <AdminSearchBar search={search} onSearchChange={setSearch} />
          </div>
          <Button onClick={() => openCategoryDialog()} className="bg-primary text-primary-foreground shrink-0">
            <Plus className="w-4 h-4 mr-1" /> Catégorie
          </Button>
        </div>

        {/* Categories tree */}
        {visibleCategories.map((cat, catIdx) => {
          const catSections = sections.filter(s => s.category_id === cat.id);
          const visibleSections = filteredSectionIds ? catSections.filter(s => filteredSectionIds.has(s.id)) : catSections;

          return (
            <div key={cat.id} className="glass-card rounded-xl overflow-hidden">
              {/* Category header */}
              <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-secondary/50" onClick={() => toggleCat(cat.id)}>
                {expandedCats.has(cat.id) ? <ChevronDown className="w-5 h-5 text-primary" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                <span className="text-lg">{cat.emoji}</span>
                <span className="font-display font-bold text-foreground flex-1">{cat.name}</span>
                <div className="flex gap-0.5" onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" onClick={() => { const pair = moveItem(categories, catIdx, -1); if (pair) swapOrder("menu_categories", pair.a, pair.b); }} disabled={catIdx === 0} className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { const pair = moveItem(categories, catIdx, 1); if (pair) swapOrder("menu_categories", pair.a, pair.b); }} disabled={catIdx === categories.length - 1} className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
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

                  {visibleSections.map((sec, secIdx) => {
                    const sectionItems = (search.trim() ? filteredItems : items).filter(i => i.section_id === sec.id);
                    const allSectionItems = items.filter(i => i.section_id === sec.id);

                    return (
                      <div key={sec.id} className="border border-border rounded-lg overflow-hidden">
                        {/* Section header */}
                        <div className="flex items-center gap-2 p-3 bg-secondary/30 cursor-pointer" onClick={() => toggleSection(sec.id)}>
                          {expandedSections.has(sec.id) ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                          <span className="font-body font-semibold text-foreground flex-1 text-sm">{sec.name}</span>
                          <span className="text-xs text-muted-foreground mr-2">{allSectionItems.length} plats</span>
                          <div className="flex gap-0.5" onClick={e => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" onClick={() => { const pair = moveItem(catSections, secIdx, -1); if (pair) swapOrder("menu_sections", pair.a, pair.b); }} disabled={secIdx === 0} className="h-7 w-7 text-muted-foreground hover:text-primary">
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => { const pair = moveItem(catSections, secIdx, 1); if (pair) swapOrder("menu_sections", pair.a, pair.b); }} disabled={secIdx === catSections.length - 1} className="h-7 w-7 text-muted-foreground hover:text-primary">
                              <ArrowDown className="w-3 h-3" />
                            </Button>
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
                            {sectionItems.map((item, itemIdx) => {
                              const realIdx = allSectionItems.findIndex(i => i.id === item.id);
                              return (
                              <AdminItemCard
                                key={item.id}
                                item={item}
                                onEdit={() => openItemDialog(sec.id, item)}
                                onDelete={() => deleteItem(item.id)}
                                onMoveUp={() => { const pair = moveItem(allSectionItems, realIdx, -1); if (pair) swapOrder("menu_items", pair.a, pair.b); }}
                                onMoveDown={() => { const pair = moveItem(allSectionItems, realIdx, 1); if (pair) swapOrder("menu_items", pair.a, pair.b); }}
                                isFirst={realIdx === 0}
                                isLast={realIdx === allSectionItems.length - 1}
                              />
                              );
                            })}
                            <Button variant="outline" size="sm" onClick={() => openItemDialog(sec.id)} className="w-full text-foreground border-border border-dashed">
                              <Plus className="w-3 h-3 mr-1" /> Ajouter un plat
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {visibleCategories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">{search ? "Aucun résultat" : "Aucune catégorie"}</p>
            <p className="text-sm mt-1">{search ? "Essayez un autre terme" : "Commencez par créer une catégorie"}</p>
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

            {/* Image upload + AI */}
            <div className="space-y-2">
              <Label>Image</Label>
              {imagePreview && (
                <div className="relative w-20 h-20">
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-primary/30" />
                  <button onClick={() => { if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview); setImageFile(null); setImagePreview(null); }} className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <div className="flex gap-3 items-center flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-primary hover:underline">
                  <Upload className="w-4 h-4" />
                  {imagePreview ? "Changer" : "Uploader"}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAIImage}
                  disabled={generatingImage || !itemForm.name.trim()}
                  className="text-foreground border-border"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {generatingImage ? "Génération..." : "Générer par IA"}
                </Button>
              </div>
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
