/**
 * @param {string} id
 * @returns Formatted UUID string
 */
export function formatUUID(id) {
  return (
    id.substr(0, 8) +
    "-" +
    id.substr(8, 4) +
    "-" +
    id.substr(12, 4) +
    "-" +
    id.substr(16, 4) +
    "-" +
    id.substr(20)
  );
}

/**
 *
 * @param {string} uuid
 * @returns True when uuid supplied matches correct pattern.
 */
export function validateUUID(uuid) {
  const uuidFormat = new RegExp(
    /([0-9A-Z]{8})-([0-9A-Z]{4})-([0-9A-Z]{4})-([0-9A-Z]{4})-([0-9A-Z]{12})/i
  );

  return uuidFormat.test(uuid);
}
