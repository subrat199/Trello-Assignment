import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import Cards from "../Components/Cards";

const Board = ({ data, boardIdx }) => {
  return (
    <Box className="board" border="1px solid red">
      <Flex className="flex">
        <Cards
          data={data?.resources}
          drpId="resourcesList"
          name="resources"
          boardIdx={boardIdx}
        />
        <Cards
          data={data?.todo}
          drpId="todoList"
          name="todo"
          boardIdx={boardIdx}
        />
        <Cards
          data={data?.doing}
          drpId="doingList"
          name="doing"
          boardIdx={boardIdx}
        />
        <Cards
          data={data?.done}
          drpId="doneList"
          name="done"
          boardIdx={boardIdx}
        />
      </Flex>
    </Box>
  );
};

export default Board;
