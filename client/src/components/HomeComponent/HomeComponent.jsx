import ShowItems from "../DashboardComponents/ShowItems/ShowItems";

const HomeComponent = () => {
  const folders = ["New Folder", "New Folder 2"];
  const files = ["New File", "New File 2"];

  return (
    <div className="w-full">
      <ShowItems title={"Created Folders"} items={folders} />
      <ShowItems title={"Created Files"} items={files} />
    </div>
  );
};

export default HomeComponent;
