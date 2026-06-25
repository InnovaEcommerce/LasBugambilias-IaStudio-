import { useState, useEffect, FormEvent, DragEvent } from 'react';
import { useDynamicImages, SiteImages, defaultImages, getGoogleDriveImageUrl } from '../hooks/useDynamicImages';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  RefreshCw, 
  Upload, 
  Sparkles, 
  Database, 
  Users, 
  Trash2, 
  Download, 
  Mail, 
  Phone, 
  FileText, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Layers,
  Copy,
  Table,
  Grid,
  FileSpreadsheet
} from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { 
  subscribeToLeads, 
  deleteLeadLocal, 
  LeadWithMeta 
} from '../services/leadsService';

interface PreviewStatus {
  [key: string]: 'loading' | 'valid' | 'invalid' | 'empty';
}

export default function AdminPanel() {
  const { images, loading: imagesLoading, error: storageError, saveImages } = useDynamicImages();
  
  // Tab active state: 'images' | 'crm'
  const [activeTab, setActiveTab] = useState<'images' | 'crm'>('crm');

  // Leads list state & subscription
  const [leads, setLeads] = useState<LeadWithMeta[]>([]);
  const [crmLoading, setCrmLoading] = useState(true);
  const [crmError, setCrmError] = useState<string | null>(null);
  
  // Grid/Table mode toggle for easy Copy/Paste or Sheets processing
  const [crmViewMode, setCrmViewMode] = useState<'grid' | 'table'>('table');

  // Sync images state with formValues
  const [formValues, setFormValues] = useState<SiteImages>({
    heroBanner: '',
    mapPlan: '',
    testimonialsFamily: '',
    related1Huacho: '',
    related2Planicie: '',
    related3SantaClara: '',
  });

  // Dragging over per field key
  const [isDraggingOver, setIsDraggingOver] = useState<{[key: string]: boolean}>({});

  // Image validation states
  const [previewStatus, setPreviewStatus] = useState<PreviewStatus>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Google Sheets configurations & sync states
  const [sheetsConfig, setSheetsConfig] = useState<{ configured: boolean; webhookUrlPlaceholder: string | null }>({
    configured: false,
    webhookUrlPlaceholder: null
  });
  const [isSyncingLeadId, setIsSyncingLeadId] = useState<string | null>(null);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ leadId: string; success: boolean; text: string } | null>(null);

  // Load Google Sheets webhook credentials status from server
  useEffect(() => {
    fetch('/lasbugambilias/api/sheets-config')
      .then((res) => res.json())
      .then((data) => {
        setSheetsConfig(data);
      })
      .catch((err) => {
        console.error('Error fetching sheets configuration status:', err);
      });
  }, []);

  const handleSyncLead = async (lead: LeadWithMeta) => {
    setIsSyncingLeadId(lead.id);
    setSyncStatusMsg(null);
    try {
      const response = await fetch('/lasbugambilias/api/leads/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lead)
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSyncStatusMsg({
          leadId: lead.id,
          success: true,
          text: 'Enviado con éxito a Google Sheets!'
        });
      } else {
        setSyncStatusMsg({
          leadId: lead.id,
          success: false,
          text: result.error || 'Error al enviar a Google Sheets'
        });
      }
    } catch (err: any) {
      setSyncStatusMsg({
        leadId: lead.id,
        success: false,
        text: err.message || 'Error de conexión'
      });
    } finally {
      setIsSyncingLeadId(null);
    }
  };

  // 1. Subscribe to leads local database on mount
  useEffect(() => {
    setCrmLoading(true);
    const unsubscribe = subscribeToLeads(
      (liveLeads) => {
        setLeads(liveLeads);
        setCrmLoading(false);
      },
      (err) => {
        setCrmError(err?.message || 'Error al conectar con la base de datos de leads.');
        setCrmLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // 2. Sync image forms once loaded
  useEffect(() => {
    if (!imagesLoading) {
      setFormValues({
        heroBanner: images.heroBanner,
        mapPlan: images.mapPlan,
        testimonialsFamily: images.testimonialsFamily,
        related1Huacho: images.related1Huacho,
        related2Planicie: images.related2Planicie,
        related3SantaClara: images.related3SantaClara,
      });
    }
  }, [images, imagesLoading]);

  // Lead CRUD handlers

  const handleDeleteLead = async (id: string) => {
    if (confirm('¿Estás completamente seguro de eliminar permanentemente este prospecto?')) {
      try {
        await deleteLeadLocal(id);
      } catch (err: any) {
        alert('Error al eliminar registro: ' + err.message);
      }
    }
  };

  const handleCopyToClipboard = () => {
    if (leads.length === 0) return;
    const headers = [
      'fecha', 'campaña', 'formulario', 'captacion', 'lead', 'celular', 'correo', 
      'distrito', 'comentarios'
    ];
    const rows = leads.map(l => [
      l.fecha,
      l.campaña,
      l.formulario,
      l.captacion,
      l.lead,
      `'${l.celular}`, // Quote prevent Sheets from dropping leading zero
      l.correo,
      l.distrito || '',
      l.comentarios || ''
    ]);
    const content = [headers, ...rows].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join('\t')).join('\n');
    
    navigator.clipboard.writeText(content)
      .then(() => {
        alert('¡Tabla copiada al portapapeles! Abre Google Sheets y presiona Ctrl+V para pegar las 9 columnas perfectamente.');
      })
      .catch(err => {
        alert('Error al copiar al portapapeles: ' + err);
      });
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      'fecha', 'campaña', 'formulario', 'captacion', 'lead', 'celular', 'correo', 
      'distrito', 'comentarios'
    ];
    const rows = leads.map(l => [
      l.fecha,
      l.campaña,
      l.formulario,
      l.captacion,
      l.lead,
      l.celular,
      l.correo,
      l.distrito || '',
      (l.comentarios || '').replace(/[\n\r]+/g, ' ')
    ]);
    
    // UTF-8 BOM + semicolon separator for native Excel/Sheets integration
    const csvContent = '\uFEFF' + [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', 'Leads_Las_Bugambilias_Google_Sheets.csv');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'Leads_Las_Bugambilias.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Image input handlers
  const handleInputChange = (field: keyof SiteImages, val: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: val,
    }));

    if (!val.trim()) {
      setPreviewStatus((prev) => ({ ...prev, [field]: 'empty' }));
    } else {
      setPreviewStatus((prev) => ({ ...prev, [field]: 'loading' }));
    }
  };

  const handleFileProcess = async (field: keyof SiteImages, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPEG, PNG, WEBP, GIF).');
      return;
    }

    setPreviewStatus((prev) => ({ ...prev, [field]: 'loading' }));

    try {
      const base64Data = await compressImage(file, 1000, 1000, 0.75);
      setFormValues((prev) => ({
        ...prev,
        [field]: base64Data,
      }));
      setPreviewStatus((prev) => ({ ...prev, [field]: 'valid' }));
    } catch (error: any) {
      console.error('Error compression detail:', error);
      alert('Error al optimizar y preparar la imagen para guardar.');
      setPreviewStatus((prev) => ({ ...prev, [field]: 'invalid' }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, field: string) => {
    e.preventDefault();
    setIsDraggingOver((prev) => ({ ...prev, [field]: true }));
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>, field: string) => {
    e.preventDefault();
    setIsDraggingOver((prev) => ({ ...prev, [field]: false }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, field: keyof SiteImages) => {
    e.preventDefault();
    setIsDraggingOver((prev) => ({ ...prev, [field]: false }));
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(field, e.dataTransfer.files[0]);
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('¿Estás seguro de que deseas restablecer todas las imágenes a sus versiones locales originales?')) {
      setFormValues(defaultImages);
      const newStatus: PreviewStatus = {};
      Object.keys(defaultImages).forEach((k) => {
        newStatus[k] = 'loading';
      });
      setPreviewStatus(newStatus);
    }
  };

  const handleSubmitImages = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      await saveImages(formValues);
      setSaveSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSaveSuccess(false), 5000);
    } catch (err: any) {
      setSaveError(err.message || 'Error al guardar en el almacenamiento local.');
    } finally {
      setIsSaving(false);
    }
  };

  const fieldsConfig: Array<{
    key: keyof SiteImages;
    label: string;
    rec: string;
    desc: string;
  }> = [
    {
      key: 'heroBanner',
      label: 'Banner Principal (Hero)',
      rec: 'Recomendado: 1920x1080px (Proporción 16:9)',
      desc: 'Imagen de portada de fondo que se visualiza al inicio del sitio residencial.',
    },
    {
      key: 'mapPlan',
      label: 'Plano del Proyecto / Mapa de Ubicación',
      rec: 'Recomendado: 1200x800px (Horizontal nítido)',
      desc: 'Mapa del plano de lotes y localización utilizado en la sección interactiva.',
    },
    {
      key: 'testimonialsFamily',
      label: 'Imagen de Testimonios (Social Proof)',
      rec: 'Recomendado: 500x500px (Cuadrado, centrado)',
      desc: 'Fotografía familiar de prueba social centrado arriba de las reseñas.',
    },
    {
      key: 'related1Huacho',
      label: 'Inmobiliaria Huacho (Proyecto Relacionado 1)',
      rec: 'Recomendado: 800x600px (Proporción 4:3)',
      desc: 'Imagen de previsualización para el proyecto Alameda en el catálogo.',
    },
    {
      key: 'related2Planicie',
      label: 'La Planicie de La Joya (Proyecto Relacionado 2)',
      rec: 'Recomendado: 800x600px (Proporción 4:3)',
      desc: 'Imagen de la tarjeta para el proyecto de La Planicie.',
    },
    {
      key: 'related3SantaClara',
      label: 'Golf de Santa Clara (Proyecto Relacionado 3)',
      rec: 'Recomendado: 800x600px',
      desc: 'Imagen de portada del proyecto Santa Clara en el catálogo inferior.',
    }
  ];

  const totalLeads = leads.length;
  const mainFormLeads = leads.filter(l => l.formulario !== 'formulario popup').length;
  const popupFormLeads = leads.filter(l => l.formulario === 'formulario popup').length;
  const withCommentsCount = leads.filter(l => l.comentarios && l.comentarios.trim() !== '').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-pink-600 selection:text-white">
      {/* Decorative top bar */}
      <div className="h-1.5 bg-gradient-to-r from-[#D2007A] via-[#FFD100] to-pink-600" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header navigation section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-slate-900 pb-6 mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-pink-500 font-mono text-xs uppercase tracking-widest mb-1.5 font-bold">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              SISTEMA INTEGRAL DE ADMINISTRACIÓN • LAS BUGAMBILIAS
            </div>
            <h1 className="text-3xl md:text-3xl font-black tracking-tight text-white mb-2 uppercase">
              Consola de Operaciones CRM-Media
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
              Administra de manera segura y centralizada la experiencia comercial de los lotes. 
              Sube configuraciones gráficas y recibe solicitudes de prospectos directamente en tiempo real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
            <button
              onClick={() => window.location.href = import.meta.env.BASE_URL}
              className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <ArrowLeft size={14} />
              Volver al Sitio Público
            </button>

            {activeTab === 'images' && (
              <button
                onClick={handleResetToDefaults}
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:bg-red-950/40 hover:border-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                title="Restablecer imágenes de demostración"
              >
                <RefreshCw size={14} />
                Revertir de Fábrica
              </button>
            )}
          </div>
        </div>

        {/* Global tab manager buttons */}
        <div className="flex border-b border-slate-900 mb-8 p-1 bg-slate-900/40 rounded-xl max-w-xl">
          <button
            onClick={() => setActiveTab('crm')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase transition${
              activeTab === 'crm' 
                ? 'bg-[#D2007A] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database size={15} />
            Visualizador de Leads (CRM)
            {leads.length > 0 && (
              <span className="ml-1 bg-white text-[#D2007A] px-2 py-0.5 rounded-full text-[10px] font-black font-mono">
                {leads.length}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('images')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-xs font-bold uppercase transition${
              activeTab === 'images' 
                ? 'bg-[#D2007A] text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon size={15} />
            Gestor de Imágenes
          </button>
        </div>

        {/* TAB 1: LOCAL CRM GESTOR PIPELINE */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/60 border border-slate-900/80 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Total Leads
                </span>
                <p className="text-3xl font-black font-mono text-white mt-1">{totalLeads}</p>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-900/80 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Form Principal
                </span>
                <p className="text-3xl font-black font-mono text-white mt-1">{mainFormLeads}</p>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-900/80 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Form Popup
                </span>
                <p className="text-3xl font-black font-mono text-white mt-1">{popupFormLeads}</p>
              </div>
              <div className="p-4 bg-slate-900/60 border border-slate-900/80 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" /> Con Mensaje
                </span>
                <p className="text-3xl font-black font-mono text-white mt-1">{withCommentsCount}</p>
              </div>
            </div>

            {/* Actions & info banner (Google Sheets-oriented) */}
            <div className="bg-slate-900/60 border border-slate-900 rounded-3xl p-6 mb-6 space-y-4">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="text-[#FFD100]" size={18} />
                    Integración y Sincronización con Google Sheets / Excel
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Hemos activado el almacenamiento local resiliente (offline-safe) y un canal de envío directo a Google Sheets por webhook.
                    Si no está habilitado todavía, puedes colocar tu URL correspondiente en los **Secrets** de la app.
                  </p>
                  
                  {/* Google Sheets Live Configuration Indicator */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="text-slate-400">Canal de envío directo:</span>
                    {sheetsConfig.configured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-mono text-[9px] uppercase font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        AUTOMÁTICO ACTIVO ({sheetsConfig.webhookUrlPlaceholder})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full font-mono text-[9px] uppercase font-bold" title="Ingresa GOOGLE_SHEETS_WEBHOOK_URL en los Secrets para activar.">
                        ⚠️ DESACTIVADO (Falta configurar URL de Sheets en Secrets)
                      </span>
                    )}
                  </div>
                </div>
                
                {/* View Mode Toggle */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 scale-95 origin-left lg:origin-right shrink-0">
                  <button
                    type="button"
                    onClick={() => setCrmViewMode('table')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition ${
                      crmViewMode === 'table'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Table size={12} />
                    Vista Tabla
                  </button>
                  <button
                    type="button"
                    onClick={() => setCrmViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition ${
                      crmViewMode === 'grid'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid size={12} />
                    Vista Tarjetas
                  </button>
                </div>
              </div>

              {leads.length > 0 ? (
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-950/50">
                  <button
                    type="button"
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md cursor-pointer select-none"
                    title="Copiar contenido formateado en columnas para Google Sheets o Excel"
                  >
                    <Copy size={13} />
                    Copiar Tabla para Google Sheets
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-bold rounded-xl transition shadow-sm cursor-pointer select-none"
                    title="Descargar archivo CSV compatible con Google Sheets"
                  >
                    <FileSpreadsheet size={13} />
                    Descargar CSV de Leads
                  </button>

                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-pink-400 text-xs font-bold rounded-xl transition shadow-sm cursor-pointer select-none"
                    title="Descargar respaldo JSON alternativo"
                  >
                    <Download size={13} />
                    Exportar JSON
                  </button>

                  <div className="text-[11px] text-slate-500 font-mono ml-auto">
                    Total: <span className="text-white font-bold">{leads.length}</span> prospectos
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic pt-2 border-t border-slate-950/50">No hay prospectos almacenados todavía. Los leads se guardarán localmente al registrarse.</p>
              )}
            </div>

            {/* Leads representation */}
            {crmLoading ? (
              <div className="text-center py-16 space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent mx-auto"></div>
                <p className="text-slate-400 text-xs font-mono">Leyendo contactos de base de datos local...</p>
              </div>
            ) : crmError ? (
              <div className="p-6 bg-red-950/20 border border-red-900/40 rounded-2xl text-center space-y-3">
                <AlertCircle className="text-red-400 mx-auto" size={32} />
                <p className="text-sm font-bold text-red-300">Hubo un error de lectura</p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">{crmError}</p>
              </div>
            ) : leads.length === 0 ? (
               <div className="bg-slate-900/30 border border-slate-900 rounded-3xl text-center py-16 px-4 space-y-4">
                 <Users className="w-12 h-12 text-slate-600 mx-auto" />
                 <p className="text-slate-200 font-bold">No se registran prospectos (Leads) en esta base de datos</p>
                 <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                   Los formularios públicos de contacto depositarán aquí la información al instante. 
                   Intente simular un registro en el portal público de Las Bugambilias.
                 </p>
               </div>
            ) : crmViewMode === 'table' ? (
              /* Beautiful Table Layout matching Google Sheets columns precisely */
              <div className="bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                      <tr className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider font-mono border-b border-slate-900/80">
                        <th className="p-4 font-bold">Fecha</th>
                        <th className="p-4 font-bold">Campaña</th>
                        <th className="p-4 font-bold">Formulario</th>
                        <th className="p-4 font-bold">Captación</th>
                        <th className="p-4 font-bold">Lead</th>
                        <th className="p-4 font-bold">Celular</th>
                        <th className="p-4 font-bold">Correo</th>
                        <th className="p-4 font-bold">Distrito</th>
                        <th className="p-4 font-bold">Comentarios</th>
                        <th className="p-4 font-bold text-center flex-1">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900/60 text-xs text-slate-200">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-900/20 transition-colors">
                          {/* Fecha */}
                          <td className="p-4 whitespace-nowrap font-mono text-[11px] text-slate-400">
                            {l.fecha}
                          </td>

                          {/* Campaña */}
                          <td className="p-4 font-semibold text-slate-300 w-32">
                            {l.campaña}
                          </td>

                          {/* Formulario */}
                          <td className="p-4 text-slate-300">
                            <span className="bg-slate-950 text-pink-400 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">
                              {l.formulario}
                            </span>
                          </td>

                          {/* Captacion */}
                          <td className="p-4 text-slate-400 font-mono text-[11px]">
                            {l.captacion}
                          </td>

                          {/* Lead Name */}
                          <td className="p-4 font-bold text-white uppercase whitespace-nowrap">
                            {l.lead}
                          </td>

                          {/* Celular */}
                          <td className="p-4 whitespace-nowrap font-mono font-bold text-[#FFD100]">
                            +51 {l.celular}
                          </td>

                          {/* Correo */}
                          <td className="p-4 font-mono text-slate-300 break-all">
                            {l.correo}
                          </td>

                          {/* Distrito */}
                          <td className="p-4 uppercase text-slate-400">
                            {l.distrito || <span className="text-slate-650 opacity-40 italic">N/D</span>}
                          </td>

                          {/* Comentarios */}
                          <td className="p-4 max-w-xs text-slate-300 italic" title={l.comentarios || ''}>
                            {l.comentarios ? `"${l.comentarios}"` : <span className="text-slate-650 opacity-40">sin comentarios</span>}
                          </td>

                          {/* Estado y Acciones */}
                          <td className="p-4 whitespace-nowrap text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <div className="flex items-center justify-center gap-2">
                                {/* Manual sync tool to sheets webhook */}
                                <button
                                  type="button"
                                  onClick={() => handleSyncLead(l)}
                                  disabled={isSyncingLeadId === l.id}
                                  className={`p-1.5 hover:bg-slate-800 rounded border transition cursor-pointer ${
                                    isSyncingLeadId === l.id
                                      ? 'bg-slate-850 text-slate-400 border-slate-800 animate-spin'
                                      : syncStatusMsg?.leadId === l.id && syncStatusMsg.success
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                      : syncStatusMsg?.leadId === l.id
                                      ? 'bg-red-500/10 text-red-400 border-red-500/30'
                                      : 'bg-slate-950 text-amber-400 border-slate-800 hover:text-[#FFD100] hover:border-slate-700'
                                  }`}
                                  title={
                                    syncStatusMsg?.leadId === l.id 
                                      ? syncStatusMsg.text 
                                      : "Sincronizar a Google Sheets"
                                  }
                                >
                                  {isSyncingLeadId === l.id ? (
                                    <RefreshCw size={11} className="animate-spin" />
                                  ) : (
                                    <FileSpreadsheet size={12} />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(l.id)}
                                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition"
                                  title="Eliminar Prospecto"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>

                              {/* Minor inline sync feedback */}
                              {syncStatusMsg && syncStatusMsg.leadId === l.id && (
                                <span className={`text-[9.5px] font-mono font-bold leading-none ${
                                  syncStatusMsg.success ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                  {syncStatusMsg.success ? '¡Sincronizado!' : 'Fallo de envío'}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Card Representation Mode */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.map((l) => (
                  <div
                    key={l.id}
                    className="bg-slate-900/60 border border-slate-900/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between hover:border-slate-800 transition"
                  >
                    {/* Branded decorative side bar */}
                    <div
                      className="absolute top-0 bottom-0 left-0 w-1.5 bg-pink-600"
                    />

                    {/* Metadata Header */}
                    <div className="space-y-4 pl-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-slate-500 font-bold flex items-center gap-1.5">
                          <Clock size={11} />
                          {new Date(l.timestamp).toLocaleString('es-PE')}
                        </span>
                        
                        <div className="flex items-center gap-2">


                          {/* Manual sync tool to sheets webhook */}
                          <button
                            type="button"
                            onClick={() => handleSyncLead(l)}
                            disabled={isSyncingLeadId === l.id}
                            className={`p-1.5 hover:bg-slate-800 rounded border transition cursor-pointer ${
                              isSyncingLeadId === l.id
                                ? 'bg-slate-850 text-slate-400 border-slate-800 animate-spin'
                                : syncStatusMsg?.leadId === l.id && syncStatusMsg.success
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : syncStatusMsg?.leadId === l.id
                                ? 'bg-red-500/10 text-red-450 border-red-500/30'
                                : 'bg-slate-950 text-amber-500 border-slate-800 hover:text-[#FFD100]'
                            }`}
                            title={
                              syncStatusMsg?.leadId === l.id
                                ? syncStatusMsg.text
                                : "Sincronizar a Google Sheets"
                            }
                          >
                            {isSyncingLeadId === l.id ? (
                              <RefreshCw size={11} className="animate-spin" />
                            ) : (
                              <FileSpreadsheet size={11} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteLead(l.id)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-500 hover:text-red-400 transition"
                            title="Eliminar Prospecto"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Sync feedback block */}
                      {syncStatusMsg && syncStatusMsg.leadId === l.id && (
                        <div className={`text-[10px] py-1.5 px-2.5 rounded font-mono font-bold text-center border ${
                          syncStatusMsg.success 
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
                            : 'bg-red-950/40 text-red-400 border-red-900/50'
                        }`}>
                          {syncStatusMsg.success ? '✓ Sincronizado con Sheets' : `⚠️ ${syncStatusMsg.text}`}
                        </div>
                      )}

                      {/* Client details block */}
                      <div className="space-y-2">
                        <h3 className="text-sm font-black text-white uppercase tracking-tight">
                          {l.lead}
                        </h3>
                        <div className="space-y-1.5 text-xs text-slate-300 font-sans">
                          <p className="flex items-center gap-1.5 text-slate-300">
                            <Mail size={12} className="text-slate-500" />
                            <span>{l.correo}</span>
                          </p>
                          <p className="flex items-center gap-1.5 text-slate-300 font-mono">
                            <Phone size={12} className="text-slate-500 font-sans" />
                            <span>+51 {l.celular}</span>
                          </p>
                          {l.distrito && (
                            <p className="flex items-center gap-1.5 text-slate-300">
                              <MapPin size={12} className="text-slate-500" />
                              <span className="uppercase">{l.distrito}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Optional capture context info */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
                        <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[9px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          <Layers size={9} />
                          Form: {l.formulario}
                        </span>
                      </div>

                      {/* Display potential comments */}
                      {l.comentarios && (
                        <div className="bg-slate-950/60 p-2.5 rounded-lg text-xs italic text-slate-450 border-l border-slate-800">
                          "{l.comentarios}"
                        </div>
                      )}
                    </div>

                    {/* Footer Optins info */}
                    <div className="flex gap-3 text-[9px] text-slate-500 pt-3 border-t border-dashed border-slate-900 mt-4 pl-2 font-mono">
                      <span className={l.politicaTerminos ? 'text-emerald-500' : ''}>
                        T&C: {l.politicaTerminos ? 'SÍ' : 'NO'}
                      </span>
                      <span className={l.politicaPublicidad ? 'text-emerald-500' : ''}>
                        Ad: {l.politicaPublicidad ? 'SÍ' : 'NO'}
                      </span>
                      <span className={l.politicaPerfilamiento ? 'text-emerald-500' : ''}>
                        Profile: {l.politicaPerfilamiento ? 'SÍ' : 'NO'}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: GESTOR DE IMÁGENES PRO */}
        {activeTab === 'images' && (
          <form onSubmit={handleSubmitImages} className="space-y-8">
            
            {storageError && (
              <div className="p-4 bg-red-950/50 border border-red-800/60 rounded-2xl flex items-start gap-3 text-red-300 text-sm">
                <AlertCircle className="shrink-0 mt-0.5 text-red-400" size={18} />
                <div>
                  <p className="font-bold mb-1 col-span-1">Error de Almacenamiento</p>
                  <p className="text-slate-400">{storageError}</p>
                </div>
              </div>
            )}

            {saveSuccess && (
              <div className="p-4 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl flex items-center gap-3 text-emerald-200 text-sm animate-fade-in" id="save-success-notification">
                <CheckCircle className="shrink-0 text-emerald-400" size={20} />
                <div>
                  <p className="font-semibold">¡Imágenes guardadas con éxito!</p>
                  <p className="text-xs text-emerald-400/80 font-semibold mt-1">Los cambios se guardaron localmente y el sitio público reflejará los cambios instantáneamente.</p>
                </div>
              </div>
            )}

            {saveError && (
              <div className="p-4 bg-red-950/50 border border-red-800/60 rounded-2xl flex items-start gap-3 text-red-300 text-sm animate-fade-in">
                <AlertCircle className="shrink-0 mt-0.5 text-red-400" size={18} />
                <div>
                  <p className="font-bold mb-1 col-span-1">No se pudo guardar la configuración</p>
                  <p className="text-slate-400">{saveError}</p>
                </div>
              </div>
            )}

            <div className="bg-slate-900/60 border border-slate-900/80 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <ImageIcon className="text-[#D2007A]" size={22} />
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Catalogo de Imagenes Principales</h2>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {fieldsConfig.map(({ key, label, rec, desc }) => {
                  const currentVal = formValues[key] || '';
                  const isBase64 = currentVal.startsWith('data:image/');
                  const status = previewStatus[key] || (currentVal ? 'valid' : 'empty');

                  return (
                    <div key={key} className="p-5 bg-slate-950/50 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all">
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        
                        {/* Column 1: Input controls & descriptive rules (7 cols on desktop) */}
                        <div className="lg:col-span-7 space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-100 mb-1">
                              {label}
                            </label>
                            <p className="text-xs text-slate-400 mb-2">{desc}</p>
                          </div>

                          {/* Interactive Drag and Drop Zone */}
                          <div
                            onDragOver={(e) => handleDragOver(e, key)}
                            onDragLeave={(e) => handleDragLeave(e, key)}
                            onDrop={(e) => handleDrop(e, key)}
                            onClick={() => document.getElementById(`file-${key}`)?.click()}
                            className={`group relative border-2 border-dashed rounded-xl p-5 cursor-pointer text-center select-none transition-all flex flex-col items-center justify-center ${
                              isDraggingOver[key]
                                ? 'border-pink-500 bg-pink-950/20 text-pink-300 scale-[1.01]'
                                : 'border-slate-800 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-700 hover:scale-[1.005]'
                            }`}
                          >
                            <input
                              type="file"
                              id={`file-${key}`}
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleFileProcess(key, e.target.files[0]);
                                }
                              }}
                              className="hidden"
                            />

                            <div className={`p-3 rounded-full mb-3 ${isDraggingOver[key] ? 'bg-pink-955/50 text-pink-400' : 'bg-slate-955 text-slate-400 group-hover:text-pink-400 transition-colors'}`}>
                              <Upload size={20} />
                            </div>

                            <p className="text-sm font-medium text-slate-200">
                              Arrastra y suelta tu archivo aquí o <span className="text-pink-500 group-hover:underline">búscalo desde tu PC</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Admite PNG, JPG, JPEG o WEBP (máximo autocompirmido para rapidez)
                            </p>
                          </div>

                          {/* Option Divider */}
                          <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-850"></div>
                            <span className="flex-shrink mx-4 text-[10px] text-slate-600 font-bold uppercase tracking-wider">O coloca un enlace directo (URL)</span>
                            <div className="flex-grow border-t border-slate-850"></div>
                          </div>

                          {/* URL input field */}
                          <div className="relative font-sans">
                            <input
                              type="text"
                              value={isBase64 ? '📷 Imagen Optimizado Cargada de forma Local' : currentVal}
                              disabled={isBase64}
                              onChange={(e) => handleInputChange(key, e.target.value)}
                              placeholder="https://ejemplo.com/imagen.jpg"
                              id={`input-${key}`}
                              className={`w-full bg-slate-900 border text-slate-100 placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all font-mono ${
                                isBase64 ? 'border-pink-800/40 text-pink-400 cursor-not-allowed bg-pink-955/10' : 'border-slate-800'
                              }`}
                            />
                            {isBase64 && (
                              <button
                                type="button"
                                onClick={() => handleInputChange(key, '')}
                                className="absolute right-3 top-3 text-[11px] font-bold text-red-400 hover:text-red-300 pr-1 hover:underline cursor-pointer"
                              >
                                Limpiar archivo
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 font-sans">
                            <span className="inline-flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                              <Info size={13} />
                              {rec}
                            </span>

                            <span className="text-xs text-slate-500 font-mono">
                              ID: <span className="text-slate-400">{key}</span>
                            </span>
                          </div>
                        </div>

                        {/* Column 2: Interactive Real-time Image preview (5 cols on desktop) */}
                        <div className="lg:col-span-5">
                          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Sparkles className="text-pink-500 shrink-0" size={12} />
                            vista previsualizada
                          </div>

                          <div className="relative aspect-video lg:aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden border border-slate-900 flex items-center justify-center shadow-inner group">
                            
                            {/* Image Loader logic */}
                            {currentVal.trim() !== '' ? (
                              <>
                                <img
                                  src={getGoogleDriveImageUrl(currentVal)}
                                  alt={`Previsualización de ${label}`}
                                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                                    status === 'valid' ? 'opacity-100' : 'opacity-20'
                                  }`}
                                  onLoad={() => {
                                    setPreviewStatus((prev) => ({ ...prev, [key]: 'valid' }));
                                  }}
                                  onError={() => {
                                    setPreviewStatus((prev) => ({ ...prev, [key]: 'invalid' }));
                                  }}
                                />

                                {/* Loading overlay */}
                                {status === 'loading' && (
                                  <div className="absolute inset-0 bg-slate-950/80 flex flex-col justify-center items-center p-4">
                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-pink-500 border-t-transparent mb-2"></div>
                                    <span className="text-xs text-slate-400 font-mono">Comprimiendo y cargando gráfico...</span>
                                  </div>
                                )}

                                {/* Error overlay */}
                                {status === 'invalid' && (
                                  <div className="absolute inset-0 bg-slate-950/90 flex flex-col justify-center items-center p-4 text-center font-sans">
                                    <AlertCircle className="text-rose-500 mb-2" size={28} />
                                    <span className="text-xs font-bold text-rose-450 block mb-1">Imagen no disponible</span>
                                    <span className="text-[11px] text-slate-550 leading-normal max-w-xs block">
                                      El enlace ingresado está roto, no es válido o bloquea la visualización por CORS.
                                    </span>
                                  </div>
                                )}

                                {/* Success Tag */}
                                {status === 'valid' && (
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/85 border border-slate-900 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm select-none">
                                    <CheckCircle size={10} />
                                    Válida
                                  </div>
                                )}
                              </>
                            ) : (
                              // Empty state
                              <div className="p-6 text-center flex flex-col items-center justify-center font-sans">
                                <ImageIcon className="text-slate-600 mb-2 animate-pulse" size={28} />
                                <span className="text-slate-550 text-xs font-semibold block mb-1">Imagen no disponible</span>
                                <span className="text-[11px] text-slate-600 max-w-xs leading-normal">
                                  El campo está vacío. Se conservará la imagen original de muestra.
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Actions footer bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900 border border-slate-850 p-5 rounded-3xl gap-4">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 text-center sm:text-left leading-normal font-sans">
                <Info size={14} className="text-[#D2007A] shrink-0" />
                Los cambios se impactan al instante en toda la landing page para el público general.
              </span>

              <button
                type="submit"
                disabled={isSaving}
                className={`w-full sm:w-auto h-12 flex items-center justify-center gap-2 px-8 rounded-xl font-bold text-xs uppercase shadow-lg transition-all cursor-pointer ${
                  isSaving 
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                    : 'bg-pink-600 text-white hover:bg-pink-500 active:scale-95'
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-400 border-t-transparent inline-block mr-2" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
