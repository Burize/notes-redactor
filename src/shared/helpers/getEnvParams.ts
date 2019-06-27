export default function getEnvParams() {
  const env = process.env.NODE_ENV;
  const apiUrl = process.env.API_URL;
  const withAnalyze = process.env.WITH_ANALYZE_MODE;
  const cacheVersion = process.env.CACHE_VERSION || 'cache-v1';

  const envParams = {
    env,
    apiUrl,
    withAnalyze,
    cacheVersion,
  };

  return envParams;
}
