import { shallowEqual, useSelector } from "react-redux";
import ShowItems from "../DashboardComponents/ShowItems/ShowItems";

const HomeComponent = () => {
  const folders = ["New Folder", "New Folder 2"];
  const files = [{ name: "New File" }, { name: "New File 2" }];

  //TODO: animate the loading
  //
  //redux data retrieval
  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.filefolders.isLoading,
      userFolders: state.filefolders.userFolders,
    }),
    shallowEqual,
  );

  return (
    <div className="w-full">
      {isLoading ? (
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none my-5 text-center">
          Retrieving from the sphere...
        </h1>
      ) : (
        <>
          <ShowItems
            title={"Created Folders"}
            type={"folder"}
            items={userFolders}
          />
          <ShowItems title={"Created Files"} type={"file"} items={files} />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
