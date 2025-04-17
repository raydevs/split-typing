export const parseZmk = (zmkConfig) => {
  const layers = {};
  const layerRegex = /(\w+)_layer\s*{[^}]*bindings\s*=\s*<([^>]+)>/gs;

  let match;
  while ((match = layerRegex.exec(zmkConfig)) !== null) {
    const [_, layerName, bindings] = match;
    layers[layerName] = bindings
      .split(/\s+/)
      .filter(b => b.startsWith('&kp'))
      .map(b => b.replace('&kp', '').trim().toLowerCase());
  }

  return { layers };
};