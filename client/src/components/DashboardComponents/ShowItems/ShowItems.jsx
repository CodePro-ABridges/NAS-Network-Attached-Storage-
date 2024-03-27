import "./ShowItems.css";

const ShowItems = ({ title, items }) => {
  return (
    <div className="w-full">
      {" "}
      <h4 className="text-center border-b border-gray-200">{title}</h4>{" "}
      <div className="flex gap-2 p-4 flex-wrap">
        {" "}
        {items.map((item, index) => {
          return (
            <p key={index * 55} className="md:w-2/12 p-5 text-center border">
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
