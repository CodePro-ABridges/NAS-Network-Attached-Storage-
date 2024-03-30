import { FaFileAlt, FaFolder } from "react-icons/fa";
import "./ShowItems.css";
import { useNavigate } from "react-router-dom";

const ShowItems = ({ title, items, type }) => {
  //Navigation for double click
  const navigate = useNavigate();

  //handleDoubleClick for Folders && Files
  const handleDoubleClick = (itemId) => {
    //condition for checking if type is folder || file
    if (type === "folder") {
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      alert("File clicked");
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-center border-b border-gray-200">{title}</h4>{" "}
      <div className="flex gap-2 p-4 flex-wrap">
        {items.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="md:w-2/12 p-5 text-center border"
              onDoubleClick={() => handleDoubleClick(item.docId)}
            >
              {type === "folder" ? (
                <FaFolder className="mx-auto text-4xl mb-3" />
              ) : (
                <FaFileAlt className="mx-auto text-4xl mb-3" />
              )}
              {console.log(item)}
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
