import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Lock, WifiOff } from 'lucide-react';

import SEO from '../../components/SEO';

/**
 * The sales portal gate.
 *
 * Same visual family as the admin login, with one behavioural difference that
 * matters at a trade show: a network failure is reported as a network failure
 * ("you're offline"), not as a rejected password. A rep on bad wifi typing the
 * right password and being told it is wrong will try three more times and then
 * call someone.
 */
const PortalLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [isCheckingExisting, setIsCheckingExisting] = useState(true);

  // An admin session opens the portal too, so someone arriving here already
  // signed in at /admin should not be asked for a password they just typed.
  useEffect(() => {
    let cancelled = false;

    const checkExisting = async () => {
      try {
        const response = await fetch('/api/sales/auth', {
          method: 'GET',
          credentials: 'include',
          signal: AbortSignal.timeout(5000),
        });
        if (cancelled) return;
        if (response.ok) {
          navigate('/sales', { replace: true });
          return;
        }
      } catch {
        // Offline or unreachable — fall through and show the form, which has
        // its own offline messaging.
      }
      if (!cancelled) setIsCheckingExisting(false);
    };

    void checkExisting();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    const update = () => setIsOffline(navigator.onLine === false);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/sales/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        setError('That password was not recognised.');
        return;
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Sign-in failed');
      }

      navigate('/sales', { replace: true });
    } catch {
      setError(
        navigator.onLine === false
          ? "You're offline. Connect once to sign in — after that the portal works without a signal."
          : "Couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingExisting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary-light to-accent px-4">
        <SEO title="Sales Portal | YuDezign" description="Internal sales resources." noindex />
        <motion.div
          className="h-12 w-12 rounded-full border-4 border-white/40 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary-light to-accent px-4">
      <SEO title="Sales Portal | YuDezign" description="Internal sales resources." noindex />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            <span>YuDe</span>
            <span className="text-accent">Zign</span>
          </h1>
          <p className="text-lg text-white/80">Sales Portal</p>
        </div>

        <div className="rounded-2xl border border-white/20 bg-white p-8 shadow-luxury-xl">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Lock className="h-8 w-8 text-white" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="mb-6 text-center text-2xl font-semibold text-luxury-gray-900">
            Rep access
          </h2>

          {isOffline && (
            <div className="mb-6 flex items-start gap-2 rounded-lg border border-accent/40 bg-accent/10 p-4">
              <WifiOff className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-dark" />
              <p className="text-body-sm text-luxury-gray-700">
                You appear to be offline. Signing in needs a connection once — after that the portal
                keeps working without one.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="portal-password"
                className="mb-2 block text-body-sm font-medium text-luxury-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="portal-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your team password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="w-full rounded-lg border border-luxury-gray-200 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                <p className="text-body-sm text-red-800">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full rounded-lg bg-primary py-3 font-medium text-white shadow-luxury transition-all duration-300 hover:bg-primary-light hover:shadow-luxury-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-luxury-gray-100 pt-6">
            <p className="text-center text-body-sm text-luxury-gray-500">
              For YuDeZign sales staff. Ask your manager for the current password.
            </p>
            <p className="mt-2 text-center text-body-sm text-luxury-gray-400">
              Already signed in to the admin panel? You&rsquo;re already in — just go to{' '}
              <a href="/sales" className="underline hover:text-primary">
                /sales
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-body-sm text-white transition-colors hover:text-accent">
            ← Back to yudezign.com
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PortalLogin;
