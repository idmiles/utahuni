import type { FC } from 'react';
import ReactIcon from '../ui/ReactIcon';
import type { SvgIconName } from '../ui/icons';

type ContactLink = {
  href: string;
  title: string;
  description: string;
  media:
    | { type: 'image'; src: string; alt: string; width?: number }
    | { type: 'svg'; name: SvgIconName; size?: number };
};

const CONTACT_LINKS: ContactLink[] = [
  {
    href: 'https://uniusa.org',
    title: 'Unicycling Society of America',
    description: 'National resources, membership, and events across the United States.',
    media: { type: 'image', src: '/img/uniusa.png', alt: 'USA Unicycling society logo', width: 96 }
  },
  {
    href: 'https://www.instagram.com/utahuni/',
    title: 'Instagram',
    description: 'See ride recaps, event announcements, and our favorite clips.',
    media: { type: 'svg', name: 'instagram', size: 72 }
  },
  {
    href: 'https://discord.com/invite/jCGyGj9hzn',
    title: 'Discord',
    description: 'Join the real-time conversation to plan rides and learn from other riders.',
    media: { type: 'svg', name: 'discord', size: 72 }
  }
];

const ContactPage: FC = () => (
  <div className="app-layout container py-4">
    <section className="page-section">
      <header className="text-center mb-4">
        <h2 className="mb-2">Connect With Us</h2>
        <p className="fw-light fs-5 mb-0">
          Reach out anytime—new riders, visiting riders, and seasoned experts are all welcome in the Utah
          Unicycle Club.
        </p>
      </header>
      <div className="row g-4 justify-content-center">
        {CONTACT_LINKS.map((link) => (
          <div key={link.href} className="col-12 col-md-6 col-lg-4">
            <a className="contact-card" href={link.href}>
              <div className="contact-card__media">
                {link.media.type === 'image' ? (
                  <img
                    src={link.media.src}
                    alt={link.media.alt}
                    className="contact-card__image"
                    style={link.media.width ? { width: `${link.media.width}px` } : undefined}
                  />
                ) : (
                  <ReactIcon
                    name={link.media.name}
                    size={link.media.size ?? 72}
                    className="contact-card__icon"
                  />
                )}
              </div>
              <h5 className="contact-card__title">{link.title}</h5>
              <p className="contact-card__description">{link.description}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default ContactPage;
