import { useState, useEffect } from 'react';

// Static fallbacks
import heroDevelopmentImg from '../assets/images/hero_development_1780838935963.jpg';
import mapPlanImg from '../assets/images/plano-ventas.jpg';
import familySocialProofImg from '../assets/images/family_social_proof_1780838972150.png';
import huachoPlotImg from '../assets/images/huacho_plot_1780839015281.png';
import planiciePlotImg from '../assets/images/planicie_plot_1780839032182.png';
import santaClaraPlotImg from '../assets/images/santa_clara_plot_1780839047695.png';

export interface SiteImages {
  heroBanner: string;
  mapPlan: string;
  testimonialsFamily: string;
  related1Huacho: string;
  related2Planicie: string;
  related3SantaClara: string;
}

export function getGoogleDriveImageUrl(url: string): string {
  if (url && url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
  }
  return url;
}

export const defaultImages: SiteImages = {
  heroBanner: 'https://drive.google.com/file/d/1eCHLIzbBca5jB-UZmBMHZSiATYE13m81/view?usp=drive_link',
  mapPlan: mapPlanImg,
  testimonialsFamily: familySocialProofImg,
  related1Huacho: huachoPlotImg,
  related2Planicie: planiciePlotImg,
  related3SantaClara: santaClaraPlotImg,
};

const STORAGE_KEY = 'las_bugambilias_site_images';

export function useDynamicImages() {
  const [images, setImages] = useState<SiteImages>(defaultImages);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setImages({
          ...defaultImages,
          ...parsed,
        });
      } else {
        setImages(defaultImages);
      }
    } catch (err: any) {
      console.error('Error loading images from localStorage:', err);
      setError(err?.message || 'Error al cargar imágenes de almacenamiento local.');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveImages = async (newImages: Partial<SiteImages>) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : {};
      const updated = {
        ...existing,
        ...newImages,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setImages((prev) => ({
        ...prev,
        ...newImages,
      }));
    } catch (err: any) {
      console.error('Error saving images to localStorage:', err);
      throw new Error(err?.message || 'Error al guardar imágenes en almacenamiento local.');
    }
  };

  return { images, loading, error, saveImages };
}
