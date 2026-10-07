/** Format an editorial calendar date consistently on server and client. */
export function formatContentDate(iso: string, month: "long" | "short" = "long") {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric", month, day: "numeric", timeZone: "UTC",
  });
}
