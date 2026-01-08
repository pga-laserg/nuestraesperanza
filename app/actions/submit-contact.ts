'use server';

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!;

type ActionState = {
    success?: boolean;
    error?: string;
    errors?: Record<string, string[]>;
};

export async function submitContactForm(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const token = formData.get('cf-turnstile-response') as string;
    const nombre = formData.get('nombre') as string;
    const apellido = formData.get('apellido') as string;
    const email = formData.get('email') as string;
    const telefono = formData.get('telefono') as string; // Already formatted by client
    const asunto = formData.get('asunto') as string;
    const mensaje = formData.get('mensaje') as string;

    // 1. Verify Turnstile Token
    if (!token) {
        return { error: 'Por favor completa la verificación de seguridad (CAPTCHA).' };
    }

    try {
        const ip = '127.0.0.1'; // In Next.js server actions, getting IP is tricky without headers(), skipping strict IP check for now or using a placeholder
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

    // 3. Insert into Supabase (using Service Role - bypass RLS)
    const { error } = await supabaseAdmin
        .from('contact_submissions')
        .insert({
            nombre,
            apellido,
            email,
            telefono,
            asunto,
            mensaje,
        });

    if (error) {
        console.error('Supabase insertion error:', error);
        return { error: 'Error al guardar el mensaje. Por favor intenta más tarde.' };
    }

    return { success: true };
}
