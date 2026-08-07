import { Route, Routes } from 'react-router-dom';

import PortalGate from '../../components/portal/PortalGate';
import PortalLogin from './PortalLogin';
import StartHere from './StartHere';
import Answers from './Answers';
import SayThis from './SayThis';
import Booth from './Booth';
import Product from './Product';
import Process from './Process';
import Library from './Library';
import Manager from './Manager';
import DocViewer from './DocViewer';

/**
 * All /sales routes, in one lazily-loaded chunk.
 *
 * Two deliberate departures from the rest of the app, both justified here:
 *
 *   - This module is code-split (see App.tsx). Every other page is a static
 *     import, but a public visitor to yudezign.com has no reason to download
 *     the sales portal's UI.
 *   - These are NESTED routes rather than the flat block used elsewhere, so the
 *     shell — tab row, search index, session — persists across tab changes
 *     instead of remounting on every navigation.
 */
const PortalRoutes = () => (
  <Routes>
    <Route path="login" element={<PortalLogin />} />
    <Route element={<PortalGate />}>
      <Route index element={<StartHere />} />
      <Route path="answers" element={<Answers />} />
      <Route path="pitch" element={<SayThis />} />
      <Route path="booth" element={<Booth />} />
      <Route path="products" element={<Product />} />
      <Route path="process" element={<Process />} />
      <Route path="library" element={<Library />} />
      <Route path="manager" element={<Manager />} />
      {/* Full-screen document viewer. Inside the gate so it stays behind the
          password, and inside the layout so Back has somewhere to return to. */}
      <Route path="doc" element={<DocViewer />} />
      {/* Unknown /sales/* path: land on Start here rather than the 404 page. */}
      <Route path="*" element={<StartHere />} />
    </Route>
  </Routes>
);

export default PortalRoutes;
