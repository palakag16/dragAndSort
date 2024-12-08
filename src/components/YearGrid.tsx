import { useState, useEffect } from "react";
import { MessageData, YearGridProps } from "../utils/helpers";

const YearGrid = ({ year, messages, onUpdateYearMessages, action }: YearGridProps) => {
  const [itemsList, setItemsList] = useState(messages);
  const [draggedItem, setDraggedItem] = useState<number | undefined>();
  const [sortValue, setSortValue] = useState<string>("");


  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (index: number) => {
    if (draggedItem === undefined || index === draggedItem) return; // Prevent unnecessary reordering
    const updatedItems = [...itemsList];
    const dragged = updatedItems.splice(draggedItem, 1)[0];
    updatedItems.splice(index, 0, dragged);
    setItemsList(updatedItems);
    setDraggedItem(index);
  };

  const handleDrop = () => {
    onUpdateYearMessages(year, itemsList);
    setDraggedItem(undefined);
    setSortValue("");
  };
  //function to sort by date and msg
  const sortByDateAndMessage = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    const [type, order] = value.split("/")
    setSortValue(value)
    const sortedList = [...itemsList].sort((a: MessageData, b: MessageData): any => {
      if (type === "Date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (type === "Msg") {
        const messageA = a.message.toLowerCase();
        const messageB = b.message.toLowerCase();
        if (messageA < messageB) return order === "asc" ? -1 : 1;
        if (messageA > messageB) return order === "asc" ? 1 : -1;
        return 0;
      }
    });
    setItemsList(sortedList)
    onUpdateYearMessages(year, sortedList);
  };

  useEffect(() => {
    setItemsList(messages);
  }, [messages]);

  useEffect(() => {
    if (action) {
      setSortValue("")
    }
  }, [action])


  return (
    <>
      <div className="flex justify-between items-center my-4 ">
        <div className="bg-purple-500 text-lg font-semibold p-2 w-full md:w-6/12 sm:w-6/12 lg:w-5/12 text-left">
          Year - {year}
        </div>

        <select
          name="sort"
          className="p-2 h-9 mx-2 bg-purple-500 text-white rounded-sm "
          onChange={(e) => sortByDateAndMessage(e)}
          value={sortValue}
        >
          <option value="" style={{ display: "none" }}>Sort By</option>
          <option value="Msg/asc">A-Z</option>
          <option value="Msg/dsc">Z-A</option>
          <option value="Date/asc">Date(1-9)</option>
          <option value="Date/dsc">Date(9-1)</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-6">
        {itemsList.map((item, index) => {
          return (
            <li
              key={item.date}
              className={`h-[250px]  w-full grid place-content-center
            bg-gradient-to-tr bg-pink-200   hover:scale-105 ${draggedItem === index ? "bg-purple-300 opacity-5 scale-105 cursor-grabbing" : ""}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => {
                e.preventDefault()
                handleDragOver(index)
              }}
              onDrop={handleDrop}
            >
              <h5 className="text-black text-center">{item.message}</h5>
              <div className="text-black text-center">{item.date}</div>
            </li>
          )
        })}
      </div>
    </>
  )
}

export default YearGrid