import { FC, useState } from 'react';

const GALLERY_IMAGES = [
  '/img/uni2.jpg',
  '/img/uni4.jpg',
  '/img/uni12.jpg',
  '/img/uni1.jpg',
  '/img/uni8.jpg',
  '/img/123_1.JPEG',
  '/img/IMG_6294.jpg',
  '/img/IMG_4979.jpg',
  '/img/IMG_6074.jpg',
  '/img/uni3.jpg',
  '/img/uni5.jpg',
  '/img/uni6.jpg',
  '/img/uni7.jpg',
  '/img/uni9.jpg',
  '/img/uni10.jpg',
  '/img/uni11.jpg',
  '/img/uni13.jpg',
  '/img/uni14.jpg',
  '/img/uni15.jpg',
  '/img/uni16.jpg',
  '/img/uni19.png',
  '/img/IMG_6260.jpg',
  '/img/IMG_6153.jpg',
  '/img/IMG_6215.jpg',
  '/img/IMG_6192_copy.jpg'
];

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
