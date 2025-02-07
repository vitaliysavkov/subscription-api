const replyPatterns = [
  /^\s*>.*$/gm,
  /^On.*wrote:$/m,
  /^-{3,}.*Original Message.*-{3,}$/m,
  /^From:.*$/im,
  /^Sent:.*$/im,
  /^To:.*$/im,
  /^Subject:.*$/im,
  /^Date:.*$/im,
  /^От:.*$/im,
  /^Отправлено:.*$/im,
  /^Кому:.*$/im,
  /^Тема:.*$/im,
  /^Дата:.*$/im,
  /^Пишет.*:$/m,
  /^\d{1,2} [а-я]{3,8} \d{4} г\., \d{1,2}:\d{2}.*написал\(а\):$/im,
  /^[а-я]+ \d{1,2}, \d{4} в \d{1,2}:\d{2} .* написал\(а\):$/im,
];

export function cleanupEmailText(text: string): string {
  let cleanedText = text;

  replyPatterns.forEach((pattern) => {
    cleanedText = cleanedText.replace(pattern, '');
  });

  cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n');

  return cleanedText.trim();
}
