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
import { useTranslation } from "react-i18next";

const MealsSearchPage = () => {
  const { name, date } = useLocalSearchParams();
  const { setNavbarTitle } = useLayout();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(0);
  const [meals, setMeals] = useState([]);
  const { t } = useTranslation("meals");
  const debouncedSearch = useDebounce(searchQuery, 100);

  useEffect(() => {
    const nameString = Array.isArray(name) ? name[0] : name;

    if (nameString) {
      const navbarTitle = nameString
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
      setNavbarTitle(navbarTitle);
    }
  }, [name, setNavbarTitle]);

  const { isFetching, data, refetch } = useQuery({
    queryKey: ["meals", debouncedSearch, page],
    queryFn: () => apiFetch(`/meals?search=${debouncedSearch}&page=${page}`),
    placeholderData: keepPreviousData,
    enabled: !!debouncedSearch.trim(),
  });

  useEffect(() => {
    if (data) {
      setMeals((prev) => [...prev, ...data?.meals]);
    }
  }, [data]);

  const onRefresh = () => {
    if (isFetching) return;
    refetch().catch((err) => console.error(err));
  };

  const loadMore = () => {
    if (isFetching) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setMeals([]);
    setPage(0);
  }, [debouncedSearch]);

  const categories = [
    {
      id: 1,
      name: t("categoriesList.salads", { context: "meals" }),
    },
    {
      id: 2,
      name: t("categoriesList.soups", { context: "meals" }),
    },
    {
      id: 3,
      name: t("categoriesList.mainCourses", { context: "meals" }),
    },
    {
      id: 4,
      name: t("categoriesList.desserts", { context: "meals" }),
    },
    {
      id: 5,
      name: t("categoriesList.drinks", { context: "meals" }),
    },

    {
      id: 6,
      name: t("categoriesList.appetizers", { context: "meals" }),
    },
  ];

  const onFoodCardClick = (id: number) => {
    router.push({
      pathname: "/meals/details",
      params: { food_id: id, date: date, eaten_at: name },
    });
  };

  const onCategoryClick = (name: string) => {
    setSearchQuery(name);
  };

  return (
    <View className="flex flex-col gap-7">
      <Input size="xl" variant="rounded" className="mx-7">
        <InputSlot>
          <GenericIcon name="Search" size={20} color="#7B6F72" />
        </InputSlot>
        <InputField
          className="text-lg"
          value={searchQuery}
          onChangeText={setSearchQuery}
          type={"text"}
          placeholder={t("search", { context: "meals" })}
          placeholderTextColor={"#7B6F72"}
          autoCapitalize="words"
          autoCorrect={false}
        />
      </Input>

      <CategoryScrollComponent
        categories={categories}
        onClick={onCategoryClick}
      />

      <FoodScrollComponent
        loadMore={loadMore}
        onRefresh={onRefresh}
        isLoading={isFetching}
        meals={meals}
        onClick={onFoodCardClick}
      />
    </View>
  );
};

export default MealsSearchPage;
