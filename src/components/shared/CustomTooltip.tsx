import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CustomTooltipProps {
  content: string;
}

const CustomTooltip = (props: PropsWithChildren<CustomTooltipProps>) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>
          <p>{props.content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
