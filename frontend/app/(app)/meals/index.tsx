import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import DatePanelComponent from "@/components/custom/DatePanel";
import FoodCardComponent from "@/components/custom/Meals/FoodCard";
import MealDrawerComponent from "@/components/custom/Meals/MealDrawer";
import { useRouter } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MealsPage = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [index, setIndex] = useState(3);
  const router = useRouter();

  const { setNavbarTitle } = useLayout();

  useEffect(() => {
    setNavbarTitle("Meal Schedule");
  }, []);

  const ComponentData = [
    {
      title: "Breakfast",
      numberOfMeals: 2,
      numberOfCals: 400,

      meals: [
        {
          food_id: 6908,
          id: 1,
          image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
          foodName: "Burger",
          quantity: "200g",
          detailsRoute: "",
          totalCals: "300kCal",
        },
        {
          food_id: 6908,
          id: 1,
          image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
          foodName: "Burger",
          quantity: "200g",
          totalCals: "300kCal",
        },
      ],
    },
    {
      title: "Lunch",
      numberOfMeals: 2,
      numberOfCals: 400,

      meals: [
        {
          food_id: 6908,
          id: 1,
          image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
          foodName: "Burger",
          totalCals: "300kCal",
          quantity: "200g",
        },
        {
          food_id: 6908,
          id: 1,
          image:
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
          foodName: "Burger",
          quantity: "200g",
          totalCals: "300kCal",
        },
      ],
    },
  ];

  const mealOptions = [
    {
      title: "Breakfast",
      value: "breakfast",
      route: "/meals/search/breakfast",
    },
    {
      title: "Morning Snack",
      value: "morningSnack",
      route: "/meals/search/morningSnack",
    },
    {
      title: "Lunch",
      value: "lunch",
      route: "/meals/search/lunch",
    },
    {
      title: "Afternoon Snack",
      value: "afternoonSnack",
      route: "/meals/search/afternoonSnack",
    },
    {
      title: "Dinner",
      value: "dinner",
      route: "/meals/search/dinner",
    },
    {
      title: "Late Night Snack",
      value: "lateNightSnack",
      route: "/meals/search/lateNightSnack",
    },
  ];

  const pressHandler = (option) => {
    router.push({
      pathname: option.route,
      params: { date: String(selectedDate.toISOString()) },
    });
  };

  const deleteMealHandler = (id) => {
    console.log("Delete meal with id: ", id);
  };

  return (
    <ScrollView contentContainerClassName="pb-32" className="!mt-0">
      <GestureHandlerRootView>
        <DatePanelComponent
          dates={dates}
          selectedDate={selectedDate}
          index={index}
          setDates={setDates}
          setSelectedDate={setSelectedDate}
          setIndex={setIndex}
        />

        {ComponentData.map((section, id) => (
          <FoodCardComponent
            key={id}
            title={section.title}
            deleteMealHandler={deleteMealHandler}
            numberOfCals={section.numberOfCals}
            numberOfMeals={section.numberOfMeals}
            meals={section.meals}
          />
        ))}

        <MealDrawerComponent
          drawerOptions={mealOptions}
          pressHandler={pressHandler}
        />
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default MealsPage;
