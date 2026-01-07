'use client';

import { useState } from 'react';

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

const initialState: FormState = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== 'idle') setStatus('idle');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Placeholder until Supabase hook-up
    const hasRequired = form.nombre && form.email && form.mensaje;
    setStatus(hasRequired ? 'success' : 'error');
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>Nombre *</span>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Apellido</span>
          <input
            type="text"
            name="apellido"
            value={form.apellido}
            onChange={(e) => handleChange('apellido', e.target.value)}
          />
        </label>
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Correo electrónico *</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Número de teléfono</span>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            placeholder="+56 9 1234 5678"
          />
        </label>
      </div>

      <label className="field">
        <span>Asunto</span>
        <input
          type="text"
          name="asunto"
          value={form.asunto}
          onChange={(e) => handleChange('asunto', e.target.value)}
          placeholder="Consulta, invitación, donación, etc."
        />
      </label>

      <label className="field">
        <span>Mensaje *</span>
        <textarea
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={(e) => handleChange('mensaje', e.target.value)}
          required
        />
      </label>

      <button type="submit" className="btn black" style={{ width: '100%', justifyContent: 'center' }}>
        Enviar mensaje
      </button>

      {status === 'success' && (
        <div className="form-status success">
          ¡Tu mensaje fue enviado! Pronto lo conectaremos con Supabase.
        </div>
      )}
      {status === 'error' && (
        <div className="form-status error">
          Por favor completa nombre, correo y mensaje antes de enviar.
        </div>
      )}
    </form>
  );
}
