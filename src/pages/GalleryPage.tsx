import { FC, useState } from 'react';

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.webp',
  '.svg'
]);

const galleryImagePaths = Object.keys(
  import.meta.glob('../../public/gallery/*', {
    eager: true,
    import: 'default',
    query: '?url'
  })
);

const GALLERY_IMAGES: string[] = galleryImagePaths
  .filter((path) => {
    const extensionIndex = path.lastIndexOf('.');
    if (extensionIndex === -1) {
      return false;
    }

    const extension = path.slice(extensionIndex).toLowerCase();
    return IMAGE_EXTENSIONS.has(extension);
  })
  .map((path) => path.replace('../../public', ''))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const GalleryPage: FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="app-layout container py-4">
      <section className="page-section invert">
        <header className="text-center mb-4">
          <h2 className="mb-2">Gallery</h2>
          <p className="fw-light fs-5">
            Scenes from Utah Unicycle Club rides, clinics, and adventures.
          </p>
        </header>
        <div className="image-container">
          {GALLERY_IMAGES.map((src) => (
            <button
              key={src}
              type="button"
              className="border-0 bg-transparent p-0"
              onClick={() => setActiveImage(src)}
            >
              <img src={src} alt="Utah Unicycle Club rider" className="image-container-image rounded-4 shadow" />
            </button>
          ))}
        </div>
      </section>

      {activeImage && (
        <div className="gallery-popup" role="dialog" aria-modal="true">
          <button type="button" aria-label="Close gallery image" onClick={() => setActiveImage(null)}>
            ×
          </button>
          <img src={activeImage} alt="Utah Unicycle Club rider" />
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
