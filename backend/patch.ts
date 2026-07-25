


if (globalThis.process && globalThis.process.getBuiltinModule) {
  try {
    const v8 = globalThis.process.getBuiltinModule('v8');
    if (v8) {
      Object.defineProperty(v8, 'startupSnapshot', {
        value: {
          isBuildingSnapshot: () => false,
        },
        configurable: true,
        writable: true,
      });
    }
  } catch (e) {
    console.log(e)
  }
}