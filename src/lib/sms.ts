
/**
 * SMS Service for Shramsetu
 * Supports multiple providers: Console (Dev), Fast2SMS (India), Twilio (Global)
 */

type SmsProvider = 'console' | 'fast2sms' | 'twilio';

interface SmsConfig {
    provider: SmsProvider;
    // Twilio
    twilioAccountSid?: string;
    twilioAuthToken?: string;
    twilioFromPhone?: string;
    // Fast2SMS
    fast2smsApiKey?: string;
}

const config: SmsConfig = {
    provider: (process.env.SMS_PROVIDER as SmsProvider) || 'console',
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioFromPhone: process.env.TWILIO_FROM_PHONE,
    fast2smsApiKey: process.env.FAST2SMS_API_KEY,
};

/**
 * Sends an OTP to the specified phone number.
 * @param phone Phone number (10 digits for Fast2SMS, E.164 for Twilio)
 * @param otp The OTP code
 */
export async function sendOtpSms(phone: string, otp: string): Promise<boolean> {
    console.log(`[SMS Service] Request to send OTP ${otp} to ${phone} via ${config.provider}`);

    try {
        switch (config.provider) {
            case 'fast2sms':
                return await sendFast2Sms(phone, otp);
            case 'twilio':
                return await sendTwilioSms(phone, otp);
            case 'console':
            default:
                // Already successfully "sent" to console by caller or here
                console.log(`[MOCK SMS] To: ${phone}, Message: Your OTP is ${otp}`);
                return true;
        }
    } catch (error) {
        console.error('[SMS Service] Failed to send SMS:', error);
        return false;
    }
}

async function sendFast2Sms(phone: string, otp: string): Promise<boolean> {
    if (!config.fast2smsApiKey) {
        console.error('Fast2SMS API Key missing');
        return false;
    }

    // Fast2SMS OTP route (variables_values takes the OTP)
    // You might need a specific route "dlt" or "otp"
    // Using simple "otp" route endpoint if mostly standard

    // Clean phone (remove +91 if present for Fast2SMS as it usually expects 10 digits or handles it)
    const cleanPhone = phone.replace('+91', '').trim();

    const url = 'https://www.fast2sms.com/dev/bulkV2';
    const params = new URLSearchParams({
        authorization: config.fast2smsApiKey,
        route: 'otp',
        variables_values: otp,
        flash: '0',
        numbers: cleanPhone
    });

    const response = await fetch(`${url}?${params.toString()}`, {
        method: 'GET',
    });

    const data = await response.json();
    console.log('[Fast2SMS Response]', data);

    return data.return === true;
}

async function sendTwilioSms(phone: string, otp: string): Promise<boolean> {
    if (!config.twilioAccountSid || !config.twilioAuthToken || !config.twilioFromPhone) {
        console.error('Twilio credentials missing');
        return false;
    }

    // Ensure phone has +91 for Twilio if missing (assuming India)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    const message = `Your Shramsetu verification code is: ${otp}`;

    // Twilio API URL
    const url = `https://api.twilio.com/2010-04-01/Accounts/${config.twilioAccountSid}/Messages.json`;

    const formData = new URLSearchParams();
    formData.append('To', formattedPhone);
    formData.append('From', config.twilioFromPhone);
    formData.append('Body', message);

    const auth = Buffer.from(`${config.twilioAccountSid}:${config.twilioAuthToken}`).toString('base64');

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('[Twilio Error]', errorText);
        return false;
    }

    return true;
}
