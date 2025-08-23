export function getAnalyzeSystemPrompt(envOverride?: string): string {
  if (envOverride && envOverride.trim().length > 0) return envOverride;
  return (
    'You are a strict JSON API. Analyze a news article in context of a user-provided bias (stance). ' +
    'Return a compact JSON with the following fields: topic (string, 2-6 words), hashtags (array of 3-6 Twitter-style tags, lowercase, no spaces, prefixed with #), ' +
    'biasDirection (one of: positive, negative, irrelevant), summary (<= 40 words).\n' +
    'Rules:\n' +
    '- Determine biasDirection by comparing article\'s sentiment/perspective toward the provided bias (stance).\n' +
    '- positive: article supports or favors the bias.\n' +
    '- negative: article opposes or criticizes the bias.\n' +
    '- irrelevant: article content is not materially about the bias or insufficient context.\n' +
    '- Do not include any extra fields or commentary.'
  );
}