'use client';

import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import examples from 'libphonenumber-js/examples.mobile.json';
import { CountryCode, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

const regionDisplay = new Intl.DisplayNames(['es'], { type: 'region' });

function isoToFlag(iso: string) {
  if (!iso || iso.length !== 2) return '🌐';
  const codePoints = [...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

type Country = { id: CountryCode; dial: string; flag: string; name: string; example: string };

type FormState = {
  nombre: string;
  apellido: string;
  email: string;
  country: CountryCode;
  telefono: string;
  asunto: string;
  mensaje: string;
};

const initialState: FormState = {
  nombre: '',
  apellido: '',
  email: '',
  country: 'CL',
  telefono: '',
  asunto: '',
  mensaje: '',
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [countriesList, setCountriesList] = useState<Country[]>([]);

  useEffect(() => {
    const list = getCountries()
      .map((iso) => {
        const dial = `+${getCountryCallingCode(iso)}`;
        const exampleNumber = getExampleNumber(iso, examples);
        let example = exampleNumber?.formatNational() ?? 'Ej: 555 123 456';

        if (iso === 'CL') {
          example = '9 2123 4567';
        }

        const name = regionDisplay.of(iso) || iso;
        const flag = isoToFlag(iso);
        return { id: iso, dial, flag, name, example };
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));
    setCountriesList(list);
  }, []);

  function handleChange<K extends keyof FormState>(key: K, value: string | CountryCode) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status !== 'idle') setStatus('idle');
  }

  const selectedCountry = useMemo(() => {
    if (countriesList.length === 0) {
      if (form.country === 'CL') {
        return { id: 'CL', dial: '+56', flag: '🇨🇱', name: 'Chile', example: '9 2123 4567' } as Country;
      }
      return { id: form.country, dial: '', flag: '', name: form.country, example: '' } as Country;
    }
    return countriesList.find((c) => c.id === form.country) || countriesList.find(c => c.id === 'CL')!;
  }, [form.country, countriesList]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasRequired = form.nombre && form.email && form.mensaje;
    if (!hasRequired) {
      setStatus('error');
      return;
    }

    let phoneToSend = form.telefono;
    if (form.telefono && form.telefono.trim()) {
      const fullNumber = `${selectedCountry.dial} ${form.telefono}`;
      const parsedNumber = parsePhoneNumberFromString(fullNumber, selectedCountry.id);

      if (!parsedNumber || !parsedNumber.isValid()) {
        alert('Número de teléfono inválido para el país seleccionado.');
        return;
      }
      phoneToSend = parsedNumber.formatInternational();
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          nombre: form.nombre,
          apellido: form.apellido,
          email: form.email,
          telefono: phoneToSend,
          asunto: form.asunto,
          mensaje: form.mensaje,
        });

      if (error) {
        console.error('Error submitting form:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setForm(initialState);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus('error');
    }
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
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '0.5rem' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <div
                style={{
                  padding: '0.8rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  background: '#f9fafb',
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  lineHeight: 'normal', // Match standard input line-height behavior
                }}
              >
                {selectedCountry.flag} {selectedCountry.dial}
              </div>
              <select
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value as CountryCode)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                }}
              >
                {countriesList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.flag} {c.dial}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={(e) => handleChange('telefono', e.target.value)}
              placeholder={selectedCountry.example}
            />
          </div>
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
          ¡Tu mensaje fue enviado! Pronto te responderemos.
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
