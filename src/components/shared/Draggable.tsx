import { useDraggable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import { CSS } from "@dnd-kit/utilities";

interface DraggableProps {
  id: string;
  data?: any;
}

const Draggable = (props: PropsWithChildren<DraggableProps>) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: props.data,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef}>
      <div {...listeners} style={style} {...attributes}>
        {props.children}
      </div>
    </div>
  );
};

export default Draggable;
