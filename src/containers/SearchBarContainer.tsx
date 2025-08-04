import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux";
import { useEffect, useState } from "react";
import useQueryParams from "@/hooks/useQueryParams.ts";
import { SEARCH_QUERY_PARAMETER } from "@/constants/constants.ts";
import { filterActions } from "@/store/redux/FilterSlice.ts";
import KoaSearchBar from "@/components/koa-ui/KoaSearchBar.tsx";

interface SearchBarContainerProps {
  handleFilterChange: (search: string) => void;
}

const SearchBarContainer = ({
  handleFilterChange,
}: SearchBarContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchKeyword: string = useSelector(
    (state: RootState) => state.filter.searchKeyword,
  );

  const [inputSearch, setInputSearch] = useState<string>(searchKeyword);

  const { getQueryParamByKey, setQueryParam, removeQueryParamByKey } =
    useQueryParams();
  // fetch search keyword from url if exists
  const searchKeywordQueryParam = getQueryParamByKey(SEARCH_QUERY_PARAMETER);

  useEffect(() => {
    if (searchKeywordQueryParam) {
      dispatch(
        filterActions.updateSearchKeyword({
          searchKeyword: searchKeywordQueryParam,
        }),
      );
      handleFilterChange(searchKeywordQueryParam);
      setInputSearch(searchKeywordQueryParam);
    }
  }, [searchKeywordQueryParam]);

  useEffect(() => {
    if (
      searchKeyword &&
      searchKeyword !== "" &&
      searchKeywordQueryParam === ""
    ) {
      handleInputSearch(searchKeyword);
    }
  }, [searchKeyword]);

  const handleInputSearch = (inputSearch: string) => {
    handleFilterChange(inputSearch);
    setInputSearch(inputSearch);
    dispatch(filterActions.updateSearchKeyword({ searchKeyword: inputSearch }));

    if (inputSearch !== "") {
      setQueryParam(SEARCH_QUERY_PARAMETER, inputSearch);
    } else {
      removeQueryParamByKey(SEARCH_QUERY_PARAMETER);
    }
  };

  return (
    <KoaSearchBar
      id="search-bar"
      searchedText={inputSearch}
      handleSearch={handleInputSearch}
    />
  );
};

export default SearchBarContainer;
