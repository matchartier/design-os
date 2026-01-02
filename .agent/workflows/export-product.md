---
description: Generate the complete handoff package for implementation
---

1. Check if the following files exist (Required):
   - `product/product-overview.md`
   - `product/product-roadmap.md`
   - `product/data-model/data-model.md`
2. // turbo
   Run the export script:
   ```bash
   node scripts/export-product.cjs
   ```
3. Verify that `product-plan.zip` was created in the root.
4. Notify the user that the export is ready and they can download it from the Dashboard.
