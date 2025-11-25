import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gclpgggqbmbcaenzidgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbHBnZ2dxYm1iY2FlbnppZGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODI5MjEsImV4cCI6MjA3ODM1ODkyMX0.dIsT_dnWNPFqNpB5C4cY5ZSRetzL1k_B3Fu81XzLQeY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const RecipeCard = ({ title, time, servings, image, ingredients, directions, calories, onSelect, recipe}) => {
  const [showIngredients, setShowIngredients] = React.useState(false);
  const [showDirections, setShowDirections] = React.useState(false);

  return (
      <View style={styles.recipeCard}>
        <Text style={styles.recipeTitle}>{title}</Text>
        <TouchableOpacity
            style={styles.selectButton}
            onPress={() => onSelect(recipe)}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
        <Text style={styles.recipeMeta}>Total Time: {time} | Servings: {servings} | Calories: {calories}</Text>
        <Image
            source={image}
            style={styles.recipeImage}
            resizeMode="cover"
        />
        <TouchableOpacity
            style={styles.directionsHeader}
            onPress={() => setShowIngredients(!showIngredients)}
        >
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.arrow}>{showIngredients ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showIngredients && (
            <View style={styles.ingredientsContainer}>
              {ingredients.map((ingredient, index) => (
                  <Text key={index} style={styles.ingredientText}>• {ingredient}</Text>
              ))}
            </View>
        )}
        <TouchableOpacity
            style={styles.directionsHeader}
            onPress={() => setShowDirections(!showDirections)}
        >
          <Text style={styles.sectionTitle}>Directions</Text>
          <Text style={styles.arrow}>{showDirections ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        {showDirections && (
            <View>
              {directions.map((step, index) => (
                  <Text key={index} style={styles.directionText}>{index + 1}. {step}</Text>
              ))}
            </View>
        )}
      </View>
  );
};



export default function RecipesList({ onBack, data }) {
  const [selectedRecipes, setSelectedRecipes] = React.useState([]);
  const calculateTotalCalories = () => {
    const recipesWithCalories = selectedRecipes.filter((recipe) => recipe.calories !== "TBD");
    return recipesWithCalories.reduce((total, recipe) => {
      const calories = parseInt(recipe.calories, 10) || 0;
      return total + calories;
    }, 0);
  };
  const breakfastRecipes = [
    {
      title: "Raspberry-Peach-Mango Smoothie Bowl",
      time: "10 mins",
      servings: "1",
      image: require('./assets/RPMsmoothie.jpg'),
      ingredients: [
        "1 cup frozen mango chunks",
        "¾ cup nonfat plain Greek yogurt",
        "¼ cup reduced-fat milk",
        "1 teaspoon vanilla extract",
        "¼ ripe peach, sliced",
        "⅓ cup raspberries",
        "1 tablespoon sliced almonds, toasted if desired",
        "1 tablespoon unsweetened coconut flakes, toasted if desired",
        "1 teaspoon chia seeds",
      ],
      directions: [
        "Combine mango, yogurt, milk and vanilla in a blender. Puree until smooth.",
        "Pour the smoothie into a bowl and top with peach slices, raspberries, almonds, coconut and chia seeds to taste.",
      ],
      calories:"352",
    },
    {
      title: "Maple-Nut Granola",
      time: "1h 40mins",
      servings: "8",
      image: require('./assets/MNGranola.jpg'),
      ingredients: [
        "5 cups old-fashioned rolled oats",
        "1 cup unsweetened coconut chips, (see Ingredient Note) or flakes",
        "½ cup sliced almonds",
        "½ cup coarsely chopped pecans",
        "½ cup light brown sugar",
        "⅓ cup unsalted pumpkin seeds",
        "⅓ cup unsalted sunflower seeds",
        "½ cup pure maple syrup",
        "½ cup water",
        "¼ cup neutral oil, such as canola or avocado",
        "½ cup dried cranberries",
        "½ cup raisins",
      ],
      directions: [
        "Preheat oven to 275 degrees F.",
        "Combine oats, coconut, almonds, pecans, brown sugar, pumpkin seeds and sunflower seeds in a large bowl. Combine syrup, water and oil in a medium bowl or large measuring cup and pour over the oat mixture; stir until well combined. Spread the mixture into a large (12-by-15-inch) roasting pan or large rimmed baking sheet.",
        "Bake for 45 minutes. Remove from the oven, stir, and continue baking until golden brown and beginning to crisp, about 45 minutes more. Stir in cranberries and raisins. Let cool completely before storing.",
      ],
      calories:"251",
    },
    {
      title: "Vegan Freezer Breakfast Burritos",
      time: "30 mins",
      servings: "6",
      image: require('./assets/VFBburritos.jpg'),
      ingredients: [
        "2 tablespoons avocado oil, divided",
        "1 package extra-firm water-packed tofu, drained and crumbled",
        "2 teaspoons chili powder",
        "1 teaspoon ground cumin",
        "¼ teaspoon salt",
        "1 can reduced-sodium black beans, rinsed",
        "1 cup frozen corn, thawed",
        "4 scallions, sliced",
        "½ cup prepared fresh salsa",
        "¼ cup chopped fresh cilantro",
        "6 whole-wheat tortillas or wraps",
      ],
      directions: [
        "Heat 1 tablespoon oil in a large nonstick skillet over medium heat. Add tofu, chili powder, cumin and salt; cook, stirring, until the tofu is nicely browned, 10 to 12 minutes. Transfer to a bowl.",
        "Add the remaining 1 tablespoon oil to the pan. Add beans, corn and scallions and cook, stirring, until the scallions have softened, about 3 minutes. Return the tofu to the pan. Add salsa and cilantro; cook, stirring, until heated through, about 2 minutes more.",
        "If serving immediately, warm tortillas (or wraps), but if freezing do not warm them. Divide the bean mixture among the tortillas, spreading evenly over the bottom third of each tortilla. Roll snugly, tucking in the ends as you go. Serve immediately or wrap each burrito in foil and freeze for up to 3 months.",
        "To heat in the microwave: Remove foil, cover with a paper towel and microwave on High until hot, 1 1/2 to 2 minutes.",
        "To heat over a campfire: Place foil-wrapped burrito on a cooking grate over a medium to medium-hot fire. Cook, turning once or twice, until steaming hot throughout, 5 to 10 minutes if partially thawed, up to 15 minutes if frozen.",
      ],
      calories:"329",
    },
  ];
  const lunchRecipes = [
    {
      title:"Crispy baked chicken katsu",
      image : require('./APPDEV/Crispy-Baked-Chicken-Katsu567kcal.jpg'),
      time: "1 hour",
      servings: "1",
      ingredients: [
        "Chicken breasts – boneless, skinless",
        "Panko (Japanese breadcrumbs)",
        "Large egg",
        "All-purpose flour",
        "Kosher salt and freshly ground black pepper",
        "Neutral oil",
        "Tonkatsu sauce",
      ],
      directions: [
        "Toast the panko in a dry frying pan until golden brown; cool.",
        "Butterfly each chicken breast or use the Japanese Kannon biraki method. Season with salt and pepper.",
        "Bread the cutlets. Set up prep trays with flour, beaten egg with oil, and toasted panko. Coat the chicken.",
        "Bake. Place cutlets on a wire rack set over a rimmed sheet pan. Bake at 400ºF (200ºC) for 25–30 minutes, or to an internal temperature of 165ºF (74ºC).",
        "Cut and serve. Slice the cutlets into ¾-inch (2-cm) pieces and serve drizzled with tonkatsu sauce.",
        "Serve it in a rice bowl – Simmer katsu with onions and egg to make a nice Katsudon.",
      ],
      calories:"567",
    },
    {
      title:"Creamy tuscan pork meatballs",
      image : require('./APPDEV/8Creamy-Tuscan-Pork-Meatball--Cannellini-Bean619kcal.jpg'),
      time: "55 mins",
      servings: "6",
      ingredients: [
        "1.5 lbs Ground Meat: A blend of ground beef and ground pork (70/30 blend for optimal fat content and flavor) is highly recommended for moist and flavorful meatballs.",
        "¼ Cup Grated Parmesan Cheese",
        "1 Large Egg",
        "2 Cloves Garlic, Minced",
        "1 Tablespoon Dried Italian Herbs",
        "½ Teaspoon Salt",
        "¼ Teaspoon Black Pepper",
        "2 Tablespoons Olive Oil",
        "FOR THE SAUCE :",
        "1 Tablespoon Olive Oil",
        "2 Cloves Garlic, Minced",
        "½ Cup Sun-dried Tomatoes, Oil-Packed, Drained and Chopped",
        "1 Cup Heavy Cream",
        "½ Cup Chicken Broth",
        "1 Cup Fresh Spinach, Roughly Chopped",
        "½ Cup Grated Parmesan Cheese",
        "¼ Teaspoon Red Pepper Flakes (Optional)",
        "Salt and Black Pepper, to taste",
        "Fresh Parsley, Chopped (for garnish, optional)",
      ],
      directions: [
        "In a large mixing bowl, combine the ground meat, almond flour, grated Parmesan cheese, egg, minced garlic, dried Italian herbs, salt, and black pepper.",
        "Using your hands or a wooden spoon, gently mix all the ingredients together until just combined. Be careful not to overmix, as this can result in tough meatballs. Overmixing develops the gluten in the almond flour, making the meatballs dense.",
        "Once the mixture is combined, cover the bowl with plastic wrap and refrigerate for at least 15 minutes. This allows the almond flour to absorb moisture and helps the meatballs hold their shape better during cooking. Chilling also makes them easier to roll.",
        "Remove the meatball mixture from the refrigerator.",
        "Using your hands or a tablespoon, scoop out portions of the meatball mixture and roll them into approximately 1.5-inch meatballs. Aim for uniform size for even cooking.",
        "Heat 2 tablespoons of olive oil in a large, oven-safe skillet or Dutch oven over medium-high heat. The skillet should be large enough to accommodate all the meatballs in a single layer, or you may need to brown them in batches.",
        "Once the oil is hot and shimmering, carefully place the meatballs in the skillet, ensuring not to overcrowd the pan. Overcrowding will steam the meatballs instead of browning them.",
        "Brown the meatballs on all sides, turning them occasionally, for about 5-7 minutes total. You don’t need to cook them through at this stage, just sear the outside to develop flavor and color. The browning process is crucial for adding depth of flavor to the final dish through the Maillard reaction.",
        "Remove the browned meatballs from the skillet and set them aside on a plate. Leave any rendered fat in the skillet as it will contribute flavor to the sauce.",
        "In the same skillet (with the rendered meatball fat), add 1 tablespoon of olive oil and heat over medium heat.",
        "Add the minced garlic and chopped sun-dried tomatoes to the skillet. Sauté for 1-2 minutes until the garlic is fragrant and the sun-dried tomatoes have softened slightly, releasing their aromas. Be careful not to burn the garlic.",
        "Pour in the heavy cream and chicken broth. Bring the mixture to a simmer, stirring occasionally. Simmering allows the flavors to meld together and the sauce to slightly thicken.",
        "Reduce the heat to low and stir in the fresh spinach, grated Parmesan cheese, and red pepper flakes (if using). Cook until the spinach wilts and the Parmesan cheese is melted and incorporated into the sauce, about 2-3 minutes. Stir continuously to prevent the cheese from clumping.",
        "Season the sauce with salt and black pepper to taste. Start with a pinch of each and adjust according to your preference. Remember that Parmesan cheese is already salty, so taste before adding too much salt.",
        "Gently nestle the browned meatballs into the creamy Tuscan sauce in the skillet, ensuring they are mostly submerged in the sauce.",
        "If using an oven-safe skillet, transfer the entire skillet to the preheated oven. If not, transfer the meatballs and sauce to a baking dish.",
        "Bake in the preheated oven at 375°F (190°C) for 20-25 minutes, or until the meatballs are cooked through and the sauce is bubbly and heated through. The internal temperature of the meatballs should reach 165°F (74°C).",
        "Remove the skillet or baking dish from the oven and let it rest for a few minutes before serving. This allows the sauce to thicken slightly and the flavors to settle.",
        "Garnish with fresh chopped parsley, if desired, before serving.",

      ],
      calories:"619",
    },
    {
      title:"Chicken fries fajita",
      image : require('./APPDEV/Chicken-Fries-Fajita561kCal.jpg'),
      time: "25 mins",
      servings: "2",
      ingredients: [
        "1 pound boneless, skinless chicken breasts, diced",
        "2 tablespoons olive oil",
        "1 tablespoon taco seasoning",
        "1 red bell pepper, sliced",
        "1 green bell pepper, sliced",
        "1 medium onion, sliced",
        "4 cups frozen French fries",
        "1 cup shredded cheddar cheese",
        "1/2 cup salsa",
        "Chopped cilantro, for garnish",
        "Sour cream, for serving (optional)",
      ],
      directions: [
        "Begin by preheating your oven according to the instructions on the frozen fries package. In a large skillet, heat the olive oil over medium-high heat. Add the diced poultry and taco seasoning, cooking for about 5-7 minutes until the chicken is fully cooked.",
        "Then, add the sliced bell peppers and onion to the skillet and cook for an additional 3-4 minutes until the vegetables are tender. Meanwhile, bake the fries until they're golden and crispy. Once the fries are ready, layer them on a serving platter, top with the chicken and vegetable mixture, sprinkle with cheddar cheese, and drizzle with salsa. Return the platter to the oven for a few minutes until the cheese is melted.",
      ],
      calories:"561",
    }

  ];

  const snackRecipes = [
    {
      title:"TBD",
      image : require('./APPDEV/Crispy-Baked-Chicken-Katsu567kcal.jpg'),
      time: "TBD",
      servings: "TBD",
      ingredients: [
        "TBD",
      ],
      directions: [
        "TBD",
      ],
      calories:"TBD",
    },
  ];
  const dinnerRecipes = [
    {
      title:"TBD",
      image : require('./APPDEV/Crispy-Baked-Chicken-Katsu567kcal.jpg'),
      time: "TBD",
      servings: "TBD",
      ingredients: [
        "TBD",
      ],
      directions: [
        "TBD",
      ],
      calories:"TBD",
    },
  ];

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Our Recipes</Text>
        <Text style={styles.categoryTitle}>Breakfast</Text>

        {breakfastRecipes.map((recipe, index) => (
            <RecipeCard
                key={index}
                title={recipe.title}
                time={recipe.time}
                image={recipe.image}
                servings={recipe.servings}
                ingredients={recipe.ingredients}
                directions={recipe.directions}
                calories={recipe.calories}
                onSelect={(selectedRecipe) => {
                  if (selectedRecipes.some((item) => item.title === selectedRecipe.title)) {
                    setSelectedRecipes(selectedRecipes.filter((item) => item.title !== selectedRecipe.title));
                  } else {
                    setSelectedRecipes([...selectedRecipes, selectedRecipe]);
                  }
                }}
                recipe={recipe}
            />
        ))}

        <Text style={styles.categoryTitle}>Lunch</Text>

        {lunchRecipes.map((recipe, index) => (
            <RecipeCard
                key={index}
                title={recipe.title}
                time={recipe.time}
                image={recipe.image}
                servings={recipe.servings}
                ingredients={recipe.ingredients}
                directions={recipe.directions}
                calories={recipe.calories}
                onSelect={(selectedRecipe) => {
                  if (selectedRecipes.some((item) => item.title === selectedRecipe.title)) {
                    setSelectedRecipes(selectedRecipes.filter((item) => item.title !== selectedRecipe.title));
                  } else {
                    setSelectedRecipes([...selectedRecipes, selectedRecipe]);
                  }
                }}
                recipe={recipe}
            />
        ))}
        <View style={styles.selectedRecipesContainer}>
          <Text style={styles.selectedRecipesTitle}>Selected Recipes:</Text>
          {selectedRecipes.length > 0 ? (
              <>
                {selectedRecipes.map((recipe, index) => (
                    <Text key={index} style={styles.selectedRecipeText}>• {recipe.title} ({recipe.calories})</Text>
                ))}
                <Text style={styles.totalCaloriesText}>
                  Total Calories: {calculateTotalCalories()} kcal / {Math.round(data.targetCalories)}
                </Text>
              </>
          ) : (
              <Text style={styles.noSelectedRecipesText}>No recipes selected yet.</Text>
          )}
        </View>


        <View style={styles.buttonContainer}>
          <Button title="Back to profile" onPress={onBack} />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28B572',
    marginVertical: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  subCategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28B572',
    marginBottom: 5,
  },
  recipeMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 5,
  },
  totalCaloriesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28B572',
    marginTop: 10,
  },
  ingredientsContainer: {
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  directionText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
    marginBottom: 30,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin : 5,
  },
  directionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  arrow: {
    fontSize: 18,
    color: '#28B572',
  },
  selectedRecipesContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f9f5',
    borderRadius: 10,
  },
  selectedRecipesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28B572',
    marginBottom: 10,
  },
  selectedRecipeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  noSelectedRecipesText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  selectButton: {
    backgroundColor: '#28B572',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
