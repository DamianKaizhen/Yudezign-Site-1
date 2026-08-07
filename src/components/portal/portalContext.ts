import { useOutletContext } from 'react-router-dom';

import type { PortalPayload, PortalRole, RepContent, SearchDoc } from '../../types/salesPortal';

/**
 * Shared context for every portal page.
 *
 * Separate from PortalLayout.tsx so that file only exports components — the
 * react-refresh lint rule the repo enforces, and it keeps hot reload working
 * while editing the shell.
 */
export interface PortalContext {
  rep: RepContent;
  payload: PortalPayload;
  role: PortalRole;
  index: SearchDoc[];
}

/** Typed access to the layout's context from any portal page. */
export function usePortal(): PortalContext {
  return useOutletContext<PortalContext>();
}
