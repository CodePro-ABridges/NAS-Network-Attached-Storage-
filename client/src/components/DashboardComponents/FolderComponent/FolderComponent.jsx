import { useParams } from "react-router-dom";

const FolderComponent = () => {
  //Extracting folderId

  const { folderId } = useParams();

  return <div>FolderComponent: {folderId} </div>;
};

export default FolderComponent;
