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
 * "Say this" — the pitch, objections and the never-say list — sits below them.
 * It still matters, and a rep who improvises a warranty or a deposit creates
 * real exposure, but it is not what someone opens this for. Start here carries
 * a short pointer to the never-say list rather than leading with it.
 */
export interface PortalSection {
  to: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  managerOnly?: boolean;
}

export const PORTAL_SECTIONS: PortalSection[] = [
  { to: '/sales', label: 'Start here', icon: Home, blurb: 'The product in five minutes' },
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
  {
    to: '/sales/library',
    label: 'Sources',
    icon: Library,
    blurb: 'Ten explainer videos, the shared folders, and our own pages',
  },
  { to: '/sales/booth', label: 'Booth', icon: ClipboardList, blurb: 'The show, and the 48 hours after it' },
  {
    to: '/sales/pitch',
    label: 'Say this',
    icon: MessageSquareQuote,
    blurb: 'Pitch, objections, and the phrases to avoid',
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
