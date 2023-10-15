const NUMBER_MAX_CHARS = 8;

export function transformNumberField(value: string) {
  return (
    value
      .replace(/\D/g, '')
      .match(/\d{1,2}/g)
      ?.join('-')
      .substring(0, NUMBER_MAX_CHARS) || ''
  );
}
