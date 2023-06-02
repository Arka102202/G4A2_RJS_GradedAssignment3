import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  messageExtraInfo,
  showExtraInfo,
  styleExtraInfo,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { extraInfoActions } from "../store/slices/extraInfo";
import { clearExtraInfo } from "../services/extraInfoService";

const ExtraInfo = () => {
  const show = useAppSelector(showExtraInfo);
  const message = useAppSelector(messageExtraInfo);
  const style = useAppSelector(styleExtraInfo);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(extraInfoActions.showExtraInfo(clearExtraInfo));
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, location]);

  return (
    <>
      {show && (
        <p
          className="extra-info-box"
          style={{ ...style, pointerEvents: "none" }}
        >
          {message}
        </p>
      )}
    </>
  );
};

export default ExtraInfo;
