import React, { FunctionComponent } from "react";
import { formatDate } from "../../utils/time";
import styled from "styled-components";

const NowDate = styled.div`
  font-weight: bolder;
  font-size: 1.5rem;
  color: #495862;
  text-align: left;
`;

export const DateBar: FunctionComponent = () => {
  return (
    <>
      <NowDate>
        {formatDate(new Date(), "{dayOfWeek} {month} {day} {year}")}
      </NowDate>
    </>
  );
};
