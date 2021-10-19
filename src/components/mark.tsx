export const MarkText = ({
  name,
  keyword,
}: {
  name: string | undefined;
  keyword: string |undefined;
}) => {
  if (!keyword) {
    return <>{name}</>;
  }

  const arr = name?.split(keyword);

  return (
    <>
      {arr?.map((str: string, index: number) => {
        return (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257AF0" }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
