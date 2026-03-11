
-- Update existing pancakes names and prices to match the menu
UPDATE menu_items SET name = 'Pancakes Miel, Caramel ou Sirop de Rabe', price = '2 500 Fr' WHERE id = 'e5190d3d-7b9a-4085-a449-2244d88bc543';
UPDATE menu_items SET price = '3 000 Fr' WHERE id = '87db8f84-cb03-448a-8862-58d7928314bb';

-- Replace "Pancakes Caramel Fruit (saison)" with "Pancakes Nutella Oreo"
UPDATE menu_items SET name = 'Pancakes Nutella Oreo', price = '4 000 Fr', sort_order = 3 WHERE id = '3f335202-f7dd-4afe-be92-884220ddee8a';

-- Add missing "Pancakes Saisonnier"
INSERT INTO menu_items (name, price, section_id, sort_order) 
VALUES ('Pancakes Saisonnier (fruit, coulis au choix, boule de glace, spéculoos)', '5 000 Fr', 'eb2a089a-4a8b-425e-9df0-9cad439b20bf', 4);
