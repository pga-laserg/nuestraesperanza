'use server';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!;
const CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL!;
const CONTACT_WEBHOOK_TOKEN = process.env.CONTACT_WEBHOOK_TOKEN!;
const SITE_URL = process.env.SITE_URL || 'https://nuestraesperanza.cl';

type ActionState = {
    success?: boolean;
    error?: string;
    errors?: Record<string, string[]>;
};

export async function submitContactForm(_prevState: ActionState, formData: FormData): Promise<ActionState> {
    const token = formData.get('cf-turnstile-response') as string;
    const nombre = (formData.get('nombre') as string)?.trim();
    const apellido = (formData.get('apellido') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const telefono = (formData.get('telefono') as string)?.trim(); // Already formatted by client
    const asunto = (formData.get('asunto') as string)?.trim();
    const mensaje = (formData.get('mensaje') as string)?.trim();

    // 1. Verify Turnstile Token
    if (!token) {
        return { error: 'Por favor completa la verificación de seguridad (CAPTCHA).' };
    }

    if (!TURNSTILE_SECRET_KEY || !CONTACT_WEBHOOK_URL || !CONTACT_WEBHOOK_TOKEN) {
        console.error('Missing required contact form env vars.');
        return { error: 'Configuración incompleta del servidor de contacto.' };
    }

    try {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
            }),
        });

        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
            console.error('Turnstile verification failed:', verifyJson);
            return { error: 'Error de verificación de seguridad. Inténtalo de nuevo.' };
        }
    } catch (err) {
        console.error('Turnstile error:', err);
        return { error: 'Error conectando con el servicio de seguridad.' };
    }

    // 2. Validate Fields
    if (!nombre || !email || !mensaje) {
        return { error: 'Faltan campos obligatorios.' };
    }

    // Message length check (Hardening)
    if (mensaje.length > 3000) {
        return { error: 'El mensaje es demasiado largo (máximo 3000 caracteres).' };
    }

    // 3. Forward to Apps Script -> Google Sheets
    try {
        const fullName = [nombre, apellido].filter(Boolean).join(' ').trim();
        const webhookRes = await fetch(CONTACT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: CONTACT_WEBHOOK_TOKEN,
                name: fullName || nombre,
                email,
                phoneFull: telefono || '',
                subject: asunto || '',
                message: mensaje,
                source: `${SITE_URL}/contacto`,
                timestamp: new Date().toISOString(),
            }),
            cache: 'no-store',
        });

        const responseText = await webhookRes.text();
        let webhookJson: { ok?: boolean; error?: string } = {};
        try {
            webhookJson = JSON.parse(responseText);
        } catch (_parseErr) {
            // Keep default object for non-JSON responses.
        }

        if (!webhookRes.ok || webhookJson.ok === false) {
            console.error('Apps Script submission failed:', {
                status: webhookRes.status,
                body: responseText,
            });
            return { error: webhookJson.error || 'Error al guardar el mensaje. Por favor intenta más tarde.' };
        }
    } catch (error) {
        console.error('Apps Script forwarding error:', error);
        return { error: 'No se pudo enviar el mensaje en este momento. Inténtalo nuevamente.' };
    }

    return { success: true };
}
