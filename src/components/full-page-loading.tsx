import styled from "@emotion/styled";
import { Spin } from "antd";
import { ErrorBox } from "./lib";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-self: center;
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin size="large" />
    </FullPage>
  );
};

export const FullPageError = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
  );
};
