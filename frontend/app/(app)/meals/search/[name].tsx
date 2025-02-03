import { Input, InputField, InputSlot } from "@/components/ui/input";
import { View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useLayout } from "@/context/LayoutContext";
import { useEffect, useState } from "react";
import FoodScrollComponent from "@/components/custom/Meals/Scroll";
import CategoryScrollComponent from "@/components/custom/Meals/Scroll/CategoryScroll";
import GenericIcon from "@/components/custom/Icon";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import apiFetch from "@/utils/apiFetch";
import { useDebounce } from "@uidotdev/usehooks";

const MealsSearchPage = () => {
  const { name } = useLocalSearchParams();
  const { setNavbarTitle } = useLayout();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const nameString = Array.isArray(name) ? name[0] : name;

    if (nameString) {
      const navbarTitle = nameString
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      setNavbarTitle(navbarTitle);
    }
  }, [name, setNavbarTitle]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["meals", page, debouncedSearch],
    queryFn: () =>
      apiFetch(`/get-meals?page=${page}&search=${debouncedSearch}`),
    placeholderData: keepPreviousData,
  });

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

  const onCategoryClick = (name: string) => {
    setSearchQuery(name);
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

      <FoodScrollComponent meals={data?.meals} onClick={onFoodCardClick} />
    </View>
  );
};

export default MealsSearchPage;
