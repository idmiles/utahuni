import type { FC, ReactNode } from 'react';
import ReactIcon from '../ui/ReactIcon';
import type { SvgIconName } from '../ui/icons';

const HIGHLIGHTS: string[] = [
  'The Utah Unicycle Club is a multidisciplinary unicycling group based out of Salt Lake City, Utah.',
  'We started as a handful of friends in 2021 and quickly grew into a diverse group with riders of every level and discipline.',
  'Members ride muni in the Wasatch Mountains, trials and distance around the valley, and regularly travel for national and international events.',
  'All unicyclists are welcome. Our riders span ages 18 to 65+ and we routinely host 5–20 riders at each session.'
];

const COMMUNITY_PARAGRAPHS: string[] = [
  'Whether you are stepping onto a unicycle for the first time or training for a podium finish at Unicon, you will find a community here that supports your vision.',
  'Our aim is to introduce the sport to more people and to share the joy, growth, and spirit of self-improvement that comes from rolling a little farther every ride.',
  'We host and join events of every shape: trail days, distance training, parades, competitions, and road trips across the United States and abroad.',
  'Join our Discord server to keep up with meetups, skill sessions, and community discussions.'
];

const UPCOMING_ITEMS: Array<Array<{ title: string; body: ReactNode }>> = [
  [
    {
      title: 'Weekly Rides',
      body: 'Trail, trials, and distance sessions rotate through the Wasatch Front. Riders of every pace are welcome.'
    },
    {
      title: 'Community Events',
      body: 'We support parades, workshops, and outreach rides that help new riders discover the sport.'
    }
  ],
  [
    {
      title: 'Destination Trips',
      body: 'Members travel together for national and international unicycle gatherings and competitions.'
    },
    {
      title: 'Skill Progression',
      body: 'Structured clinics and peer coaching help everyone grow, from first mounts to technical muni.'
    }
  ]
];

const COMMUNITY_LINKS: Array<{
  href: string;
  label: string;
  description: string;
  icon: SvgIconName;
}> = [
  {
    href: 'https://discord.com/invite/jCGyGj9hzn',
    label: 'Join Us on Discord',
    description: 'Real-time ride planning and community chat.',
    icon: 'discord'
  },
  {
    href: 'https://www.instagram.com/utahuni/',
    label: 'Follow on Instagram',
    description: 'Photos, clips, and highlights from recent rides.',
    icon: 'instagram'
  }
];

const HomePage: FC = () => (
  <div className="app-layout container py-4">
    <section className="page-section">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-6 text-center">
          <img
            src="/img/uni17.jpg"
            alt="Rider hopping a log on a unicycle"
            className="img-fluid rounded-4 shadow"
          />
        </div>
        <div className="col-12 col-lg-6">
          <h2 className="text-center text-lg-start">About Us</h2>
          <p className="text-center text-lg-start text-secondary">Since July 2021</p>
          <ul className="list-unstyled m-0">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight} className="mb-3 fw-light fs-6 text-center text-lg-start">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="page-section invert">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <div className="d-flex flex-column gap-3">
            {COMMUNITY_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph} className="mb-0 fw-light fs-5">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-6 order-1 order-lg-2 text-center">
          <img
            src="/img/uni12.jpg"
            alt="Group of Utah Unicycle Club riders"
            className="img-fluid rounded-4 shadow"
          />
        </div>
      </div>
    </section>

    <section className="page-section">
      <div className="row g-4">
        {UPCOMING_ITEMS.map((column, columnIndex) => (
          <div key={columnIndex} className="col-12 col-lg-6">
            <div className="d-flex flex-column gap-4">
              {column.map((item) => (
                <article key={item.title} className="p-4 rounded-4 bg-light text-dark shadow-sm">
                  <h5 className="mb-2 fw-bold">{item.title}</h5>
                  <p className="mb-0 fw-light">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="page-section invert text-center">
      <h2 className="mb-4">Stay Connected</h2>
      <div className="row g-4 justify-content-center">
        {COMMUNITY_LINKS.map((link) => (
          <div key={link.href} className="col-12 col-md-6 col-lg-5">
            <a href={link.href} className="card-link d-block bg-blue rounded-4 p-4 h-100 shadow">
              <ReactIcon name={link.icon} size={72} className="mb-3 icon" />
              <h5 className="fw-bold mb-2">{link.label}</h5>
              <p className="mb-0 fw-light">{link.description}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HomePage;
