export const terminalLogger = {
  logError: () => {
    console.log('An error has occurred');
  },

  logSuccess: () => {
    console.log('Completed successfully');
  },

  log: (data: string) => {
    console.log(data);
  },

  onCloseSocket: () => {
    console.log('The server is shutting down');
  },
};
