export default async function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();

  const botUAs = [
    'facebookexternalhit', 'facebot', 'facebookbot',
    'adsbot', 'googlebot', 'bingbot', 'twitterbot',
    'linkedinbot', 'slackbot', 'whatsapp', 'telegrambot',
    'crawler', 'spider', 'headless', 'phantom', 'python',
    'curl', 'wget', 'java/', 'apache-httpclient'
  ];

  const metaIPs = [
    '66.220.', '69.63.', '69.171.', '173.252.',
    '31.13.', '157.240.', '179.60.', '204.15.'
  ];

  const isBot = botUAs.some(b => ua.includes(b));
  const isMeta = metaIPs.some(r => ip.startsWith(r));

  if (isBot || isMeta) {
    res.writeHead(302, { Location: 'https://grupojogadorcaro.com.br/quem-e-jota' });
    res.end();
    return;
  }

  // ── Calendário de links por dia ──────────────────────────────
  const START_DATE = new Date('2026-05-19T00:00:00-03:00'); // Dia 1 = 19/05

  const linksPorDia = {
    1: [
      'https://chat.whatsapp.com/BJRlMc9wPLBKyxXH3oFRnA', // 601
      'https://chat.whatsapp.com/Io0g9CvvuTP3hLEky15kUW', // 602
      'https://chat.whatsapp.com/JrYW1zBk5JC4GSiHrwUZmt', // 603
      'https://chat.whatsapp.com/He0nTwYto9hBpa6emPlvOX', // 604
      'https://chat.whatsapp.com/GwVxN0OWPqdKd2RtWZ5HlS', // 605
    ],
    2: [
      'https://chat.whatsapp.com/F4YmpAy7OR50i9x7YwFRav', // 606
      'https://chat.whatsapp.com/LZGdJDUkAiH0Dxb8enUu6K', // 607
      'https://chat.whatsapp.com/LjBloxTNgt888NZevhsji2', // 608
      'https://chat.whatsapp.com/IQOI11IrS537LQYbYJ6260', // 609
      'https://chat.whatsapp.com/Ljep8Hl1i3kFX0RZiNX5g4', // 610
    ],
    3: [
      'https://chat.whatsapp.com/CqLkyfd2KaxGuyoFBJGxNY', // 611
      'https://chat.whatsapp.com/K8uIQpsYH5K6zgAoVyhwLw', // 612
      'https://chat.whatsapp.com/IrfHno7ozacK5hLhUAZZ9f', // 613
      'https://chat.whatsapp.com/CQ2xiu1GzjdKGhmee9aNjY', // 614
      'https://chat.whatsapp.com/JisUYCqpNoCGUe1efIKmG1', // 616
    ],
  };
  // ─────────────────────────────────────────────────────────────

  const now = new Date();
  const diffMs = now - START_DATE;
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  // Cicla entre dia 1, 2, 3, 1, 2, 3...
  const totalDias = Object.keys(linksPorDia).length;
  const diaAtual = ((diffDias - 1) % totalDias) + 1;
  const links = linksPorDia[diaAtual];

  const link = links[Math.floor(Math.random() * links.length)];

  res.writeHead(302, { Location: link });
  res.end();
}
