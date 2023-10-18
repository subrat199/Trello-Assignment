import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Pages/Board";
import { useEffect, useState } from "react";
import { getData } from "./Redux/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";

function App() {
  const [selectedBoard, setSelectedBoard] = useState("board1");
  const dispatch = useDispatch();

  let boards = useSelector((store) => store.data);
  const board = boards.find((element) => element.id === selectedBoard);
  const boardIdx = boards?.findIndex((element) => element.id === selectedBoard);

  useEffect(() => {
    dispatch(getData);
  });

  const onChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let resources = board.resources;
    let todo = board.todo;
    let doing = board.doing;
    let done = board.done;

    if (source.droppableId === "resourcesList") {
      add = resources[source.index];
      resources.splice(source.index, 1);
    } else if (source.droppableId === "todoList") {
      add = todo[source.index];
      todo.splice(source.index, 1);
    } else if (source.droppableId === "doingList") {
      add = doing[source.index];
      doing.splice(source.index, 1);
    } else if (source.droppableId === "doneList") {
      add = done[source.index];
      done.splice(source.index, 1);
    } else {
      return;
    }

    if (destination.droppableId === "resourcesList") {
      resources.splice(destination.index, 0, add);
    } else if (destination.droppableId === "todoList") {
      todo.splice(destination.index, 0, add);
    } else if (destination.droppableId === "doingList") {
      doing.splice(destination.index, 0, add);
    } else if (destination.droppableId === "doneList") {
      done.splice(destination.index, 0, add);
    } else {
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Select onChange={(e) => onChange(e)} className="selectTag" bg="black">
          {boards.map((ele, idx) => {
            return (
              <option key={idx} value={ele.name} style={{"backgroundColor":"black"}}>
                <p>{ele.name}</p>
              </option>
            );
          })}
        </Select>
        <Board data={board} boardIdx={boardIdx}  />
      </div>
    </DragDropContext>
  );
}

export default App;
