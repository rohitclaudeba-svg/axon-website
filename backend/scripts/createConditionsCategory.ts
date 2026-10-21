import { createCategory } from "../src/services/categories.service";
import { pool } from "../src/config/db";

async function main() {
  const category = await createCategory({ name: "Conditions", parentId: null });
  console.log("Created category:", category);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
