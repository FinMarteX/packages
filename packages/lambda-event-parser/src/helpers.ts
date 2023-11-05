export function parseJSONSafe(json: string): any {
  try {
    return JSON.parse(json);
  } catch (e) {
    return false;
  }
}
