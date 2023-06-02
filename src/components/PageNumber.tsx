import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ellipsis from "../assets/img/more.png";
import { pages, useAppSelector } from "../store/store";

const PageNumber = () => {
  const maxVal = useAppSelector(pages);
  const minVal = maxVal > 0 ? 1 : 0;
  const [tempMin, setTempMin] = useState(minVal + 1);
  const [tempMax, setTempMax] = useState(
    minVal + 9 > maxVal ? maxVal : minVal + 9
  );
  const curPageNum = useRef(1);
  const { pageNumber } = useParams();
  const location = useLocation();
  const loc = location.pathname.split("/");
  const navigate = useNavigate();
  const leftEllipsis = tempMax <= 10 ? " hidden" : "";
  const rightEllipsis = tempMax < maxVal - 1 ? "" : " hidden";
  const pageNumbers = [];
  for (let i = tempMin; i <= (tempMax === maxVal ? maxVal - 1 : tempMax); i++)
    pageNumbers.push(i);

  useEffect(() => {
    if (pageNumber && parseInt(pageNumber) === 1) {
      setTempMin(2);
      setTempMax(10 > maxVal ? maxVal : 10);
      curPageNum.current = 1;
    }
  }, [maxVal, pageNumber]);

  useEffect(() => {
    setTempMin(minVal + 1);
    setTempMax(minVal + 9 > maxVal ? maxVal : minVal + 9);
  }, [maxVal, minVal]);

  const updateTempMinMax = (max: number) => {
    setTempMin(max);
    if (max + 10 >= maxVal) setTempMax(maxVal - 1);
    else setTempMax(max + 10);
  };
  const updateTempMinMaxOnDecrease = (min: number) => {
    setTempMax(min);
    if (min - 10 <= minVal) setTempMin(minVal + 1);
    else setTempMin(min - 10);
  };
  const navigateToPage = (pageNumber: number) => {
    navigate(`/${loc[1]}/${pageNumber}${loc[3] ? `/${loc[3]}` : ""}`);
  };
  const inBtwNumClickHandler = (event: any) => {
    curPageNum.current = parseInt((event.target! as HTMLElement).innerText);
    navigateToPage(curPageNum.current);
  };
  const rightSingleArrowClickHandler = () => {
    if (curPageNum.current === maxVal || minVal === 0) return;
    if (curPageNum.current === tempMax && curPageNum.current !== maxVal - 1)
      updateTempMinMax(tempMax);
    curPageNum.current += 1;
    navigateToPage(curPageNum.current);
  };
  const leftSingleArrowClickHandler = () => {
    if (curPageNum.current === minVal || minVal === 0) return;
    if (curPageNum.current === tempMin && curPageNum.current !== minVal + 1)
      updateTempMinMaxOnDecrease(tempMin);
    curPageNum.current -= 1;
    navigateToPage(curPageNum.current);
  };
  const rightDoubleArrowClickHandler = () => {
    if (tempMax >= maxVal - 1 || minVal === 0) return;
    curPageNum.current += 10;
    updateTempMinMax(tempMax);
    navigateToPage(curPageNum.current);
  };
  const leftDoubleArrowClickHandler = () => {
    if (tempMin <= minVal + 1 || minVal === 0) return;
    curPageNum.current =
      curPageNum.current - 10 === 0 ? 1 : curPageNum.current - 10;
    updateTempMinMaxOnDecrease(tempMin);
    navigateToPage(curPageNum.current);
  };
  const maxClickHandler = () => {
    const max = tempMax;
    curPageNum.current = max;
    navigateToPage(curPageNum.current);
    if (tempMax >= maxVal - 1) return;
    updateTempMinMax(max);
  };
  const onMaxValClick = () => {
    let tempMax = maxVal;
    while (tempMax % 10 !== 0) tempMax--;
    setTempMin(tempMax > 0 ? tempMax : 2);
    setTempMax(maxVal - 1);
    curPageNum.current = maxVal;
    navigateToPage(curPageNum.current);
  };
  const onMinValClick = () => {
    if (minVal === 0) return;
    setTempMin(2);
    setTempMax(10 > maxVal ? maxVal : 10);
    curPageNum.current = minVal;
    navigateToPage(curPageNum.current);
  };

  return (
    <>
      <div className="page-number">
        {pageNumber && parseInt(pageNumber) > 10 && (
          <button className="btn-square" onClick={leftDoubleArrowClickHandler}>
            <i className="fi fi-br-angle-double-left"></i>
          </button>
        )}
        {pageNumber && parseInt(pageNumber) > 1 && (
          <button className="btn-square" onClick={leftSingleArrowClickHandler}>
            <i className="fi fi-br-angle-left"></i>
          </button>
        )}
        <div className="page-numbers-marked">
          {minVal > 0 && (
            <button className="btn-square" onClick={onMinValClick}>
              {minVal}
            </button>
          )}
          <div className={`btn-square btn-img${leftEllipsis}`}>
            <img src={ellipsis} alt="" />
          </div>
          {pageNumbers.map((i) => {
            const temp = [];
            if (i === tempMax)
              temp.push(
                <button
                  key={i}
                  className="btn-square"
                  onClick={maxClickHandler}
                >
                  {i}
                </button>
              );
            else
              temp.push(
                <button
                  key={i}
                  className="btn-square"
                  onClick={inBtwNumClickHandler}
                >
                  {i}
                </button>
              );

            return temp;
          })}
          <div className={`btn-square btn-img${rightEllipsis}`}>
            <img src={ellipsis} alt="" />
          </div>
          {maxVal !== minVal && (
            <button onClick={onMaxValClick} className="btn-square">
              {maxVal}
            </button>
          )}
        </div>
        <div className="page-number-box">
          <p className="curr-page-no">{pageNumber}</p>
          <p>/{maxVal}</p>
        </div>
        {pageNumber && parseInt(pageNumber) < maxVal && (
          <button className="btn-square" onClick={rightSingleArrowClickHandler}>
            <i className="fi fi-br-angle-right"></i>
          </button>
        )}
        {pageNumber && parseInt(pageNumber) < maxVal - 10 && (
          <button className="btn-square" onClick={rightDoubleArrowClickHandler}>
            <i className="fi fi-br-angle-double-right"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default PageNumber;
