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

  formatPropertyUpdatesSurveyMessage(data: {
    email?: string;
    firstName?: string;
    lastName?: string;
    selectedOptions: string[];
    additionalInfo?: string;
  }): string {
    const name = data.firstName && data.lastName 
      ? `${data.firstName} ${data.lastName}`
      : data.firstName || data.lastName || 'Not provided';
    
    // Map option IDs to user-friendly labels
    const optionLabels: Record<string, string> = {
      'market_activity': 'Market activity updates for my postal district',
      'current_value': 'Estimates of the current value of my property',
      'future_value': 'Estimates of the future value of my property in 1, 3, and 5 years',
      'comparison': 'Comparison between property appreciation and other investments',
      'other': 'Something else'
    };
    
    const optionsText = data.selectedOptions.length > 0 
      ? data.selectedOptions.map(option => `• ${optionLabels[option] || option}`).join('\n')
      : 'No options selected';
    
    const additionalInfoSection = data.additionalInfo 
      ? `\n💬 <b>Additional Information:</b> ${data.additionalInfo}`
      : '';

    return `
📋 <b>New Property Updates Survey Submission</b>

👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${data.email || 'Not provided'}

✅ <b>Selected Options:</b>
${optionsText}${additionalInfoSection}

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

⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `.trim();
  }
}

export const telegramService = new TelegramService();
