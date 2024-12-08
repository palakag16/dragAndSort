import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import Form from "./components/Form";
import { groupDataByYear, initialMessages, MessageData, GroupedData } from "./utils/helpers"
import YearGrid from "./components/YearGrid";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("");
  const [groupedData, setGroupedData] = useState<GroupedData>(
    groupDataByYear(initialMessages)
  );
  const [backupData, setBackupData] = useState<GroupedData>(
    groupDataByYear([...initialMessages])
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addData = (newData: MessageData) => {
    const updatedData = [...Object.values(groupedData).flat(), newData];
    const grouped = groupDataByYear(updatedData);
    setGroupedData(grouped);
    setBackupData(JSON.parse(JSON.stringify(grouped)));
    toast.success("Message Successfully Created", { autoClose: 1000 })
  };

  // function to update msg order on drag
  const handleUpdateYearMessages = (year: string, updatedMessages: MessageData[]) => {
    setGroupedData((prev) => ({
      ...prev,
      [Number(year)]: [...updatedMessages],
    }));
    setAction("")
  };

  // button functions
  const sortByDate = (arr: MessageData[]): MessageData[] => {
    return arr.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime(); // Use getTime() to compare timestamps
    });
  };

  const sortMessagesByDate = () => {
    setAction("SORT")
    for (let year in groupedData) {
      const sortedMessage = sortByDate(groupedData[year])
      setGroupedData({ ...groupedData, [year]: sortedMessage })
    }
  }

  const setInitialData = () => {
    setAction("INITIAL")
    setGroupedData(structuredClone(backupData));
  };


  return (
    <div >
      <ToastContainer />
      <div className="flex justify-end">
        <button
          type="button"
          className={`text-black px-10 py-2 mr-2 bg-pink-200 border-2 border-pink-300 rounded-lg hover:bg-pink-300 ${action == "INITIAL" && "bg-purple-400"}`}
          onClick={setInitialData}
        >
          Initial
        </button>
        <button
          type="button"
          className={`text-black px-10 py-2 bg-pink-200 border-2 border-pink-300 rounded-lg hover:bg-pink-300  ${action == "SORT" && "bg-purple-400"}`}
          onClick={sortMessagesByDate}
        >
          Sorted
        </button>

      </div>
      {Object.entries(groupedData).map(([year, messages]) => (
        <YearGrid year={year} messages={messages} onUpdateYearMessages={handleUpdateYearMessages} key={year} action={action} />
      ))}

      <button
        onClick={handleOpenModal}
        className="bg-gradient-to-br from-pink-500 to-purple-500 fixed bottom-0 right-0 p-1 m-4 w-[80px] h-[80px] rounded-[50%] grid place-content-center text-lg cursor-pointer">+ Add</button>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
        blockScroll={true} // Ensure body scroll locking
      >
        <Form
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={addData}
        />
      </Modal>
    </div>
  )
}

export default App


