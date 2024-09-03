// Used for serializing objects with BigInts to JSON
export function serializeWithBigInt(obj: any): string {
  return JSON.stringify(obj, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}
