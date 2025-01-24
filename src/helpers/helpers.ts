export function formatToBrazilianDate(
  isoString: string,
  includeTime: boolean = true
): string {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(includeTime && { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
  };

  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}
