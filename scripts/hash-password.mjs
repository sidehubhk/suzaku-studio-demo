import { createHash } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}

const hash = createHash("sha256").update(password).digest("hex");
console.log("\nPassword hash (paste into src/data/review.ts → REVIEW_PASS_HASH):\n");
console.log(hash);
console.log("\nShare the plaintext password with your client out-of-band.\n");
