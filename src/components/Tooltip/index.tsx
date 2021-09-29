import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const TooltipComponent = (props: {
  label: string;
  hideIcon?: boolean;
  content?: string | React.ReactNode;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <Tooltip
      title={
        <Typography style={{ fontSize: "14px" }}>{props.label}</Typography>
      }
    >
      <>
        {!props.hideIcon ? (
          <InfoOutlinedIcon
            style={{ width: "20px", marginLeft: "5px", cursor: "pointer" }}
          />
        ) : (
          <span>{props.content}</span>
        )}
        {props.children ? props.children : <></>}
      </>
    </Tooltip>
  );
};

export default TooltipComponent;
