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
 * The portal's top-level sections, in the order a rep needs them.
 *
 * Order is deliberate: Start here, then the two things asked for most at a
 * booth (Answers, Say this), then the show. Product and Process are reference;
 * Library is study.
 */
export interface PortalSection {
  to: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  managerOnly?: boolean;
}

export const PORTAL_SECTIONS: PortalSection[] = [
  { to: '/sales', label: 'Start here', icon: Home, blurb: 'Read these three before you talk to anyone' },
  { to: '/sales/answers', label: 'Answers', icon: BookOpen, blurb: 'Every answer you give a customer' },
  { to: '/sales/pitch', label: 'Say this', icon: MessageSquareQuote, blurb: 'Pitch, objections, never-say' },
  { to: '/sales/booth', label: 'Booth', icon: ClipboardList, blurb: 'The show, and the 48 hours after it' },
  { to: '/sales/products', label: 'Product', icon: Package, blurb: "Lines, dimensions, what we don't build" },
  { to: '/sales/process', label: 'Process', icon: Compass, blurb: 'Nine stages, four handoffs, your numbers' },
  { to: '/sales/library', label: 'Library', icon: Library, blurb: 'Videos, documents, training' },
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
