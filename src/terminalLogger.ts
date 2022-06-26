export const terminalLogger = {
  logError: () => {
    console.log('An error has occurred');
  },

  log: (data: string) => {
    console.log(data);
  },
};
