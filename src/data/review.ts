/** Client-review lock settings (3-day preview). */
export const REVIEW_LOCK_ENABLED = true;

/**
 * SHA-256 hex of the share password.
 * Default password: `CPHK-Suzaku`
 * Rotate with: node scripts/hash-password.mjs "your-new-password"
 * Then paste the printed hash into REVIEW_PASS_HASH.
 */
export const REVIEW_PASS_HASH =
  "691887fc014306ee4459a014df02ee08229401f3b2c6e481e1e1c507308f3220";

export const REVIEW_SESSION_KEY = "suzaku-review-auth-v1";
export const REVIEW_WATERMARK = "CONFIDENTIAL · CLIENT REVIEW · DO NOT COPY";
