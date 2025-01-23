export function formatToBrazilianDate(isoString: string): string {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}