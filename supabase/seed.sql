-- Old West Steak House -- contenido real: sede Caobos (Los Patios, Norte de Santander)
-- Generado a partir de las cartas PDF proporcionadas por el cliente.

insert into locations (slug, name, city, address, display_order, is_active) values
  ('caobos', 'Old West Sede Caobos', 'Los Patios', 'Cl. 63, Los Patios, Norte de Santander', 1, true);

insert into categories (slug, name_es, name_en, tagline_es, tagline_en, display_order) values
  ('entradas', 'Entradas', 'Starters', 'Para abrir el apetito', 'To open the appetite', 1),
  ('smoked-house', 'Smoked House', 'Smoked House', '16 horas de ahumado lento, sabor de leña', '16 hours of slow wood-fired smoking', 2),
  ('carnes-angus-beef', 'Carnes Angus Beef', 'Angus Beef Cuts', 'Los cortes insignia de la casa', 'The house''s signature cuts', 3),
  ('carnes', 'Carnes', 'Grilled Meats', 'A la parrilla, al punto que usted prefiera', 'Grilled to your liking', 4),
  ('pollos', 'Pollos', 'Chicken', 'Pechuga al grill, jugosa y bien sazonada', 'Grilled chicken breast, juicy and well seasoned', 5),
  ('cerdo', 'Cerdo', 'Pork', 'Ahumado, crocante y a la parrilla', 'Smoked, crispy and grilled', 6),
  ('burgers', 'Burgers', 'Burgers', 'Pan artesanal y carnes jugosas', 'Artisanal buns and juicy patties', 7),
  ('sandwiches', 'Sandwich''s', 'Sandwiches', 'Pan francés relleno de sabor', 'French bread packed with flavor', 8),
  ('pastas', 'Pastas', 'Pasta', 'Linguini en salsas de la casa', 'Linguini in house sauces', 9),
  ('ensaladas', 'Ensaladas', 'Salads', 'Frescas, ligeras y llenas de sabor', 'Fresh, light and full of flavor', 10),
  ('menu-infantil', 'Menu Infantil', 'Kids Menu', 'Pensado para los más pequeños', 'Made for the little ones', 11),
  ('postre', 'Postre', 'Dessert', 'El cierre dulce perfecto', 'The perfect sweet finish', 12),
  ('cocteles-de-autor', 'Cocteles de Autor', 'Signature Cocktails', 'Creaciones originales de nuestra barra', 'Original creations from our bar', 13),
  ('bebidas-especiales', 'Bebidas Especiales', 'Specialty Drinks', 'Sodas artesanales, frappés y refrescos de autor', 'Artisanal sodas, frappés and signature refreshments', 14),
  ('bebidas-sin-alcohol', 'Bebidas', 'Soft Drinks', 'Gaseosas y bebidas sin alcohol', 'Soft drinks and non-alcoholic beverages', 15),
  ('cervezas', 'Cervezas', 'Beers', 'Nacionales e importadas', 'Local and imported', 16),
  ('sangrias', 'Sangrias', 'Sangria', 'Copas y jarras para compartir', 'Glasses and pitchers to share', 17),
  ('whisky', 'Whisky', 'Whisky', 'Etiquetas premium', 'Premium labels', 18),
  ('vinos', 'Vinos', 'Wine', 'Copas y botellas seleccionadas', 'Selected glasses and bottles', 19),
  ('ginebra', 'Ginebra', 'Gin & Vodka', 'Ginebras y vodkas', 'Gins and vodkas', 20),
  ('tequila', 'Tequila', 'Tequila', 'Tequilas y destilados de agave', 'Tequilas and agave spirits', 21),
  ('ron', 'Ron', 'Rum', 'Rones añejados', 'Aged rums', 22),
  ('aguardiente', 'Aguardiente', 'Aguardiente', 'Los favoritos de la casa', 'House favorites', 23);

insert into menu_items (category_id, slug, name_es, name_en, description_es, description_en, base_price_cop, is_chef_recommended, is_new, is_spicy, is_vegetarian, is_gluten_free, display_order) values
  ((select id from categories where slug = 'entradas'), 'nachos-dakota', 'Nachos Dakota', 'Nachos Dakota', 'Nachos crocantes con carne tex-mex, salsa cheddar americano, guacamole y pico e'' gallo.', 'Crispy nachos with tex-mex beef, American cheddar sauce, guacamole and pico de gallo.', 36000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'entradas'), 'sausage-old-west', 'Sausage Old West', 'Old West Sausage', '4 chorizos artesanales flambeados en salsa de whisky Jack Daniel''s con papas a la francesa.', '4 artisanal sausages flambéed in Jack Daniel''s whiskey sauce, served with fries.', 34000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'entradas'), 'alitas-ranger', 'Alitas Ranger', 'Ranger Wings', '6 piezas de alitas crispy, en salsa buffalo, bbq, con papa rústica y papa a la francesa.', '6 crispy wings tossed in buffalo or BBQ sauce, served with rustic potatoes and fries.', 38000, false, false, true, false, false, 3),
  ((select id from categories where slug = 'entradas'), 'papas-houston', 'Papas Houston', 'Houston Fries', '125 gr de brisket o pulled pork, 1 chorizo artesanal, papas francesa, cascos de papa, salsa chick-fil-a, bañado con queso pepper jack fundido y pico e'' gallo.', '125 g of brisket or pulled pork, artisanal sausage, fries and potato wedges, chick-fil-a sauce, topped with melted pepper jack cheese and pico de gallo.', 49000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'smoked-house'), 'brisket', 'Brisket', 'Brisket', 'El oro negro del viejo oeste. Corte de res ahumado por 16 horas, 250 gr de brisket, guarnición de papa amarilla y ensalada pico de gallo.', 'The black gold of the Old West. Beef smoked low and slow for 16 hours, 250 g of brisket, served with yellow potato and pico de gallo salad.', 59000, true, false, false, false, false, 1),
  ((select id from categories where slug = 'smoked-house'), 'wild-west', 'Wild West', 'Wild West', '250 gr de brisket, 6 piezas de alitas crispy en salsa bbq, mac and cheese, burger smash en cama de queso cheddar americano bañado en trozos de tocineta crunch, 2 chorizos de ternera, mix de lechugas, elotes crocantes, 400 gr costilla de cerdo ahumada, piña asada y cascos de papa.', '250 g of brisket, 6 crispy BBQ wings, mac and cheese, a smash burger on a bed of American cheddar topped with crispy bacon bits, 2 beef sausages, mixed greens, crispy corn, 400 g of smoked pork ribs, grilled pineapple and potato wedges.', 189000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'smoked-house'), 'west-coast', 'West Coast', 'West Coast', '250 gr de brisket, 400 gr de chicharrón, sándwich de pulled pork, 6 piezas de alitas, 2 chorizos de ternera, mac and cheese, rodajas de piña al grill, casco de papa, elotes, mix de lechugas y pico e'' gallo.', '250 g of brisket, 400 g of pork crackling, a pulled pork sandwich, 6 wings, 2 beef sausages, mac and cheese, grilled pineapple slices, potato wedges, corn, mixed greens and pico de gallo.', 189000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'carnes-angus-beef'), 'tomahawk-angus-beef', 'Tomahawk Angus Beef', 'Angus Beef Tomahawk', '1.000 gr del corte insignia de la casa, compuesto por longísimo, ojo de bife y espinalis, con alto contenido de grasa intramuscular (marmoleo). Especial para degustar lo mejor de la raza Angus, guarnición de papa al vapor, cascos de papa o papa a la francesa y ensalada pico e'' gallo.', '1,000 g, the house''s signature cut — longissimus, ribeye and spinalis with rich intramuscular marbling. The best of Angus beef, served with steamed potato, potato wedges or fries and pico de gallo salad.', 499000, true, false, false, false, false, 1),
  ((select id from categories where slug = 'carnes-angus-beef'), 'ribeye-angus', 'Ribeye Angus', 'Angus Ribeye', '400 gr de filete de res y ojo de bife Angus a la parrilla, acompañado de papa al vapor o cascos con ensalada pico de gallo o mix de lechugas.', '400 g of grilled Angus filet and ribeye, served with steamed potato or wedges, pico de gallo salad or mixed greens.', 189000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'carnes-angus-beef'), 'new-york-steak-beef', 'New York Steak Beef', 'New York Strip', '400 gr de lomo ancho con marmoleo medio y textura firme, valorado por su terneza. Guarnición papa o yuca al vapor o cascos de papa y ensalada pico e'' gallo.', '400 g strip loin with medium marbling and firm texture, prized for its tenderness. Served with steamed potato or yuca, potato wedges and pico de gallo salad.', 169000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'carnes'), 'churrasco', 'Churrasco', 'Churrasco', '400 gr de lomo ancho al grill en corte mariposa, guarnición cascos de papa o papa al vapor y ensalada pico e'' gallo.', '400 g of butterfly-cut grilled strip loin, served with potato wedges or steamed potato and pico de gallo salad.', 67000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'carnes'), 'picanha', 'Picanha', 'Picanha', '400 gr de punta de res al grill, guarnición cascos de papa o papa al vapor y ensalada pico e'' gallo.', '400 g of grilled picanha, served with potato wedges or steamed potato and pico de gallo salad.', 69000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'carnes'), 'picanha-bacon-ranch', 'Picanha Bacon Ranch', 'Picanha Bacon Ranch', '400 gr de punta de res al grill con tocineta flameada en salsa Jack Daniel''s, guarnición cascos de papa o papa al vapor y ensalada pico e'' gallo.', '400 g of grilled picanha with bacon flambéed in Jack Daniel''s sauce, served with potato wedges or steamed potato and pico de gallo salad.', 72000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'carnes'), 'beef-chorizo', 'Beef Chorizo', 'Beef Chorizo Steak', 'Suculento y blando bife angosto de 400 gr, característico por su marmoleo que brinda la combinación perfecta para resaltar el sabor y la jugosidad. Guarnición cascos de papa o papa al vapor y ensalada pico e'' gallo.', 'A succulent, tender 400 g strip steak known for its marbling, delivering the perfect balance of flavor and juiciness. Served with potato wedges or steamed potato and pico de gallo salad.', 79900, false, false, false, false, false, 4),
  ((select id from categories where slug = 'carnes'), 'kansas-beef', 'Kansas Beef', 'Kansas Beef', '300 gr de chata magra a la parrilla, bañada en reducción de vino tinto y pimienta negra, acompañado de puré de papa y mix de lechugas.', '300 g of lean grilled flank steak, glazed with a red wine and black pepper reduction, served with mashed potato and mixed greens.', 67900, false, false, false, false, false, 5),
  ((select id from categories where slug = 'carnes'), 'porter-house-argentino', 'Porter House Argentino', 'Argentine Porterhouse', '850 gr de corte con hueso en forma de T compuesto por lomo fino y lomo ancho, guarnición cascos de papa o papa al vapor y ensalada pico e'' gallo.', '850 g bone-in T-shaped cut combining tenderloin and strip loin, served with potato wedges or steamed potato and pico de gallo salad.', 139000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'pollos'), 'grilled-chicken', 'Grilled Chicken', 'Grilled Chicken', '300 gr de pechuga al grill, guarnición cascos de papa o papa a la francesa o papa al vapor y mix de lechugas.', '300 g of grilled chicken breast, served with potato wedges, fries or steamed potato and mixed greens.', 44000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'pollos'), 'corn-grilled-chicken', 'Corn Grilled Chicken', 'Corn Grilled Chicken', '300 gr de pechuga al grill, bañada en salsa de maíz, tocineta y queso parmesano, guarnición cascos de papa o puré de papa y mix de lechugas.', '300 g of grilled chicken breast topped with corn sauce, bacon and parmesan, served with potato wedges or mashed potato and mixed greens.', 48000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'cerdo'), 'costilla-de-cerdo', 'Costilla de Cerdo', 'Pork Ribs', '400 gr de costillas de cerdo ahumadas bañadas en salsa bbq, guarnición papa a la francesa y mix de lechugas.', '400 g of smoked pork ribs glazed in BBQ sauce, served with fries and mixed greens.', 69000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cerdo'), 'lomo-de-cerdo', 'Lomo de Cerdo', 'Pork Tenderloin', '300 gramos de lomo de cerdo al grill en salsa de ciruelas, guarnición papa a la francesa y mix de lechugas.', '300 g of grilled pork tenderloin in plum sauce, served with fries and mixed greens.', 46000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'cerdo'), 'chicharron', 'Chicharrón', 'Chicharrón', '400 gramos de chicharrón crocante, guarnición papa al vapor, chimichurri y rodajas de limón.', '400 g of crispy pork crackling, served with steamed potato, chimichurri and lime wedges.', 59000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'burgers'), 'texas-chicken', 'Texas Chicken', 'Texas Chicken', 'Pan parmesano, croqueta de carne, queso cheddar, tartar de pollo desmechado, papa bucarita, mermelada de piña, vegetales frescos.', 'Parmesan bun, beef patty, cheddar cheese, shredded chicken tartar, crispy potato straws, pineapple jam, fresh vegetables.', 35000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'burgers'), 'jack-daniels-recargada', 'Jack Daniel''s Recargada', 'Loaded Jack Daniel''s', 'Pan bretzel, 140 gr de carne de res, mermelada de chorizo, queso cheddar, tomate, cebolla crispy, tocineta ahumada y lechuga crespa.', 'Pretzel bun, 140 g beef patty, chorizo jam, cheddar cheese, tomato, crispy onions, smoked bacon and curly lettuce.', 32000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'burgers'), 'brisket-burger', 'Brisket Burger', 'Brisket Burger', 'Pan bretzel, 125 gr de brisket, queso cheddar, cebolla, pepinillos, lechuga batavia, tomate y salsa de la casa.', 'Pretzel bun, 125 g brisket, cheddar cheese, onion, pickles, batavia lettuce, tomato and house sauce.', 42000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'burgers'), 'smash-burger', 'Smash Burger', 'Smash Burger', 'Pan bretzel, tres croquetas de carne de res tipo smash, queso cheddar kraft, tocineta, pepinillo y vegetales frescos.', 'Pretzel bun, three smashed beef patties, Kraft cheddar cheese, bacon, pickle and fresh vegetables.', 37000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'burgers'), 'la-del-primo', 'La del Primo', 'La del Primo', 'Dos jugosas carnes de res de 120 gr a la parrilla cada una, pan bretzel, tocineta crispy, queso colby jack, vegetales frescos, pepinillos, salsa de tomate, mayonesa y mostaza.', 'Two juicy 120 g grilled beef patties, pretzel bun, crispy bacon, colby jack cheese, fresh vegetables, pickles, ketchup, mayonnaise and mustard.', 42000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'burgers'), 'colombia-smash', 'Colombia Smash', 'Colombia Smash', 'Pan parmesano, dos jugosas carnes de res de 70 gr cada una smashadas, chorizo de ternera, mermelada de maduritos y tocineta, vegetales frescos, queso mozzarella, cebolla crispy y salsa tártara.', 'Parmesan bun, two juicy 70 g smashed beef patties, veal sausage, sweet plantain and bacon jam, fresh vegetables, mozzarella, crispy onions and tartar sauce.', 35000, false, true, false, false, false, 6),
  ((select id from categories where slug = 'burgers'), 'dallas-burger', 'Dallas Burger', 'Dallas Burger', 'Pan de parmesano, 100 gr de jugosa croqueta de carne, delicioso pulled pork, chicharrón de queso, salsa baiconesa, bbq de café y lechuga en juliana.', 'Parmesan bun, 100 g juicy beef patty, delicious pulled pork, cheese crackling, bacon-mayo sauce, coffee BBQ sauce and shredded lettuce.', 39000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'sandwiches'), 'club-house', 'Club House', 'Club House', '150 gr de dip de pollo, tocineta, huevo frito, queso doble crema, jamón, queso mozzarella, papas a la francesa y tártara.', '150 g of chicken dip, bacon, fried egg, cream cheese, ham, mozzarella, served with fries and tartar sauce.', 58000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'sandwiches'), 'brisket-sand', 'Brisket Sand', 'Brisket Sandwich', 'Pan francés, 125 gr de brisket ahumado, tomate, cebolla caramelizada, queso colby jack, tocineta, pepinillos, lechuga crespa y salsa de la casa.', 'French bread, 125 g smoked brisket, tomato, caramelized onion, colby jack cheese, bacon, pickles, curly lettuce and house sauce.', 56000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'sandwiches'), 'pulled-pork-sand', 'Pulled Pork Sand', 'Pulled Pork Sandwich', 'Pan francés, 180 gr de pulled pork, salsa Showy, pepinillos, queso colby jack, tocineta, vegetales frescos.', 'French bread, 180 g pulled pork, Showy sauce, pickles, colby jack cheese, bacon, fresh vegetables.', 54000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'pastas'), 'camaronera', 'Camaronera', 'Shrimp Linguini', 'Pasta linguini, camarones en salsa de mostaza dijon y vino blanco, acompañada de pan focaccia.', 'Linguini pasta with shrimp in a Dijon mustard and white wine sauce, served with focaccia bread.', 48000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'pastas'), 'austin-chicken', 'Austin Chicken', 'Austin Chicken', 'Pasta linguini en salsa carbonara con suprema de pollo al grill, coronado de elotes.', 'Linguini pasta in carbonara sauce with grilled chicken supreme, topped with corn.', 44000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'ensaladas'), 'ensalada-lusiana', 'Ensalada Lusiana', 'Lusiana Salad', '300 gr de pechuga al grill, crotones de tocineta, lechuga crespa, morada y verde, tomates cherry, queso parmesano, crotones de pan, aderezo de la casa y reducción de vinagre balsámico.', '300 g of grilled chicken breast, bacon croutons, purple and green curly lettuce, cherry tomatoes, parmesan, bread croutons, house dressing and balsamic reduction.', 42000, false, false, false, false, true, 1),
  ((select id from categories where slug = 'ensaladas'), 'ensalada-de-camarones', 'Ensalada de Camarones', 'Shrimp Salad', 'Camarones crispy, lechuga crespa verde y morada, tomates cherry, queso parmesano, crotones de pan y reducción de vinagre balsámico.', 'Crispy shrimp, green and purple curly lettuce, cherry tomatoes, parmesan, bread croutons and balsamic reduction.', 44000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'menu-infantil'), 'cherokee-chicken', 'Cherokee Chicken', 'Cherokee Chicken', '200 gr de pollo apanado, guarnición papa a la francesa y juguete infantil.', '200 g of breaded chicken, served with fries and a toy.', 42000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'postre'), 'churros-arizona', 'Churros Arizona', 'Arizona Churros', '10 unidades.', '10 pieces.', 19900, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cocteles-de-autor'), 'kiss', 'Kiss', 'Kiss', 'Tequila, syrup triple sec, vermouth rosso, frutos rojos y extracto de limón.', 'Tequila, triple sec syrup, sweet vermouth, red berries and lemon extract.', 36000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cocteles-de-autor'), 'jhon-wesly', 'Jhon Wesly', 'Jhon Wesly', 'Tequila Reposado, syrup de coco y maracuyá.', 'Reposado tequila, coconut and passion fruit syrup.', 36000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'cocteles-de-autor'), 'michael-jackson', 'Michael Jackson', 'Michael Jackson', 'Ginebra, Aperol, Shrub Cítricos y Herbal, Licor de naranja.', 'Gin, Aperol, citrus and herbal shrub, orange liqueur.', 34000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'cocteles-de-autor'), 'freddie-mercury', 'Freddie Mercury', 'Freddie Mercury', 'Vodka, botánico de rosas con espumante rosado y syrup frutos rojos.', 'Vodka, rose botanicals with rosé sparkling wine and red berry syrup.', 34000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'cocteles-de-autor'), 'elvis-presley', 'Elvis Presley', 'Elvis Presley', 'Ron Viejo de Caldas Dorado, Jagermeister, Mix Tropical, y Shrub de Fresa con Maracuyá.', 'Ron Viejo de Caldas Dorado rum, Jägermeister, tropical mix, and strawberry-passion fruit shrub.', 34000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'cocteles-de-autor'), 'wild-tonic', 'Wild Tonic', 'Wild Tonic', 'Ginebra Beefeater, Aperol, Agua tónica y shrub de uchuva.', 'Beefeater gin, Aperol, tonic water and Cape gooseberry shrub.', 0, false, false, false, false, false, 6),
  ((select id from categories where slug = 'bebidas-especiales'), 'la-harley', 'La Harley', 'La Harley', 'Homenaje al oficio bien hecho: soda clásica elevada a bebida de culto, con la rudeza del arándano salvaje y la nobleza de la miel de campo.', 'A tribute to a job well done: a classic soda elevated to cult status, with the boldness of wild blueberry and the richness of countryside honey.', 18000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'bebidas-especiales'), 'tennessee', 'Tennessee', 'Tennessee', 'Fusión entre la calidez sureña (miel y guiño al bourbon americano) y la explosión tropical del lulo, la maracuyá y un toque picante de Tajín.', 'A fusion of Southern warmth (honey with a nod to American bourbon) and a tropical burst of lulo, passion fruit and a spicy touch of Tajín.', 18000, false, false, true, false, false, 2),
  ((select id from categories where slug = 'bebidas-especiales'), 'la-missuri', 'La Missuri', 'La Missuri', 'Soda artesanal sutil y perfumada, de tono rosa pálido casi cristalino: un trago limpio, sofisticado y romántico.', 'A subtle, fragrant artisanal soda in a pale, almost crystalline pink: a clean, sophisticated and romantic drink.', 18000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'bebidas-especiales'), 'fruit-punch', 'Fruit Punch', 'Fruit Punch', 'Delicioso granizado de mix de frutas tropicales, naranja, cereza y limón.', 'Delicious frozen slush with a mix of tropical fruits, orange, cherry and lime.', 20000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'bebidas-especiales'), 'limonadas', 'Limonadas', 'Lemonades', 'Coco limonada, cerezada, hierbabuena.', 'Coconut lemonade, cherry lemonade, mint lemonade.', 14000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'bebidas-especiales'), 'frappe-de-limon', 'Frappé de Limón', 'Lemon Frappé', 'Refrescante frappé de limón.', 'Refreshing lemon frappé.', 11000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'bebidas-especiales'), 'frappe-de-naranja', 'Frappé de Naranja', 'Orange Frappé', 'Refrescante frappé de naranja.', 'Refreshing orange frappé.', 11000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'bebidas-especiales'), 'frappe-de-maracuya', 'Frappé de Maracuyá', 'Passion Fruit Frappé', 'Refrescante frappé de maracuyá.', 'Refreshing passion fruit frappé.', 13000, false, false, false, false, false, 8),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'agua', 'Agua', 'Water', null, null, 6000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'cocacola-pet-400ml', 'Cocacola PET 400ml', 'Coca-Cola PET 400ml', 'Cocacola original y sin azúcar.', 'Original and sugar-free Coca-Cola.', 6000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'qatro-pet-400ml', 'Qatro PET 400ml', 'Quatro PET 400ml', null, null, 6000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'ginger-y-soda', 'Ginger y Soda', 'Ginger Ale & Club Soda', null, null, 6000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'monster', 'Monster', 'Monster', null, null, 15000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'cervezas'), 'budweiser-250ml', 'Budweiser 250ml', 'Budweiser 250ml', null, null, 10000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cervezas'), 'corona', 'Corona', 'Corona', null, null, 14000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'cervezas'), 'stella-artois', 'Stella Artois', 'Stella Artois', null, null, 14000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'cervezas'), 'club-dorada', 'Club Dorada', 'Club Dorada', null, null, 10000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'cervezas'), 'cerveza-dorada-club-colombia', 'Cerveza Dorada Club Colombia', 'Club Colombia Dorada', null, null, 10000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'cervezas'), 'paulaner-dunkel', 'Paulaner Dunkel', 'Paulaner Dunkel', 'Cerveza alemana tipo Dunkel, 5.3% Alc. Color ambarado oscuro, buena espuma y notas a caramelo y nueces.', 'German Dunkel-style beer, 5.3% ABV. Deep amber color, good head, with notes of caramel and nuts.', 45000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'cervezas'), 'paulaner-weissbier', 'Paulaner Weissbier', 'Paulaner Weissbier', 'Cerveza alemana de trigo, 5.5% Alc. Color ámbar con notas afrutadas.', 'German wheat beer, 5.5% ABV. Amber color with fruity notes.', 45000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'sangrias'), 'copa-de-tinto-de-verano', 'Copa de Tinto de Verano', 'Glass of Summer Red Wine Punch', null, null, 32000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'sangrias'), 'copa-de-sangria', 'Copa de Sangria', 'Glass of Sangria', null, null, 35000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'sangrias'), 'jarra-rosada', 'Jarra Rosada', 'Pink Pitcher', 'Fresas, hierba buena, cereza, uvas isabelina.', 'Strawberries, mint, cherry, isabella grapes.', 119000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'sangrias'), 'jarra-tinto', 'Jarra Tinto', 'Red Wine Pitcher', 'Fresas, uvas, naranja, cereza, uva isabelina.', 'Strawberries, grapes, orange, cherry, isabella grape.', 119000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'whisky'), 'buchanans-deluxe-12-anos-750ml', 'Buchanans Deluxe 12 Años 750ml', 'Buchanan''s Deluxe 12 Year 750ml', null, null, 380000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'whisky'), 'buchanans-12-anos-375ml', 'Buchanans 12 Años 375ml', 'Buchanan''s 12 Year 375ml', null, null, 190000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'whisky'), 'buchanans-12-anos-750ml', 'Buchanans 12 Años 750ml', 'Buchanan''s 12 Year 750ml', null, null, 330000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'whisky'), 'buchanans-18-anos-750ml', 'Buchanans 18 Años 750ml', 'Buchanan''s 18 Year 750ml', null, null, 680000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'whisky'), 'buchanans-master-750ml', 'Buchanans Master 750ml', 'Buchanan''s Master 750ml', null, null, 360000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'whisky'), 'jack-daniels-375ml', 'Jack Daniel''s 375ml', 'Jack Daniel''s 375ml', null, null, 180000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'whisky'), 'jack-daniels-tennessee-750ml', 'Jack Daniel''s Tennessee 750ml', 'Jack Daniel''s Tennessee 750ml', null, null, 250000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'whisky'), 'jhonnie-walker-red-label-750ml', 'Jhonnie Walker Red Label 750ml', 'Johnnie Walker Red Label 750ml', null, null, 180000, false, false, false, false, false, 8),
  ((select id from categories where slug = 'whisky'), 'old-parr-12-anos-500ml', 'Old Parr 12 Años 500ml', 'Old Parr 12 Year 500ml', null, null, 190000, false, false, false, false, false, 9),
  ((select id from categories where slug = 'whisky'), 'old-parr-12-anos-750ml', 'Old Parr 12 Años 750ml', 'Old Parr 12 Year 750ml', null, null, 290000, false, false, false, false, false, 10),
  ((select id from categories where slug = 'whisky'), 'crema-de-whisky-baileys-700ml', 'Crema de Whisky - Baileys 700ml', 'Baileys Irish Cream 700ml', null, null, 150000, false, false, false, false, false, 11),
  ((select id from categories where slug = 'vinos'), 'copa-de-vino', 'Copa de Vino', 'Glass of Wine', null, null, 20000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'vinos'), 'vino-lambrusco-750ml', 'Vino Lambrusco 750ml', 'Lambrusco Wine 750ml', null, null, 90000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'vinos'), 'vino-tinto', 'Vino Tinto', 'Red Wine', null, null, 80000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'ginebra'), 'ginebra-tanqueray-750ml', 'Ginebra Tanqueray 750ml', 'Tanqueray Gin 750ml', null, null, 320000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'ginebra'), 'smirnoff-red-vodka', 'Smirnoff Red Vodka', 'Smirnoff Red Vodka', null, null, 200000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'ginebra'), 'tanqueray-london-dry-gin-750ml', 'Tanqueray London Dry Gin 750ml', 'Tanqueray London Dry Gin 750ml', null, null, 290000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'tequila'), 'jose-cuervo-reposado-375ml', 'Jose Cuervo Reposado 375ml', 'Jose Cuervo Reposado 375ml', null, null, 160000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'tequila'), 'jose-cuervo-reposado-750ml', 'Jose Cuervo Reposado 750ml', 'Jose Cuervo Reposado 750ml', null, null, 230000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'tequila'), 'jose-cuervo-silver-750ml', 'Jose Cuervo Silver 750ml', 'Jose Cuervo Silver 750ml', null, null, 200000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'tequila'), 'don-julio-blanco-700ml', 'Don Julio Blanco 700ml', 'Don Julio Blanco 700ml', null, null, 450000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'tequila'), 'don-julio-reposado-700ml', 'Don Julio Reposado 700ml', 'Don Julio Reposado 700ml', null, null, 550000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'tequila'), 'don-julio-70', 'Don Julio 70', 'Don Julio 70', null, null, 700000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'tequila'), 'don-julio-blanco-750ml', 'Don Julio Blanco 750ml', 'Don Julio Blanco 750ml', null, null, 450000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'ron'), 'ron-viejo-de-caldas-375ml', 'Ron Viejo de Caldas 375ml', 'Ron Viejo de Caldas 375ml', null, null, 100000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'ron'), 'ron-viejo-de-caldas-750ml', 'Ron Viejo de Caldas 750ml', 'Ron Viejo de Caldas 750ml', null, null, 160000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'ron'), 'ron-caldas-8-anos-750ml', 'Ron Caldas 8 Años 750ml', 'Ron Caldas 8 Year 750ml', null, null, 230000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'ron'), 'ron-caldas-5-anos-750ml', 'Ron Caldas 5 Años 750ml', 'Ron Caldas 5 Year 750ml', null, null, 180000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'aguardiente'), 'aguardiente-antioqueno-375ml', 'Aguardiente Antioqueño 375ml', 'Aguardiente Antioqueño 375ml', null, null, 100000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'aguardiente'), 'aguardiente-antioqueno-tapa-azul', 'Aguardiente Antioqueño Tapa Azul', 'Aguardiente Antioqueño Tapa Azul', null, null, 160000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'aguardiente'), 'aguardiente-amarillo-manzanares', 'Aguardiente Amarillo Manzanares', 'Aguardiente Amarillo Manzanares', null, null, 160000, false, false, false, false, false, 3);

-- Vincula todos los platos/bebidas de esta sede como disponibles, sin override de precio
insert into location_menu_items (location_id, menu_item_id, is_available, display_order)
select l.id, m.id, true, m.display_order
from locations l
cross join menu_items m
where l.slug = 'caobos';

-- Old West Steak House -- contenido real: sede Bellavista (Cucuta, Norte de Santander)
-- Concepto Tex-Mex. Generado a partir de las cartas PDF proporcionadas por el cliente.
-- Reconciliado contra el catalogo existente de la sede Caobos: platos/bebidas identicos se
-- reutilizan (con override de precio si aplica); los 3 cocteles de autor que comparten nombre
-- con Caobos pero tienen receta distinta se modelan como productos separados (ver nombres
-- con sufijo "(Bellavista)").

insert into locations (slug, name, city, address, logo_url, display_order, is_active) values
  ('bellavista', 'Old West Sede Bellavista', 'Cúcuta', 'Bellavista, Cúcuta, Norte de Santander', '/brand/bellavista-logo.jpg', 2, true);

insert into categories (slug, name_es, name_en, tagline_es, tagline_en, display_order) values
  ('tacos', 'Tacos', 'Tacos', 'Tortillas de maíz recién hechas', 'Fresh-made corn tortillas', 24),
  ('fuertes-mexicanos', 'Fuertes Mexicanos', 'Mexican Mains', 'Sabores de México con un giro Old West', 'Mexican flavors with an Old West twist', 25),
  ('margaritas', 'Margaritas', 'Margaritas', 'Frescas y a tu manera', 'Fresh and made your way', 26),
  ('cheladas', 'Cheladas', 'Cheladas', 'Tequila infusionado con cerveza artesanal', 'Infused tequila with craft beer', 27);

insert into menu_items (category_id, slug, name_es, name_en, description_es, description_en, base_price_cop, is_chef_recommended, is_new, is_spicy, is_vegetarian, is_gluten_free, display_order) values
  ((select id from categories where slug = 'entradas'), 'nachos-elote', 'Nachos Elote', 'Corn Nachos', 'Nachos crocante acompañado de una mezcla de maíz dulce pechuga y tocineta, bañados en una chingona salsa de la casa con piña.', 'Crispy nachos with a mix of sweet corn, chicken and bacon, topped with our kick-ass house sauce and pineapple.', 40000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'entradas'), 'dorilocos', 'Dorilocos', 'Dorilocos', 'Explosiva mezcla de doritos, birria, elote, crema de tres quesos, salsa jala chorizo, pico de gallo, guacamole y caldo de birria.', 'An explosive mix of Doritos, birria, corn, three-cheese cream, jalapeño-chorizo sauce, pico de gallo, guacamole and birria broth.', 39000, false, false, true, false, false, 6),
  ((select id from categories where slug = 'smoked-house'), 'picada-old-west', 'Picada Old West', 'Old West Picada', '300 gr de pechuga de pollo, 300 gr de lomo de cerdo, 200 gr de lomo fino, 2 chorizos de ternera, papas a la francesa bañadas en salsa cheddar y lluvia de tocineta crispy, queso paisa asado, pico de gallo, mix de lechuga, yuca frita y papa al vapor.', '300 g grilled chicken breast, 300 g pork loin, 200 g beef tenderloin, 2 veal sausages, fries drizzled in cheddar sauce and crispy bacon bits, grilled paisa cheese, pico de gallo, mixed greens, fried yuca and steamed potato.', 189000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'cerdo'), 'molcajete-carnudo', 'Molcajete Carnudo', 'Meaty Molcajete', 'Deliciosa combinación de nachos, chicharrón carnudo y crocante, acompañado de guacamole, jalapeños y limón.', 'A delicious combination of nachos and meaty, crispy pork crackling, served with guacamole, jalapeños and lime.', 62000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'tacos'), 'carnitas', 'Carnitas', 'Carnitas Tacos', 'Tortilla de maíz rellena con una exquisita combinación de carne de cerdo y res, marinadas en un guiso de especias tradicionales. Servido con un mix de cebolla y chile dulce coronado con cilantro fresco.', 'Corn tortilla filled with an exquisite combination of pork and beef, marinated in a traditional spice stew. Served with onion, sweet chile and fresh cilantro.', 36000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'tacos'), 'tacos-al-pastor', 'Tacos al Pastor', 'Al Pastor Tacos', 'Tortillas de maíz con cerdo al pastor bañada en mixología de chiles y piña asada, acompañado de pico e'' gallo.', 'Corn tortillas with al pastor pork in a chile blend and grilled pineapple, served with pico de gallo.', 39000, false, false, true, false, false, 2),
  ((select id from categories where slug = 'tacos'), 'camaron', 'Camaron', 'Shrimp Tacos', 'Tortilla de maíz, camarones salteados al ajillo acompañado de julianas de cebolla, guacamole y cilantro.', 'Corn tortilla with garlic-sautéed shrimp, julienned onion, guacamole and cilantro.', 42000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'tacos'), 'barbacoa', 'Barbacoa', 'Barbacoa Tacos', 'Tortilla de maíz, tierna y jugosa carne a la barbacoa acompañado de pico de gallo, maíz, aguacate y cilantro.', 'Corn tortilla with tender, juicy barbacoa beef, pico de gallo, corn, avocado and cilantro.', 42000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'tacos'), 'birria', 'Birria', 'Birria Tacos', 'Tortilla de maíz rellena de carnita birria, juliana de cebolla morada y cilantro acompañado de caldo de birria.', 'Corn tortilla filled with birria meat, julienned red onion and cilantro, served with birria consommé.', 40000, false, false, false, false, false, 5),
  ((select id from categories where slug = 'fuertes-mexicanos'), 'birria-ramen', 'Birria Ramen', 'Birria Ramen', 'Un picoso y reconfortante caldo de birria acompañado de auténtico elote mexicano, carne de birria jugosa, julianas de cebolla y queso mozzarella derretido. Con pasta ramen perfectamente cocida y coronado con cilantro fresco. Una fusión de sabores mexicanos y asiáticos que te sorprenderá.', 'A spicy, comforting birria broth with authentic Mexican corn, juicy birria meat, julienned onion and melted mozzarella. With perfectly cooked ramen noodles, topped with fresh cilantro. A Mexican-Asian fusion that will surprise you.', 48000, false, true, true, false, false, 1),
  ((select id from categories where slug = 'fuertes-mexicanos'), 'enchiladas', 'Enchiladas', 'Enchiladas', 'Tres deliciosas tortillas rellenas de salsa chipotle, pollo, carne molida, bañadas de queso, nachos, jalapeño y cebolla encurtida.', 'Three delicious tortillas filled with chipotle sauce, chicken and ground beef, topped with cheese, nachos, jalapeño and pickled onion.', 44000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'fuertes-mexicanos'), 'quesabirria', 'Quesabirria', 'Quesabirria', 'Chula combinación de dos tortillas con queso, carne birria acompañado de salsa tres quesos y caldo de birria.', 'A great combination of two cheese-filled tortillas with birria meat, served with three-cheese sauce and birria consommé.', 48000, false, false, false, false, false, 3),
  ((select id from categories where slug = 'fuertes-mexicanos'), 'tostadas-tihuacan', 'Tostadas Tihuacan', 'Tihuacan Tostadas', 'Marranito, chorizo y carnita birria reposados sobre una crocante tortilla de maíz crostada con queso, acompañado de guacamole.', 'Pork, chorizo and birria meat over a crispy cheese-crusted corn tortilla, served with guacamole.', 56000, false, false, false, false, false, 4),
  ((select id from categories where slug = 'margaritas'), 'margarita', 'Margarita', 'Margarita', 'Frutos rojos, frutos amarillos o tradicional.', 'Red berries, yellow fruits or traditional.', 34000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cheladas'), 'juan-gabriel', 'Juan Gabriel', 'Juan Gabriel', 'Tequila infusionado en frutos amarillos y cerveza artesanal Old West o Corona.', 'Tequila infused with yellow fruits and Old West craft beer or Corona.', 26000, false, false, false, false, false, 1),
  ((select id from categories where slug = 'cheladas'), 'gloria-trevi', 'Gloria Trevi', 'Gloria Trevi', 'Tequila infusionado en frutos silvestres y cerveza artesanal Old West o Corona.', 'Tequila infused with wild berries and Old West craft beer or Corona.', 28000, false, false, false, false, false, 2),
  ((select id from categories where slug = 'cervezas'), 'sol', 'Sol', 'Sol', null, null, 12000, false, false, false, false, false, 8),
  ((select id from categories where slug = 'cocteles-de-autor'), 'frida-kahlo', 'Frida Kahlo', 'Frida Kahlo', 'Vino tinto, Jack Daniel''s Fire, syrup de miel, syrup de albahaca.', 'Red wine, Jack Daniel''s Fire, honey syrup, basil syrup.', 36000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'cocteles-de-autor'), 'chichenitzan', 'Chichenitzan', 'Chichenitzan', 'Mezcal, tequila mexicano, syrup de tamarindo, syrup de jalapeño.', 'Mezcal, Mexican tequila, tamarind syrup, jalapeño syrup.', 38000, false, false, true, false, false, 8),
  ((select id from categories where slug = 'cocteles-de-autor'), 'azteca', 'Azteca', 'Azteca', 'Tequila mexicano, jagermeister, syrup de gengibre, syrup especial.', 'Mexican tequila, Jägermeister, ginger syrup, house special syrup.', 38000, false, false, false, false, false, 9),
  ((select id from categories where slug = 'cocteles-de-autor'), 'jhon-wesley-bellavista', 'Jhon Wesley (Bellavista)', 'Jhon Wesley (Bellavista)', 'Ron de coco, tequila reposado, syrup de piña, cordial de jengibre y cítricos de la casa.', 'Coconut rum, reposado tequila, pineapple syrup, ginger cordial and house citrus.', 38000, false, false, false, false, false, 10),
  ((select id from categories where slug = 'cocteles-de-autor'), 'freddie-mercury-bellavista', 'Freddie Mercury (Bellavista)', 'Freddie Mercury (Bellavista)', 'Lambrusco rose, vodka, extracto de fresa, syrup de vainilla, zumo de limón.', 'Rosé Lambrusco, vodka, strawberry extract, vanilla syrup, lemon juice.', 36000, false, false, false, false, false, 11),
  ((select id from categories where slug = 'cocteles-de-autor'), 'michael-jackson-bellavista', 'Michael Jackson (Bellavista)', 'Michael Jackson (Bellavista)', 'Ron dorado, syrup de miel, syrup de gengibre, syrup de mix de mango, zumo de limón.', 'Golden rum, honey syrup, ginger syrup, mango mix syrup, lemon juice.', 36000, false, false, false, false, false, 12),
  ((select id from categories where slug = 'bebidas-especiales'), 'soda-chavo', 'Soda Chavo', 'Soda Chavo', null, null, 16000, false, false, false, false, false, 9),
  ((select id from categories where slug = 'bebidas-especiales'), 'soda-de-tamarindo', 'Soda de Tamarindo', 'Tamarind Soda', null, null, 16000, false, false, false, false, false, 10),
  ((select id from categories where slug = 'bebidas-especiales'), 'soda-lychee', 'Soda Lychee', 'Lychee Soda', null, null, 16000, false, false, false, false, false, 11),
  ((select id from categories where slug = 'bebidas-especiales'), 'frappe-naranja-o-maracuya', 'Frappé Naranja o Maracuyá', 'Orange or Passion Fruit Frappé', 'Naranja o maracuyá.', 'Orange or passion fruit.', 13000, false, false, false, false, false, 12),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'cocacola-zero', 'Cocacola Zero', 'Coca-Cola Zero', null, null, 6000, false, false, false, false, false, 6),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'soda', 'Soda', 'Club Soda', null, null, 6000, false, false, false, false, false, 7),
  ((select id from categories where slug = 'bebidas-sin-alcohol'), 'ginger', 'Ginger', 'Ginger Ale', null, null, 6000, false, false, false, false, false, 8),
  ((select id from categories where slug = 'tequila'), 'mezcal-400-conejos', 'Mezcal 400 Conejos', 'Mezcal 400 Conejos', null, null, 450000, false, false, false, false, false, 8),
  ((select id from categories where slug = 'tequila'), 'mezcal-union', 'Mezcal Unión', 'Mezcal Unión', null, null, 320000, false, false, false, false, false, 9),
  ((select id from categories where slug = 'tequila'), 'mezcal-7-misterios', 'Mezcal 7 Misterios', 'Mezcal 7 Misterios', null, null, 499000, false, false, false, false, false, 10),
  ((select id from categories where slug = 'tequila'), 'mezcal-amores', 'Mezcal Amores', 'Mezcal Amores', null, null, 450000, false, false, false, false, false, 11),
  ((select id from categories where slug = 'tequila'), 'tequila-1800-reposado', 'Tequila 1800 Reposado', '1800 Reposado Tequila', null, null, 420000, false, false, false, false, false, 12),
  ((select id from categories where slug = 'tequila'), 'tequila-1800-silver', 'Tequila 1800 Silver', '1800 Silver Tequila', null, null, 380000, false, false, false, false, false, 13),
  ((select id from categories where slug = 'tequila'), 'tequila-gran-centenario', 'Tequila Gran Centenario', 'Gran Centenario Tequila', null, null, 230000, false, false, false, false, false, 14),
  ((select id from categories where slug = 'tequila'), 'tequila-gran-centenario-silver', 'Tequila Gran Centenario Silver', 'Gran Centenario Silver Tequila', null, null, 200000, false, false, false, false, false, 15);

-- Vincula los platos/bebidas NUEVOS (exclusivos de Bellavista) a esta sede
insert into location_menu_items (location_id, menu_item_id, is_available, display_order)
select l.id, m.id, true, m.display_order
from locations l
cross join menu_items m
where l.slug = 'bellavista'
  and m.slug in ('nachos-elote', 'dorilocos', 'picada-old-west', 'molcajete-carnudo', 'carnitas', 'tacos-al-pastor', 'camaron', 'barbacoa', 'birria', 'birria-ramen', 'enchiladas', 'quesabirria', 'tostadas-tihuacan', 'margarita', 'juan-gabriel', 'gloria-trevi', 'sol', 'frida-kahlo', 'chichenitzan', 'azteca', 'jhon-wesley-bellavista', 'freddie-mercury-bellavista', 'michael-jackson-bellavista', 'soda-chavo', 'soda-de-tamarindo', 'soda-lychee', 'frappe-naranja-o-maracuya', 'cocacola-zero', 'soda', 'ginger', 'mezcal-400-conejos', 'mezcal-union', 'mezcal-7-misterios', 'mezcal-amores', 'tequila-1800-reposado', 'tequila-1800-silver', 'tequila-gran-centenario', 'tequila-gran-centenario-silver');

-- Vincula los platos/bebidas YA EXISTENTES (identicos a Caobos) a esta sede,
-- con override de precio donde el precio de Bellavista difiere
insert into location_menu_items (location_id, menu_item_id, is_available, price_override_cop, display_order)
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'nachos-dakota'), true, 33000, (select display_order from menu_items where slug = 'nachos-dakota')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'sausage-old-west'), true, null, (select display_order from menu_items where slug = 'sausage-old-west')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'alitas-ranger'), true, null, (select display_order from menu_items where slug = 'alitas-ranger')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'brisket'), true, null, (select display_order from menu_items where slug = 'brisket')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'wild-west'), true, null, (select display_order from menu_items where slug = 'wild-west')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'costilla-de-cerdo'), true, null, (select display_order from menu_items where slug = 'costilla-de-cerdo')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'tomahawk-angus-beef'), true, null, (select display_order from menu_items where slug = 'tomahawk-angus-beef')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'new-york-steak-beef'), true, 189000, (select display_order from menu_items where slug = 'new-york-steak-beef')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'churrasco'), true, null, (select display_order from menu_items where slug = 'churrasco')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'picanha'), true, null, (select display_order from menu_items where slug = 'picanha')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'picanha-bacon-ranch'), true, null, (select display_order from menu_items where slug = 'picanha-bacon-ranch')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'beef-chorizo'), true, null, (select display_order from menu_items where slug = 'beef-chorizo')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'kansas-beef'), true, 69000, (select display_order from menu_items where slug = 'kansas-beef')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'chicharron'), true, null, (select display_order from menu_items where slug = 'chicharron')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'lomo-de-cerdo'), true, null, (select display_order from menu_items where slug = 'lomo-de-cerdo')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'grilled-chicken'), true, null, (select display_order from menu_items where slug = 'grilled-chicken')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'corn-grilled-chicken'), true, null, (select display_order from menu_items where slug = 'corn-grilled-chicken')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'camaronera'), true, null, (select display_order from menu_items where slug = 'camaronera')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'texas-chicken'), true, 37000, (select display_order from menu_items where slug = 'texas-chicken')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jack-daniels-recargada'), true, 34000, (select display_order from menu_items where slug = 'jack-daniels-recargada')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'brisket-burger'), true, null, (select display_order from menu_items where slug = 'brisket-burger')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'smash-burger'), true, null, (select display_order from menu_items where slug = 'smash-burger')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'la-del-primo'), true, null, (select display_order from menu_items where slug = 'la-del-primo')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'ensalada-lusiana'), true, null, (select display_order from menu_items where slug = 'ensalada-lusiana')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'cherokee-chicken'), true, null, (select display_order from menu_items where slug = 'cherokee-chicken')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'churros-arizona'), true, null, (select display_order from menu_items where slug = 'churros-arizona')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jarra-rosada'), true, null, (select display_order from menu_items where slug = 'jarra-rosada')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jarra-tinto'), true, null, (select display_order from menu_items where slug = 'jarra-tinto')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'stella-artois'), true, null, (select display_order from menu_items where slug = 'stella-artois')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'corona'), true, null, (select display_order from menu_items where slug = 'corona')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'cerveza-dorada-club-colombia'), true, 12000, (select display_order from menu_items where slug = 'cerveza-dorada-club-colombia')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'buchanans-master-750ml'), true, 390000, (select display_order from menu_items where slug = 'buchanans-master-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'buchanans-12-anos-750ml'), true, 340000, (select display_order from menu_items where slug = 'buchanans-12-anos-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'buchanans-12-anos-375ml'), true, 195000, (select display_order from menu_items where slug = 'buchanans-12-anos-375ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'buchanans-18-anos-750ml'), true, 690000, (select display_order from menu_items where slug = 'buchanans-18-anos-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'old-parr-12-anos-750ml'), true, 300000, (select display_order from menu_items where slug = 'old-parr-12-anos-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'old-parr-12-anos-500ml'), true, null, (select display_order from menu_items where slug = 'old-parr-12-anos-500ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jack-daniels-tennessee-750ml'), true, 310000, (select display_order from menu_items where slug = 'jack-daniels-tennessee-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'ron-caldas-8-anos-750ml'), true, 240000, (select display_order from menu_items where slug = 'ron-caldas-8-anos-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'ron-caldas-5-anos-750ml'), true, 190000, (select display_order from menu_items where slug = 'ron-caldas-5-anos-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'ron-viejo-de-caldas-750ml'), true, 170000, (select display_order from menu_items where slug = 'ron-viejo-de-caldas-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'ron-viejo-de-caldas-375ml'), true, 110000, (select display_order from menu_items where slug = 'ron-viejo-de-caldas-375ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'aguardiente-amarillo-manzanares'), true, 170000, (select display_order from menu_items where slug = 'aguardiente-amarillo-manzanares')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'aguardiente-antioqueno-tapa-azul'), true, 170000, (select display_order from menu_items where slug = 'aguardiente-antioqueno-tapa-azul')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'aguardiente-antioqueno-375ml'), true, 110000, (select display_order from menu_items where slug = 'aguardiente-antioqueno-375ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jose-cuervo-reposado-750ml'), true, 230000, (select display_order from menu_items where slug = 'jose-cuervo-reposado-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jose-cuervo-silver-750ml'), true, 200000, (select display_order from menu_items where slug = 'jose-cuervo-silver-750ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'jose-cuervo-reposado-375ml'), true, 160000, (select display_order from menu_items where slug = 'jose-cuervo-reposado-375ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'don-julio-70'), true, null, (select display_order from menu_items where slug = 'don-julio-70')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'don-julio-reposado-700ml'), true, null, (select display_order from menu_items where slug = 'don-julio-reposado-700ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'don-julio-blanco-700ml'), true, null, (select display_order from menu_items where slug = 'don-julio-blanco-700ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'frappe-de-limon'), true, null, (select display_order from menu_items where slug = 'frappe-de-limon')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'limonadas'), true, null, (select display_order from menu_items where slug = 'limonadas')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'monster'), true, null, (select display_order from menu_items where slug = 'monster')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'agua'), true, null, (select display_order from menu_items where slug = 'agua')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'cocacola-pet-400ml'), true, null, (select display_order from menu_items where slug = 'cocacola-pet-400ml')
union all
select (select id from locations where slug = 'bellavista'), (select id from menu_items where slug = 'qatro-pet-400ml'), true, null, (select display_order from menu_items where slug = 'qatro-pet-400ml');

-- Asigna las fotos reales extraidas de las cartas PDF a cada plato/bebida
update menu_items set image_url = '/menu/agua.jpg' where slug = 'agua';
update menu_items set image_url = '/menu/aguardiente-amarillo-manzanares.jpg' where slug = 'aguardiente-amarillo-manzanares';
update menu_items set image_url = '/menu/aguardiente-antioqueno-375ml.jpg' where slug = 'aguardiente-antioqueno-375ml';
update menu_items set image_url = '/menu/aguardiente-antioqueno-tapa-azul.jpg' where slug = 'aguardiente-antioqueno-tapa-azul';
update menu_items set image_url = '/menu/alitas-ranger.jpg' where slug = 'alitas-ranger';
update menu_items set image_url = '/menu/austin-chicken.jpg' where slug = 'austin-chicken';
update menu_items set image_url = '/menu/azteca.jpg' where slug = 'azteca';
update menu_items set image_url = '/menu/barbacoa.jpg' where slug = 'barbacoa';
update menu_items set image_url = '/menu/beef-chorizo.jpg' where slug = 'beef-chorizo';
update menu_items set image_url = '/menu/birria.jpg' where slug = 'birria';
update menu_items set image_url = '/menu/birria-ramen.jpg' where slug = 'birria-ramen';
update menu_items set image_url = '/menu/brisket.jpg' where slug = 'brisket';
update menu_items set image_url = '/menu/brisket-burger.jpg' where slug = 'brisket-burger';
update menu_items set image_url = '/menu/brisket-sand.jpg' where slug = 'brisket-sand';
update menu_items set image_url = '/menu/buchanans-12-anos-375ml.jpg' where slug = 'buchanans-12-anos-375ml';
update menu_items set image_url = '/menu/buchanans-12-anos-750ml.jpg' where slug = 'buchanans-12-anos-750ml';
update menu_items set image_url = '/menu/buchanans-18-anos-750ml.jpg' where slug = 'buchanans-18-anos-750ml';
update menu_items set image_url = '/menu/buchanans-deluxe-12-anos-750ml.jpg' where slug = 'buchanans-deluxe-12-anos-750ml';
update menu_items set image_url = '/menu/buchanans-master-750ml.jpg' where slug = 'buchanans-master-750ml';
update menu_items set image_url = '/menu/budweiser-250ml.jpg' where slug = 'budweiser-250ml';
update menu_items set image_url = '/menu/camaron.jpg' where slug = 'camaron';
update menu_items set image_url = '/menu/camaronera.jpg' where slug = 'camaronera';
update menu_items set image_url = '/menu/carnitas.jpg' where slug = 'carnitas';
update menu_items set image_url = '/menu/cerveza-dorada-club-colombia.jpg' where slug = 'cerveza-dorada-club-colombia';
update menu_items set image_url = '/menu/cherokee-chicken.jpg' where slug = 'cherokee-chicken';
update menu_items set image_url = '/menu/chicharron.jpg' where slug = 'chicharron';
update menu_items set image_url = '/menu/chichenitzan.jpg' where slug = 'chichenitzan';
update menu_items set image_url = '/menu/churrasco.jpg' where slug = 'churrasco';
update menu_items set image_url = '/menu/churros-arizona.jpg' where slug = 'churros-arizona';
update menu_items set image_url = '/menu/club-dorada.jpg' where slug = 'club-dorada';
update menu_items set image_url = '/menu/club-house.jpg' where slug = 'club-house';
update menu_items set image_url = '/menu/cocacola-pet-400ml.jpg' where slug = 'cocacola-pet-400ml';
update menu_items set image_url = '/menu/cocacola-zero.jpg' where slug = 'cocacola-zero';
update menu_items set image_url = '/menu/colombia-smash.jpg' where slug = 'colombia-smash';
update menu_items set image_url = '/menu/copa-de-sangria.jpg' where slug = 'copa-de-sangria';
update menu_items set image_url = '/menu/copa-de-tinto-de-verano.jpg' where slug = 'copa-de-tinto-de-verano';
update menu_items set image_url = '/menu/copa-de-vino.jpg' where slug = 'copa-de-vino';
update menu_items set image_url = '/menu/corn-grilled-chicken.jpg' where slug = 'corn-grilled-chicken';
update menu_items set image_url = '/menu/corona.jpg' where slug = 'corona';
update menu_items set image_url = '/menu/costilla-de-cerdo.jpg' where slug = 'costilla-de-cerdo';
update menu_items set image_url = '/menu/crema-de-whisky-baileys-700ml.jpg' where slug = 'crema-de-whisky-baileys-700ml';
update menu_items set image_url = '/menu/dallas-burger.jpg' where slug = 'dallas-burger';
update menu_items set image_url = '/menu/don-julio-70.jpg' where slug = 'don-julio-70';
update menu_items set image_url = '/menu/don-julio-blanco-700ml.jpg' where slug = 'don-julio-blanco-700ml';
update menu_items set image_url = '/menu/don-julio-blanco-750ml.jpg' where slug = 'don-julio-blanco-750ml';
update menu_items set image_url = '/menu/don-julio-reposado-700ml.jpg' where slug = 'don-julio-reposado-700ml';
update menu_items set image_url = '/menu/dorilocos.jpg' where slug = 'dorilocos';
update menu_items set image_url = '/menu/elvis-presley.jpg' where slug = 'elvis-presley';
update menu_items set image_url = '/menu/enchiladas.jpg' where slug = 'enchiladas';
update menu_items set image_url = '/menu/ensalada-de-camarones.jpg' where slug = 'ensalada-de-camarones';
update menu_items set image_url = '/menu/ensalada-lusiana.jpg' where slug = 'ensalada-lusiana';
update menu_items set image_url = '/menu/frappe-de-limon.jpg' where slug = 'frappe-de-limon';
update menu_items set image_url = '/menu/frappe-de-maracuya.jpg' where slug = 'frappe-de-maracuya';
update menu_items set image_url = '/menu/frappe-de-naranja.jpg' where slug = 'frappe-de-naranja';
update menu_items set image_url = '/menu/frappe-naranja-o-maracuya.jpg' where slug = 'frappe-naranja-o-maracuya';
update menu_items set image_url = '/menu/freddie-mercury.jpg' where slug = 'freddie-mercury';
update menu_items set image_url = '/menu/freddie-mercury-bellavista.jpg' where slug = 'freddie-mercury-bellavista';
update menu_items set image_url = '/menu/frida-kahlo.jpg' where slug = 'frida-kahlo';
update menu_items set image_url = '/menu/fruit-punch.jpg' where slug = 'fruit-punch';
update menu_items set image_url = '/menu/ginebra-tanqueray-750ml.jpg' where slug = 'ginebra-tanqueray-750ml';
update menu_items set image_url = '/menu/ginger.jpg' where slug = 'ginger';
update menu_items set image_url = '/menu/ginger-y-soda.jpg' where slug = 'ginger-y-soda';
update menu_items set image_url = '/menu/gloria-trevi.jpg' where slug = 'gloria-trevi';
update menu_items set image_url = '/menu/grilled-chicken.jpg' where slug = 'grilled-chicken';
update menu_items set image_url = '/menu/jack-daniels-375ml.jpg' where slug = 'jack-daniels-375ml';
update menu_items set image_url = '/menu/jack-daniels-recargada.jpg' where slug = 'jack-daniels-recargada';
update menu_items set image_url = '/menu/jack-daniels-tennessee-750ml.jpg' where slug = 'jack-daniels-tennessee-750ml';
update menu_items set image_url = '/menu/jarra-rosada.jpg' where slug = 'jarra-rosada';
update menu_items set image_url = '/menu/jarra-tinto.jpg' where slug = 'jarra-tinto';
update menu_items set image_url = '/menu/jhon-wesley-bellavista.jpg' where slug = 'jhon-wesley-bellavista';
update menu_items set image_url = '/menu/jhon-wesly.jpg' where slug = 'jhon-wesly';
update menu_items set image_url = '/menu/jhonnie-walker-red-label-750ml.jpg' where slug = 'jhonnie-walker-red-label-750ml';
update menu_items set image_url = '/menu/jose-cuervo-reposado-375ml.jpg' where slug = 'jose-cuervo-reposado-375ml';
update menu_items set image_url = '/menu/jose-cuervo-reposado-750ml.jpg' where slug = 'jose-cuervo-reposado-750ml';
update menu_items set image_url = '/menu/jose-cuervo-silver-750ml.jpg' where slug = 'jose-cuervo-silver-750ml';
update menu_items set image_url = '/menu/juan-gabriel.jpg' where slug = 'juan-gabriel';
update menu_items set image_url = '/menu/kansas-beef.jpg' where slug = 'kansas-beef';
update menu_items set image_url = '/menu/kiss.jpg' where slug = 'kiss';
update menu_items set image_url = '/menu/la-del-primo.jpg' where slug = 'la-del-primo';
update menu_items set image_url = '/menu/la-harley.jpg' where slug = 'la-harley';
update menu_items set image_url = '/menu/la-missuri.jpg' where slug = 'la-missuri';
update menu_items set image_url = '/menu/limonadas.jpg' where slug = 'limonadas';
update menu_items set image_url = '/menu/lomo-de-cerdo.jpg' where slug = 'lomo-de-cerdo';
update menu_items set image_url = '/menu/margarita.jpg' where slug = 'margarita';
update menu_items set image_url = '/menu/mezcal-400-conejos.jpg' where slug = 'mezcal-400-conejos';
update menu_items set image_url = '/menu/mezcal-7-misterios.jpg' where slug = 'mezcal-7-misterios';
update menu_items set image_url = '/menu/mezcal-amores.jpg' where slug = 'mezcal-amores';
update menu_items set image_url = '/menu/mezcal-union.jpg' where slug = 'mezcal-union';
update menu_items set image_url = '/menu/michael-jackson.jpg' where slug = 'michael-jackson';
update menu_items set image_url = '/menu/michael-jackson-bellavista.jpg' where slug = 'michael-jackson-bellavista';
update menu_items set image_url = '/menu/molcajete-carnudo.jpg' where slug = 'molcajete-carnudo';
update menu_items set image_url = '/menu/monster.jpg' where slug = 'monster';
update menu_items set image_url = '/menu/nachos-dakota.jpg' where slug = 'nachos-dakota';
update menu_items set image_url = '/menu/nachos-elote.jpg' where slug = 'nachos-elote';
update menu_items set image_url = '/menu/new-york-steak-beef.jpg' where slug = 'new-york-steak-beef';
update menu_items set image_url = '/menu/old-parr-12-anos-500ml.jpg' where slug = 'old-parr-12-anos-500ml';
update menu_items set image_url = '/menu/old-parr-12-anos-750ml.jpg' where slug = 'old-parr-12-anos-750ml';
update menu_items set image_url = '/menu/papas-houston.jpg' where slug = 'papas-houston';
update menu_items set image_url = '/menu/paulaner-dunkel.jpg' where slug = 'paulaner-dunkel';
update menu_items set image_url = '/menu/paulaner-weissbier.jpg' where slug = 'paulaner-weissbier';
update menu_items set image_url = '/menu/picada-old-west.jpg' where slug = 'picada-old-west';
update menu_items set image_url = '/menu/picanha.jpg' where slug = 'picanha';
update menu_items set image_url = '/menu/picanha-bacon-ranch.jpg' where slug = 'picanha-bacon-ranch';
update menu_items set image_url = '/menu/porter-house-argentino.jpg' where slug = 'porter-house-argentino';
update menu_items set image_url = '/menu/pulled-pork-sand.jpg' where slug = 'pulled-pork-sand';
update menu_items set image_url = '/menu/qatro-pet-400ml.jpg' where slug = 'qatro-pet-400ml';
update menu_items set image_url = '/menu/quesabirria.jpg' where slug = 'quesabirria';
update menu_items set image_url = '/menu/ribeye-angus.jpg' where slug = 'ribeye-angus';
update menu_items set image_url = '/menu/ron-caldas-5-anos-750ml.jpg' where slug = 'ron-caldas-5-anos-750ml';
update menu_items set image_url = '/menu/ron-caldas-8-anos-750ml.jpg' where slug = 'ron-caldas-8-anos-750ml';
update menu_items set image_url = '/menu/ron-viejo-de-caldas-375ml.jpg' where slug = 'ron-viejo-de-caldas-375ml';
update menu_items set image_url = '/menu/ron-viejo-de-caldas-750ml.jpg' where slug = 'ron-viejo-de-caldas-750ml';
update menu_items set image_url = '/menu/sausage-old-west.jpg' where slug = 'sausage-old-west';
update menu_items set image_url = '/menu/smash-burger.jpg' where slug = 'smash-burger';
update menu_items set image_url = '/menu/smirnoff-red-vodka.jpg' where slug = 'smirnoff-red-vodka';
update menu_items set image_url = '/menu/soda.jpg' where slug = 'soda';
update menu_items set image_url = '/menu/soda-chavo.jpg' where slug = 'soda-chavo';
update menu_items set image_url = '/menu/soda-de-tamarindo.jpg' where slug = 'soda-de-tamarindo';
update menu_items set image_url = '/menu/soda-lychee.jpg' where slug = 'soda-lychee';
update menu_items set image_url = '/menu/sol.jpg' where slug = 'sol';
update menu_items set image_url = '/menu/stella-artois.jpg' where slug = 'stella-artois';
update menu_items set image_url = '/menu/tacos-al-pastor.jpg' where slug = 'tacos-al-pastor';
update menu_items set image_url = '/menu/tanqueray-london-dry-gin-750ml.jpg' where slug = 'tanqueray-london-dry-gin-750ml';
update menu_items set image_url = '/menu/tennessee.jpg' where slug = 'tennessee';
update menu_items set image_url = '/menu/tequila-1800-reposado.jpg' where slug = 'tequila-1800-reposado';
update menu_items set image_url = '/menu/tequila-1800-silver.jpg' where slug = 'tequila-1800-silver';
update menu_items set image_url = '/menu/tequila-gran-centenario.jpg' where slug = 'tequila-gran-centenario';
update menu_items set image_url = '/menu/tequila-gran-centenario-silver.jpg' where slug = 'tequila-gran-centenario-silver';
update menu_items set image_url = '/menu/texas-chicken.jpg' where slug = 'texas-chicken';
update menu_items set image_url = '/menu/tomahawk-angus-beef.jpg' where slug = 'tomahawk-angus-beef';
update menu_items set image_url = '/menu/tostadas-tihuacan.jpg' where slug = 'tostadas-tihuacan';
update menu_items set image_url = '/menu/vino-lambrusco-750ml.jpg' where slug = 'vino-lambrusco-750ml';
update menu_items set image_url = '/menu/vino-tinto.jpg' where slug = 'vino-tinto';
update menu_items set image_url = '/menu/west-coast.jpg' where slug = 'west-coast';
update menu_items set image_url = '/menu/wild-tonic.jpg' where slug = 'wild-tonic';
update menu_items set image_url = '/menu/wild-west.jpg' where slug = 'wild-west';
