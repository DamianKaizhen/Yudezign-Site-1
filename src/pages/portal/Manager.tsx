import { ShieldAlert } from 'lucide-react';

import { usePortal } from '../../components/portal/portalContext';
import DocView from '../../components/portal/DocView';

/**
 * Manager-only material.
 *
 * The visible guard here is cosmetic. The real one is that `/api/sales/content`
 * never puts a `manager` key in a rep's payload — so a rep who types this URL
 * has nothing to render, not merely a hidden view.
 */
const Manager = () => {
  const { payload, role } = usePortal();

  if (role !== 'manager' || !payload.manager) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-luxury-gray-400" aria-hidden="true" />
        <h1 className="mb-2 text-h4 font-medium text-luxury-gray-900">Manager access only</h1>
        <p className="text-body-sm text-luxury-gray-600">
          This section holds compensation, quota and certification material. Sign in with the manager
          password if you need it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1">
          <ShieldAlert className="h-3.5 w-3.5 text-accent-dark" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-accent-dark">
            Manager only — not in the rep handbook
          </span>
        </div>
        <h1 className="text-display-mobile font-medium text-luxury-gray-900 md:text-h1">Manager</h1>
        <p className="mt-2 text-body-sm text-luxury-gray-600">{payload.manager.version}</p>
      </header>

      {payload.manager.docs.map((doc) => (
        <DocView key={doc.id} doc={doc} className="rounded-xl bg-white p-5 shadow-luxury-sm" />
      ))}
    </div>
  );
};

export default Manager;
