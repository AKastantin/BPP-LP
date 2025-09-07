import axios from 'axios';

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

export class TelegramService {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.chatId = process.env.TELEGRAM_CHAT_ID || '';
    
    if (!this.botToken || !this.chatId) {
      console.warn('Telegram bot token or chat ID not configured. Telegram notifications will be disabled.');
    }
  }

  async sendMessage(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    if (!this.botToken || !this.chatId) {
      console.log('Telegram not configured, skipping message:', text);
      return false;
    }

    try {
      const message: TelegramMessage = {
        chat_id: this.chatId,
        text,
        parse_mode: parseMode
      };

      const response = await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        message,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
      return false;
    }
  }

  formatContactFormMessage(data: {
    name?: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    audience_type?: string;
  }): string {
    return `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${data.name || 'Not provided'}
📧 <b>Email:</b> ${data.email}
📞 <b>Phone:</b> ${data.phone || 'Not provided'}
🏢 <b>Company:</b> ${data.company || 'Not provided'}
👥 <b>Audience Type:</b> ${data.audience_type || 'Not specified'}
💬 <b>Message:</b> ${data.message || 'No message provided'}

⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `.trim();
  }

  formatPropertyUpdateMessage(data: {
    email: string;
    property_address: string;
    property_type: string;
    bedrooms?: string;
  }): string {
    return `
🏠 <b>New Property Update Request</b>

📧 <b>Email:</b> ${data.email}
📍 <b>Property Address:</b> ${data.property_address}
🏘️ <b>Property Type:</b> ${data.property_type}
🛏️ <b>Bedrooms:</b> ${data.bedrooms || 'Not specified'}

⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `.trim();
  }

  formatEmailRequestMessage(data: {
    email: string;
    property_address: string;
    results: any;
  }): string {
    return `
📧 <b>Property Results Email Request</b>

📧 <b>Email:</b> ${data.email}
📍 <b>Property Address:</b> ${data.property_address}
💰 <b>Current Value:</b> £${data.results.currentValue?.toLocaleString() || 'N/A'}
📈 <b>1-Year Forecast:</b> £${data.results.oneYearForecast?.toLocaleString() || 'N/A'}
📊 <b>5-Year Forecast:</b> £${data.results.fiveYearForecast?.toLocaleString() || 'N/A'}
🎯 <b>Confidence:</b> ${data.results.confidence || 'N/A'}%

⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `.trim();
  }
}

export const telegramService = new TelegramService();
