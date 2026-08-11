/** Client-review lock settings (3-day preview). */
export const REVIEW_LOCK_ENABLED = true;

/**
 * SHA-256 hex of the share password.
 * Default password: `suzaku-review-3d`
 * Rotate with: node scripts/hash-password.mjs "your-new-password"
 * Then paste the printed hash into REVIEW_PASS_HASH.
 */
export const REVIEW_PASS_HASH =
  "47d80b02c3a722288d42c1b70c17cb2d03e7dc7d3f299f9d7ffcbc4cd4592c5d";

export const REVIEW_SESSION_KEY = "suzaku-review-auth-v1";
export const REVIEW_WATERMARK = "CONFIDENTIAL · CLIENT REVIEW · DO NOT COPY";
