import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";

interface DroppableProps {
  id: string;
}

const Droppable = (props: PropsWithChildren<DroppableProps>) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <>
      <div ref={setNodeRef}>{props.children}</div>
    </>
  );
};

export default Droppable;
