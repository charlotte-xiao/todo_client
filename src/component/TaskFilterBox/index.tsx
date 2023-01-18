import React, { FunctionComponent } from "react";
import { FILTER_CONDITION } from "../../constants/FilterCondition";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { getAmount, getFilterCondition } from "../../store/task/selectors";
import {
  FilterConditionAction,
  updateFilterCondition,
} from "../../store/task/reducer";

const ShowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-weight: normal;
    font-size: 1.2rem;
    color: darkgray;
    flex: 1;
    text-align: left;
  }
`;

const Button = styled.input`
  color: #7f95a3;
  background-color: white;
  font-size: 0.8rem;
  font-weight: bolder;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
  border: 0;
  border-radius: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;

  &.is_active {
    color: white;
    background-color: #7f95a3;
  }
`;

export const TaskFilterBox: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const amount = useAppSelector(getAmount);
  const filterCondition = useAppSelector(getFilterCondition);

  const handleChangeTaskFilterCondition = (condition: number) => {
    const filterConditionAction: FilterConditionAction = {
      filterCondition: condition,
    };
    dispatch(updateFilterCondition(filterConditionAction));
  };

  return (
    <>
      <ShowBox>
        <div>
          {amount} {amount <= 1 ? "task" : "tasks"}
        </div>
        {Object.entries(FILTER_CONDITION).map((condition) => (
          <Button
            type="button"
            value={condition[0]}
            key={condition[1]}
            className={condition[1] === filterCondition ? "is_active" : ""}
            onClick={() => {
              handleChangeTaskFilterCondition(condition[1]);
            }}
          />
        ))}
      </ShowBox>
    </>
  );
};
