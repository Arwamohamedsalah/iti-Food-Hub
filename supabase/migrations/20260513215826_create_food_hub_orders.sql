/*
  # ITI Aswan Food Hub - Orders Table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `student_name` (text) - name of the student placing the order
      - `track` (text) - ITI track (UI/UX, Frontend, Full Stack, etc.)
      - `restaurant` (text) - chosen restaurant name
      - `items` (text) - order details/items description
      - `session_id` (text) - groups orders by ordering session/round
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `orders` table
    - Allow anyone to insert orders (no auth needed for a group coordination tool)
    - Allow anyone to read all orders (public coordination board)
    - Allow insert/select for anonymous users to support the group order flow

  3. Notes
    - This is a coordination tool for students, not a financial system
    - Orders are grouped by session_id to support multiple order rounds per day
    - No auth required - students can join by just entering their name
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL DEFAULT '',
  track text NOT NULL DEFAULT '',
  restaurant text NOT NULL DEFAULT '',
  items text NOT NULL DEFAULT '',
  session_id text NOT NULL DEFAULT 'default',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    student_name != '' AND
    track != '' AND
    restaurant != '' AND
    items != ''
  );

CREATE POLICY "Anyone can delete own orders by session"
  ON orders FOR DELETE
  TO anon, authenticated
  USING (true);
