import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Image } from 'react-native';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gclpgggqbmbcaenzidgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbHBnZ2dxYm1iY2FlbnppZGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODI5MjEsImV4cCI6MjA3ODM1ODkyMX0.dIsT_dnWNPFqNpB5C4cY5ZSRetzL1k_B3Fu81XzLQeY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const RecipeCard = ({ title, time, servings, image, ingredients, directions }) => (
  <View style={styles.recipeCard}>
    <Text style={styles.recipeTitle}>{title}</Text>
    <Text style={styles.recipeMeta}>Total Time: {time} | Servings: {servings}</Text>
    <Image
      source={image}
      style={styles.recipeImage}
      resizeMode="cover"
    />
    <Text style={styles.sectionTitle}>Ingredients</Text>
    <View style={styles.ingredientsContainer}>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredientText}>• {ingredient}</Text>
      ))}
    </View>

    <Text style={styles.sectionTitle}>Directions</Text>
    {directions.map((step, index) => (
      <Text key={index} style={styles.directionText}>{index + 1}. {step}</Text>
    ))}
  </View>
);

export default function RecipesList({ onBack }) {
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
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our Recipes</Text>
      <Text style={styles.categoryTitle}>Breakfast</Text>
      <Text style={styles.subCategoryTitle}>Weight Gain</Text>

      {breakfastRecipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          title={recipe.title}
          time={recipe.time}
          image={recipe.image}
          servings={recipe.servings}
          ingredients={recipe.ingredients}
          directions={recipe.directions}
        />
      ))}
      <Text style={styles.subCategoryTitle}>Weight Loss</Text>

      <View style={styles.buttonContainer}>
        <Button title="Back to connection" onPress={onBack} />
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
});
