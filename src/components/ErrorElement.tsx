import React, { FC } from "react";
import { asideWidth, useAppSelector } from "../store/store";

type PropType = {
  style: {
    marginLeft: string;
  };
};

const ErrorElement: FC<PropType> = ({ style }) => {
  const marginLeft = useAppSelector(asideWidth);
  return (
    <h1
      className="error-message"
      style={{
        marginLeft: style.marginLeft ? style.marginLeft : marginLeft,
        textAlign: "center",
        marginTop: "30vh",
        color: "#dc2f02",
        width: "calc(100vw - 4vw)",
      }}
    >
      There are no movies to show
    </h1>
  );
};

export default ErrorElement;
