global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(), // for older browsers
      removeListener: jest.fn(), // for older browsers
      addEventListener: jest.fn(), // for newer browsers
      removeEventListener: jest.fn(), // for newer browsers
      dispatchEvent: jest.fn(), // for newer browsers
    };
  };
