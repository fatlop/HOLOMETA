// Simple checker for redirects, HTTPS and optional CORS
// Requires Node 18+ (global fetch)
// Env vars:
//   CHECK_PRIMARY_DOMAIN (e.g. https://qpandatecnovador.com)
//   CHECK_SECONDARY_DOMAIN (e.g. https://vibexlegend.com)
//   CHECK_API_URL (optional backend URL to test CORS, e.g. https://api.qpandatecnovador.com/health)

const primary = process.env.CHECK_PRIMARY_DOMAIN || 'https://qpandatecnovador.com';
const secondary = process.env.CHECK_SECONDARY_DOMAIN || 'https://vibexlegend.com';
const apiUrl = process.env.CHECK_API_URL;

async function checkHttps(domain) {
  const httpUrl = domain.replace('https://', 'http://');
  const res = await fetch(httpUrl, { redirect: 'manual' });
  const isRedirectToHttps = res.status >= 300 && res.status < 400 && (res.headers.get('location') || '').startsWith('https://');
  console.log(`[HTTPS] ${domain}: ${isRedirectToHttps ? 'OK (HTTP→HTTPS redirect)' : 'FAIL (no redirect)'} — status ${res.status}`);
  return isRedirectToHttps;
}

async function checkRedirect(from, to) {
  const url = from + '/test-path';
  const res = await fetch(url, { redirect: 'manual' });
  const location = res.headers.get('location') || '';
  const ok = res.status >= 300 && res.status < 400 && location.startsWith(to);
  console.log(`[Redirect] ${from} → ${to}: ${ok ? 'OK' : 'FAIL'} — status ${res.status}, location ${location}`);
  return ok;
}

async function checkCors(origin, url) {
  try {
    const res = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        'Origin': origin,
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type'
      },
      redirect: 'manual'
    });
    const allowOrigin = res.headers.get('access-control-allow-origin');
    const ok = allowOrigin === origin || allowOrigin === '*';
    console.log(`[CORS] ${origin} on ${url}: ${ok ? 'OK' : 'FAIL'} — ACAO: ${allowOrigin}`);
    return ok;
  } catch (e) {
    console.log(`[CORS] ${origin} on ${url}: ERROR — ${e.message}`);
    return false;
  }
}

(async () => {
  let ok = true;
  ok &= await checkHttps(primary);
  ok &= await checkHttps(secondary);
  ok &= await checkRedirect(secondary, primary);

  if (apiUrl) {
    ok &= await checkCors(primary, apiUrl);
    ok &= await checkCors(secondary, apiUrl);
  }

  if (!ok) {
    console.error('One or more checks failed.');
    process.exit(1);
  }
  console.log('All checks passed.');
})();
