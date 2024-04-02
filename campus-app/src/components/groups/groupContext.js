import React, { createContext, useState } from 'react';

const GroupContext = createContext();

const GroupProvider = ({ children }) => {
  const [groupId, setGroupId] = useState(null);

  return (
    <GroupContext.Provider value={{ groupId, setGroupId }}>
      {children}
    </GroupContext.Provider>
  );
};

export { GroupContext, GroupProvider };