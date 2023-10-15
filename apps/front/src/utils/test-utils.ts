export function generateString({
  length,
  isEmail = false,
}: {
  length: number;
  isEmail?: boolean;
}) {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  if (isEmail) {
    result += '@mail.host';
  }
  return result;
}