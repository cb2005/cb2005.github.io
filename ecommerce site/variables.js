/* ----------------------------- Grocery ----------------------------- */
const groceryFruitsAndVegetables = [
  {
    item: "Bananas (1lb)",
    price: "2.25",
    image: "../images/grocery/fruits and vegetables/bananas.avif"
  },
  {
    item: "Strawberries (1lb)",
    price: "5.00",
    image: "../images/grocery/fruits and vegetables/strawberries.webp"
  }, {
    item: "Blueberries (1 Pint)",
    price: "5.00",
    image: "../images/grocery/fruits and vegetables/blueberries.avif"
  }, {
    item: "Oranges (3lbs)",
    price: "6.00",
    image: "../images/grocery/fruits and vegetables/oranges.avif"
  }, {
    item: "Royal Gala Apple",
    price: "1.39", 
    image: "../images/grocery/fruits and vegetables/apples.avif"
  }
];

const groceryDairyAndEggs = [
  {
    item: "Eggs, Club Pack (30 Count)",
    price: "17.25",
    image: "../images/grocery/dairy and eggs/eggs.avif"
  }, {
    item: "Margarine Original",
    price: "9.49",
    image: "../images/grocery/dairy and eggs/margarine.avif"
  }, {
    item: "Kraft Singles",
    price: "6.00",
    image: "../images/grocery/dairy and eggs/cheese.avif"
  }, {
    item: "Chocolate Milk",
    price: "8.59",
    image: "../images/grocery/dairy and eggs/chocolate milk.webp"
  }, {
    item: "Ice Cream",
    price: "6.00",
    image: "../images/grocery/dairy and eggs/ice cream.avif"
  }
];

const groceryMeats = [
  {
    item: "Bacon",
    price: "7.50",
    image: "../images/grocery/meats/bacon.avif"
  }, {
    item: "Boneless Skinless Chicken Thighs",
    price: "15.00",
    image: "../images/grocery/meats/chicken.avif"
  }, {
    item: "Lean Ground Beef",
    price: "11.00",
    image: "../images/grocery/meats/beef.avif"
  }, {
    item: "Maple Pork Breakfast Sausages",
    price: "8.00",
    image: "../images/grocery/meats/sausages.avif"
  }, {
    item: "Stuffed Turkey",
    price: "41.00",
    image: "../images/grocery/meats/turkey.avif"
  }, {
    item: "Original Natural Smoked Ham",
    price: "10.00",
    image: "../images/grocery/meats/ham.webp"
  }
]

const groceryBakery = [
  {
    item: "Butter Croissant, 12 Pack",
    price: "8.00",
    image: "../images/grocery/bakery/croissants.avif" 
  }, {
    item: "Vanilla Cupcakes",
    price: "5.50",
    image: "../images/grocery/bakery/cupcakes.avif" 
  }, {
    item: "Vanilla Cake",
    price: "10.00",
    image: "../images/grocery/bakery/vanilla cake.avif" 
  }, {
    item: "Chocolate Chip Cookies, 18 Pack",
    price: "7.50",
    image: "../images/grocery/bakery/cookies.avif" 
  }, {
    item: "Cinnamon Coffee Cake Muffins",
    price: "7.50",
    image: "../images/grocery/bakery/muffins.avif" 
  }, {
    item: "Chocolate Chip Mini Muffins",
    price: "6.00",
    image: "../images/grocery/bakery/mini muffins.avif" 
  }, {
    item: "Banana Loaf Cake, Sliced",
    price: "6.00",
    image: "../images/grocery/bakery/loaf cake.avif" 
  }, {
    item: "Almond Pound Cake",
    price: "4.50",
    image: "../images/grocery/bakery/pound cake.avif" 
  }, {
    item: "Chocolate Fudge Cake, 8 Inch",
    price: "32.00",
    image: "../images/grocery/bakery/fudge cake.avif" 
  }
];

const allGrocery = groceryFruitsAndVegetables.concat(groceryDairyAndEggs).concat(groceryMeats).concat(groceryBakery);









/* ----------------------------- Clothing ----------------------------- */
const clothingShirtAndPants = [
  {
    item: "Grey T-Shirt 2 Pack, Medium",
    price: "25.00",
    size: "M",
    image: "../images/clothing/shirts and pants/tshirts.webp"
  }, {
    item: "Black Hoodie, Large",
    price: "20.00",
    size: "L",
    image: "../images/clothing/shirts and pants/hoodie.avif"
  }, {
    item: "Women's T-Shirt , Medium",
    price: "15.00",
    size: "M",
    image: "../images/clothing/shirts and pants/womens tshirt.jpg"
  }, {
    item: "Women's Black Dress Shirt, Small",
    price: "16.00",
    size: "S",
    image: "../images/clothing/shirts and pants/womens shirt.jpg"
  }, {
    item: "Original Fit Men's Jeans, Extra Large",
    price: "38.00",
    size: "XL",
    image: "../images/clothing/shirts and pants/mens jeans.webp"
  }, {
    item: "Flare Men's Jeans, Small",
    price: "32.00",
    size: "S",
    image: "../images/clothing/shirts and pants/mens flared.jpg"
  }, {
    item: "Women's High Waisted Dress Pants, Large",
    price: "25.00",
    size: "L",
    image: "../images/clothing/shirts and pants/womens dress pants.avif"
  }, {
    item: "Women's Leggings, Extra Small",
    price: "20.00",
    size: "XS",
    image: "../images/clothing/shirts and pants/womens leggings.webp"
  }
];

const clothingSocksAndUnderwear = [
  {
    item: "Men's Underwear 8 Pack, Large",
    price: "50.00",
    size: "L",
    image: "../images/clothing/socks and underwear/mens underwear.jpg"
  }, {
    item: "Men's Biefs 3 Pack, Medium",
    price: "30.00",
    size: "M",
    image: "../images/clothing/socks and underwear/mens briefs.jpg"
  }, {
    item: "Men's Boxer Biefs 4 Pack, Small",
    price: "42.99",
    size: "S",
    image: "../images/clothing/socks and underwear/mens boxer 4.jpg"
  }, {
    item: "Women's High Cut Underwear 6 Pack, Large",
    price: "33.60",
    size: "L",
    image: "../images/clothing/socks and underwear/womens underwear.jpg"
  }, {
    item: "Women's Underwear 6 Pack, Small",
    price: "33.60",
    size: "S",
    image: "../images/clothing/socks and underwear/womens underwear 2.jpg"
  }, {
    item: "Men's Socks 12 Pack, Large",
    price: "23.99",
    size: "L",
    image: "../images/clothing/socks and underwear/mens socks.jpg"
  }, {
    item: "Men's Ankle Socks 10 Pack, Small",
    price: "21.19",
    size: "S",
    image: "../images/clothing/socks and underwear/mens ankle socks.avif"
  }, {
    item: "Women's Socks 3 Pack, Large",
    price: "11.99",
    size: "L",
    image: "../images/clothing/socks and underwear/womens socks.webp"
  }, {
    item: "Women's Socks 6 Pack, Small",
    price: "16.49",
    size: "S",
    image: "../images/clothing/socks and underwear/womens ankle socks.jpg"
  }
]

const clothingGlasses = [
  {
    item: "Blue Light Glasses, Small",
    price: "30.99",
    size: "S",
    image: "../images/clothing/glasses/blue light glasses.webp"
  }, {
    item: "Reading Glasses 1.25 Magnification, Large",
    price: "8.98",
    size: "L",
    image: "../images/clothing/glasses/reading glasses.avif"
  }, {
    item: "Black Sunglasses, Large",
    price: "20.99",
    size: "L",
    image: "../images/clothing/glasses/sunglasses.jpg"
  }, {
    item: "Aviator Polarized Sunglasses, Medium",
    price: "50.99",
    size: "M",
    image: "../images/clothing/glasses/sunglasses 2.webp"
  }
]

const clothingJewelry = [
  {
    item: "Gold Hoop Earrings",
    price: "11.99",
    image: "../images/clothing/jewelry/hoop earrings.jpg"
  }, {
    item: "Gold Plated Ball Stud Earrings",
    price: "29.99",
    image: "../images/clothing/jewelry/ball stud earring.jpg"
  }, {
    item: "Heart Shaped Earrings",
    price: "13.99",
    image: "../images/clothing/jewelry/heart shaped earrings.avif"
  }, {
    item: "16 Piece Gold Necklace Set For Women",
    price: "27.99",
    image: "../images/clothing/jewelry/16 necklaces.jpg"
  }, {
    item: "Diamond Cross Pendant Necklace",
    price: "80.99",
    image: "../images/clothing/jewelry/diamond cross necklace.webp"
  }, {
    item: "Gold Plated Figaro Chain",
    price: "20.99",
    image: "../images/clothing/jewelry/chain necklace.jpg"
  }, {
    item: "Gold Bracelet for Women",
    price: "25.99",
    image: "../images/clothing/jewelry/womens gold bracelet.jpg"
  }, {
    item: "Brass Bangle for Women",
    price: "13.99",
    image: "../images/clothing/jewelry/brass bangle.jpg"
  }
]


const allClothing = clothingShirtAndPants.concat(clothingSocksAndUnderwear).concat(clothingGlasses).concat(clothingJewelry);








/* ----------------------------- Beauty ----------------------------- */

const beautyBathShowerAndBodyCare = [
  {
    item: "Pantene Lush Moisture Shampoo",
    price: "5.97",
    image: "../images/beauty/bath shower and body care/pantene shampoo.avif"
  }, {
    item: "Pantene Daily Moisture Renewal Conditioner",
    price: "5.97",
    image: "../images/beauty/bath shower and body care/pantene conditioner.avif"
  }, {
    item: "SheaMoisture Leave-In Conditioner",
    price: "14.42",
    image: "../images/beauty/bath shower and body care/shea leave in.avif"
  }, {
    item: "SheaMoisture Conditioner",
    price: "12.92",
    image: "../images/beauty/bath shower and body care/shea conditioner.avif"
  }, {
    item: "SheaMoisture Shampoo",
    price: "12.92",
    image: "../images/beauty/bath shower and body care/shea shampoo.avif"
  }, {
    item: "Dial Lavender & Jasmine Body Wash",
    price: "8.97",
    image: "../images/beauty/bath shower and body care/dial body wash.avif"
  }, {
    item: "Dial Spring Water Body Wash",
    price: "8.97",
    image: "../images/beauty/bath shower and body care/dial body wash 2.avif"
  }, {
    item: "NIVEA Rose & Almond Oil Body Wash",
    price: "4.98",
    image: "../images/beauty/bath shower and body care/nivea body wash.avif"
  }, {
    item: "NIVEA Orange & Avocado Oil Body Wash",
    price: "4.98",
    image: "../images/beauty/bath shower and body care/nivea body wash 2.avif"
  }, {
    item: "NIVEA Firming Body Lotion For Women",
    price: "10.98",
    image: "../images/beauty/bath shower and body care/nivea body lotion.webp"
  }, {
    item: "CeraVe Daily Body Lotion",
    price: "18.98",
    image: "../images/beauty/bath shower and body care/cerave body lotion.avif"
  }, {
    item: "St Ives Oatmeal & Shea Butter Body Lotion",
    price: "5.93",
    image: "../images/beauty/bath shower and body care/st ives body lotion.avif"
  }
]


const beautyOralCare = [
  {
    item: "Crest Pro-Health Smooth Formula Toothpaste",
    price: "9.96",
    image: "../images/beauty/oral care/crest toothpaste.avif"
  }, {
    item: "Crest 3D White Advanced Whitening Toothpaste",
    price: "9.96",
    image: "../images/beauty/oral care/crest toothpaste 2.avif"
  }, {
    item: "Crest Toothpaste 3D White Deep Stain Remover ",
    price: "13.47",
    image: "../images/beauty/oral care/crest toothpaste 3.avif"
  }, {
    item: "Colgate Cavity Protection Fluoride Toothpaste 4 Pack",
    price: "5.97",
    image: "../images/beauty/oral care/colgate toothpaste.avif"
  }, {
    item: "Sensodyne Sensitive Toothpaste",
    price: "8.46",
    image: "../images/beauty/oral care/sensodyne toothpaste.avif"
  }, {
    item: "Oral-B Sensi-Soft Toothbrushes",
    price: "8.97",
    image: "../images/beauty/oral care/oralb toothbrushes.webp"
  }, {
    item: "Philips Power Toothbrush, Rechargeable Toothbrush",
    price: "39.97",
    image: "../images/beauty/oral care/philips toothbrush.avif"
  }, {
    item: "Oral-B Pro-Health All-in-One Toothbrush",
    price: "16.98",
    image: "../images/beauty/oral care/oralb toothbrushes 2.webp"
  }
]


const beautyFaceAndSkinCare = [
  {
    item: "La Roche-Posay Tinted Mineral Sunscreen SPF 50",
    price: "40.95",
    image: "../images/beauty/face and skin care/lrp sunscreen.webp"
  }, {
    item: "Hawaiian Tropic® Sheer Touch ® Sunscreen Lotion SPF 50+",
    price: "14.96",
    image: "../images/beauty/face and skin care/ht sunscreen.avif"
  }, {
    item: "Banana Boat® Simply Protect™ Kids Mineral Sunscreen Lotion SPF 50+",
    price: "11.98",
    image: "../images/beauty/face and skin care/bb sunscreen.avif"
  }, {
    item: "Olay Face Moisturizer",
    price: "13.48",
    image: "../images/beauty/face and skin care/olay face moisturizer.avif"
  }, {
    item: "Face & Body Miracle Aloe Vera Moisturizing Cream",
    price: "92.53",
    image: "../images/beauty/face and skin care/mac facial moisturizer.webp"
  }, {
    item: "Anthony Oil Free Facial Lotion (Pack of 2)",
    price: "83.20",
    image: "../images/beauty/face and skin care/a facial moisturizer.webp"
  }, {
    item: "CeraVe Foaming Facial Cleanser",
    price: "17.97",
    image: "../images/beauty/face and skin care/cerave facial cleanser.avif"
  }, {
    item: "CeraVe SA Cleanser, Salicylic Acid Exfoliating Face Wash",
    price: "19.97",
    image: "../images/beauty/face and skin care/cerave facial cleanser 2.avif"
  }
];

const beautyHandSoap = [
  {
    item: "Equate Moisturizing Hand Soap - Aloe",
    price: "0.98",
    image: "../images/beauty/hand soap/hand soap 1.avif"
  }, {
    item: "Equate Liquid Hand Soap, Original Clear Formula, Fresh Scent",
    price: "0.98",
    image: "../images/beauty/hand soap/hand soap 2.avif"
  }, {
    item: "Equate Vanilla Foaming Hand Soap with Soothing Vitamin E",
    price: "2.28",
    image: "../images/beauty/hand soap/hand soap 3.avif"
  }, {
    item: "Equate Cherry Blossom Foaming Hand Soap",
    price: "2.28",
    image: "../images/beauty/hand soap/hand soap 4.avif"
  }, {
    item: "Softsoap Antibacterial Liquid Hand Soap, Fresh Citrus Scent, Refill",
    price: "6.47",
    image: "../images/beauty/hand soap/hand soap 5.avif"
  }, {
    item: "Method Foaming Hand Soap, Sea Minerals, Method Soap",
    price: "1.80",
    image: "../images/beauty/hand soap/hand soap 6.avif"
  }, {
    item: "Softsoap Coconut and Hibiscus Moisturizing Liquid Hand Soap",
    price: "3.47",
    image: "../images/beauty/hand soap/hand soap 7.avif"
  }, {
    item: "Softsoap Hydrating Liquid Hand Soap Pump, Watermelon & Mint",
    price: "3.99",
    image: "../images/beauty/hand soap/hand soap 8.avif"
  }
];


const allBeauty = beautyBathShowerAndBodyCare.concat(beautyOralCare).concat(beautyFaceAndSkinCare).concat(beautyHandSoap);







/* ----------------------------- Seasonal ----------------------------- */

const seasonalWinter = [
  {
    item: "Winter Coat",
    price: "155.04",
    image: "../images/seasonal/winter/winter coat.jpeg"
  }, {
    item: "Winter Mittens",
    price: "10.99",
    image: "../images/seasonal/winter/mittens.webp"
  }, {
    item: "Winter Hat Soft Warm Fleece Lined Beanie",
    price: "6.99",
    image: "../images/seasonal/winter/hat.jpeg"
  }, {
    item: "Snow Shovel",
    price: "107.86",
    image: "../images/seasonal/winter/shovel.jpeg"
  }, {
    item: "Safe Paw Pet Safe Ice Melt",
    price: "172.86",
    image: "../images/seasonal/winter/ice salt.jpeg"
  }, {
    item: "2.36In Velvet Christmas Ball Ornaments",
    price: "50.33",
    image: "../images/seasonal/winter/ornaments.avif"
  }, {
    item: "Christmas Wrapping Paper Roll",
    price: "6.07",
    image: "../images/seasonal/winter/wrapping paper.webp"
  }, {
    item: "Multicolor Christmas Lights",
    price: "21.99",
    image: "../images/seasonal/winter/xmas lights.avif"
  }
];

const seasonalSpring = [
  {
    item: "Rain Jacket",
    price: "39.99",
    image: "../images/seasonal/spring/rain coat.avif"
  }, {
    item: "Manual Compact Umbrella",
    price: "9.97",
    image: "../images/seasonal/spring/umbrella.avif"
  }, {
    item: "Expert Gardener Hardwood D-Handle Digging Shovel",
    price: "16.98",
    image: "../images/seasonal/spring/shovel.avif"
  }, {
    item: "Iron Gardening Spade",
    price: "11.99",
    image: "../images/seasonal/spring/spade.webp"
  }, {
    item: "Rocky Tools Denali Pruning Shears",
    price: "22.99",
    image: "../images/seasonal/spring/shears.avif"
  }, {
    item: "Tomato Seeds",
    price: "31.88",
    image: "../images/seasonal/spring/seeds.webp"
  }, {
    item: "Reactine Extra Strength Antihistamine Tablets",
    price: "46.77",
    image: "../images/seasonal/spring/reactine.avif"
  }, {
    item: "Waterproof Leather Lightweight Working Shoes",
    price: "99.99",
    image: "../images/seasonal/spring/shoes.avif"
  }
];

const seasonalSummer = [
  {
    item: "Banana Boat Daily Protect Daily Sunscreen Spray 50+",
    price: "9.49",
    image: "../images/seasonal/summer/sunscreen.avif"
  }, {
    item: "Mainstays Kids Beach Towel",
    price: "9.98",
    image: "../images/seasonal/summer/towel.avif"
  }, {
    item: "Men's Swim Trunks",
    price: "12.49",
    image: "../images/seasonal/summer/ss.webp"
  }, {
    item: "Polarized Sunglasses",
    price: "22.94",
    image: "../images/seasonal/summer/sunglasses.avif"
  }, {
    item: "Stainless Steel Ice Cooler",
    price: "342.82",
    image: "../images/seasonal/summer/cooler.avif"
  }, {
    item: "Slim Flip Flops for Women",
    price: "16.58",
    image: "../images/seasonal/summer/ff.avif"
  }, {
    item: "Contigo DualSip Water Bottle with 2-Way Lid",
    price: "16.08",
    image: "../images/seasonal/summer/water bottle.avif"
  }, {
    item: "Blackstone Bronco 28 inch XL Outdoor Griddle",
    price: "16.08",
    image: "../images/seasonal/summer/bbq.avif"
  }
];

const seasonalFall = [
  {
    item: "Halloween Pumpkin Decorations",
    price: "39.49",
    image: "../images/seasonal/fall/decor.jpeg"
  }, {
    item: "Women's Plaid Cardigan",
    price: "25.28",
    image: "../images/seasonal/fall/cardigan.jpeg"
  }, {
    item: "Women Warm Plaid Scarf",
    price: "15.45",
    image: "../images/seasonal/fall/scarf.webp"
  }, {
    item: "Pumpkin Spice Scented Soy Candle",
    price: "20.55",
    image: "../images/seasonal/fall/candle.jpeg"
  }, {
    item: "Expert Gardener Hardwood Handle 14-Tine Level Rake",
    price: "16.49",
    image: "../images/seasonal/fall/rake.avif"
  }, {
    item: "Halloween Inflatable Ghost Trio with Signs",
    price: "99.98",
    image: "../images/seasonal/fall/ghosts.avif"
  }, {
    item: "Halloween Inflatable Outdoor Decoration",
    price: "13.22",
    image: "../images/seasonal/fall/3p.webp"
  }, {
    item: "Pumpkin",
    price: "13.22",
    image: "../images/seasonal/fall/pumpkin.avif"
  }
]

const allSeasonal = seasonalWinter.concat(seasonalSpring).concat(seasonalSummer).concat(seasonalFall);