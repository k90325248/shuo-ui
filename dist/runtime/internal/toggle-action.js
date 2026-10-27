export const runToggleAction = async (value, action, hooks) => {
  hooks.start(value);
  try {
    const succeeded = await action(value) !== false;
    if (succeeded && !hooks.isStale()) hooks.commit(value);
    return succeeded;
  } finally {
    hooks.finish();
  }
};
