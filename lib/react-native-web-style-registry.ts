const StyleRegistry = {
  resolve(style: Record<string, unknown> | undefined) {
    if (!style) {
      return { className: '', style: undefined };
    }
    return {
      className: '',
      style,
    };
  },
};

export default StyleRegistry;

