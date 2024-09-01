export const useRandomUser = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack', 'Kathy', 'Liam'];
    const randomName = names[Math.floor(Math.random() * names.length)];
  
    return randomName;
  };
  