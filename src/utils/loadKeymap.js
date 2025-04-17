export const loadKeymap = async () => {
  const response = await fetch('/configs/corne.keymap');
  if (!response.ok) throw new Error("Error al cargar el keymap");
  return await response.text();
};