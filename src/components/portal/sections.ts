import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  ClipboardList,
  Compass,
  Home,
  Library,
  MessageSquareQuote,
  Package,
  ShieldCheck,
} from 'lucide-react';

import type { PortalRole } from '../../types/salesPortal';

/**
 * The portal's top-level sections.
 *
 * Order is deliberate and was revised on 2026-08-07: this portal is primarily
 * a product-knowledge reference and a set of links to sources, so Product,
 * Answers and Sources lead.
 *
 * "Talk tracks" — the pitch, objections, ballpark pricing and the phrases to
 * avoid — sits below them. It still matters, and a rep who improvises a warranty
 * or a deposit creates real exposure, but it is not what someone opens this for.
 *
 * Renamed from "Say this" on 2026-08-07: an imperative reads as instruction to
 * an experienced rep. These are approved language they can pick up, not orders.
 */
export interface PortalSection {
  to: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  managerOnly?: boolean;
}

// Order matters twice over: it is the desktop pill row, and the first three
// entries are what the mobile bottom bar promotes. Sources sits second and
// Product third because reps reach for a document to send far more often than
// they read a spec — and Answers moved off the bar because search reaches it
// faster than a tab does.
export const PORTAL_SECTIONS: PortalSection[] = [
  { to: '/sales', label: 'Home', icon: Home, blurb: 'The product in five minutes' },
  {
    to: '/sales/library',
    label: 'Sources',
    icon: Library,
    blurb: 'The deck, your printed pack, explainer videos and what is safe to send',
  },
  {
    to: '/sales/products',
    label: 'Product',
    icon: Package,
    blurb: "The four lines, construction, dimensions, what we don't build",
  },
  {
    to: '/sales/answers',
    label: 'Answers',
    icon: BookOpen,
    blurb: 'Every answer you give a customer, with where it came from',
  },
  { to: '/sales/booth', label: 'Booth', icon: ClipboardList, blurb: 'The show, and the 48 hours after it' },
  {
    to: '/sales/pitch',
    label: 'Talk tracks',
    icon: MessageSquareQuote,
    blurb: 'Approved language for the pitch, objections, pricing and the tricky questions',
  },
  { to: '/sales/process', label: 'Process', icon: Compass, blurb: 'Nine stages, four handoffs, your numbers' },
  {
    to: '/sales/manager',
    label: 'Manager',
    icon: ShieldCheck,
    blurb: 'Comp, quota, certification, open questions',
    managerOnly: true,
  },
];

/**
 * Hiding the Manager tab is cosmetic — the real gate is that the server never
 * sends a rep any manager content to render.
 */
export function sectionsForRole(role: PortalRole | null): PortalSection[] {
  return PORTAL_SECTIONS.filter((section) => !section.managerOnly || role === 'manager');
}
