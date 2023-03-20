export default function validateRequest(requestBody) {
  const fields = Object.values(requestBody);
  for (let i = 0; i < fields.length; i += 1) {
    if (!fields[i]) return false;
  }
  return true;
}
