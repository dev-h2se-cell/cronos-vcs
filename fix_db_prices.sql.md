
-- Normalización de precios para Cronos (COP)
UPDATE products 
SET price = 95000 
WHERE name ILIKE '%Hydro-Lock%';

UPDATE products 
SET price = 85000 
WHERE name ILIKE '%Vitamina C Alpha-THD%';

UPDATE products 
SET price = 110000 
WHERE name ILIKE '%Retinal%';

UPDATE products 
SET price = 75000 
WHERE name ILIKE '%Invisible Shield%';

UPDATE products 
SET price = 210000 
WHERE name ILIKE '%Essential Skin%';

-- Verificación
SELECT name, price FROM products WHERE category = 'COSMÉTICA';
