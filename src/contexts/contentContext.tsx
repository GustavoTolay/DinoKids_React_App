import { createContext, useState, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

// type Info = { _id?: string, name?: string }

type Context = {
  filters: {
    category: string
  };
  setFilters: Dispatch<SetStateAction<{ category: string }>>;
  // activeProduct: Info;
  // setActiveProduct: Dispatch<SetStateAction<Info>>;
  resetAll: VoidFunction;
};

export const ContentContext = createContext<Context>({} as Context);

const ContentProvider = ({ children }: Props) => {
  const { category } = useParams()
  const initialState = () => { 
    if(category) return { category }
    return { category: "all"}
   }

  const [filters, setFilters] = useState(initialState);
  // const [activeProduct, setActiveProduct] = useState<Info>({ _id: product })

  const resetAll = () => {
    setFilters({ category: "all" });
    // setActiveProduct({})
  }

  console.log(filters)

  return (
    <ContentContext.Provider value={{ filters, setFilters, resetAll }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentProvider;