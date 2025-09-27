import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { LitElement, html, type PropertyDeclarations } from "lit";
import type { PropertyValues } from "lit";

import { ContactPage, GalleryPage, HomePage } from "./pages";
import { createIconElement } from "./ui/icons";

const ROUTES = {
  home: HomePage,
  gallery: GalleryPage,
  contact: ContactPage,
} as const;

type RouteKey = keyof typeof ROUTES;

class AppView extends LitElement {
  static properties: PropertyDeclarations = {
    page: { type: String },
  };

  declare page: RouteKey;

  private reactRoot?: Root;

  private get reactHost(): HTMLDivElement | null {
    return (
      this.renderRoot?.querySelector<HTMLDivElement>("#react-root") ?? null
    );
  }

  constructor() {
    super();
    this.page = "home";
  }

  protected createRenderRoot(): HTMLElement {
    return this;
  }

  protected firstUpdated(): void {
    this.renderReact();
  }

  protected updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (changed.has("page")) {
      this.renderReact();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.reactRoot?.unmount();
    this.reactRoot = undefined;
  }

  render() {
    return html`<div id="react-root" class="react-root"></div>`;
  }

  private renderReact(): void {
    const host = this.reactHost;

    if (!host) {
      return;
    }

    if (!this.reactRoot) {
      this.reactRoot = createRoot(host);
    }

    const Component = ROUTES[this.page] ?? ROUTES.home;
    this.reactRoot.render(createElement(Component));
  }
}

const APP_VIEW_TAG = "app-view";

if (!customElements.get(APP_VIEW_TAG)) {
  customElements.define(APP_VIEW_TAG, AppView);
}

declare global {
  interface HTMLElementTagNameMap {
    "app-view": AppView;
  }
}

const NAV_ITEMS: Array<{ id: RouteKey; label: string }> = [
  { id: "home", label: "Home" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

const appShell =
  document.getElementById("app") ??
  (() => {
    const wrapper = document.createElement("div");
    document.body.appendChild(wrapper);
    return wrapper;
  })();

appShell.id = "app-shell";
appShell.classList.add("d-flex", "flex-column", "min-vh-100");

const appView = document.createElement("app-view") as AppView;

const navLinks = new Map<RouteKey, HTMLAnchorElement>();

const header = document.createElement("header");
const nav = document.createElement("nav");
nav.className = "navbar navbar-expand-lg navbar-dark py-0";

const navContainer = document.createElement("div");
navContainer.className = "container py-2";

const toggleButton = document.createElement("button");
toggleButton.type = "button";
toggleButton.className = "navbar-toggler";
toggleButton.setAttribute("aria-label", "Toggle navigation");
toggleButton.setAttribute("aria-expanded", "false");

const toggleIcon = document.createElement("span");
toggleIcon.className = "navbar-toggler-icon";
toggleButton.appendChild(toggleIcon);

const navCollapse = document.createElement("div");
navCollapse.className = "collapse navbar-collapse justify-content-end";

const navList = document.createElement("ul");
navList.className = "navbar-nav align-items-lg-center gap-lg-3";

NAV_ITEMS.forEach(({ id, label }) => {
  const listItem = document.createElement("li");
  listItem.className = "nav-item";

  const link = document.createElement("a");
  link.className = "nav-link clink fw-bold p-2";
  link.href = `#${id}`;
  link.textContent = label;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setRoute(id);
    navCollapse.classList.remove("show");
    toggleButton.setAttribute("aria-expanded", "false");
  });

  navLinks.set(id, link);
  listItem.appendChild(link);
  navList.appendChild(listItem);
});

navCollapse.appendChild(navList);
const brand = document.createElement("a");
brand.className = "navbar-brand d-flex align-items-center";
brand.href = "#home";

const brandLogo = document.createElement("img");
brandLogo.src = "/img/logo.png";
brandLogo.alt = "Utah Unicycle Club Logo";
brandLogo.className = "brand-logo";
brand.appendChild(brandLogo);

brand.addEventListener("click", (event) => {
  event.preventDefault();
  setRoute("home");
  navCollapse.classList.remove("show");
  toggleButton.setAttribute("aria-expanded", "false");
});

navContainer.appendChild(brand);
navContainer.appendChild(toggleButton);
navContainer.appendChild(navCollapse);
nav.appendChild(navContainer);
header.appendChild(nav);

const main = document.createElement("main");
main.className = "main-content flex-fill";
main.appendChild(appView);

const footer = document.createElement("footer");
footer.className = "footer text-light";

const footerContainer = document.createElement("div");
footerContainer.className = "container";

const footerRow = document.createElement("div");
footerRow.className = "row gy-3 align-items-center";

const footerBrandCol = document.createElement("div");
footerBrandCol.className = "col-12 col-md";

const footerBrandLink = document.createElement("a");
footerBrandLink.href = "#home";
footerBrandLink.className = "icon fw-bold fs-5";
footerBrandLink.textContent = "Utah Unicycle Club";
footerBrandLink.addEventListener("click", (event) => {
  event.preventDefault();
  setRoute("home");
});

footerBrandCol.appendChild(footerBrandLink);

const footerIconsCol = document.createElement("div");
footerIconsCol.className = "col-12 col-md d-flex justify-content-center gap-3";

const footerLinks: Array<{
  href: string;
  label: string;
  icon: Parameters<typeof createIconElement>[0];
  onClick?: () => void;
}> = [
  {
    href: "https://www.instagram.com/utahuni/",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://discord.com/invite/jCGyGj9hzn",
    label: "Discord",
    icon: "discord",
  },
  {
    href: "#contact",
    label: "Contact",
    icon: "envelope",
    onClick: () => setRoute("contact"),
  },
];

footerLinks.forEach(({ href, label, icon, onClick }) => {
  const link = document.createElement("a");
  link.className = "icon d-inline-flex";
  link.href = href;
  link.setAttribute("aria-label", label);

  if (onClick) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      onClick();
    });
  }

  const svgIcon = createIconElement(icon);
  link.appendChild(svgIcon);
  footerIconsCol.appendChild(link);
});

footerRow.appendChild(footerBrandCol);
footerRow.appendChild(footerIconsCol);
footerContainer.appendChild(footerRow);
footer.appendChild(footerContainer);

appShell.appendChild(header);
appShell.appendChild(main);
appShell.appendChild(footer);

toggleButton.addEventListener("click", () => {
  const expanded = navCollapse.classList.toggle("show");
  toggleButton.setAttribute("aria-expanded", expanded ? "true" : "false");
});

function parseRoute(hash: string): RouteKey {
  const clean = hash.replace("#", "") as RouteKey;
  if (clean && clean in ROUTES) {
    return clean;
  }
  return "home";
}

function setRoute(route: RouteKey, fromHash = false): void {
  if (appView.page !== route) {
    appView.page = route;
  }

  navLinks.forEach((link, key) => {
    if (key === route) {
      link.classList.add("activepage");
    } else {
      link.classList.remove("activepage");
    }
  });

  if (!fromHash) {
    window.location.hash = route;
  }
}

window.addEventListener("hashchange", () => {
  setRoute(parseRoute(window.location.hash), true);
});

const initialRoute = parseRoute(window.location.hash);
setRoute(initialRoute, true);
