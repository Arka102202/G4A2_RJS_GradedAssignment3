import React, { useEffect } from "react";
import {
  infoBarNumber,
  margin,
  messageInfo,
  showInfo,
  useAppDispatch,
  useAppSelector,
} from "../store/store";
import { infoActions } from "../store/slices/info";

const InfoBar = () => {
  const returnStatus = useAppSelector(showInfo);
  const message = useAppSelector(messageInfo);
  const dispatch = useAppDispatch();
  const top = useAppSelector(margin);
  const infoBarNum = useAppSelector(infoBarNumber);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(infoActions.setShow(false));
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, returnStatus, infoBarNum]);

  return (
    <>
      {returnStatus && (
        <p style={{ top }} className="info-bar">
          {message}
        </p>
      )}
    </>
  );
};

export default InfoBar;
