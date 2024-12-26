import { Input, InputField, InputSlot } from "@/components/ui/input";
import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useNavbar } from "@/context/NavbarContaxt";
import { useEffect, useState, useCallback } from "react";
import FoodScrollComponent from "@/components/custom/Meals/Scroll";
import CategoryScrollComponent from "@/components/custom/Meals/Scroll/CategoryScroll";
import GenericIcon from "@/components/custom/Icon";
import debounce from "lodash/debounce";

const MealsSearchPage = () => {
  const { name } = useLocalSearchParams();
  const { setNavbarTitle } = useNavbar();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const nameString = Array.isArray(name) ? name[0] : name;

    if (nameString) {
      const navbarTitle = nameString
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      setNavbarTitle(navbarTitle);
    }
  }, [name, setNavbarTitle]);

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") {
        setMeals([]);
        return;
      }

      try {
        setMeals(mealsData);
      } catch (err) {
      } finally {
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);

    return debouncedSearch.cancel;
  }, [searchQuery, debouncedSearch]);

  const mealsData = [
    { id: 1, name: "Chicken", calories: 200 },
    { id: 2, name: "Beef", calories: 300 },
    { id: 3, name: "Fish", calories: 150 },
    { id: 4, name: "Pork", calories: 250 },
    { id: 5, name: "Lamb", calories: 400 },
    { id: 6, name: "Burger", calories: 500 },
    { id: 7, name: "Pizza", calories: 600 },
    { id: 8, name: "Pasta", calories: 700 },
    { id: 9, name: "Rice", calories: 800 },
  ];

  const categories = [
    {
      id: 1,
      name: "Salads",
    },
    {
      id: 2,
      name: "Soups",
    },
    {
      id: 3,
      name: "Main Courses",
    },
    {
      id: 4,
      name: "Desserts",
    },
    {
      id: 5,
      name: "Drinks",
    },

    {
      id: 6,
      name: "Appetizers",
    },
  ];

  const onFoodCardClick = (id: number) => {
    router.push({
      pathname: "/meals/details",
      params: { id: id, isNew: String(true) },
    });
  };

  const onCategoryClick = (id: number) => {
    console.log(`Clicked on category with id: ${id}`);
  };

  return (
    <View className="flex flex-col gap-7">
      <Input size="xl" variant="rounded" className="mx-7 ">
        <InputSlot>
          <GenericIcon name="Search" size={20} color="#7B6F72" />
        </InputSlot>
        <InputField
          className="text-lg"
          value={searchQuery}
          onChangeText={setSearchQuery}
          type={"text"}
          placeholder="Search for meals"
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Input>

      <CategoryScrollComponent
        categories={categories}
        onClick={onCategoryClick}
      />

      <FoodScrollComponent meals={meals} onClick={onFoodCardClick} />
    </View>
  );
};

export default MealsSearchPage;
