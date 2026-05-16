-- Per-order delivery fee (EGP), on top of food items
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS delivery_fee integer NOT NULL DEFAULT 0;
