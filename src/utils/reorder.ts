/**
 *
 * @param fromId the Id of the project to be ordered;
 * @param type 'before | 'after'
 * @param toId id can be referenced
 * @param list the list to be ordered ie, tasks, kanban
 * @returns insert()
 */

export const reorder = ({
  fromId,
  type,
  toId,
  list,
}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  toId: number;
}) => {
  const copiedList = [...list];
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  if (!toId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }

  const targetIndex = copiedList.findIndex((item) => item.id === toId);
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

/**
 *
 * @param list
 * @param from
 * @param to
 * @returns ordered list
 * @description put "from" before "to" inside a list
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 *
 * @param list
 * @param from
 * @param to
 * @returns ordered list
 * @description put "from" after "to" inside a list
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
